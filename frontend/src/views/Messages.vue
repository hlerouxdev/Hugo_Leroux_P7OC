<template>
  <div class="main">
    <div class="messages-main">
      <!-- Partie gauche, liste des utilisateurs -->
      <div class="messages-users">
        <div class="search-bar">
          <v-text-field
          v-model="userSearch"
          label="cherchez un utilisateur"
          hide-details
          prepend-icon="mdi-magnify"
          single-line>
          </v-text-field>
        </div>
        <div class="messages-users-list">
          <div class="user-card"
          v-for="user of this.$store.state.messagesUsers" :key="user.id"
          @click="switchUser(user.id)">
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
      </div>
      <!-- Partie droite, message de l'utilisateurs selectionné -->
      <div class="messages-container">
        <div class="messages-display">
          <div class="message" v-for="message in this.$store.state.messages" :key="message.id">
            <!-- message envoyé -->
            <div class="message-container sent" v-if="message.receiverId === this.userId">
              <v-avatar  class="message-avatar" size="50">
                <v-img v-if="this.$store.state.userInfos.profilePicture === ''" src="../assets/user.jpg"></v-img>
                <v-img v-else :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
              </v-avatar>
              <div class="message-infos infos-sent">
                <p class="message-sender">{{ this.$store.state.userInfos.firstName }}</p>
                <p class="message-content message-sent">{{ message.content }}</p>
              </div>
            </div>
            <!-- message reçu -->
            <div class="message-container received" v-if="message.senderId === this.userId">
              <v-avatar  class="message-avatar" size="50">
                <v-img v-if="this.$store.state.otherUser.profilePicture === ''" src="../assets/user.jpg"></v-img>
                <v-img v-else :src="this.$store.state.otherUser.profilePicture" cover class="post-avatar-img"></v-img>
              </v-avatar>
              <div class="message-infos infos-received">
                <p class="message-sender">{{ this.$store.state.otherUser.firstName }}</p>
                <p class="message-content message-received">{{ message.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <v-text-field
        v-if="userId !== 0"
        class="message-send" v-model="messageToSend"
        label="Tapez un message et appuyez sur 'Entrée'"
        v-on:keyup.enter="sendMessage">
        </v-text-field>
        <div v-else class="message-send not-selected">Cliquez sur un Utilisateur pour envoyer un message</div>
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
      userSearch: '',
      userInfos: {},
      messageToSend: ''
    }
  },
  mounted: () => {
    store.commit('clearMessagesUsers')
    store.dispatch('getMessages')
  },
  methods: {
    switchUser (userId) {
      this.userId = userId
      store.dispatch('getOtherUser', userId)
    },
    sendMessage () {
      store.dispatch('sendMessage', {
        userId: this.userId,
        content: this.messageToSend
      })
        .then(() => {
          this.messageToSend = ''
        })
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
    z-index: 5;
  }
  .search-bar {
    height: 100px;
    width: 100%;
    background-color: #091f43;
    color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px;
    margin-bottom: 5px;
    box-shadow: #3e3e3e 0 0 5px 2px;
  }
  .messages-users-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
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
  .messages-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow-y: scroll;
    height: calc(100% - 100px);
    width: 100%;
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
  .not-selected {
    text-align: center;
    line-height: 100px;
  }
  .message {
    width: 100%;
    padding: 0 20px 0 20px;
  }
  .message-container {
    display: flex;
    width: 100%;
    padding: 10px;
    align-items: flex-end;
  }
  .sent {
    flex-direction: row-reverse;
  }
  .message-avatar {
    box-shadow: #3e3e3ed8 0 0 5px 2px;
    margin-bottom: 10px;
  }
  .message-infos {
    max-width: 40%;
    display: flex;
    flex-direction: column;
  }
  .infos-sent {
    align-items: flex-end;
  }
  .message-content {
    text-align: center;
    width: fit-content;
    border-radius: 10px;
    padding: 20px;
    word-break: break-all;
    margin: 0 10px 10px 10px;
  }
  .message-sent {
    background-color: #091f43;
    color: white;
  }
  .message-received {
    background-color: #d7d7d7;
    color: #091f43;
  }
  .message-sender {
    font-size: 0.9rem;
    margin-inline: 10px;
  }
</style>
