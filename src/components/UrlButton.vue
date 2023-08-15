<template>
    <div>
        <button @click="updateUrl" textContent = what></button>
    </div>
</template>


<!---Not sure if I should define a default button size or allow the global styling sheet take care of it-->
<script>
export default {
    props: {
        nextPageLink: {
            type: String,
            default: ""
        },
        buttonText: {
            type: String,
            default: ""
        }
    },
    // data()  {
    // },
    // computed: {
    // },
    methods:{
        updateUrl(){
            this.$router = this.nextPageLink;
        }
    }
}
</script>