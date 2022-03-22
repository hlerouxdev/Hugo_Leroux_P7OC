<template>
  <v-app>
    <v-app-bar app dark color="blue">
      <v-img
        src="../assets/logos/icon-left-font-monochrome-white.png"
        alt="logo groupomania"
      ></v-img>
      <!-- <v-toolbar-title>Groupomania</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        class="search-field"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn text>Profile</v-btn>
      <v-btn text>Contact</v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.v-btn {
  color: white;
}
.search-field {
  color: #2196f3 !important;
  width: 25%;
  background-color: white;
}
</style>
