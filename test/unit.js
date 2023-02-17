import { preprocessCSS } from '../src/css-nesting';

describe('preprocessCSS', () => {
	it('should correctly transform nested selectors', () => {
		const input = `
			.foo {
				color: green;
				.bar {
					font-size: 1.4rem;
				}
			}
		`;
		const expected = `
			.foo {
				color: green;
			}
			.foo .bar {
				font-size: 1.4rem;
			}
		`;
		expect(preprocessCSS(input)).toBe(expected);
	});

	it('should correctly transform parent selectors', () => {
		const input = `
			.foo {
				color: green;
				&.active {
					font-weight: bold;
				}
			}
		`;
		const expected = `
			.foo {
				color: green;
			}
			.foo.active {
				font-weight: bold;
			}
		`;
		expect(preprocessCSS(input)).toBe(expected);
	});

	it('should leave normal CSS unchanged', () => {
		const input = `
			.foo {
				color: green;
			}
		`;
		expect(preprocessCSS(input)).toBe(input);
	});
});