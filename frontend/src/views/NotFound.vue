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
  .main{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1300px;
    height: 100%;
    background-color: white;
    color: #091f43;
  }
  .content h1 {
    margin-top: 50px;
  }
  .home-link {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .home-link h2 {
    text-transform: uppercase;
    margin: 20px;
    border-bottom: 5px solid #091f43;
  }
  .home-link:hover {
    cursor: pointer;
  }
  .content-image {
    height: 50%;
    width: 50%;
  }
</style>
