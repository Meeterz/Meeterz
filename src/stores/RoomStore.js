import { defineStore } from 'pinia'

export const useRoomStore = defineStore({
  id: 'roomInfo',
  state: () => ({
    ID: '',
  }),
  getters: {
    getID: (state) => {return state.ID;}
  },
  actions: {
    addID(tostoreID) {
      if(tostoreID){this.ID = tostoreID;}
    },
  },

})
