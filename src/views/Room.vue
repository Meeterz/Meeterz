

<script>
    import ActivityChooser from '../components/ActivityChooser.vue';
    //import TimeSelector from '../components/TimeSelector.vue';
    import Calendar from '../components/Calendar.vue';
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
            //TimeSelector,
            Calendar,
            HomePageButtons,
        },
        data(){
            return {
                roomName: 'name',
                roomdata: null,
                roomID: this.$route.params.code,
                username: '',
                revealPage: false,
                uid: '',
                userAvail: [],
            }
        },
        created() { //created and mounted can run functions 
            this.findName();
        },
        mounted() {
            this.findName();
        },
        methods: {
            reveal(){
                this.revealPage = true;
            },
            
            async findName() { //finds the name of the room based on the id put in. Using the store for now
                try {
                    console.log('Calling findName');
                    const docRef = doc(db, 'rooms', this.roomID);

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
            
            async createUsername() { //call in both join and create with text boxes correlting to both fields.
                if (this.username) {
                    try {
                    console.log('Calling createUsername');
                    console.log('Creating User:', {username: this.username});
                    const docReference = await addDoc(
                        collection(db, 'rooms', this.roomID, 'users'),
                        {
                        username:this.username,
                        }
                    );
                    this.uid = docReference.id;
                    console.log('New User:', {ID: docReference.id});
                    console.log('Completed createUsername');
                    }
                    catch(err) {
                    console.error(err);
                    }
                }
            },
            
            async sendAvailToDb() {
            if (this.uid && this.userAvail.length > 0) {
                for(let i in this.userAvail){
                    try {

                        const docReference = await addDoc(
                            collection(db, 'rooms', this.roomID, 'users', this.uid, 'availabilities'),
                            {
                                start:this.userAvail[i].start,
                                end:this.userAvail[i].end,
                            }
                        );

                        console.log('New availability added:', {ID: docReference.id});
                        console.log('Completed saveAvailability');
                    }
                    catch(err) {
                        console.error(err);
                    }
                }
            }
            },
            saveAvail(availability){
                for(let i in availability){
                    //this is likely slow, in the interest of time it's not optimized for now
                    this.userAvail[i] = availability[i];
                    console.log(availability[i]);
                }
                console.log('availability saved temporarily...')
            }

        },
        computed: {
            ...mapStores(useRoomStore),
        },   
    }
</script>


<template>
    <head> 
        <title>{{ roomName }}</title>
    </head>
    <body>
        <template  v-if="roomdata">
            <h1>{{ roomdata.roomName }}</h1>
        </template>

        <h3>Room ID: {{ roomID }}</h3>
        <br>
        <div v-if="!revealPage">
            username: <input v-model="username">
            <button @click="createUsername();reveal()">Confirm username</button>
        </div>

        <!--make it so functions are hidden until username is confirmed
        Also disable changing of username maybe-->

        <div v-if="revealPage">
            <div>
                <h4>User: {{ username }}</h4>
            </div>
            
            <!--This button can be moved-->
            <button @click="sendAvailToDb()">Save availability</button>

            <div class = 'options'>
                <!--calendar-->
                <div>
                    <Calendar @avail-updated="saveAvail"/>
                </div>

                <div class='showborder'>
                    <h3>Activity Chooser</h3>
                    <ActivityChooser/>
                </div>
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
    justify-content: space-around;
    padding: 2rem;
}
.showborder {
    border: solid 1pt black;
    padding: 1rem;
}
</style>

