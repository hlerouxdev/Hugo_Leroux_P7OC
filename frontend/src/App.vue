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
  },

  data: () => ({
    //
  })
}
</script>

<style scoped>
  #main {
    height: calc( 100vh - 70px - 80px);
    width: 100%;
    top: 70px;
    background-color: #3e3e3e;
    display: flex;
    justify-content: center;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: -150px;
    width: 100%;
    height: 80px;
  }
</style>
