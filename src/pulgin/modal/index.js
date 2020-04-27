import  ModalDev from "./Modal"

const Modal = {
    install (Vue){
        const ModalContructor = Vue.extend(ModalDev)
        const vm = new ModalContructor()
        vm.$mount(document.createElement('div'))
        document.body.appendChild(vm.$el)

        Vue.prototype.$showModal = function ({title = '',content = '', btn =['确定','取消'],success=null}){
            if(title === ''&& content === ''){
                return
            }
            vm.visible = true
            vm.title = title
            vm.content = content
            vm.btn = btn

            vm.$on('modal',function(result){
                success && success(result)
            })
        }

        // Vue.prototype.$hideModal = function (){
        //     vm.show = false
        //     vm.mask = false
        // }
    }
}

export default Modal