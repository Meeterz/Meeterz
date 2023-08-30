<script setup>
//db stuff
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

//store stuff
import {mapStores} from 'pinia'
import {useRoomStore} from '../stores/RoomStore'
</script>

<template>
  <div>
    <!---Instructions for joining/creating a room maybe?-->
    <nav>

      <!--Join Room-->
      Room ID: <input v-model.trim="roomCode">
      <RouterLink :to="{name: 'room', params: {code: joinIsEmpty ? ' ' : roomCode}}">
        <button id="joinRoomButton" :disabled = "joinIsDisabled"  role="link">Join room</button>
      </RouterLink>
      

      <!--Create room-->
      Room name: <input v-model.trim="roomName"/>
        <button id="createRoomButton" :disabled = "noName" @click="createRoom()">Create room</button>
      
      

    </nav>
  </div>
</template>

<style>
  #joinRoomButton {
    background-color: #4059AD;
    color: #FED880;
    font-size: 40px;
  }

  #createRoomButton {
    background-color: #4059AD;
    color: #CEE397;
    font-size: 40px;
  }
</style>

<script>
export default {
  data(){
    return {
      roomCode: '',
      roomName: '',
      roomID: '0',
      isEmpty: true,
      rightLength: true,
      acts: [],
    }
  },

  computed: {
    joinIsEmpty(){
      return this.roomCode.length === 0;
    },
    joinIsDisabled(){
      return this.roomCode.length !== 20;
    },
    noName() {
      return !this.roomName;
    },
    ...mapStores(useRoomStore),
  },

  methods: {
    async createRoom() { //creates a new room with fields: roomName
      if (this.roomName) {
        try {
          console.log('calling create room');
          console.log('creating room:', {roomName: this.roomName});

          const docReference = await addDoc(
            collection(db, 'rooms'),
            {
              roomName:this.roomName,
              activities: this.acts,
            }
          );
          this.roomID = docReference.id;

          console.log('New room:', {roomID: docReference.id});
          console.log('Completed createRoom');
          this.$router.push({name: 'room', params: {code:docReference.id}})
        }
        catch(err) {
          console.error('Error in createRoom',err);
        }
      }
      
    },
  },

}
</script>
