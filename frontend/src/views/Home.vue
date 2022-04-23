<template>
  <div class="main">
    <!-- <div class="home-picture">
      <v-img
      src="../assets/logos/icon-transparent.png"
      alt="logo groupomania"
    />
    </div> -->
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
        <v-alert
          dense
          outlined
          type="error"
          class="alert-message error"
          v-if="this.errorMessage != ''"
        >
          {{ errorMessage }}
        </v-alert>
        <v-alert
      dense
      text
      type="success"
      class="alert-message success"
      v-if="mode == 'login' && this.confirmationMessage != ''"
    >
      {{ confirmationMessage }}
    </v-alert>
        <div class="name" v-if="this.mode === 'signup'">
          <v-text-field label="Prénom" v-model="formData.firstName" />
          <v-text-field label="Nom" v-model="formData.lastName" />
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
        <v-card-actions>
          <v-btn
            v-if="this.mode === 'signup' && checkEmpty"
            class="btn-activ"
            color="white"
            block
            plain
            elevation="2"
            @click="submitSignup"
            @keyup.enter="submitSignup"
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
            @keyup.enter="submitLogin"
          >
            <span v-if="status == 'loading'">Connexion en cours ...</span>
            <span v-else>Connexion</span>
          </v-btn>
          <v-btn
            class="btn-disabled"
            v-if="this.mode === 'login' && !checkEmpty"
            color="white"
            disabled
            dark
            block
            plain
            elevation="2"
            >
              Connexion
            </v-btn>
        </v-card-actions>
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
      oassword: 'Password',
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
            this.errorMessage = `cette erreur est survenue: ${error}`
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
          this.errorMessage = `L'identifiant donné n'est pas valide ${error.message}`
        })
    }
  }
}
</script>

<style scoped>
.main {
  background-image: url('../assets/office.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
.home-picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-picture .v-img {
  width: 250px;
  object-fit: cover;
  object-position: center;
}
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #091f43;
  box-shadow: #3e3e3ed8 0 0 5px 2px;
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
.alert-message {
  margin: 0 16px 16px 16px;
}
.error {
  background-color: #d1515a;
}
.success {
  background-color: #091f43;
}
.btn-activ {
  background-color: #091f43;
}
.btn-disabled {
  background-color: #d7d7d7;
}
span {
  cursor: pointer;
}
</style>
