<template>
  <v-footer class="footer" padless>
    <v-btn text @click="this.$router.push('/contact')" prepend-icon="mdi-email" class="footer-btn">Contact</v-btn>
      <v-alert class="success-message message" v-if="this.$store.state.successMessage !== ''" transition="scale-transition">
        <v-icon class="close-icon" @click="this.$store.state.successMessage = ''">mdi-close</v-icon>
        {{this.$store.state.successMessage}}
      </v-alert>
      <v-alert class="error-message message" v-if="this.$store.state.errorMessage !== ''" transition="scale-transition">
        <v-icon class="close-icon" @click="this.$store.state.errorMessage = ''">mdi-close</v-icon>
        {{this.$store.state.errorMessage}}
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
