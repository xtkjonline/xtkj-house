export default {

    namespaced: true,
    state: {
        Aname: 'xtkjjtfirst'
    },
    mutations: {
        chengeAname(state, payload) {
            state.Aname = payload
        }
    },
    getters: {
        getxtkjA(state) {
            return state.Aname.substr(0, 4)
        }
    },
    actions: {
        changeAgetxtkj(context, payload) {
            // console.log(context);
            setTimeout(() => {
                context.commit('chengeAname', payload)
            }, 2000);
        }
    }

}