<template>
  <v-footer class="footer" padless>
    <v-btn text @click="this.$router.push('/contact')" prepend-icon="mdi-email">Contact</v-btn>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.v-btn {
  background-color: #091f43;
  color: white;
  box-shadow: none;
  margin: 20px;
}
</style>
