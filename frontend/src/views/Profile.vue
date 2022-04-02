<template>
  <div class="main">
    <div class="main profile-form" v-if="this.profileChange ===  true">
      <div class="profile-form-bg"></div>
      <v-form v-model="valid" class="profile-form-container">
        <v-btn @click="this.profileChange = false" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <v-text-field
            v-model="form.firstname"
            label="Prénom"
          ></v-text-field>
          <v-text-field
            v-model="form.lastname"
            label="Nom de famille"
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="form.adress"
            label="Adresse"
          ></v-text-field>
          <v-text-field
            v-model="form.department"
            label="Département"
          ></v-text-field>
          <v-btn block>
          Changer les informations
          </v-btn>
        </v-container>
      </v-form>
    </div>
    <div class="profile-infos">
      <div class="profile-infos_left">
        <v-avatar rounded size="150" class="profile-infos_left_avatar">
          <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture"></v-img>
          <v-img v-else  src="../assets/user.jpg"></v-img>
        </v-avatar>
        <div class ="base-infos">
          <h1>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h1>
          <p>E-mail: {{this.$store.state.userInfos.email}}</p>
          <p>Fonction: {{this.$store.state.userInfos.department}}</p>
          <p>Adresse: {{this.$store.state.userInfos.adress}}</p>
        </div>
        <div class="button-group">
          <v-btn elevation="2" prepend-icon="mdi-camera" class="change button">Modifier la photo de profile</v-btn>
          <v-btn class="mod button" @click="this.profileChange = true">Modifier le Profile</v-btn>
          <v-btn class="mod button" @click="deleteProfile">Changer le mot de passe</v-btn>
          <v-btn class="del button" @click="deleteProfile">Supprimer le compte</v-btn>
        </div>
      </div>
      <div class="profile-infos_right">
      </div>
    </div>
  </div>
</template>

<script>

export default ({
  name: 'ProfilePage',
  data () {
    return {
      profileChange: false,
      form: {
        firstName: this.$store.state.userInfos.firstName,
        lastName: this.$store.state.userInfos.lastName,
        email: this.$store.state.userInfos.email,
        adress: this.$store.state.userInfos.adress,
        department: this.$store.state.userInfos.department
      }
    }
  },
  mounted: function () {
    // console.log(this.$store.state.userId)
    if (this.$store.state.user.userId < 1) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getUser')
    }
  },
  methods: {
    deleteProfile () {
      console.log('bye bye account')
    }
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.profile-infos{
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: #ccccd8 0 0 20px 5px;
  }
  .profile-infos_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    box-shadow: #ccccd8 0 0 20px 5px;
  }
  .profile-infos_left h1{
    margin: 20px 0 20px 0px;
  }
  .profile-infos_ .v-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-infos_left_avatar {
    margin-top: 20px;
    box-shadow: #ccccd8 0 0 20px 5px;
  }
  .base-infos {
    margin-bottom: 30px;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 150px;
    margin-top: 20px;
  }
  :deep(.button) {
    margin-top: 26px;
    color: white;
    width: 100%;
    overflow: hidden;
  }
  .change {
    background-color: #2196f3
  }
  .mod {
    background-color: #2196f3
  }
  .del {
    background-color: red;
  }
  .profile-infos_right {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 66%;
    overflow-y: scroll;
  }
  .profile-form {
    position:absolute;
  }
  .profile-form-bg {
    background-color: black;
    opacity: 50%;
    height: 100%;
    width: 100%;
    z-index: 5;
  }
  .profile-form-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 6;
    width: 50%;
  }
  .close-btn {
    margin-left: calc(100% - 64px);
    margin-top: -66px;
  }
</style>
