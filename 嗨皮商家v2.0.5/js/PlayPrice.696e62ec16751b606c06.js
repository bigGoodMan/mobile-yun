(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["PlayPrice"],{"24b0":function(t,e,i){},"466d":function(t,e,i){"use strict";var n=i("d784"),l=i("825a"),a=i("50c4"),s=i("1d80"),r=i("8aa5"),o=i("14c3");n("match",1,(function(t,e,i){return[function(e){var i=s(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,i):new RegExp(e)[t](String(i))},function(t){var n=i(e,t,this);if(n.done)return n.value;var s=l(t),c=String(this);if(!s.global)return o(s,c);var u=s.unicode;s.lastIndex=0;var d,f=[],p=0;while(null!==(d=o(s,c))){var h=String(d[0]);f[p]=h,""===h&&(s.lastIndex=r(c,a(s.lastIndex),u)),p++}return 0===p?null:f}]}))},"93ff":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"play-price"},[i("div",{staticClass:"padding-20-30"},[i("div",{staticClass:"bgcolor-f radius-10"},[i("div",{staticClass:"padding-20-30"},[i("HhfInput",{staticClass:"color-input",attrs:{title:"游玩单价（币）：",type:"tel",position:"left",placeholder:"会员价（默认）"},scopedSlots:t._u([{key:"suffix",fn:function(){return[i("span",{staticClass:"size-28 color-7"},[t._v("会员价（默认）")])]},proxy:!0}]),model:{value:t.coinsSell,callback:function(e){t.coinsSell=e},expression:"coinsSell"}})],1),i("div",{staticClass:"border border-ebedf0"}),i("div",{staticClass:"padding-20-30"},[i("HhfInput",{staticClass:"color-input",attrs:{title:"游玩单价（币）：",type:"tel",position:"left",placeholder:"非会员价"},scopedSlots:t._u([{key:"suffix",fn:function(){return[i("span",{staticClass:"size-28 color-7"},[t._v("非会员价")])]},proxy:!0}]),model:{value:t.coinSellVip,callback:function(e){t.coinSellVip=e},expression:"coinSellVip"}})],1)]),t._m(0)]),i("div",{staticClass:"size-0 padding-20-30"},[i("van-button",{attrs:{size:"large",loading:t.loading,type:"info"},on:{click:t.handleSaveClick}},[t._v("保存")])],1)])},l=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"no-ul size-22 color-7"},[i("li",{staticClass:"padding-10-0"},[t._v("会员/非会员：嗨皮主板")]),i("li",{staticClass:"padding-10-0"},[t._v(" 正常充值嗨币、购买小票的默认设置会员价（不使用神采消费卡） ")]),i("li",{staticClass:"padding-10-0"},[t._v("使用神采消费卡区分：会员/非会员价格")])])}],a=i("5530"),s=i("2f62"),r=i("b02d"),o=i("d50b"),c={name:"PlayPrice",components:{HhfInput:r["a"]},data:function(){return{coinsSell:"",coinSellVip:"",loading:!1}},computed:Object(a["a"])({},Object(s["d"])({coins_sell:function(t){return t.machine.coins_sell},machine_id:function(t){return t.machine.machine_id},coins_sell_vip:function(t){return t.machine.coins_sell_vip}})),watch:{coins_sell:{handler:function(t){this.coinsSell=t},immediate:!0},coins_sell_vip:{handler:function(t){this.coinSellVip=t},immediate:!0}},created:function(){if(!this.machine_id){var t=this.$route.query.mid;this.$router.push({name:"machine_detail",query:{mid:t}})}},methods:Object(a["a"])(Object(a["a"])({},Object(s["b"])(["MACHINE_SAVEPLAYPRICE_ACTION"])),{},{handleSaveClick:function(){if(!Object(o["c"])(this.coinsSell)||this.coinsSell<1||this.coinsSell>99)this.$Tip.warning("游玩单价需在1~99区间内");else{this.loading=!0;var t=this;this.MACHINE_SAVEPLAYPRICE_ACTION({machineId:this.machine_id,coinsSell:this.coinsSell,coinSellVip:this.coinSellVip}).then((function(e){t.loading=!1,"0"!==e.return_code?"0"!==e.return_code&&t.$Tip.warning(e.msg):t.$dialog.alert({message:"游玩单价设置成功，手动重启机台后生效"}).then((function(){t.$router.push({name:"machine_detail",query:{mid:t.$route.query.mid}})}))}))}}})},u=c,d=(i("f6d2"),i("2877")),f=Object(d["a"])(u,n,l,!1,null,null,null);e["default"]=f.exports},a992:function(t,e,i){},adb4:function(t,e,i){"use strict";var n=i("24b0"),l=i.n(n);l.a},b02d:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"hhf-input"},[i("div",{staticClass:"flex-row flex-between-center"},[i("div",{staticClass:"hhf-input-left"},[t._t("start"),i("div",{staticClass:"size-28 color-3 hhf-input-left-title"},[t._v(" "+t._s(t.$slots["title"]?null:t.title)+" "),t._t("title")],2)],2),i("div",{staticClass:"hhf-input-right"},[i("div",{class:["hhf-input-content size-28",t.width?null:"flex-1",t.border?"border":null],style:t.getInputStyle},[t.$slots["content"]?t._t("content"):i("input",{class:["hhf-input-entry",t.inputClass],style:{"text-align":t.position},attrs:{maxlength:t.maxlength,type:t.type,placeholder:t.placeholder},domProps:{value:t.value},on:{input:function(e){return t.$emit("trigger-input",e.target.value)},focus:t.handleFocus,blur:function(e){return t.$emit("trigger-blur",e.target.value)}}})],2),[t.suffix?i("span",{staticClass:"size-28 color-3 padding-left-10"},[t._v(t._s(t.suffix))]):t._e(),t._t("suffix")]],2)]),[void 0!==t.errorText?i("div",{staticClass:"color-error size-20 height-err",style:t.errorStyle},[t._v(" "+t._s(t.errorText)+" ")]):t._e(),t._t("end")]],2)},l=[],a=(i("99af"),i("caad"),i("a9e3"),i("5530")),s=i("53ca"),r={name:"HhfInput",components:{},model:{prop:"value",event:"trigger-input"},props:{value:{default:""},placeholder:String,position:{default:"right",type:String},leftIcon:{default:"",type:String},rightIcon:{default:"",type:String},suffix:{type:String,default:""},title:{default:"",type:String},width:{type:String},border:{type:Boolean,default:!1},inputStyle:{type:String||Object,default:""},errorStyle:{type:String||Object,default:""},errorText:{type:String},inputClass:[String,Array],maxlength:Number,type:{default:"text",type:String,validator:function(t){return["text","number","tel"].includes(t)}}},data:function(){return{}},computed:{getInputStyle:function(){if("string"===typeof this.inputStyle){var t=this.width?"width:".concat(this.width,";"):"";return"".concat(this.inputStyle).concat(t)}return"object"===Object(s["a"])(this.inputStyle)?Object(a["a"])(Object(a["a"])({},this.inputStyle),{},{width:this.width}):{width:this.width}}},mounted:function(){},methods:{handleFocus:function(t){if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&!/(Win32)/i.test(navigator.platform)){var e=t.target;e.setSelectionRange&&e.setSelectionRange(e.value.length,e.value.length)}}}},o=r,c=(i("adb4"),i("2877")),u=Object(c["a"])(o,n,l,!1,null,null,null),d=u.exports;e["a"]=d},d50b:function(t,e,i){"use strict";i.d(e,"c",(function(){return n})),i.d(e,"b",(function(){return l})),i.d(e,"a",(function(){return a}));i("99af"),i("4de4"),i("caad"),i("fb6a"),i("d3b7"),i("ac1f"),i("25f0"),i("2532"),i("466d"),i("2909");function n(t){return/^[0-9]+$/.test(t)}function l(t,e){e=e||document.documentElement||document.body;var i=t.offsetParent,n=t.offsetTop;return i===e||null===i?n:n+l(i,e)}function a(t){var e,i,n,l=t.callback,a=t.wait,s=void 0===a?200:a,r=t.immediate,o=void 0!==r&&r,c=function(){return setTimeout((function(){i=null,l.apply(n,e),n=e=null}),s)};return function(){e=arguments,n=this,!i&&o?(i=c(),l.apply(n,e),n=e=null):(clearTimeout(i),i=c())}}},f6d2:function(t,e,i){"use strict";var n=i("a992"),l=i.n(n);l.a}}]);