import axios from "axios"


const pupil = {
  state: ()=>({
    pupil: {},
    pupils: []
  }),
  getters: {
    pupil(state){
      return state.pupil
    },
    pupils(state){
      return state.pupils
    }
  },
  mutations: {
    pupil(state, payload){
      state.pupil = payload
    },
    pupils(state, payload){
      state.pupils = payload
    },
    addpupil(state, payload){
      state.pupils.push(payload)
    },
    savepupil(state, payload){
      state.pupils = state.pupils.map(pupil => {
        if(pupil._id == payload._id){
          return payload
        }
        return pupil
      })
    },
    delpupil(state, payload){
      state.pupils = state.pupils.filter(pupil => {
        if(pupil._id == payload){
          return false
        }
        return pupil
      })
    }
  },
  actions: {
    getPupils(context){
      axios.get(`${context.getters.url}/pupil`)
      .then(res => {
        if(res.status === 200){
          context.commit('pupils', res.data)
        }
      })
    },
    getPupil(context, payload){
      axios.get(`${context.getters.url}/pupil/edit/${payload}`)
      .then(res => {
        if(res.status === 200) {
          context.commit('pupil', res.data)
        }
      })
    },
    addPupil(context, payload){
      axios.post(`${context.getters.url}/pupil/create`, payload)
      .then(res => {
        if(res.status === 200){
          res.data.group = context.getters.groups.find(item => item._id == res.data.group)
          context.commit('addpupil', res.data)
        }
      })
    },
    savePupil(context, payload){
      axios.post(`${context.getters.url}/pupil/save/${payload._id}`, payload)
      .then(res => {
        if(res.status === 200) {
          context.commit('savepupil', payload)
        }
      })
    },
    delPupil(context, payload){
      axios.delete(`${context.getters.url}/pupil/delete/${payload}`)
      .then(res => {
        if(res.status === 200){
          context.commit('delpupil', payload)
          context.getters.payments.forEach(item => {
            if(item.pupil._id == payload){
              context.dispatch('delPayment', item._id)
            }
          })
        }
      })
    }
  }
}

export default pupil