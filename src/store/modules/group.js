import axios from "axios"


const group = {
  state: ()=>({
    group: {},
    groups: []
  }),
  getters: {
    group(state){
      return state.group
    },
    groups(state){
      return state.groups
    }
  },
  mutations: {
    group(state, payload){
      state.group = payload
    },
    groups(state, payload){
      state.groups = payload
    },
    addgroup(state, payload){
      state.groups.push(payload)
    },
    savegroup(state, payload){
      state.groups = state.groups.map(group => {
        if(group._id == payload._id){
          return payload
        }
        return group
      })
    },
    delgroup(state, payload){
      state.groups = state.groups.filter(group => {
        if(group._id == payload){
          return false
        }
        return group
      })
    }
  },
  actions: {
    getGroups(context){
      axios.get(`${context.getters.url}/group`)
      .then(res => {
        if(res.status === 200){
          context.commit('groups', res.data)
        }
      })
    },
    getGroup(context, payload){
      axios.get(`${context.getters.url}/group/edit/${payload}`)
      .then(res => {
        if(res.status === 200) {
          context.commit('group', res.data)
        }
      })
    },
    addGroup(context, payload){
      axios.post(`${context.getters.url}/group/create`, payload)
      .then(res => {
        if(res.status === 200){
          context.commit('addgroup', res.data)
        }
      })
    },
    saveGroup(context, payload){
      axios.post(`${context.getters.url}/group/save/${payload._id}`, payload)
      .then(res => {
        if(res.status === 200) {
          context.commit('savegroup', payload)
        }
      })
    },
    delGroup(context, payload){
      axios.delete(`${context.getters.url}/group/delete/${payload}`)
      .then(res => {
        if(res.status === 200){
          context.commit('delgroup', payload)
          context.getters.pupils.forEach(item => {
            if(item.group._id == payload){
              context.dispatch('delPupil', item._id)
            }
          })
          context.getters.payments.forEach(item => {
            if(item.group._id == payload){
              context.dispatch('delPayment', item._id)
            }
          })
        }
      })
    }
  }
}

export default group