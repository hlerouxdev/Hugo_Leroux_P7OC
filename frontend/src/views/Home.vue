<template>
  <div class="main">
      <v-card class="home-form">
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
        <v-alert
          dense
          outlined
          type="error"
          class="form-alert-message error"
          v-if="this.errorMessage != ''"
        >
          {{ errorMessage }}
        </v-alert>
        <v-alert
      dense
      text
      type="success"
      class="form-alert-message success"
      v-if="mode == 'login' && this.confirmationMessage != ''"
    >
      {{ confirmationMessage }}
    </v-alert>
        <div class="name" v-if="this.mode === 'signup'">
          <v-text-field class="name-field" label="Prénom" v-model="formData.firstName" />
          <v-text-field class="name-field" label="Nom" v-model="formData.lastName" />
        </div>
        <v-text-field label="email" type="email" v-model="formData.email" />
        <v-text-field
          label="mot de passe"
          v-model="formData.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @keyup.enter="() => {if (mode === 'login') {submitLogin()}}"
          @click:append="show = !show"
        />
        <v-text-field
          v-if="this.mode === 'signup'"
          label="confirmez le mot de passe"
          v-model="formData.password2"
          @keyup.enter="submitSignup"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <v-btn
          v-if="this.mode === 'signup' && checkEmpty"
          class="form-btn btn-activ"
          block
          elevation="2"
          @click="submitSignup"
          @keyup.enter="submitSignup"
          >S'enregistrer</v-btn
        >
        <v-btn
          v-if="this.mode === 'signup' && !checkEmpty"
          class="form-btn btn-disabled"
          block
          disabled
          elevation="2"
          >S'enregistrer</v-btn
        >
        <v-btn
          v-if="this.mode === 'login' && checkEmpty"
          class="form-btn btn-activ"
          block
          elevation="2"
          @click="submitLogin"
          @keyup.enter="submitLogin"
        >
          <span v-if="status == 'loading'">Connexion en cours ...</span>
          <span v-else>Connexion</span>
        </v-btn>
        <v-btn
          class="form-btn btn-disabled"
          v-if="this.mode === 'login' && !checkEmpty"
          color="white"
          disabled
          block
          elevation="2"
          >
            Connexion
          </v-btn>
      </v-card>
  </div>
</template>

<script>
import validator from 'validator'
import { mapState } from 'vuex'
import store from '../store/index'

export default {
  name: 'HomePage',
  data () {
    return {
      show: false,
      password: 'Password',
      mode: 'login',
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
      },
      errorMessage: '',
      confirmationMessage: ''
    }
  },
  mounted: () => {
    const token = localStorage.getItem('token')
    if (token) {
      store.dispatch('checkToken', token)
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
          if (
            !validator.isEmpty(form.email) &&
            !validator.isEmpty(form.password)
          ) {
            verify = true
          } else {
            return false
          }
        }
      }
      return verify
    },
    ...mapState(['status'])
  },
  methods: {
    switchToLogin () {
      this.mode = 'login'
      this.cleaFields()
      this.errorMessage = ''
    },
    switchToSignup () {
      this.mode = 'signup'
      this.cleaFields()
      this.errorMessage = ''
    },
    checkFields () {
      const form = this.formData
      let valid = false
      if (!validator.isEmail(form.email)) {
        this.errorMessage = "l'adresse mail n'est pas valide."
        valid = true
      }
      if (
        !validator.isStrongPassword(form.password) &&
        !validator.isStrongPassword(form.password2)
      ) {
        this.errorMessage =
          'Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial.'
        valid = true
      }
      if (form.password !== form.password2) {
        this.errorMessage = 'Les mots de passes ne sont pas identiques.'
        valid = true
      }
      return !valid
    },
    cleaFields () {
      const form = this.formData
      Object.keys(form).forEach(key => {
        form[key] = ''
      })
    },
    submitSignup () {
      if (this.checkFields()) {
        this.$store
          .dispatch('submitSignup', { ...this.formData })
          .then(() => {
            this.cleaFields()
            this.errorMessage = ''
            this.confirmationMessage = 'Votre compte a été créé. Vous pouvez maintenant vous connecter.'
            this.mode = 'login'
          })
          .catch((error) => {
            this.confirmationMessage = ''
            this.errorMessage = `cette erreur est survenue: ${error.response.data.message}`
          })
      }
    },
    submitLogin () {
      this.$store
        .dispatch('submitLogin', {
          email: this.formData.email,
          password: this.formData.password
        })
        .then(() => {
          this.errorMessage = ''
        })
        .catch((error) => {
          this.confirmationMessage = ''
          console.log(error.response)
          this.errorMessage = `L'identifiant donné n'est pas valide: ${error.response.data.message}`
        })
    }
  }
}
</script>

<style scoped>
  @import '../styles/pages/home.css';
</style>
