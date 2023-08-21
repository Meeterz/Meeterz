<template>
    <div>
      <button @click="addAct">Add Activity</button>
      <ul>
        <template v-for="n in count">
          <li>{{ n }}</li>
        </template>
      </ul>
    </div>
  </template>
  
<script>
  import suggestion from './ActivitySuggestion.vue';
  export default {
    components: {
      suggestion
    }
    methods: {
      addAct() {
        
      }
    }
  }
</script>
  