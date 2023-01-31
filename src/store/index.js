import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        vacancies: []
    },
    mutations: {
        setVacancies(state, vacancies) {
            state.vacancies = vacancies
        },
    },
    getters: {
        allVacancies(state) {
            return state.vacancies
        },
    },
    actions: {
        // вынести в папку api
        async fetchVacancies({ commit }) {
            const response = await fetch(
                'https://gsr-rabota.ru/api/v2/GetAllVacancies'
            )
            const vacancies = await response.json()
            commit('setVacancies', vacancies)
        },
    }
})

