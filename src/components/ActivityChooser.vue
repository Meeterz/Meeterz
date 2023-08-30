<template>
    <div>
      <!--temp SUGGESTER-->
      <button @click="createActivity()">Add Activity</button>
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
        <template v-for="n in count">
          <option>{{ acts[n - 1] }}</option>
        </template>
      </select>
    </div>
  </template>
  
<script>
//db stuff
import { db } from '../firebaseResources';
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

  //maybe turn each suggestion to a seperate component, but it didtn work so idk
  //import suggestion from './ActivitySuggestion.vue'; 
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
      //suggestion
    },  
    data() {
      return {
        count:0, 
        act: '',
        acts: [],
      }

    },
    methods: {
      async createActivity() { //adds an activity to the room. 
        try{
          console.log('Adding an Activity');
          this.count += 1;
          this.acts.push(this.act);
          console.log(this.act);
          
          const docRef = await addDoc(
            collection(db, 'rooms', this.$route.params.code, 'activities'),
            {
              activity: this.acts,
            }
          );
        }

       catch(err){
        console.error(err);
        }
      },
    }
  }
</script>
  