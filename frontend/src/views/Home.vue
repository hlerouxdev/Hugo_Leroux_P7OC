<template>
  <div>
    <v-parallax
      src="../assets/office.jpg"
      alt="image d'un bureau"
      class="home-picture"
    >
      <v-card class="mx-auto mt-9 card" width="500px">
        <v-card-title>Bienvenue sur notre Workplace</v-card-title>
        <v-card-title v-if="this.mode == 'login'"
          >Veuillez vous connecter</v-card-title
        >
        <v-card-title v-if="this.mode == 'signup'"
          >Créez votre compte</v-card-title
        >
        <p v-if="this.mode === 'login'">
          Vous n'avez pas de compte?
          <span @click="switchToSignup" class="change-mode"
            >Créez votre compte</span
          >
        </p>
        <p v-if="this.mode === 'signup'">
          Vous avez déjà un compte?
          <span @click="switchToLogin" class="change-mode"
            >Connectez vous ici</span
          >
        </p>
        <p id="error-message">{{ errorMessage }}</p>
        <div class="name" v-if="this.mode === 'signup'">
          <v-text-field label="Prénom" v-model="formData.firstName" />
          <v-text-field label="Nom" v-model="formData.lastName" />
        </div>
        <v-text-field label="email" type="email" v-model="formData.email" />
        <v-text-field
          label="mot de passe"
          type="password"
          v-model="formData.password"
        />
        <v-text-field
          v-if="this.mode === 'signup'"
          label="confirmer"
          type="password"
          v-model="formData.password2"
        />
        <p id="confirmation"></p>
        <v-card-actions>
          <v-btn
            v-if="this.mode === 'signup' && checkEmpty"
            class="btn-activ"
            color="white"
            block
            plain
            elevation="2"
            @click="submitSignup"
            >S'enregistrer</v-btn
          >
          <v-btn
            v-if="this.mode === 'signup' && !checkEmpty"
            class="btn-disabled"
            color="white"
            block
            disabled
            plain
            elevation="2"
            @click="submitSignup"
            >S'enregistrer</v-btn
          >
          <v-btn
            v-if="this.mode === 'login' && checkEmpty"
            class="btn-activ"
            color="white"
            block
            plain
            elevation="2"
            @click="submitLogin"
            >Connexion</v-btn
          >
          <v-btn
            class="btn-disabled"
            v-if="this.mode === 'login' && !checkEmpty"
            color="white"
            disabled
            dark
            block
            plain
            elevation="2"
            @click="submitLogin"
            >Connexion</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-parallax>
  </div>
</template>

<script>
import validator from 'validator'
export default {
  name: 'HomePage',
  data () {
    return {
      mode: 'login',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
      },
      errorMessage: ''
    }
  },
  computed: {
    checkEmpty: function () {
      const form = this.formData
      let verify
      if (this.mode === 'signup') {
        if (
          !validator.isEmpty(form.firstName) &&
          !validator.isEmpty(form.lastName) &&
          !validator.isEmpty(form.email) &&
          !validator.isEmpty(form.password) &&
          !validator.isEmpty(form.password2)
        ) {
          verify = true
        } else {
          verify = false
        }
      } else {
        if (this.mode === 'login') {
          if (!validator.isEmpty(form.email) &&
          !validator.isEmpty(form.password)) {
            verify = true
          } else {
            return false
          }
        }
      }
      return verify
    }
  },
  methods: {
    switchToLogin () {
      this.mode = 'login'
      this.errorMessage = ''
    },
    switchToSignup () {
      this.mode = 'signup'
      this.errorMessage = ''
    },
    checkFields () {
      const form = this.formData
      let valid = false
      if (!validator.isEmail(form.email)) {
        this.errorMessage = "l'adresse mail n'est pas valide!"
        valid = true
      }
      if (!validator.isStrongPassword(form.password) && !validator.isStrongPassword(form.password2)) {
        this.errorMessage =
          'Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial!'
        valid = true
      }
      if (form.password !== form.password2) {
        this.errorMessage = 'Les mots de passes ne sont pas identiques'
        valid = true
      }
      return !valid
    },
    submitSignup () {
      // const form = this.formData
      if (this.checkFields()) {
        console.log('ok')
        this.errorMessage = ''
        this.$store.dispatch('submitSignup', { ...this.formData })
      }
    },
    submitLogin () {
      this.errorMessage = ''
      this.$store.dispatch('submitLogin', { email: this.formData.email, password: this.formData.password })
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
.name {
  display: flex;
}
.change-mode {
  text-decoration: underline;
  color: rgb(57, 57, 255);
}
#error-message {
  color: red;
}
.btn-activ{
  background-color: rgb(36, 155, 36);
}
.btn-disabled{
  background-color: lightgray;
}
#confirmation {
  color: rgb(36, 155, 36);
}
span{
  cursor: pointer;
}
</style>
