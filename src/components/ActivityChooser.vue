<template>
    <div>
      <!--temp SUGGESTER-->
      <button @click="addAct">Add Activity</button>
      <input v-model="act" placeholder="Activity" />
      <ul>
        <template v-for="n in count">
          <li>{{ acts[n - 1] }}</li>
        </template>
      </ul>

      <!--temp SELECTER-->
      <div>Selected: {{ selected }}</div>
      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </div>
  </template>
  
<script>
  //maybe turn each suggestion to a seperate component, but it didtn work so idk
  import suggestion from './ActivitySuggestion.vue'; 
  export default {
    /*  I dont know how props work
    props: {
      message: {
        type: String,
        default() {
          return 'Activity ' + count; 
        }
      }  
    },  */
    
    components: {
      suggestion
    },  
    data() {
      return {
        count:0, 
        act: '',
        acts: [],
      }

    },
    methods: {
      addAct() {
        this.count += 1;
        this.acts.push(this.act);
      }
    }
  }
</script>
  