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
      <RouterLink :to="{name: 'room', params: {code: joinIsEmpty ? ' ' : roomCode}}">
        <button id="joinRoomButton" :disabled = "joinIsDisabled" @click="storeJoinID()" role="link">Join</button>
      </RouterLink>
      Room ID: <input v-model.trim="roomCode">
      username: <input v-model="joinerUsername">

      <!--Create room-->
      <!--right now i have one button that creates the room and stores an ID, and then one that puts the host inside it
      with a uniqe url. I want it in one button but i dont know how to rn.-->
      <button id="createRoomButton" :disabled = "noName" @click="createRoom()">Create a room</button>
      <button id="createRoomButton" @click="storeID()">store room</button>
      <RouterLink :to="{name: 'room', params: {code:roomID}}">
        <button id="createRoomButton" :disabled = "noName" role="link">now join</button>
      </RouterLink>
      Room name: <input v-model.trim="roomName"/>
      username: <input v-model="createrUsername">

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
      joinerUsername: '',
      createrUsername: '',
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
            }
          );
          this.roomID = docReference.id;

          console.log('New room:', {roomName: docReference.roomName, roomID: docReference.id});
          console.log('Completed createRoom');
        }
        catch(err) {
          console.error('Error in createRoom',err);
        }
      }
    },

    async storeID() { //stores the ID of newly created room into roomInfoStore (will replace)
      if (this.roomID !=null) {
        try {
          console.log('Calling storeID');
          this.roomInfoStore.addID(this.roomID);
          console.log('Completed storeID');
        }
        catch(err) {
          console.error(err);
        }
      }
    },

    async storeJoinID() { //stores the ID input into the join text. (will replace)
      if (this.roomID !=null) {
        try {
          console.log('Calling storeID');
          this.roomInfoStore.addID(this.roomCode);
          console.log('Completed storeID');
        }
        catch(err) {
          console.error(err);
        }
      }
    },

    async createJoinerUsername() { //call in both join and create with text boxes correlting to both fields.
      if (this.joinerUsername) {
        try {
          console.log('Calling createJoinerUsername');
          console.log('Creating User:', {joinerUsername: this.joinerUsername});
          const docReference = await addDoc(
            collection(db, 'users'),
            {
              joinerUsername:this.joinerUsername,
            }
          );

          console.log('New User:', {joinerUsername: docReference.joinerUsername, ID: docReference.id});
          console.log('Completed createJoinerUsername');
        }
        catch(err) {
          console.error(err);
        }
      }
    },

    async createCreaterUsername() { //call in create with text boxes correlting to both fields.
      if (this.createrUsername) {
        try {
          console.log('Calling createCreaterUsername');
          console.log('Creating User:', {createrUsername: this.createrUsername});
          const docReference = await addDoc(
            collection(db, 'users'),
            {
              createrUsername:this.createrUsername,
            }
          );

          console.log('New User:', {createrUsername: docReference.createrUsername, ID: docReference.id});
          console.log('Completed createCreaterUsername');
        }
        catch(err) {
          console.error(err);
        }
      }
    },

  },

}
</script>
