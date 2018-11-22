# soon-colorpicker



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                          | Type     | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| `image`  | `image`   | Image palette for the colorpicker. You can use any color palette as you want. For example: https://www.color-hex.com/color-palettes/ | `string` | `undefined` |
| `value`  | `value`   | Value as a string represent the color in hexadecimal with #.                                                                         | `string` | `null`      |


## Events

| Event        | Description                         | Detail |
| ------------ | ----------------------------------- | ------ |
| `soonBlur`   | Emitted when the input loses focus. | void   |
| `soonChange` | Emitted when the value has changed. | any    |
| `soonFocus`  | Emitted when the input has focus.   | void   |


## Methods

### `soonClose() => void`

Method to manually close the color palette.

#### Returns

Type: `void`



### `soonOpen() => void`

Method to manually open the color palette.

#### Returns

Type: `void`




## CSS Custom Properties

| Name             | Description               |
| ---------------- | ------------------------- |
| `--element-size` | Size in px of the element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
