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
.footer {
  height: 100%;
  background-color: #091f43;
  color: white;
  border-top: #d1515a solid 5px;
  box-shadow: #3e3e3e 0 0 5px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer-btn {
  background-color: #091f43;
  color: white;
  box-shadow: none;
  margin: 20px;
}
.message {
  position: fixed;
  border-radius: 10px;
  bottom: 80px;
}
.close-icon {
  color: white;
  border-radius: 100%;
  box-shadow: #3e3e3ed8 0 0 5px 2px;
  margin-right: 10px;
}
.close-icon:hover {
  cursor: pointer;
}
.success-message {
  background-color: #091f43;
  color: white;
  border-radius: 10px 10px 0 0;
  box-shadow: #3e3e3ed8 0 0 5px 2px;
}
.error-message {
  background-color: #d1515a;
  color: white;
  border-radius: 10px 10px 0 0;
  box-shadow: #3e3e3ed8 0 0 5px 2px;
}
</style>
