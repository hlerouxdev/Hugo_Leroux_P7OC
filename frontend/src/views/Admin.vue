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
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .delete-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .modal-form {
    position: fixed;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-height: 500px;
    max-width: 500px;
    background-color: white;
    color: #091f43;
    border-radius: 10px;
    box-shadow: #3e3e3e 0 0 5px 2px;
    padding: 10px;
  }
  .modal-form h1 {
    text-align: center;
  }
  .name {
    font-weight: bold;
    font-size: 1.1em;
  }
  .main-content {
    width: 100%;
    max-width: 1300px;
    background-color: white;
    overflow-y: scroll;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
  }
  .user-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 10px;
    border: solid 5px #091f43;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
  }
  .userContainer:hover {
    box-shadow: #3e3e3e 0 0 5px 2px;
  }
  .user-infos {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .user-avatar {
    margin-right: 20px;
    box-shadow: #3e3e3e 0 0 5px 2px;
  }
  .user-btn-section {
    min-width: 150px;
  }
  .mod-btn {
    margin-left: 10px;
  }
</style>
