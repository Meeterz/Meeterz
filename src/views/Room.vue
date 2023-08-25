
<script>
    import ActivityChooser from '../components/ActivityChooser.vue';
    import TimeSelector from '../components/TimeSelector.vue';
    export default {
        components: {
            ActivityChooser,
            TimeSelector,
        },
        data(){
            return {
                roomName: 'room',
            }
        },
    }
    

    
</script>


<template>
    <head> 
        <title>room</title>
    </head>
    <body>
        <!--query to get the room name-->
        <h1>{{ roomName }}</h1>
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

