<template>
  <div class="main">
    <div class="messages-main">
      <!-- Partie gauche, liste des utilisateurs -->
      <div class="messages-users">
        <div class="user-card"
        v-for="user of this.$store.state.messagesUsers" :key="user.id"
        @click="() => {
            this.userId = user.id;
            test
          }">
          <v-avatar rounded size="80" class="user-card-avatar">
            <v-img v-if="user.profilePicture != ''"
              :src="user.profilePicture"
              cover
              class="profile-infos_left_avatar_image"></v-img>
            <v-img v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
          <div>
            <h1>
              {{ user.firstName + ' ' + user.lastName }}
            </h1>
            <h2>
              {{ user.department }}
            </h2>
          </div>
        </div>
      </div>
      <!-- Partie droite, message de l'utilisateurs selectionné -->
      <div class="messages-container">
        <div class="message" v-for="message in this.$store.state.messages" :key="message.id">
          <div v-if="message.receiverId === this.userId || message.senderId === this.userId">
            {{ message }}
          </div>
        </div>
        <v-text-field class="message-send" :v-model="messageToSend" label="Tapez un message et appuyez sur 'Entrée'">
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'MessagesPage',
  data () {
    return {
      userId: 0,
      messageToSend: ''
    }
  },
  mounted: () => {
    store.commit('clearMessagesUsers')
    store.dispatch('getMessages')
  },
  methods: {
    test () {
      console.log(this.userId)
    }
  }
}
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .messages-main {
    width: 100%;
    max-width: 1300px;
    background-color: white;
    display: flex;
    justify-content: space-between;
  }
  .messages-users {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    height: 100%;
    background-color: #d7d7d7;
    box-shadow: #3e3e3e 0 0 5px 2px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px;
    z-index: 5;
  }
  .user-card {
    display: flex;
    align-items: center;
    margin: 20px 0 10px 0;
    padding: 10px 0 10px 0;
    width: 90%;
    border-radius: 10px;
    box-shadow: #3e3e3e 0 0 5px 2px;
    color: #091f43;;
    background-color: white;
  }
  .user-card:hover {
    cursor: pointer;
  }
  .user-card h1 {
    font-size: 1.5rem;
  }
  .user-card h2 {
    font-size: 1rem;
  }
  .user-card-avatar {
    margin: 0 10px 0 10px;
    box-shadow: #3e3e3e 0 0 5px 2px;
  }
  .user-card-avatar img {
    min-width: 80px;
    min-height: 80px;
  }
  .messages-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 67%;
  }
  .message-send {
    width: 100%;
    background-color: #091f43;
    color: white;
    max-height: 100px;
    padding-top: 20px;
    border-radius: 10px 10px 0 0;
    box-shadow: #3e3e3e 0 0 5px 2px;
  }
</style>
