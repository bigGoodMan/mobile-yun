(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CommandStrongGrasp"],{"0397":function(t,e,n){},"048b":function(t,e,n){"use strict";var a=n("40ec"),i=n.n(a);i.a},"097b":function(t,e,n){"use strict";var a=n("21f1"),i=n.n(a);i.a},"0c46":function(t,e,n){"use strict";var a=n("d8db"),i=n.n(a);i.a},"1cf7":function(t,e,n){"use strict";var a=n("0397"),i=n.n(a);i.a},"21f1":function(t,e,n){},"3baa":function(t,e,n){"use strict";n.r(e);var a,i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"command-strong-grasp"},[n("div",{staticClass:"header bgcolor-f"},[n("MyStore",{attrs:{"store-id":t.storeId},on:{"trigger-click":t.handleConfirm}},[n("div",{staticClass:"flex-row flex-end-center flex-1"},[n("van-icon",{attrs:{name:"question-o",size:"0.4rem"},on:{click:t.handleRouter}})],1)])],1),n("div",{staticClass:"bgcolor-f content"},[n("h5",{staticClass:"margin-0 padding-20-30 size-30"},[t._v("我的机台")]),n("div",{staticClass:"border"}),n("MyArea",{attrs:{"store-id":t.storeId},model:{value:t.area,callback:function(e){t.area=e},expression:"area"}}),n("div",{staticClass:"border"}),n("MyMachine",{attrs:{"store-id":t.storeId,"area-id":t.area.id},model:{value:t.machine,callback:function(e){t.machine=e},expression:"machine"}})],1),t.machine.id?n("div",{staticClass:"fixed-max-width bottom-0"},[n("p",{staticClass:"size-28 command-strong-grasp-tip"},[t._v(" 下发强抓不可撤销，点击【确认下发】立即下发强抓，若需要保持强抓至出货，请勾选【保持强抓】。 ")]),n("div",{staticClass:"size-28 text-center weight-bold flex-row flex-center margin-bottom-20"},[n("van-checkbox",{model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("保持强抓至出货")])],1),n("div",{staticClass:"text-center"},[n("HhfButton",{attrs:{loading:t.loading,type:"info",size:"large"},on:{"trigger-click":t.handleCommand}},[t._v("下发强抓")])],1)]):t._e()])},s=[],r=n("a8aa"),c=n("f059"),l=n("492f"),d=n("de0f"),u={model:{prop:"checked",event:"trigger-input"},props:{checked:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data:function(){return{isChecked:this.checked}},methods:{handeChange:function(t){this.$emit("trigger-change",t,this)}},render:function(){var t=this,e=arguments[0],n=this.isChecked,a=this.disabled;return e("label",{class:"hhf-checkbox"},[e("input",{class:"hhf-checkbox-input",attrs:{type:"checkbox",disabled:a},domProps:{checked:n},on:{change:function(e){return t.handeChange(e,t)}}}),e("span",{class:["hhf-checkbox-content","hhf-iconfont",n?"hhf-icon-ticket":null]}),e("span",{class:"hhf-checkbox-text"},[this.$scopedSlots.default()])])}},h=u,f=(n("0c46"),n("2877")),m=Object(f["a"])(h,a,i,!1,null,null,null),g=m.exports,p=g,b=n("365c"),v={name:"CommandStrongGrasp",components:{MyStore:r["a"],MyArea:c["a"],MyMachine:l["a"],HhfButton:d["a"]},data:function(){return{loading:!1,checked:!1,areaColumns:[],storeId:null,area:{},machine:{},result:["a"],machineColumns:[]}},computed:{},created:function(){var t=this.$route.query,e=t.sid,n=t.mid,a=t.aid;e&&(this.storeId=e),e&&a&&(this.area.id=a),e&&a&&n&&(this.machine.id=n)},mounted:function(){},methods:{handleConfirm:function(t){this.storeId=t.value.store_id},handleRouter:function(){},handleChoseMachine:function(){},handleChoseArea:function(){},changeCheckBox:function(t,e){this.checked=e.isChecked=!e.isChecked},handleCommand:function(){var t=this,e=this.$createElement,n=this;this.$Confirm({message:"下发强抓不可撤销，立即下发",mask:!0,descrition:e(p,{on:{"trigger-change":this.changeCheckBox},model:{value:t.checked,callback:function(e){t.checked=e}}},["保持强抓出货"]),confirm:function(t){n.handleSure(t)},cancel:function(){}})},handleSure:function(t){var e=this;this.loading=!0,this.$Loading("下发抢抓中"),Object(b["f"])({machine_id:this.machine.id,type:this.checked?5:7}).then((function(n){e.$Loading.clear(),e.loading=!1,"0"===n.return_code?(e.$Confirm.clear(t),e.$Tip({type:"success",message:n.msg,mask:!0})):n.return_code?e.$Tip({type:"warning",message:n.msg,mask:!0}):e.$Tip({type:"error",message:n.msg,mask:!0})}))}}},C=v,x=(n("1cf7"),Object(f["a"])(C,o,s,!1,null,"7990eeb1",null));e["default"]=x.exports},"40ec":function(t,e,n){},"48d0":function(t,e,n){"use strict";var a=n("9d6c"),i=n.n(a);i.a},"492f":function(t,e,n){"use strict";n("caad"),n("a9e3");var a,i,o=n("5530"),s=n("5cc0"),r=n("2f62"),c={name:"MyMachine",components:{LinkageSelection:s["a"]},model:{prop:"value",event:"trigger-change"},props:{storeId:[String,Number],areaId:[String,Number],value:{default:function(){return{}}},title:{type:String,default:"请选择机台"},type:{type:String,default:"MACHINE",validator:function(t){return["MACHINE","MACHINE_TYPE"].includes(t)}},rightIcon:{type:String,default:"arrow"},columns:Array},data:function(){return{list:[]}},watch:{areaId:{handler:function(t){var e=this.storeId,n=this.type;if(e&&t){var a={storeId:e,areaId:t};if("MACHINE_TYPE"===n)return void this.COMMON_GETMACHINETYPE_ACTION(a).then(this.handleReturnDeal);this.COMMON_GETMACHINE_ACTION(a).then(this.handleReturnDeal)}else this.list=[],this.$emit("trigger-change",{})},immediate:!0}},methods:Object(o["a"])(Object(o["a"])({},Object(r["b"])(["COMMON_GETMACHINE_ACTION","COMMON_GETMACHINETYPE_ACTION"])),{},{handleChoseMachine:function(t){this.$emit("trigger-change",t.value)},handleReturnDeal:function(t){if("0"===t.return_code){var e=t.data;this.list=e,this.$emit("trigger-change",{})}}}),render:function(){for(var t,e=arguments[0],n=this.value,a=this.list,i=this.handleChoseMachine,o=this.title,r=this.rightIcon,c=0,l=0;l<a.length;++l)if(a[l].id===n.id){t=a[l].no,c=l;break}return e(s["a"],{attrs:{"right-icon":r,title:o,value:t,columns:a,"default-index":c},on:{"trigger-confirm":i}})}},l=c,d=n("2877"),u=Object(d["a"])(l,a,i,!1,null,null,null),h=u.exports;e["a"]=h},5594:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bottom-popup"},[n("van-popup",{attrs:{position:"bottom","close-on-click-overlay":t.maskClose,overlay:t.overlay},on:{"click-overlay":t.handleClose},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("van-picker",{attrs:{"show-toolbar":"",columns:t.columns,"default-index":t.defaultIndex},on:{change:t.handleChange,cancel:t.handleCancel,confirm:t.handleConfirm}})],1)],1)},i=[],o=(n("a9e3"),{name:"BottomPopup",components:{},props:{maskClose:{type:Boolean,default:!1},columns:{default:function(){return[]},type:Array},overlay:{default:!0,type:Boolean},show:{default:!1,type:Boolean},defaultIndex:Number},data:function(){return{loading:!0}},computed:{},watch:{columns:{handler:function(){this.loading=!1}}},mounted:function(){},methods:{handleCancel:function(){this.$emit("trigger-cancel"),this.handleClose()},handleConfirm:function(t,e){this.$emit("trigger-confirm",{value:t,index:e}),this.handleClose()},handleClose:function(){this.$emit("trigger-close")},handleChange:function(){}}}),s=o,r=n("2877"),c=Object(r["a"])(s,a,i,!1,null,"2f72655a",null),l=c.exports;e["a"]=l},"5cc0":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("CellList",{attrs:{title:t.title,value:t.value,"right-icon":t.rightIcon,placeholder:t.placeholder},on:{"trigger-click":function(e){t.show=!0}},scopedSlots:t._u([t.$slots.title?{key:"title",fn:function(){return[t._t("title")]},proxy:!0}:null,t.$slots["right-icon"]?{key:"right-icon",fn:function(){return[t._t("right-icon")]},proxy:!0}:null],null,!0)}),n("BottomPopup",{attrs:{columns:t.columns,"default-index":t.defaultIndex,show:t.show},on:{"trigger-confirm":t.handleConfirm,"trigger-close":function(e){t.show=!1}}})],1)},i=[],o=(n("a9e3"),n("a5ab")),s=n("5594"),r={name:"LinkageSelection",components:{CellList:o["a"],BottomPopup:s["a"]},model:{prop:"value",event:"trigger-confirm"},props:{value:{default:""},defaultIndex:Number,disabled:{type:Boolean,default:!1},title:String,placeholder:String,columns:Array,rightIcon:{type:String}},data:function(){return{show:!1}},computed:{},mounted:function(){},methods:{handleConfirm:function(t){this.disabled||this.$emit("trigger-confirm",t)}}},c=r,l=n("2877"),d=Object(l["a"])(c,a,i,!1,null,"673b6974",null),u=d.exports;e["a"]=u},"9d6c":function(t,e,n){},a5ab:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cell-list flex-row flex-between-center padding-20-30",on:{click:t.handleClick}},[n("div",{staticClass:"cell-list-title size-28 color-3"},[t._v(" "+t._s(t.$slots["title"]?null:t.title)+" "),t._t("title")],2),n("div",{staticClass:"size-28 flex-row flex-start-center"},[t.value?n("span",[t._v(t._s(t.value))]):n("span",{staticClass:"cell-list-placeholder"},[t._v(t._s(t.placeholder))]),t.rightIcon?n("van-icon",{staticClass:"flex-row flex-center margin-left-10 size-32",attrs:{color:"#969799",name:t.rightIcon}}):t._e(),t._t("rigth-icon")],2)])},i=[],o={name:"CellList",components:{},props:{title:String,value:String,placeholder:String,leftIcon:{type:Boolean,default:!1},rightIcon:{type:String}},data:function(){return{}},computed:{},mounted:function(){},methods:{handleClick:function(t){this.$emit("trigger-click",t)}}},s=o,r=(n("097b"),n("2877")),c=Object(r["a"])(s,a,i,!1,null,null,null),l=c.exports;e["a"]=l},a8aa:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-store"},[n("div",{staticClass:"my-store-container size-32 flex-row flex-start-center"},[n("div",{on:{click:t.handleClick}},[n("span",{staticClass:"my-store-name color-393D49"},[t._v(t._s(t.store.store_name))]),n("van-icon",{staticClass:"color-de",attrs:{name:t.arrow}})],1),t._t("default")],2),n("div",{staticClass:"border"}),n("div",[n("BottomPopup",{attrs:{columns:t.columns,"default-index":t.selectIndex,show:t.show},on:{"trigger-confirm":t.handleConfirm,"trigger-close":t.handleClose}})],1)])},i=[],o=(n("4de4"),n("d81d"),n("a9e3"),n("5530")),s=n("5594"),r=n("2f62"),c={name:"MyStore",components:{BottomPopup:s["a"]},props:{open:{default:!1,type:Boolean},defaultIndex:Number,storeId:[String,Number]},data:function(){return{show:!1,store:{store_name:"请选择门店"},selectIndex:null}},computed:Object(o["a"])(Object(o["a"])({},Object(r["d"])({storeList:function(t){return t.common.storeList}})),{},{columns:{get:function(){var t=this.storeList;return t.map((function(t){var e=Object(o["a"])({text:t.store_name},t);return e}))}},arrow:function(){return this.show?"arrow-up":"arrow-down"}}),watch:{storeList:{handler:function(t){var e=this.storeId,n=this.defaultIndex;if(t.length>0){if(e&&e>=0){var a=t.map((function(t,e){return Object(o["a"])(Object(o["a"])({},t),{},{index:e})})).filter((function(t){return t.store_id===String(e)}));if(a.length>0){var i=a[0];this.selectIndex=i.index,this.store=Object(o["a"])({},i)}}else n>=0&&(this.selectIndex=n,this.store=Object(o["a"])({},t[0]));(n>=0||e>=0)&&this.$emit("trigger-click",{value:Object(o["a"])(Object(o["a"])({},this.store),{},{index:this.selectIndex})})}},immediate:!0}},created:function(){0===this.storeList.length&&this.getStore()},methods:Object(o["a"])(Object(o["a"])({},Object(r["b"])(["COMMON_GETSTORE_ACTION"])),{},{handleClick:function(){this.show=!0},handleConfirm:function(t){var e=t.value,n=t.index;this.store=Object(o["a"])({},e),this.$emit("trigger-click",{value:e,index:n})},handleClose:function(){this.show=!1},getStore:function(){var t=this;this.COMMON_GETSTORE_ACTION().then((function(e){"0"!==e.return_code&&t.$Tip.warning(e.msg)}))}})},l=c,d=(n("48d0"),n("2877")),u=Object(d["a"])(l,a,i,!1,null,"de8e6c12",null),h=u.exports;e["a"]=h},b4ee:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{class:t.wrapClasses,style:t.styles,on:{click:t.handleClick}})},i=[],o=(n("99af"),n("b0c0"),n("d3b7"),n("ac1f"),n("25f0"),n("1276"),n("2909")),s={name:"HhfIcon",components:{},props:{classes:[Array,String],styles:Object,name:{type:String,required:!0}},data:function(){return{}},computed:{wrapClasses:function(){var t=["hhf-icon","hhf-iconfont","hhf-icon-".concat(this.name)];if("[object Array]"===Object.prototype.toString.call(this.classes))t=[].concat(Object(o["a"])(t),Object(o["a"])(this.classes));else if("string"===typeof this.classes){var e=this.classes.split(" ");t=[].concat(Object(o["a"])(t),Object(o["a"])(e))}return t}},mounted:function(){},methods:{handleClick:function(){this.$emit("trigger-click")}}},r=s,c=n("2877"),l=Object(c["a"])(r,a,i,!1,null,"0e833f38",null),d=l.exports;e["a"]=d},d8db:function(t,e,n){},de0f:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["size-0",t.getBottomZIndexCls]},[n("div",{class:t.wrapClasses,style:t.wrapStyles,on:{click:t.handleClick}},[n("div",{staticClass:"hhf-button-container flex-row flex-center"},[!t.$slots.loading&&t.loading?[n("div",{staticClass:"hhf-button-loading-container"},[n("div",{staticClass:"hhf-button-loading-content"},[n("HhfIcon",{attrs:{name:"spinner-loading"}})],1)])]:t.loading?[t._t("loading")]:t._e(),t._t("default")],2)])])},i=[],o=(n("99af"),n("caad"),n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("1276"),n("5530")),s=n("b4ee"),r={name:"",components:{HhfIcon:s["a"]},props:{disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingText:{type:String,default:"加载中…"},text:{type:String,default:"确定"},bottomZIndex:{type:Number},radius:String,activeColor:Object,plain:Boolean,type:{type:String,default:"default",validator:function(t){return["default","primary","success","info","warning","danger"].includes(t)}},size:{type:String,default:"normal",validator:function(t){return["normal","large","small","mini","custom"].includes(t)}},classes:[String,Array],styles:Object},data:function(){return{}},computed:{getBottomZIndexCls:function(){return this.bottomZIndex?"hhf-button-".concat(this.size,"-height"):null},wrapClasses:function(){var t=this.classes,e=this.size,n=this.type,a=this.plain,i=this.loading,o=this.disabled,s=this.bottomZIndex,r=["hhf-button","hhf-button-".concat(n),"hhf-button-".concat(e),s?"hhf-button-".concat(e,"-fixed"):null];if("[object Array]"===Object.prototype.toString.call(t))r=r.concat(t);else if("string"===typeof t){var c=t.split(" ");r=r.concat(c)}return a&&r.push("hhf-button-plain"),i&&r.push("hhf-button-loading"),o&&r.push("hhf-button-disabled"),r},wrapStyles:function(){var t=this.styles,e=this.radius,n=this.bottomZIndex,a=Object(o["a"])(Object(o["a"])({},t),{},{borderRadius:e,zIndex:n});return a}},mounted:function(){},methods:{handleClick:function(){var t=this.loading,e=this.disabled;t||e||this.$emit("trigger-click")}}},c=r,l=(n("048b"),n("2877")),d=Object(l["a"])(c,a,i,!1,null,null,null),u=d.exports;e["a"]=u},f059:function(t,e,n){"use strict";n("b0c0");var a,i,o=n("5530"),s=n("5cc0"),r=n("2f62"),c={name:"MyArea",components:{LinkageSelection:s["a"]},model:{prop:"value",event:"trigger-change"},props:{storeId:String,value:{default:function(){return{}}},title:{type:String,default:"请选择区域"},rightIcon:{type:String,default:"arrow"},columns:Array},data:function(){return{list:[]}},watch:{storeId:{handler:function(t){var e=this;t&&this.COMMON_GETAREA_ACTION({storeId:t}).then((function(t){"0"===t.return_code&&(e.list=t.data,e.$emit("trigger-change",{}))}))},immediate:!0}},methods:Object(o["a"])(Object(o["a"])({},Object(r["b"])(["COMMON_GETAREA_ACTION"])),{},{handleChoseArea:function(t){this.$emit("trigger-change",t.value)}}),render:function(){for(var t,e=arguments[0],n=this.value,a=this.list,i=this.handleChoseArea,o=this.title,r=this.rightIcon,c=0,l=0;l<a.length;++l)if(a[l].id===n.id){t=a[l].name,c=l;break}return e(s["a"],{attrs:{"right-icon":r,title:o,value:t,columns:a,"default-index":c},on:{"trigger-confirm":i}})}},l=c,d=n("2877"),u=Object(d["a"])(l,a,i,!1,null,"1953f11e",null),h=u.exports;e["a"]=h}}]);