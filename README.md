# css-nesting-polyfill

DISCLAIMER: This package is still WIP. Use it at your own risk.

A minimal polyfill for the [new CSS nesting WebKit feature](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/). Allows for nested CSS selectors in the format:

```css
.foo {
	color: green;
	.bar {
		font-size: 1.4rem;
	}
}
```

which is equivalent to:

```css
.foo {
	color: green;
}
.foo .bar {
	font-size: 1.4rem;
}
```

Also, it adds the `&` operator, inspired in Sass, indicates where the parent selector should be placed inside the child.

## Usage

Install the library running:

```sh
npm install css-nesting-polyfill
```

Then, simply import it into your project:

```js
import 'css-nesting-polyfill';
```

Note that it won't work properly if other CSS preprocessors are also enabled.

## Contributing

Contributions are welcome! To contribute to css-nesting-polyfill, fork this repository, make your changes and commit them with a descriptive message, then submit a pull request.

## License

`css-nesting-polyfill` is released under the MIT License.

## Support

If you have any questions or issues, please contact me at [juancarlos@sevilla.es](mailto:juancarlos@sevilla.es).

## Version History

### v1.0.0

- Initial release of css-nesting-polyfill