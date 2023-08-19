<script setup>
import CreateRoomButtons from '../components/CreateRoomButtons.vue'
</script>

<template>
  <div class="create">
    <h1>Room creation options placeholder page</h1>
  </div>
  <main>
    <CreateRoomButtons />
  </main>
  <div>
    <input type="text" v-model="inputText" placeholder="Add activites here...">
    <button>Add Activity</button>
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
