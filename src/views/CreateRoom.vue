<script setup>
import CreateRoomButtons from '../components/CreateRoomButtons.vue'
import Calendar from '../components/Calendar.vue';
</script>

<template>
  <div class="create">
    <h1>Room creation options placeholder page</h1>
  </div>
  <main>
    <CreateRoomButtons />
  </main>
  <div>
    <input type="text" v-model="inputText" placeholder="Enter Room name">
    <button>Name Room</button>
  </div>
  <div>
    <Calendar />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
