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

      <!--Create room-->
      <!--right now i have one button that creates the room and stores an ID, and then one that puts the host inside it
      with a uniqe url. I want it in one button but i dont know how to rn.-->
      <button id="createRoomButton" :disabled = "noName" @click="createRoom()">Create a room</button>
      <button id="createRoomButton" @click="storeID()">store room</button>
      <RouterLink :to="{name: 'room', params: {code:roomID}}">
        <button id="createRoomButton" :disabled = "noName" role="link">now join</button>
      </RouterLink>
      Room name: <input v-model.trim="roomName"/>

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
   async storeID() {
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
   async storeJoinID() {
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

  },

}
</script>



<!-- <template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template> -->
