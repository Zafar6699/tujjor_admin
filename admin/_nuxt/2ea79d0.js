(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{649:function(e,t,l){"use strict";l.r(t);var c={name:"child",props:{category:{type:Array}},data:function(){return{isDisabled:!1,categoryModel:[]}},methods:{changeSelect:function(){this.$store.commit("CATEGORY_BRAND",this.categoryModel)}}},o=l(10),n=l(78),r=l.n(n),d=l(513),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"col-3"},[l("v-select",{attrs:{items:e.category,"item-text":"name.uz",label:"Kатегория","return-object":"",outlined:"",dense:"",disabled:e.isDisabled},on:{change:e.changeSelect},model:{value:e.categoryModel,callback:function(t){e.categoryModel=t},expression:"categoryModel"}}),e._v(" "),null!=e.categoryModel.children&&e.categoryModel.children.length>0?l("child",{attrs:{category:e.categoryModel.children}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;r()(component,{VSelect:d.a})}}]);