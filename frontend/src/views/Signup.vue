<template>
  <div>
    <v-parallax
      src="../assets/office.jpg"
      alt="image d'un bureau"
      class="home-picture"
    >
      <v-card class="mx-auto mt-9 card" width="500px">
        <v-card-title
          >Bienvenue sur notre Workplace<br />Veuillez vous
          connecter</v-card-title
        >
        <p>Vous avez déjà un compte? cliquez <span>ici</span></p>
        <p id="error-message"></p>
        <v-text-field label="Prénom" v-model="firstName" />
        <v-text-field label="Nom" v-model="lastName" />
        <v-text-field label="email" type="email" v-model="email" />
        <v-text-field
          label="mot de passe"
          type="password"
          v-model="password1"
        />
        <v-text-field label="confirmer" type="password" v-model="password2" />
        <p id="confirmation"></p>
        <v-card-actions>
          <v-btn color="white" block plain elevation="2" @click="submit"
            >S'enregistrer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-parallax>
  </div>
</template>

<script>
import validator from 'validator'
const form = this.formData
const error = document.getElementById("error-message");
let message

export default {
  name: 'Signup-page',
  data () {
    return {
      formDate: {
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    checkFields () {
      let valid = false
      if (!validator.isEmail(form.email)) {
        message = "l'adresse mail n'est pas valide!"
        valid = true
      }
      if (!validator.isStrongPassword(form.password1)) {
        message =
          'Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial!'
        valid = true
      }
      if (form.password1 !== form.password2) {
        message = 'Les mots de passes ne sont pas identiques'
        valid = true
      }
      error.textContent = message
      return !valid
    },
    submit () {
      if (
        validator.isEmpty(form.firstName) ||
        validator.isEmpty(form.lastName) ||
        validator.isEmpty(form.email) ||
        validator.isEmpty(form.password1) ||
        validator.isEmpty(form.password2)
      ) {
        message = 'Les champs ne peuvent pas être vides!'
        error.textContent = message
      } else {
        if (form.checkFields()) {
          console.log('ok')
          error.textContent = ('')
          document.getElementById('confirmation').textContent = ('Votre compte est enregistré!')
      }
    }
  }
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
  padding: 16px;
}
.v-text-field {
  padding-inline: 16px;
}
.v-btn {
  background-color: rgb(36, 155, 36);
}
#error-message {
  color: red;
}
#confirmation {
  color: rgb(36, 155, 36);
}
</style>
