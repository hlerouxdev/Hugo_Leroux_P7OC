<template>
  <v-app>
    <v-app-bar app dark class="header">
      <v-img
      class="logo"
        src="../assets/logos/icon-left-font-monochrome-white.png"
        alt="logo groupomania"
        @click="redirectHome"
      ></v-img>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
      v-if="this.$store.state.user.userId >= 1"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        class="search-field"
      ></v-text-field>
      <div class="search-field" v-else></div>
      <v-spacer></v-spacer>
      <v-btn text @click="redirectProfile" v-if="this.$store.state.user.userId >= 1">
        <v-avatar class="user-pp">
          <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture" cover class="user-pp-img"></v-img>
          <v-img v-else  src="../assets/user.jpg"></v-img>
        </v-avatar>
        Mon Profil
      </v-btn>
      <div v-else></div>
      <v-btn text v-if="this.$store.state.user.userId >= 1" prepend-icon="mdi-message-text">Messages</v-btn>
      <v-btn text  @click="logout" v-if="this.$store.state.user.userId >= 1">Déconnexion</v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>

export default {
  name: 'NavBar',
  data: () => ({
    items: [
      { title: 'Profile' },
      { title: 'Déconnexion' }
    ]
  }),
  methods: {
    redirectHome () {
      this.$router.push('/')
    },
    redirectProfile () {
      this.$router.push('/my-profile')
    },
    logout () {
      console.log('bye bye')
      this.$store.state.user = {
        userId: -1,
        token: ''
      }
      this.$store.state.userInfos = {
        firstName: '',
        lastName: '',
        email: '',
        adress: '',
        department: '',
        profilePicture: ''
      }
      localStorage.clear()
      this.redirectHome()
    }
  }
}
</script>

<style scoped>
.header {
  background: #091f43;
  border-bottom: #d1515a solid 5px;
  height: 70px !important;
}
  .v-btn {
    color: white;
  }
  .search-field {
    color: white!important;
    width: 25%;
    background-color: #091f43;
  }
  .logo {
    width: 238px;
  }
  .logo:hover {
    cursor: pointer;
  }
  :deep(.user-pp){
        margin-right: 10px;
  }
  .user-pp-img {
    min-height: 40px;
    min-width: 40px;
  }
  .account-dropdown {
      width: 150px;
  }
  .v-app-bar {
    overflow: visible;
  }
</style>
