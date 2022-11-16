import axios from "axios"


const direction = {
  state: ()=>({
    direction: {},
    directions: []
  }),
  getters: {
    direction(state){
      return state.direction
    },
    directions(state){
      return state.directions
    }
  },
  mutations: {
    direction(state, payload){
      state.direction = payload
    },
    directions(state, payload){
      state.directions = payload
    },
    adddirection(state, payload){
      state.directions.push(payload)
    },
    savedirection(state, payload){
      state.directions = state.directions.map(direction => {
        if(direction._id == payload._id){
          return payload
        }
        return direction
      })
    },
    deldirection(state, payload){
      state.directions = state.directions.filter(direction => {
        if(direction._id == payload){
          return false
        }
        return direction
      })
    }
  },
  actions: {
    getDirections(context){
      axios.get(`${context.getters.url}/direction`)
      .then(res => {
        if(res.status === 200){
          context.commit('directions', res.data)
        }
      })
    },
    getDirection(context, payload){
      axios.get(`${context.getters.url}/direction/edit/${payload}`)
      .then(res => {
        if(res.status === 200) {
          context.commit('direction', res.data)
        }
      })
    },
    addDirection(context, payload){
      axios.post(`${context.getters.url}/direction/create`, payload)
      .then(res => {
        if(res.status === 200){
          context.commit('adddirection', res.data)
        }
      })
    },
    saveDirection(context, payload){
      axios.post(`${context.getters.url}/direction/save/${payload._id}`, payload)
      .then(res => {
        if(res.status === 200) {
          context.commit('savedirection', res.data)
        }
      })
    },
    delDirection(context, payload){
      axios.delete(`${context.getters.url}/direction/delete/${payload}`)
      .then(res => {
        if(res.status === 200){
          context.commit('deldirection', payload)
        }
      })
    }
  }
}

export default direction