// let defaultOptions = {}
const PopupMenu = {
  name: 'hhf-plugins-popup',
  props: ['go'],
  methods: {
    add () {

    },
    remove () {

    }
  },
  render (h, context) {
    console.log(this)
    return (
      <div class="hhf-plugins-popup">{this.$slots.default}</div>
    )
  }
}
// Popup.createInstance = (properties, parentDom) => {
//   const Instance = new Vue({...Popup})
//     const component = Instance.$mount();
//     let parentDom = parentDom || document.body
//     parentDom.appendChild(component.$el);
//     const pp = Instance.$children[0];
//     return {
//       add () {
//         pp.add()
//       },
//       remove () {

//       }
//     }
// }
export default PopupMenu
