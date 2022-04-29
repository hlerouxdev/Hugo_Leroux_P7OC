<template>
  <div class="main">
    <div class="content">
      <h1>OOPS... Cette page n'existe pas</h1>
      <div class="home-link">
        <v-icon>mdi-hand-pointing-right</v-icon>
        <h2 @click="this.$router.push('/')">retour à l'accueil</h2>
        <v-icon>mdi-hand-pointing-left</v-icon>
      </div>
      <v-img class="content-image" src="../assets/panda-playing.gif"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
@import '../styles/pages/404.css';
</style>
