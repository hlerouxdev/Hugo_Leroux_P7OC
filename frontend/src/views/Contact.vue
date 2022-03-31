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
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: #ccccd8 0 0 20px 5px;
  width: 600px;
  height: 700px;
}
.name-row {
  display: flex;
  margin-top: 16px;
}
:deep(.name input) {
  width: 226px;
}
:deep(.v-textarea .v-field__input) {
  height: 350px;
}
.v-btn {
  background-color: rgb(36, 155, 36);
  margin-inline: 16px;
  margin-bottom: 16px;
}
</style>
