import { Component, Element, Prop, Watch, State, EventEmitter, Event, Method, Listen } from '@stencil/core';

@Component({
  tag: 'soon-colorpicker',
  styleUrl: 'colorpicker.scss',
  shadow: true,
  assetsDir: './assets'
})
export class Colorpicker {
  @Element()
  el: HTMLElement;

  @State()
  opened: boolean = false;

  @State()
  hasFocus = false;

  /**
   * Image palette for the colorpicker. You can use any color palette as you want.
   * For example: https://www.color-hex.com/color-palettes/
   */
  @Prop()
  image: string;

  /**
   * Value as a string represent the color in hexadecimal with #.
   */
  @Prop({ mutable: true })
  value: string = null;

  /**
   * Emitted when the input loses focus.
   */
  @Event()
  soonBlur!: EventEmitter<void>;

  /**
   * Emitted when the input has focus.
   */
  @Event()
  soonFocus!: EventEmitter<void>;

  /**
   * Emitted when the value has changed.
   */
  @Event()
  soonChange!: EventEmitter<any>;

  /**
   * Method to manually close the color palette.
   */
  @Method()
  soonClose() {
    this.onBlur();
  }

  /**
   * Method to manually open the color palette.
   */
  @Method()
  soonOpen() {
    this.opened = true;
    this.onFocus();
  }

  @Watch('value')
  valueChange() {
    this._initColor();
  }

  @Watch('image')
  imageChange(newImage: string) {
    if (newImage) {
      this._initCanvas();
    }
  }

  @Listen('keydown.enter')
  handleEnter() {
    this.soonOpen();
  }

  @Listen('keydown.escape')
  handleESC() {
    this.soonClose();
  }

  componentDidLoad() {
    this._initColor();
    this._initCanvas();

    // Bind host event focus and Blur for tabIndex feature
    this.el.addEventListener('focus', () => {
      this.onFocus();
    });

    this.el.addEventListener('blur', () => {
      this.onBlur();
    });
  }

  private onBlur() {
    this.hasFocus = false;
    this.opened = false;
    this.soonBlur.emit();
  }

  private onFocus() {
    this.hasFocus = true;
    this.soonFocus.emit();
  }

  hasValue(): boolean {
    return this.value !== null && this.value !== undefined && this.value !== '';
  }

  hostData() {
    return {
      role: 'colorpicker',
      tabIndex: 0,
      interactive: true,
      class: {
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus
      }
    };
  }

  render() {
    return [<div class="color" onClick={() => (this.opened = true)} />, <canvas class={`selector ${this.opened ? 'opened' : ''}`} />];
  }

  private _initColor() {
    const color = this.el.shadowRoot.querySelector('.color') as HTMLElement;
    if (color) {
      if (this.value) {
        color.style.backgroundColor = this.value;
      } else {
        // Reset backgroundColor
        color.style.backgroundColor = '#fafbfd';
      }
    }
  }

  private _setColor(color: any) {
    this.value = color;
    this.opened = false;
    // emit value Change
    const value = this.value;
    this.soonChange.emit({ value });
  }

  private _initCanvas() {
    const canvas = this.el.shadowRoot.querySelector('.selector') as HTMLCanvasElement;
    const color = this.el.shadowRoot.querySelector('.color') as HTMLElement;

    canvas.width = 150;
    canvas.height = 150;
    let selectorImage = new Image();
    selectorImage.crossOrigin = 'Anonymous';
    selectorImage.onload = function() {
      canvas.width = selectorImage.width;
      canvas.height = selectorImage.height;
      canvas.getContext('2d').drawImage(selectorImage, 0, 0, selectorImage.width, selectorImage.height);

      // Center canvas on top of color
      canvas.style.left = '-' + (selectorImage.width / 2 - color.clientWidth / 2) + 'px';
    };

    selectorImage.src = this.image;

    canvas.onmousedown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      var offset = event.target.getBoundingClientRect(),
        colorData = canvas.getContext('2d').getImageData(event.clientX - offset.left, event.clientY - offset.top, 1, 1).data;

      const colorPicked = this._rgbToHex('rgb(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ')');
      this._setColor(colorPicked);
    };
  }

  /**
   * Convert rgb to hex
   */
  private _rgbToHex(rgb: any) {
    var result = rgb.match(/\d+/g);

    function hex(x: any) {
      var digits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
      return isNaN(x) ? '00' : digits[(x - (x % 16)) / 16] + digits[x % 16];
    }

    return '#' + hex(result[0]) + hex(result[1]) + hex(result[2]);
  }
}
