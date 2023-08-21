<script>
export default {
  data() {
    return {
      isChecked: false,
      revealOptions: false // Hidden options
    };
  },
  methods: {
    handleButtonClick() {
      // Handle button click logic here
    }
  }
};
</script>

<template>
  <div>
    <input type="checkbox" v-model="isChecked">
    <label for="checkbox2">Another checkbox</label>
  </div>
  <div>
    <nav>
      <RouterLink to="/room"><button @click="navigate" role="link">Finalize</button></RouterLink>
    </nav>
  </div>
  <div>
    <label>
      <input type="checkbox" v-model="revealOptions">
      Check me to reveal
    </label>

    <!-- Conditionally renders based on the value of revealOptions (bottom checkbox). Currently only placeholders below, implement more options later -->
    <div v-if="revealOptions">
      <input type="checkbox">
      <button @click="handleButtonClick">Click me</button>
    </div>
  </div>
</template>