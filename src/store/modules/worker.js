import axios from "axios"


const worker = {
  state: ()=>({
    worker: {},
    workers: []
  }),
  getters: {
    worker(state){
      return state.worker
    },
    workers(state){
      return state.workers
    }
  },
  mutations: {
    worker(state, payload){
      state.worker = payload
    },
    workers(state, payload){
      state.workers = payload
    },
    addworker(state, payload){
      state.workers.push(payload)
    },
    saveworker(state, payload){
      state.workers = state.workers.map(worker => {
        if(worker._id == payload._id){
          return payload
        }
        return worker
      })
    },
    delworker(state, payload){
      state.workers = state.workers.filter(worker => {
        if(worker._id == payload){
          return false
        }
        return worker
      })
    }
  },
  actions: {
    getWorkers(context){
      axios.get(`${context.getters.url}/worker`)
      .then(res => {
        if(res.status === 200){
          context.commit('workers', res.data)
        }
      })
    },
    getWorker(context, payload){
      axios.get(`${context.getters.url}/worker/edit/${payload}`)
      .then(res => {
        if(res.status === 200) {
          context.commit('worker', res.data)
        }
      })
    },
    addWorker(context, payload){
      axios.post(`${context.getters.url}/worker/create`, payload)
      .then(res => {
        if(res.status === 200){
          context.commit('addworker', res.data)
        }
      })
    },
    saveWorker(context, payload){
      axios.post(`${context.getters.url}/worker/save/${payload._id}`, payload)
      .then(res => {
        if(res.status === 200) {
          context.commit('saveworker', payload)
        }
      })
    },
    delWorker(context, payload){
      axios.delete(`${context.getters.url}/worker/delete/${payload}`)
      .then(res => {
        if(res.status === 200){
          context.commit('delworker', payload)
          context.getters.groups.forEach(item => {
            if(item.worker._id == payload){
              context.dispatch('delGroup', item._id)
            }
          })
        }
      })
    }
  }
}

export default worker