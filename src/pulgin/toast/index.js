import  ToastDev from "./Toast"

const toast = {
    install (Vue){
        const ToastContructor = Vue.extend(ToastDev)
        const vm = new ToastContructor()
        vm.$mount(document.createElement('div'))
        document.body.appendChild(vm.$el)

        Vue.prototype.$showToast = function (message = '',mask = true,duration = 1500){
            if(message !== ''){
                vm.visible = true
                vm.mask = mask
                vm.message = message
                setTimeout(()=>{
                    vm.visible = false
                    vm.mask = false
                    vm.message = ''
                },duration)
            }
        }

        // Vue.prototype.$hideLoading = function (){
        //     vm.show = false
        //     vm.mask = false
        // }
    }
}

export default toast