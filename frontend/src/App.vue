<template>
  <v-app>
    <Nav></Nav>
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
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
