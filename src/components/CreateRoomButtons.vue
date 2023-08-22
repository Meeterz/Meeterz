<script>
//db stuff ------
import { db } from '../firebaseResources.js';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore'

export default {
  data() {
    return {
      isChecked: false,
      revealOptions: false, // Hidden options

      roomID: '',
    };
  },
  methods: {
    handleButtonClick() {
      // Handle button click logic here
    },

    //put room in database function
    async createRoom() {
      if (this.roomID.length == 4) {
        try {
          console.log('calling create room');
          console.log('creating room:', {roomID: this.roomID});

          const docReference = await addDoc(
            collection(db, 'rooms'),
            {
              roomID:this.roomID,
            }
          );
          console.log('New room:', docReference.roomID);
          console.log('Completed createRoom');
        }
        catch(err) {
          console.error('Error in createRoom',err);
        }
      }
    },
  }
};
</script>

<template>
  <div>
    <input type="checkbox" v-model="isChecked">
    <label for="checkbox2">Another checkbox</label>
  </div>
  <div>
    room ID(4 digits):<input type="text" v-model.trim="roomID"/>
    <button @click="createRoom()">put room in db</button>
    <nav>
      <RouterLink to="/room"><button @click="navigate" role="link">Finalize</button></RouterLink>
    </nav>
  </div>
  <div>
    <label>
      <input type="checkbox" v-model="revealOptions">
      Check me to reveal
    </label>

    <!-- Conditionally renders based on the value of revealOptions (bottom checkbox). Currently only placeholders below, implement more options later -->
    <div v-if="revealOptions">
      <input type="checkbox">
      <button @click="handleButtonClick">Click me</button>
    </div>
  </div>
</template>