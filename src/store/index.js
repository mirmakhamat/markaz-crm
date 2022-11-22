import { createStore } from 'vuex'

import worker from './modules/worker'
import direction from './modules/direction'
import group from './modules/group'
import pupil from './modules/pupil'
import spending from './modules/spending'
import payment from './modules/payment'

export default createStore({
  state: {
    url: 'http://localhost:5070',
    status: ['faol emas', 'faol'],
    who: ['Hisobchi', 'Administrator', 'O`qituvchi', 'Uyam odam'],
    months: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
    weeks: ['Du', 'Se', 'Chor', 'Pay', 'Juma', 'Shanba', 'Yak']
  },
  getters: {
    url(state){
      return state.url
    },
    status(state){
      return state.status
    },
    who(state){
      return state.who
    },
    months(state){
      return state.months
    },
    weeks(state){
      return state.weeks
    }
  },
  modules: {
    worker, direction, group, pupil, spending, payment
  }
})
