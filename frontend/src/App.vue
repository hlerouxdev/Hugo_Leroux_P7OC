<template>
  <div>
    <v-app>
      <v-app-bar app dark color="blue">
        <v-btn>
          <v-toolbar-title>Groupomania</v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text>Signup</v-btn>
        <v-btn text>Login</v-btn>
        <v-btn text>Contact</v-btn>
      </v-app-bar>
    </v-app>
    <v-content>
      <v-parallax src="./assets/office.jpg"> </v-parallax>
      <v-card width="500px" class="mx-auto mt-9">
        <v-card-title>Bienvenue sur notre Workplace<br />Veuillez vous connecter</v-card-title>
        <v-card-tex>
          <v-text-fiel label="email" />
          <v-text-fiel label="mot de passe" type="password" />
        </v-card-tex>
      </v-card>
    </v-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  }
})
</script>
