<template>
  <v-footer class="footer" padless>
    <v-btn text @click="this.$router.push('/contact')" prepend-icon="mdi-email" class="footer-btn">
      Contact
    </v-btn>
    <v-alert class="success-message alert-message" v-if="this.$store.state.successMessage !== ''" transition="scroll-y-reverse-transition">
      <v-icon class="close-icon" @click="this.$store.state.successMessage = ''">mdi-close</v-icon>
      <h2>
        {{this.$store.state.successMessage}}
      </h2>
    </v-alert>
    <v-alert class="error-message alert-message" v-if="this.$store.state.errorMessage !== ''" transition="scroll-y-reverse-transition">
      <v-icon class="close-icon" @click="this.$store.state.errorMessage = ''">mdi-close</v-icon>
      <h2>
        {{this.$store.state.errorMessage}}
      </h2>
    </v-alert>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
  @import '../styles/footer.css';
</style>
