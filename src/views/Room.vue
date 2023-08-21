<script>
    import ActivityChooser from '../components/ActivityChooser.vue';
    import TimeSelector from '../components/TimeSelector.vue';
    export default {
        components: {
            ActivityChooser,
            TimeSelector,
        }
    }
</script>

<template>
    <head> 
        <title>___'s room</title>
    </head>
    <body>
        <h1>___'s room</h1>
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