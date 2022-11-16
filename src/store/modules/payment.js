import axios from "axios"


const payment = {
  state: ()=>({
    payment: {},
    payments: []
  }),
  getters: {
    payment(state){
      return state.payment
    },
    payments(state){
      return state.payments
    }
  },
  mutations: {
    payment(state, payload){
      state.payment = payload
    },
    payments(state, payload){
      state.payments = payload
    },
    addpayment(state, payload){
      state.payments.push(payload)
    },
    savepayment(state, payload){
      state.payments = state.payments.map(payment => {
        if(payment._id == payload._id){
          return payload
        }
        return payment
      })
    },
    delpayment(state, payload){
      state.payments = state.payments.filter(payment => {
        if(payment._id == payload){
          return false
        }
        return payment
      })
    },
    delpaymentid(state, payload){
      state.payments = state.payments.map(payment => {
        if(payment._id == payload._id){
          payment.historysumma.splice(payload.index, 1)
        }
        return payment
      })
      console.log(state.payments)
    }
  },
  actions: {
    getPayments(context){
      axios.get(`${context.getters.url}/payment`)
      .then(res => {
        if(res.status === 200){
          context.commit('payments', res.data)
        }
      })
    },
    getPayment(context, payload){
      axios.get(`${context.getters.url}/payment/edit/${payload}`)
      .then(res => {
        if(res.status === 200) {
          context.commit('payment', res.data)
        }
      })
    },
    addPayment(context, payload){
      axios.post(`${context.getters.url}/payment/create`, payload)
      .then(res => {
        if(res.status === 200){
          context.dispatch('getPayments')
        }
      })
    },
    savePayment(context, payload){
      axios.post(`${context.getters.url}/payment/save/${payload._id}`, payload)
      .then(res => {
        if(res.status === 200) {
          context.commit('savepayment', res.data)
        }
      })
    },
    delPayment(context, payload){
      axios.delete(`${context.getters.url}/payment/delete/${payload}`)
      .then(res => {
        if(res.status === 200){
          context.commit('delpayment', payload)
        }
      })
    },
    delPaymentId(context, payload){
      axios.delete(`${context.getters.url}/payment/del/${payload._id}/${payload.index}`)
      .then(res => {
        if(res.status === 200){
          context.commit('delpaymentid', payload)
        }
      })
    }
  }
}

export default payment