
<script>
    import ActivityChooser from '../components/ActivityChooser.vue';
    import TimeSelector from '../components/TimeSelector.vue';
    import HomePageButtons from '../components/HomePageButtons.vue';

    //store stuff
    import {mapStores} from 'pinia'
    import {useRoomStore} from '../stores/RoomStore'


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
        components: {
            ActivityChooser,
            TimeSelector,
            HomePageButtons,
        },
        data(){
            return {
                roomName: 'name',
                roomdata: null,
            }
        },
        created() { //created and mounted can run functions 
            this.findName();
        },
        mounted() {
            this.findName();
        },
        methods: {
            async findName() {
                try {
                    console.log('Calling findName');
                    const docRef = doc(db, 'rooms', this.roomInfoStore.ID);

                    const docSnap = await getDoc(docRef);

                    console.log({id: docSnap.id, ...docSnap.data() });
                    this.roomdata = {
                        id: docSnap.id,
                        ...docSnap.data(),
                    }
                    console.log('Completed findName');

                }
                catch(err) {
                    console.error('Error in findName', err);
                }
            },

        },
        computed: {
            ...mapStores(useRoomStore),
        },
        
    }
</script>


<template>
    <head> 
        <title>{{roomName}}</title>
    </head>
    <body>
        <template  v-if="roomdata">
            <h1>{{ roomdata.roomName }}</h1>
        </template>

        <h5>Room ID: {{ roomInfoStore.ID }}</h5>
        <br>

        <div class = 'options'>
            <div class='showborder'>
                <h3>Time Selecter</h3>
                <TimeSelector/>
            </div>

            <div class='showborder'>
                <h3>Activity Chooser</h3>
                <ActivityChooser/>
            </div>

            <div class='showborder'>
                <h3>Chatbox</h3>
            </div>
        </div>

        <!--EXIT BUTTON-->
        <nav>
            <RouterLink to="/"><button @click="navigate" role="link">leave</button></RouterLink>
        </nav>

    </body>
    
</template>


<style>
.options {
    display: flex;
    align-items: center;
    padding: 2rem;
}
.showborder {
    border: solid 1pt black;
    padding: 1rem;
}
</style>

