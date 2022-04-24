<template>
  <v-app>
    <v-app-bar app dark class="header">
      <div class="header-content">
        <v-img
        class="logo"
          src="../assets/logos/icon-left-font-monochrome-white.png"
          alt="logo groupomania"
          @click="redirectHome"
        />
        <div class="header-nav">
          <v-btn text @click="redirectProfile" v-if="this.$store.state.user.userId >= 1">
          <v-avatar class="user-pp">
            <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture" cover class="user-pp-img"></v-img>
            <v-img v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
            Mon Profil
          </v-btn>
          <div v-else></div>
          <v-btn text v-if="this.$store.state.user.userId >= 1" prepend-icon="mdi-message-text" @click="this.$router.push('/messages')">Messages</v-btn>
          <v-btn text  @click="logout" v-if="this.$store.state.user.userId >= 1">Déconnexion</v-btn>
        </div>
      </div>
    </v-app-bar>
  </v-app>
</template>

<script>

export default {
  name: 'NavBar',
  methods: {
    redirectHome () {
      this.$router.push('/')
    },
    redirectProfile () {
      this.$router.push('/my-profile')
    },
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header :deep(.v-toolbar__content) {
    display: flex;
    justify-content: center;
  }
  .header-content {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    max-width: 1300px;
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
    max-height: 50px;
    max-width: 350px;
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
    overflow: hidden;
  }
</style>
