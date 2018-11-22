/*! Built with http://stenciljs.com */
const{h:e}=window.SoonColorpicker;class t{constructor(){this.opened=!1,this.hasFocus=!1,this.value=null}soonClose(){this.onBlur()}soonOpen(){this.opened=!0,this.onFocus()}valueChange(){this._initColor()}imageChange(e){e&&this._initCanvas()}handleEnter(){this.soonOpen()}handleESC(){this.soonClose()}componentDidLoad(){this._initColor(),this._initCanvas(),this.el.addEventListener("focus",()=>{this.onFocus()}),this.el.addEventListener("blur",()=>{this.onBlur()})}onBlur(){this.hasFocus=!1,this.opened=!1,this.soonBlur.emit()}onFocus(){this.hasFocus=!0,this.soonFocus.emit()}hasValue(){return null!=this.value&&""!==this.value}hostData(){return{role:"colorpicker",tabIndex:0,interactive:!0,class:{"has-value":this.hasValue(),"has-focus":this.hasFocus}}}render(){return[e("div",{class:"color",onClick:()=>this.opened=!0}),e("canvas",{class:`selector ${this.opened?"opened":""}`})]}_initColor(){const e=this.el.shadowRoot.querySelector(".color");e&&(e.style.backgroundColor=this.value?this.value:"#fafbfd")}_setColor(e){this.value=e,this.opened=!1,this.soonChange.emit({value:this.value})}_initCanvas(){const e=this.el.shadowRoot.querySelector(".selector"),t=this.el.shadowRoot.querySelector(".color");e.width=150,e.height=150;let o=new Image;o.crossOrigin="Anonymous",o.onload=function(){e.width=o.width,e.height=o.height,e.getContext("2d").drawImage(o,0,0,o.width,o.height),e.style.left="-"+(o.width/2-t.clientWidth/2)+"px"},o.src=this.image,e.onmousedown=(t=>{t.preventDefault(),t.stopPropagation();var o=t.target.getBoundingClientRect(),s=e.getContext("2d").getImageData(t.clientX-o.left,t.clientY-o.top,1,1).data;const n=this._rgbToHex("rgb("+s[0]+","+s[1]+","+s[2]+")");this._setColor(n)})}_rgbToHex(e){var t=e.match(/\d+/g);function o(e){var t=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");return isNaN(e)?"00":t[(e-e%16)/16]+t[e%16]}return"#"+o(t[0])+o(t[1])+o(t[2])}static get is(){return"soon-colorpicker"}static get encapsulation(){return"shadow"}static get properties(){return{el:{elementRef:!0},hasFocus:{state:!0},image:{type:String,attr:"image",watchCallbacks:["imageChange"]},opened:{state:!0},soonClose:{method:!0},soonOpen:{method:!0},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChange"]}}}static get events(){return[{name:"soonBlur",method:"soonBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"soonFocus",method:"soonFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"soonChange",method:"soonChange",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"keydown.enter",method:"handleEnter"},{name:"keydown.escape",method:"handleESC"}]}static get style(){return":host{display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--element-size,32px);height:var(--element-size,32px);border-radius:50%;padding:2px;background:#fff;-webkit-box-shadow:0 0 6px 0 rgba(0,0,0,.1);box-shadow:0 0 6px 0 rgba(0,0,0,.1);vertical-align:middle}:host .color{display:block;width:calc(var(--element-size, 32px) - 4px);height:calc(var(--element-size, 32px) - 4px);border-radius:50%;background:#fafbfd;cursor:pointer}:host .selector{position:absolute;visibility:hidden;opacity:0;-webkit-transform:scale(0);transform:scale(0);margin:auto;top:0;bottom:0;cursor:crosshair;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;z-index:var(--element-zindex,9999)}:host .selector.opened{visibility:visible;opacity:1;-webkit-transform:scale(1);transform:scale(1)}:host(:focus){outline:none}"}}export{t as SoonColorpicker};