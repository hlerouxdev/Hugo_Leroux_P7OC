<template>
  <div class="main">
    <div class="delete-modal" v-if="mod === 'delete'">
      <div class="modal-form">
        <h1>
          Êtes-vous sûr(e) de vouloi supprimer le profil de {{ userName }}?
        </h1>
        <div class="modal-btn">
          <v-btn class="mod-btn del"
          @click="deleteUser(userId)">Oui</v-btn>
          <v-btn class="mod-btn mod"
          @click="() => {
            mod = ''
            userId = 0
            userName = ''
          }">Non</v-btn>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div
      v-for="user of this.$store.state.allUsers"
      :key="user.id"
      class="user-container">
        <div class="user-infos">
          <v-avatar  class="user-avatar" size="70">
            <v-img aspect-ratio="1" v-if="user.profilePicture === ''" cover src="../assets/user.jpg"></v-img>
            <v-img aspect-ratio="1" v-else :src="user.profilePicture" cover class="user-avatar-img"></v-img>
          </v-avatar>
          <div class="user-section">
            <p class="name" >{{ user.firstName }}</p>
            <p class="name" >{{ user.lastName }}</p>
            <p>{{ user.department }}</p>
          </div>
        </div>
        <div class="user-btn-section">
          <v-btn
          title="voir le profil"
          class="mod mod-btn"
          @click="this.$router.push('/user/' + user.id)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
          title="Supprimer le profil"
          class="del mod-btn"
          @click="() => {
            mod = 'delete'
            userId = user.id
            userName = user.firstname + ' ' + user.lastName
          }">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
export default {
  name: 'AdminPage',
  mounted: () => {
    store.dispatch('getAllUsers')
  },
  data () {
    return {
      mod: '',
      userId: 0,
      userName: ''
    }
  },
  methods: {
    deleteUser (userId) {
      store.dispatch('deleteUser', userId)
        .then(() => {
          store.dispatch('getAllUsers')
          this.userId = 0
          this.mod = ''
          this.userName = ''
        })
    }
  }
}
</script>

<style scoped>
  @import '../styles/buttons.css';
  @import '../styles/pages/admin.css';
</style>
