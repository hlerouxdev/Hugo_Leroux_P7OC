<template>
  <div>
    <v-parallax
      src="../assets/office.jpg"
      alt="image d'un bureau"
      class="home-picture"
    >
      <v-card class="mx-auto mt-9 card" width="500px">
        <v-card-title>Bienvenue sur notre Workplace<br />Veuillez vous connecter</v-card-title>
        <p>Pas encore de compte? cliquez <span>ici</span></p>
        <v-text-field label="email" type="email"/>
        <v-text-field label="mot de passe" type="password" />
        <v-card-actions>
            <v-btn color="white" block plain elevation="2">Se connecter</v-btn>
          </v-card-actions>
      </v-card>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'Login-page'
}
</script>

<style scoped>
  .card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    padding: 16px
    }
  .v-text-field {
    padding-inline: 16px;
  }
  .v-btn {
    background-color: rgb(36, 155, 36);
  }
</style>
