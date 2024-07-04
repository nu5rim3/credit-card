import{g as R,ag as gt,ah as wt,j as I,l as Ot}from"./index-BxdzpkLS.js";function xt(b){for(var w=[],O=1;O<arguments.length;O++)w[O-1]=arguments[O];b&&b.addEventListener&&b.addEventListener.apply(b,w)}function Pt(b){for(var w=[],O=1;O<arguments.length;O++)w[O-1]=arguments[O];b&&b.removeEventListener&&b.removeEventListener.apply(b,w)}var X=typeof window<"u",jt=function(b){R.useEffect(b,[])},St=function(b){var w=R.useRef(b);w.current=b,jt(function(){return function(){return w.current()}})},It=function(b){var w=R.useRef(0),O=R.useState(b),P=O[0],j=O[1],v=R.useCallback(function(f){cancelAnimationFrame(w.current),w.current=requestAnimationFrame(function(){j(f)})},[]);return St(function(){cancelAnimationFrame(w.current)}),[P,v]},Mt=function(b,w){b===void 0&&(b=1/0),w===void 0&&(w=1/0);var O=It({width:X?window.innerWidth:b,height:X?window.innerHeight:w}),P=O[0],j=O[1];return R.useEffect(function(){if(X){var v=function(){j({width:window.innerWidth,height:window.innerHeight})};return xt(window,"resize",v),function(){Pt(window,"resize",v)}}},[]),P},at={exports:{}};(function(b,w){(function(O,P){b.exports=P(R)})(typeof self<"u"?self:gt,function(O){return function(P){var j={};function v(f){if(j[f])return j[f].exports;var t=j[f]={i:f,l:!1,exports:{}};return P[f].call(t.exports,t,t.exports,v),t.l=!0,t.exports}return v.m=P,v.c=j,v.d=function(f,t,e){v.o(f,t)||Object.defineProperty(f,t,{enumerable:!0,get:e})},v.r=function(f){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(f,"__esModule",{value:!0})},v.t=function(f,t){if(1&t&&(f=v(f)),8&t||4&t&&typeof f=="object"&&f&&f.__esModule)return f;var e=Object.create(null);if(v.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:f}),2&t&&typeof f!="string")for(var c in f)v.d(e,c,(function(a){return f[a]}).bind(null,c));return e},v.n=function(f){var t=f&&f.__esModule?function(){return f.default}:function(){return f};return v.d(t,"a",t),t},v.o=function(f,t){return Object.prototype.hasOwnProperty.call(f,t)},v.p="",v(v.s=2)}([function(P,j){P.exports=O},function(P,j,v){var f={linear:function(t,e,c,a){return(c-e)*t/a+e},easeInQuad:function(t,e,c,a){return(c-e)*(t/=a)*t+e},easeOutQuad:function(t,e,c,a){return-(c-e)*(t/=a)*(t-2)+e},easeInOutQuad:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t+e:-s/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,c,a){return(c-e)*(t/=a)*t*t+e},easeOutCubic:function(t,e,c,a){return(c-e)*((t=t/a-1)*t*t+1)+e},easeInOutCubic:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t*t+e:s/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,c,a){return(c-e)*(t/=a)*t*t*t+e},easeOutQuart:function(t,e,c,a){return-(c-e)*((t=t/a-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t*t*t+e:-s/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,c,a){return(c-e)*(t/=a)*t*t*t*t+e},easeOutQuint:function(t,e,c,a){return(c-e)*((t=t/a-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?s/2*t*t*t*t*t+e:s/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,c,a){var s=c-e;return-s*Math.cos(t/a*(Math.PI/2))+s+e},easeOutSine:function(t,e,c,a){return(c-e)*Math.sin(t/a*(Math.PI/2))+e},easeInOutSine:function(t,e,c,a){return-(c-e)/2*(Math.cos(Math.PI*t/a)-1)+e},easeInExpo:function(t,e,c,a){return t==0?e:(c-e)*Math.pow(2,10*(t/a-1))+e},easeOutExpo:function(t,e,c,a){var s=c-e;return t==a?e+s:s*(1-Math.pow(2,-10*t/a))+e},easeInOutExpo:function(t,e,c,a){var s=c-e;return t===0?e:t===a?e+s:(t/=a/2)<1?s/2*Math.pow(2,10*(t-1))+e:s/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,c,a){return-(c-e)*(Math.sqrt(1-(t/=a)*t)-1)+e},easeOutCirc:function(t,e,c,a){return(c-e)*Math.sqrt(1-(t=t/a-1)*t)+e},easeInOutCirc:function(t,e,c,a){var s=c-e;return(t/=a/2)<1?-s/2*(Math.sqrt(1-t*t)-1)+e:s/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,c,a){var s,h,x,p=c-e;return x=1.70158,t===0?e:(t/=a)==1?e+p:((h=0)||(h=.3*a),(s=p)<Math.abs(p)?(s=p,x=h/4):x=h/(2*Math.PI)*Math.asin(p/s),-s*Math.pow(2,10*(t-=1))*Math.sin((t*a-x)*(2*Math.PI)/h)+e)},easeOutElastic:function(t,e,c,a){var s,h,x,p=c-e;return x=1.70158,t===0?e:(t/=a)==1?e+p:((h=0)||(h=.3*a),(s=p)<Math.abs(p)?(s=p,x=h/4):x=h/(2*Math.PI)*Math.asin(p/s),s*Math.pow(2,-10*t)*Math.sin((t*a-x)*(2*Math.PI)/h)+p+e)},easeInOutElastic:function(t,e,c,a){var s,h,x,p=c-e;return x=1.70158,t===0?e:(t/=a/2)==2?e+p:((h=0)||(h=a*.44999999999999996),(s=p)<Math.abs(p)?(s=p,x=h/4):x=h/(2*Math.PI)*Math.asin(p/s),t<1?s*Math.pow(2,10*(t-=1))*Math.sin((t*a-x)*(2*Math.PI)/h)*-.5+e:s*Math.pow(2,-10*(t-=1))*Math.sin((t*a-x)*(2*Math.PI)/h)*.5+p+e)},easeInBack:function(t,e,c,a,s){return s===void 0&&(s=1.70158),(c-e)*(t/=a)*t*((s+1)*t-s)+e},easeOutBack:function(t,e,c,a,s){return s===void 0&&(s=1.70158),(c-e)*((t=t/a-1)*t*((s+1)*t+s)+1)+e},easeInOutBack:function(t,e,c,a,s){var h=c-e;return s===void 0&&(s=1.70158),(t/=a/2)<1?h/2*(t*t*((1+(s*=1.525))*t-s))+e:h/2*((t-=2)*t*((1+(s*=1.525))*t+s)+2)+e},easeInBounce:function(t,e,c,a){var s=c-e;return s-f.easeOutBounce(a-t,0,s,a)+e},easeOutBounce:function(t,e,c,a){var s=c-e;return(t/=a)<.36363636363636365?s*(7.5625*t*t)+e:t<.7272727272727273?s*(7.5625*(t-=.5454545454545454)*t+.75)+e:t<.9090909090909091?s*(7.5625*(t-=.8181818181818182)*t+.9375)+e:s*(7.5625*(t-=.9545454545454546)*t+.984375)+e},easeInOutBounce:function(t,e,c,a){var s=c-e;return t<a/2?.5*f.easeInBounce(2*t,0,s,a)+e:.5*f.easeOutBounce(2*t-a,0,s,a)+.5*s+e}};P.exports=f},function(P,j,v){P.exports=v(3)},function(P,j,v){v.r(j),v.d(j,"ReactConfetti",function(){return et});var f,t,e=v(0),c=v.n(e),a=v(1),s=v.n(a);function h(n,i){return n+Math.random()*(i-n)}function x(n,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function p(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}(function(n){n[n.Circle=0]="Circle",n[n.Square=1]="Square",n[n.Strip=2]="Strip"})(f||(f={})),function(n){n[n.Positive=1]="Positive",n[n.Negative=-1]="Negative"}(t||(t={}));var st=function(){function n(r,d,u,l){(function(W,L){if(!(W instanceof L))throw new TypeError("Cannot call a class as a function")})(this,n),p(this,"context",void 0),p(this,"radius",void 0),p(this,"x",void 0),p(this,"y",void 0),p(this,"w",void 0),p(this,"h",void 0),p(this,"vx",void 0),p(this,"vy",void 0),p(this,"shape",void 0),p(this,"angle",void 0),p(this,"angularSpin",void 0),p(this,"color",void 0),p(this,"rotateY",void 0),p(this,"rotationDirection",void 0),p(this,"getOptions",void 0),this.getOptions=d;var y,g,m=this.getOptions(),D=m.colors,M=m.initialVelocityX,C=m.initialVelocityY;this.context=r,this.x=u,this.y=l,this.w=h(5,20),this.h=h(5,20),this.radius=h(5,10),this.vx=typeof M=="number"?h(-M,M):h(M.min,M.max),this.vy=typeof C=="number"?h(-C,0):h(C.min,C.max),this.shape=(y=0,g=2,Math.floor(y+Math.random()*(g-y+1))),this.angle=h(0,360)*Math.PI/180,this.angularSpin=h(-.2,.2),this.color=D[Math.floor(Math.random()*D.length)],this.rotateY=h(0,1),this.rotationDirection=h(0,1)?t.Positive:t.Negative}var i,o;return i=n,(o=[{key:"update",value:function(){var r=this.getOptions(),d=r.gravity,u=r.wind,l=r.friction,y=r.opacity,g=r.drawShape;this.x+=this.vx,this.y+=this.vy,this.vy+=d,this.vx+=u,this.vx*=l,this.vy*=l,this.rotateY>=1&&this.rotationDirection===t.Positive?this.rotationDirection=t.Negative:this.rotateY<=-1&&this.rotationDirection===t.Negative&&(this.rotationDirection=t.Positive);var m=.1*this.rotationDirection;if(this.rotateY+=m,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=y,this.context.lineCap="round",this.context.lineWidth=2,g&&typeof g=="function")g.call(this,this.context);else switch(this.shape){case f.Circle:this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break;case f.Square:this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break;case f.Strip:this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h)}this.context.closePath(),this.context.restore()}}])&&x(i.prototype,o),n}();function S(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}var ct=function n(i,o){var r=this;(function(u,l){if(!(u instanceof l))throw new TypeError("Cannot call a class as a function")})(this,n),S(this,"canvas",void 0),S(this,"context",void 0),S(this,"getOptions",void 0),S(this,"x",0),S(this,"y",0),S(this,"w",0),S(this,"h",0),S(this,"lastNumberOfPieces",0),S(this,"tweenInitTime",Date.now()),S(this,"particles",[]),S(this,"particlesGenerated",0),S(this,"removeParticleAt",function(u){r.particles.splice(u,1)}),S(this,"getParticle",function(){var u=h(r.x,r.w+r.x),l=h(r.y,r.h+r.y);return new st(r.context,r.getOptions,u,l)}),S(this,"animate",function(){var u=r.canvas,l=r.context,y=r.particlesGenerated,g=r.lastNumberOfPieces,m=r.getOptions(),D=m.run,M=m.recycle,C=m.numberOfPieces,W=m.debug,L=m.tweenFunction,U=m.tweenDuration;if(!D)return!1;var z=r.particles.length,A=M?z:y,V=Date.now();if(A<C){g!==C&&(r.tweenInitTime=V,r.lastNumberOfPieces=C);for(var nt=r.tweenInitTime,bt=L(V-nt>U?U:Math.max(0,V-nt),A,C,U),rt=Math.round(bt-A),it=0;it<rt;it++)r.particles.push(r.getParticle());r.particlesGenerated+=rt}return W&&(l.font="12px sans-serif",l.fillStyle="#333",l.textAlign="right",l.fillText("Particles: ".concat(z),u.width-10,u.height-20)),r.particles.forEach(function(N,ot){N.update(),(N.y>u.height||N.y<-100||N.x>u.width+100||N.x<-100)&&(M&&A<=C?r.particles[ot]=r.getParticle():r.removeParticleAt(ot))}),z>0||A<C}),this.canvas=i;var d=this.canvas.getContext("2d");if(!d)throw new Error("Could not get canvas context");this.context=d,this.getOptions=o};function H(n,i){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);i&&(r=r.filter(function(d){return Object.getOwnPropertyDescriptor(n,d).enumerable})),o.push.apply(o,r)}return o}function F(n){for(var i=1;i<arguments.length;i++){var o=arguments[i]!=null?arguments[i]:{};i%2?H(Object(o),!0).forEach(function(r){E(n,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):H(Object(o)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(o,r))})}return n}function ut(n,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function E(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}var _={width:typeof window<"u"?window.innerWidth:300,height:typeof window<"u"?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:s.a.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0},ft=function(){function n(r,d){var u=this;(function(y,g){if(!(y instanceof g))throw new TypeError("Cannot call a class as a function")})(this,n),E(this,"canvas",void 0),E(this,"context",void 0),E(this,"_options",void 0),E(this,"generator",void 0),E(this,"rafId",void 0),E(this,"setOptionsWithDefaults",function(y){var g={confettiSource:{x:0,y:0,w:u.canvas.width,h:0}};u._options=F(F(F({},g),_),y),Object.assign(u,y.confettiSource)}),E(this,"update",function(){var y=u.options,g=y.run,m=y.onConfettiComplete,D=u.canvas,M=u.context;g&&(M.fillStyle="white",M.clearRect(0,0,D.width,D.height)),u.generator.animate()?u.rafId=requestAnimationFrame(u.update):(m&&typeof m=="function"&&u.generator.particlesGenerated>0&&m.call(u,u),u._options.run=!1)}),E(this,"reset",function(){u.generator&&u.generator.particlesGenerated>0&&(u.generator.particlesGenerated=0,u.generator.particles=[],u.generator.lastNumberOfPieces=0)}),E(this,"stop",function(){u.options={run:!1},u.rafId&&(cancelAnimationFrame(u.rafId),u.rafId=void 0)}),this.canvas=r;var l=this.canvas.getContext("2d");if(!l)throw new Error("Could not get canvas context");this.context=l,this.generator=new ct(this.canvas,function(){return u.options}),this.options=d,this.update()}var i,o;return i=n,(o=[{key:"options",get:function(){return this._options},set:function(r){var d=this._options&&this._options.run,u=this._options&&this._options.recycle;this.setOptionsWithDefaults(r),this.generator&&(Object.assign(this.generator,this.options.confettiSource),typeof r.recycle=="boolean"&&r.recycle&&u===!1&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),typeof r.run=="boolean"&&r.run&&d===!1&&this.update()}}])&&ut(i.prototype,o),n}();function lt(n){return function(i){if(Array.isArray(i))return B(i)}(n)||function(i){if(typeof Symbol<"u"&&Symbol.iterator in Object(i))return Array.from(i)}(n)||Z(n)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function $(n){return($=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(i){return typeof i}:function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i})(n)}function T(){return(T=Object.assign||function(n){for(var i=1;i<arguments.length;i++){var o=arguments[i];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n[r]=o[r])}return n}).apply(this,arguments)}function J(n,i){var o=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);i&&(r=r.filter(function(d){return Object.getOwnPropertyDescriptor(n,d).enumerable})),o.push.apply(o,r)}return o}function K(n){for(var i=1;i<arguments.length;i++){var o=arguments[i]!=null?arguments[i]:{};i%2?J(Object(o),!0).forEach(function(r){k(n,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):J(Object(o)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(o,r))})}return n}function ht(n,i){return function(o){if(Array.isArray(o))return o}(n)||function(o,r){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(o)))){var d=[],u=!0,l=!1,y=void 0;try{for(var g,m=o[Symbol.iterator]();!(u=(g=m.next()).done)&&(d.push(g.value),!r||d.length!==r);u=!0);}catch(D){l=!0,y=D}finally{try{u||m.return==null||m.return()}finally{if(l)throw y}}return d}}(n,i)||Z(n,i)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function Z(n,i){if(n){if(typeof n=="string")return B(n,i);var o=Object.prototype.toString.call(n).slice(8,-1);return o==="Object"&&n.constructor&&(o=n.constructor.name),o==="Map"||o==="Set"?Array.from(n):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?B(n,i):void 0}}function B(n,i){(i==null||i>n.length)&&(i=n.length);for(var o=0,r=new Array(i);o<i;o++)r[o]=n[o];return r}function pt(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}function vt(n,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function tt(n,i){return(tt=Object.setPrototypeOf||function(o,r){return o.__proto__=r,o})(n,i)}function dt(n){var i=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}();return function(){var o,r=q(n);if(i){var d=q(this).constructor;o=Reflect.construct(r,arguments,d)}else o=r.apply(this,arguments);return yt(this,o)}}function yt(n,i){return!i||$(i)!=="object"&&typeof i!="function"?Q(n):i}function Q(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function q(n){return(q=Object.setPrototypeOf?Object.getPrototypeOf:function(i){return i.__proto__||Object.getPrototypeOf(i)})(n)}function k(n,i,o){return i in n?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,n}var mt=c.a.createRef(),Y=function(n){(function(u,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function");u.prototype=Object.create(l&&l.prototype,{constructor:{value:u,writable:!0,configurable:!0}}),l&&tt(u,l)})(d,n);var i,o,r=dt(d);function d(u){var l;pt(this,d);for(var y=arguments.length,g=new Array(y>1?y-1:0),m=1;m<y;m++)g[m-1]=arguments[m];return k(Q(l=r.call.apply(r,[this,u].concat(g))),"canvas",c.a.createRef()),k(Q(l),"confetti",void 0),l.canvas=u.canvasRef||mt,l}return i=d,(o=[{key:"componentDidMount",value:function(){if(this.canvas.current){var u=G(this.props)[0];this.confetti=new ft(this.canvas.current,u)}}},{key:"componentDidUpdate",value:function(){var u=G(this.props)[0];this.confetti&&(this.confetti.options=u)}},{key:"componentWillUnmount",value:function(){this.confetti&&this.confetti.stop(),this.confetti=void 0}},{key:"render",value:function(){var u=ht(G(this.props),2),l=u[0],y=u[1],g=K({zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0},y.style);return c.a.createElement("canvas",T({width:l.width,height:l.height,ref:this.canvas},y,{style:g}))}}])&&vt(i.prototype,o),d}(e.Component);function G(n){var i={},o={},r=[].concat(lt(Object.keys(_)),["confettiSource","drawShape","onConfettiComplete"]),d=["canvasRef"];for(var u in n){var l=n[u];r.includes(u)?i[u]=l:d.includes(u)?d[u]=l:o[u]=l}return[i,o,{}]}k(Y,"defaultProps",K({},_)),k(Y,"displayName","ReactConfetti");var et=c.a.forwardRef(function(n,i){return c.a.createElement(Y,T({canvasRef:i},n))});j.default=et}]).default})})(at);var Ct=at.exports;const Et=wt(Ct),Rt=()=>{const{width:b,height:w}=Mt();return I.jsxs(I.Fragment,{children:[I.jsx(Et,{width:b,height:w}),I.jsx("div",{className:"bg-card-pattern flex justify-center items-center min-h-screen",children:I.jsx("div",{className:"backdrop-blur-sm p-8 w-full flex flex-col justify-center items-center h-screen pb-20",children:I.jsxs("div",{className:"bg-primary-50 p-8 rounded-lg shadow-md w-full my-2 max-w-md animate-fade-up animate-duration-[3000ms] animate-once",children:[I.jsx("img",{className:"w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once",src:Ot}),I.jsx("p",{className:"my-4 text-2xl font-semibold text-primary-950",children:"Thank You!"}),I.jsxs("div",{className:"bg-white px-2 py-4 rounded-lg text-primary-950",children:[I.jsx("p",{className:"mb-2",children:"Thank you for choosing LOLC credit card service. Your details have been successfully saved. "}),I.jsx("p",{children:"We will review your information and get back to you within 3 business days."})]}),I.jsxs("p",{className:"mt-4 text-primary-950",children:["FOR INQUIRIES ",I.jsx("a",{href:"tel:+9411571888",children:"+94 (11) 571 8888"})]})]})})})]})};export{Rt as default};