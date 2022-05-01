<template>
  <v-app>
    <v-app-bar class="header">
      <div class="header-content">
        <v-img
        class="logo"
        src="../assets/logos/icon-left-font-monochrome-white.png"
        alt="logo groupomania"
        @click="this.$router.push('/')"
        />
        <div class="header-nav">
          <v-btn class="nav-btn" @click="this.$router.push('/my-profile/')" v-if="this.$store.state.user.userId >= 1">
          <v-avatar class="user-pp">
            <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture" cover class="user-pp-img"></v-img>
            <v-img v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
            Mon Profil
          </v-btn>
          <div v-else></div>
          <v-btn class="nav-btn" v-if="this.$store.state.user.userId >= 1" prepend-icon="mdi-message-text" @click="this.$router.push('/messages')">Messages</v-btn>
          <v-btn class="nav-btn" prepend-icon="mdi-exit-run" @click="logout" v-if="this.$store.state.user.userId >= 1">Déconnexion</v-btn>
        </div>
      </div>
    </v-app-bar>
  </v-app>
</template>

<script>

export default {
  name: 'NavBar',
  methods: {
    logout () {
      this.$store.state.user = {
        userId: -1,
        token: '',
        isAdmin: false
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
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  @import '../styles/nav.css';
</style>
