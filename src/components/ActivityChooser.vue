<template>
    <div>
      <!--temp SUGGESTER-->
      <button @click="createActivity(), queryActs()">Add Activity</button>
      <input v-model="act" placeholder="Activity" />
      <ul>
        <template v-for="activity in acts">
          <li>{{ activity.activity }}</li>
        </template>
      </ul>

      <!--temp SELECTER-->
      <div>Selected: {{ selected }}</div>
      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <template v-for="activity in acts">
          <option>{{activity.activity}}</option>
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


  export default {
    
    data() {
      return {
        count:0, 
        act: '',
        acts: [],
      }
    },

    mounted() {
      this.queryActs();
    },

    methods: {
      async createActivity() { //adds an activity to the room. 
        try{
          console.log('Adding an Activity');
          console.log(this.act);
          
          const docRef = await addDoc(
            collection(db, 'rooms', this.$route.params.code, 'activities'),
            {
              activity: this.act,
            }
          );

          console.log('Completed createActivity')
        }
       catch(err){
        console.error(err);
        }
      },

      async queryActs() {
        try {
          console.log('Calling queryActs')
          this.acts = [];
          let q = query(collection(db,'rooms', this.$route.params.code, 'activities'));
          const queryResponse = await getDocs(q);

          queryResponse.forEach((responseItem) => {
          console.log({ id: responseItem.id, data: responseItem.data() });
          this.acts.push({
            id: responseItem.id,
            ...responseItem.data(),
          });
        });

        console.log('Completed queryActs');
        }
        catch(err) {
          console.error('Error in queryActs', err);
        }
      }

    }

  }
</script>
  