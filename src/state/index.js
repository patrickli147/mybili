import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //用户id
        userId: null,
    },
    mutations,
    getters: {
        userId: state => state.userId,
    }
})