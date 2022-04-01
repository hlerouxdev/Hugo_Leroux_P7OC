<template>
  <v-app>
    <v-app-bar app dark color="blue">
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
      <!-- <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          v-on="on"
        >
        <v-avatar class="user-pp">
      <v-img
        src="../assets/user.jpg"
        alt="user profile picture"
      ></v-img>
    </v-avatar>
          {{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}} Mon Compte
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
      <v-btn text @click="redirectProfile" v-if="this.$store.state.user.userId >= 1">
        Mon Profile
      </v-btn>
      <div v-else></div>
      <v-btn text  @click="logout" v-if="this.$store.state.user.userId >= 1">Déconnexion</v-btn>
      <v-btn text @click="redirectContact">Contact</v-btn>
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
    redirectContact () {
      this.$router.push('/contact')
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
  .v-btn {
    color: white;
  }
  .search-field {
    color: #2196f3 !important;
    width: 25%;
    background-color: white;
  }
  .logo:hover {
    cursor: pointer;
  }
  :deep(.logo) img {
        height: 200px;
      position: absolute;
      top: -85px;
  }
  :deep(.user-pp){
        margin-right: 10px;
  }
  .account-dropdown {
      width: 150px;
  }
  .v-app-bar {
    overflow: visible;
  }
</style>
