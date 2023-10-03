# Style Guide [temporary for dev purpose only]

## Functions

`setFoo()` must set some value that is not a boolean
`setIsFoo()` must set a boolean value

`getIsFoo()` must return a boolean
`getFoo()` returns a value that is not a boolean

`buildElement()` returns an HTMLElement 

## Attributes

- custom html attributes are prefixed with `data-`
- if the attribute indicates a boolean value, prefix the noun ( valid, pristine ) with `data-is-`
- if the attribute does not return a boolean value, only use `data-`

```
getIsFoo () {
    return this.hasAttribute('data-is-foo');
}
```

## CSS class vs custom attribute

- use a CSS class when the DOM element itself is needed. Example: '.duplicable-element', where we need the DOM element itself ( as opposed to an attribute value or state boolean value )
