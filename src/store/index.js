import { createStore } from 'vuex';

export default createStore({
  state: {
    events: [
      { id: 3, title: 'Eve', start: '2024-10-25T06:00:00+03:00', end: '2024-10-16T07:00:00+03:00', comment: 'Comment', backgroundColor: '#d04343', borderColor: '#d04343' },
      { id: 4, title: 'Event', start: '2024-10-15', end: '2024-10-15T06:00:00+03:00', comment: 'Comment', backgroundColor: '#504343', borderColor: '#504343' },
      { id: 4, title: 'Event_2', start: '2024-10-15', end: '2024-10-15T06:00:00+03:00', comment: 'Comment', backgroundColor: '#d04343', borderColor: '#d04343' }
    ],
  },
  getters: {
    getEvents(state) {
      return state.events;
    }
  },
  mutations: {
    ADD_EVENT(state, newEvent) {
      state.events.push(newEvent);
    },
    DELETE_EVENT(state, id) {
      state.events = state.events.filter(event => event.id !== id);
    },
    CHANGE_EVENT(state, event) {
      state.events = state.events.map(el => el.id === event.id ? event : el);
    },
  },
  actions: {
    addEvent({ commit }, newEvent) {
      commit('ADD_EVENT', newEvent);
    },

    changeEvent({state, commit}, eventData) {
      const event = state.events.find(el => el.id === eventData.id)
      if (!event) return;
      commit('CHANGE_EVENT', { ...event, ...eventData });
    },
    deleteEvent({ commit }, id) {
      commit('DELETE_EVENT', id);
    }
  }
});
