<template>
  <v-footer class="footer" padless>
    <v-row justify="center" no-gutters>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style scoped>
.footer {
  background-color: #091f43;
  color: white;
  border-top: #d1515a solid 5px;
}
</style>
