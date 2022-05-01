<template>
  <v-app>
    <Nav></Nav>
    <v-main id="main">
      <router-view/>
    </v-main>
    <Footer class="footer"></Footer>
  </v-app>
</template>

<script>
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

export default {

  name: 'App',
  components: {
    Nav, Footer
  }
}
</script>

<style scoped>
  #main {
    height: calc( 100vh - 70px - 80px);
    width: 100%;
    top: 70px;
    display: flex;
    justify-content: center;
    background-image: url('./assets/groupama-bg.PNG');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }
  .footer {
    z-index: 20;
    position: absolute;
    left: 0;
    bottom: -150px;
    width: 100%;
    height: 80px;
  }
  @media only screen and (max-width: 991px) {
    #main {
      height: calc( 100vh - 110px - 80px);
      top: 110px;
    }
    .footer {
      bottom: -190px;
    }
  }
</style>
