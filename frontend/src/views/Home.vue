<template>
  <div>
    <v-parallax
      src="../assets/office.jpg"
      alt="image d'un bureau"
      class="home-picture"
    >
    </v-parallax>
  </div>
</template>

<style scoped>
  .card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script>

export default {
  name: 'HomePage'
}
</script>
