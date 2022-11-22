import axios from "axios"


const spending = {
  state: ()=>({
    spending: {},
    spendings: []
  }),
  getters: {
    spending(state){
      return state.spending
    },
    spendings(state){
      return state.spendings
    }
  },
  mutations: {
    spending(state, payload){
      state.spending = payload
    },
    spendings(state, payload){
      state.spendings = payload
    },
    addspending(state, payload){
      state.spendings.push(payload)
    },
    savespending(state, payload){
      state.spendings = state.spendings.map(spending => {
        if(spending._id == payload._id){
          return payload
        }
        return spending
      })
    },
    delspending(state, payload){
      state.spendings = state.spendings.filter(spending => {
        if(spending._id == payload){
          return false
        }
        return spending
      })
    }
  },
  actions: {
    getSpendings(context){
      axios.get(`${context.getters.url}/spending`)
      .then(res => {
        if(res.status === 200){
          context.commit('spendings', res.data)
        }
      })
    },
    getSpending(context, payload){
      axios.get(`${context.getters.url}/spending/edit/${payload}`)
      .then(res => {
        if(res.status === 200) {
          context.commit('spending', res.data)
        }
      })
    },
    addSpending(context, payload){
      axios.post(`${context.getters.url}/spending/create`, payload)
      .then(res => {
        if(res.status === 200){
          context.commit('addspending', res.data)
        }
      })
    },
    saveSpending(context, payload){
      axios.post(`${context.getters.url}/spending/save/${payload._id}`, payload)
      .then(res => {
        if(res.status === 200) {
          context.commit('savespending', payload)
        }
      })
    },
    delSpending(context, payload){
      axios.delete(`${context.getters.url}/spending/delete/${payload}`)
      .then(res => {
        if(res.status === 200){
          context.commit('delspending', payload)
        }
      })
    }
  }
}

export default spending