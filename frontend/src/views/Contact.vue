<template>
  <div class="main">
      <v-form v-model="valid" class="form">
      <v-container>
        <v-title>Contactez nous</v-title>
        <div class="name-row">
          <v-text-field label="Prénom" v-model="formData.firstName" class="name" />
          <v-text-field label="Nom" v-model="formData.lastName" class="name" />
        </div>
          <v-text-field
            v-model="formData.email"
            :rules="emailRules"
            label="email"
            required
          ></v-text-field>
          <v-textarea
            v-model="formData.text"
            label="Text"
            required
          ></v-textarea>
      </v-container>
      <v-btn large @click="sendMail">
        Envoyer
      </v-btn>
    </v-form>
  </div>
</template>

<script>

export default {
  name: 'ContactPage',
  mounted () {
    if (this.$store.state.user.userId >= 1) {
      this.formData = {
        firstname: this.$store.state.userInfos.firstName,
        lastName: this.$store.state.userInfos.lastname,
        email: this.$store.state.userInfos.email,
        text: ''
      }
    }
  },
  data: () => ({
    valid: false,
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      text: ''
    },
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    sendMail () {
      console.log('mail')
    }
  }
}
</script>

<style scoped>
  @import '../styles/pages/contact.css';
</style>
