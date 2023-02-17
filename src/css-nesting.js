function preprocess(css) {
	const RE_NESTED_SELECTOR = /((?:^|}[^{]*?){(?:[^{}]*{[^{}]*})*[^{}]*?&[^{}]*?(?:{[^{}]*}[^{}]*)*})/gm;
	const RE_PARENT_SELECTOR = /&/g;

	return css.replace(RE_NESTED_SELECTOR, (match) =>
		match.replace(RE_PARENT_SELECTOR, (match) => '& > ' + match.slice(1))
	);
}

function processStylesheet(styleSheet) {
	if (!styleSheet.cssRules) return;

	for (let i = 0; i < styleSheet.cssRules.length; i++) {
		const cssRule = styleSheet.cssRules[i];

		if (cssRule.type === 1) {
			cssRule.selectorText = preprocess(cssRule.selectorText);
		}
	}
}

function processStylesheets() {
	const styleSheets = Array.from(document.styleSheets);

	styleSheets.forEach(processStylesheet);
}

function replaceLinkContents(link) {
	if (!link.sheet) return;

	link.sheet.disabled = true;

	const { sheet } = link;

	while (link.firstChild) {
		link.removeChild(link.firstChild);
	}

	const style = document.createElement('style');
	style.textContent = preprocess(sheet.cssText);
	link.appendChild(style);

	setTimeout(() => {
		sheet.disabled = false;
	}, 0);
}

function processLinks() {
	const links = Array.from(document.getElementsByTagName('link'));

	links.forEach((link) => {
		if (link.rel === 'stylesheet' && link.getAttribute('data-polyfilled') !== 'true') {
			link.setAttribute('data-polyfilled', 'true');
			replaceLinkContents(link);
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	processStylesheets();
	processLinks();

	new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			const { target, addedNodes } = mutation;

			if (target.nodeName === 'HEAD') {
				addedNodes.forEach((node) => {
					if (node.nodeName === 'LINK') {
						replaceLinkContents(node);
					} else if (node.nodeName === 'STYLE') {
						processStylesheet(node.sheet);
					}
				});
			}
		});
	}).observe(document.documentElement, { childList: true, subtree: true });
});