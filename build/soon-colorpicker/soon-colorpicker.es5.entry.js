/*! Built with http://stenciljs.com */
SoonColorpicker.loadBundle('soon-colorpicker', ['exports'], function (exports) {
    var h = window.SoonColorpicker.h;
    var Colorpicker = /** @class */ (function () {
        function Colorpicker() {
            this.opened = false;
            this.hasFocus = false;
            /**
             * Value as a string represent the color in hexadecimal with #.
             */
            this.value = null;
        }
        /**
         * Method to manually close the color palette.
         */
        Colorpicker.prototype.soonClose = function () {
            this.onBlur();
        };
        /**
         * Method to manually open the color palette.
         */
        Colorpicker.prototype.soonOpen = function () {
            this.opened = true;
            this.onFocus();
        };
        Colorpicker.prototype.valueChange = function () {
            this._initColor();
        };
        Colorpicker.prototype.imageChange = function (newImage) {
            if (newImage) {
                this._initCanvas();
            }
        };
        Colorpicker.prototype.handleEnter = function () {
            this.soonOpen();
        };
        Colorpicker.prototype.handleESC = function () {
            this.soonClose();
        };
        Colorpicker.prototype.componentDidLoad = function () {
            var _this = this;
            this._initColor();
            this._initCanvas();
            // Bind host event focus and Blur for tabIndex feature
            this.el.addEventListener('focus', function () {
                _this.onFocus();
            });
            this.el.addEventListener('blur', function () {
                _this.onBlur();
            });
        };
        Colorpicker.prototype.onBlur = function () {
            this.hasFocus = false;
            this.opened = false;
            this.soonBlur.emit();
        };
        Colorpicker.prototype.onFocus = function () {
            this.hasFocus = true;
            this.soonFocus.emit();
        };
        Colorpicker.prototype.hasValue = function () {
            return this.value !== null && this.value !== undefined && this.value !== '';
        };
        Colorpicker.prototype.hostData = function () {
            return {
                role: 'colorpicker',
                tabIndex: 0,
                interactive: true,
                class: {
                    'has-value': this.hasValue(),
                    'has-focus': this.hasFocus
                }
            };
        };
        Colorpicker.prototype.render = function () {
            var _this = this;
            return [h("div", { class: "color", onClick: function () { return (_this.opened = true); } }), h("canvas", { class: "selector " + (this.opened ? 'opened' : '') })];
        };
        Colorpicker.prototype._initColor = function () {
            var color = this.el.shadowRoot.querySelector('.color');
            if (color) {
                if (this.value) {
                    color.style.backgroundColor = this.value;
                }
                else {
                    // Reset backgroundColor
                    color.style.backgroundColor = '#fafbfd';
                }
            }
        };
        Colorpicker.prototype._setColor = function (color) {
            this.value = color;
            this.opened = false;
            // emit value Change
            var value = this.value;
            this.soonChange.emit({ value: value });
        };
        Colorpicker.prototype._initCanvas = function () {
            var _this = this;
            var canvas = this.el.shadowRoot.querySelector('.selector');
            var color = this.el.shadowRoot.querySelector('.color');
            canvas.width = 150;
            canvas.height = 150;
            var selectorImage = new Image();
            selectorImage.crossOrigin = 'Anonymous';
            selectorImage.onload = function () {
                canvas.width = selectorImage.width;
                canvas.height = selectorImage.height;
                canvas.getContext('2d').drawImage(selectorImage, 0, 0, selectorImage.width, selectorImage.height);
                // Center canvas on top of color
                canvas.style.left = '-' + (selectorImage.width / 2 - color.clientWidth / 2) + 'px';
            };
            selectorImage.src = this.image;
            canvas.onmousedown = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var offset = event.target.getBoundingClientRect(), colorData = canvas.getContext('2d').getImageData(event.clientX - offset.left, event.clientY - offset.top, 1, 1).data;
                var colorPicked = _this._rgbToHex('rgb(' + colorData[0] + ',' + colorData[1] + ',' + colorData[2] + ')');
                _this._setColor(colorPicked);
            };
        };
        /**
         * Convert rgb to hex
         */
        Colorpicker.prototype._rgbToHex = function (rgb) {
            var result = rgb.match(/\d+/g);
            function hex(x) {
                var digits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
                return isNaN(x) ? '00' : digits[(x - (x % 16)) / 16] + digits[x % 16];
            }
            return '#' + hex(result[0]) + hex(result[1]) + hex(result[2]);
        };
        Object.defineProperty(Colorpicker, "is", {
            get: function () { return "soon-colorpicker"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Colorpicker, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Colorpicker, "properties", {
            get: function () {
                return {
                    "el": {
                        "elementRef": true
                    },
                    "hasFocus": {
                        "state": true
                    },
                    "image": {
                        "type": String,
                        "attr": "image",
                        "watchCallbacks": ["imageChange"]
                    },
                    "opened": {
                        "state": true
                    },
                    "soonClose": {
                        "method": true
                    },
                    "soonOpen": {
                        "method": true
                    },
                    "value": {
                        "type": String,
                        "attr": "value",
                        "mutable": true,
                        "watchCallbacks": ["valueChange"]
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Colorpicker, "events", {
            get: function () {
                return [{
                        "name": "soonBlur",
                        "method": "soonBlur",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "soonFocus",
                        "method": "soonFocus",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }, {
                        "name": "soonChange",
                        "method": "soonChange",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Colorpicker, "listeners", {
            get: function () {
                return [{
                        "name": "keydown.enter",
                        "method": "handleEnter"
                    }, {
                        "name": "keydown.escape",
                        "method": "handleESC"
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Colorpicker, "style", {
            get: function () { return ":host {\n  /**\n   * \@prop --element-size: Size in px of the element\n   * \@prop --element-zindex: z-index of the element\n   */\n  display: inline-block;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: var(--element-size, 32px);\n  height: var(--element-size, 32px);\n  border-radius: 50%;\n  padding: 2px;\n  background: #fff;\n  -webkit-box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);\n  vertical-align: middle; }\n  :host .color {\n    display: block;\n    width: calc(var(--element-size, 32px) - 4px);\n    height: calc(var(--element-size, 32px) - 4px);\n    border-radius: 50%;\n    background: #fafbfd;\n    cursor: pointer; }\n  :host .selector {\n    position: absolute;\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    margin: auto;\n    top: 0;\n    bottom: 0;\n    cursor: crosshair;\n    -webkit-transition: all 0.2s ease-in-out;\n    transition: all 0.2s ease-in-out;\n    z-index: var(--element-zindex, 9999); }\n    :host .selector.opened {\n      visibility: visible;\n      opacity: 1;\n      -webkit-transform: scale(1);\n      transform: scale(1); }\n\n:host(:focus) {\n  outline: none; }"; },
            enumerable: true,
            configurable: true
        });
        return Colorpicker;
    }());
    exports.SoonColorpicker = Colorpicker;
    Object.defineProperty(exports, '__esModule', { value: true });
});
