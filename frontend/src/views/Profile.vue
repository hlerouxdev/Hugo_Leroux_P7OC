<template>
  <div class="main">
    <div class="profile-infos">
      <div class="profile-infos_left">
        <v-avatar rounded size="150" class="profile-infos_left_avatar">
          <v-img v-if="this.$store.state.userInfos.profilePicture != ''"></v-img>
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
          <v-btn class="mod button">Modifier le Profile</v-btn>
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
  }
  :deep(.button) {
    margin-top: 26px;
    color: white;
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
</style>
