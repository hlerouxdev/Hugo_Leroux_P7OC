<template>
  <div class="main">
    <div class="messages-main">
      <!-- Partie gauche, liste des utilisateurs -->
      <div class="messages-users">
        <!-- Search Bar non functional-->
        <div class="search-bar">
          <v-text-field
          v-model="userSearch"
          label="cherchez un utilisateur"
          hide-details
          prepend-icon="mdi-magnify"
          single-line>
          </v-text-field>
          <!-- <div class="search-bar-list" v-if="userSearch.length > 2">
            <div class="search-bar-result"
            v-for="user of searchResults" :key="user.id">
              <div class="search-bar-user">
                {{ user.firstName + ' ' + user.lastName }} ({{ user.department }})
              </div>
            </div>
          </div> -->
        </div>
        <!-- User List -->
        <div class="messages-users-list">
          <!-- this.$router.push('/messages/' + user.id) -->
          <div class="user-card-container"
          v-for="user of this.$store.state.allUsers" :key="user.id"
          @click="switchUser(user.id)">
            <div class="user-card" v-if="user.messaged === true && user.id !== this.$store.state.user.userId">
              <v-avatar rounded size="80" class="user-card-avatar">
                <v-img aspect-ratio="1" v-if="user.profilePicture != ''"
                  :src="user.profilePicture"
                  cover
                  class="profile-infos_left_avatar_image"></v-img>
                <v-img aspect-ratio="1" v-else  src="../assets/user.jpg"></v-img>
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
      </div>
      <!-- Partie droite, message de l'utilisateurs selectionné -->
      <div class="messages-container">
        <div class="messages-display" v-if="loaded === true">
          <div class="message" v-for="message in this.$store.state.messages" :key="message.id">
            <!-- message envoyé -->
            <div class="message-container sent" v-if="message.receiverId === this.userId">
              <v-avatar  class="message-avatar" size="50">
                <v-img aspect-ratio="1" v-if="this.$store.state.userInfos.profilePicture === ''" src="../assets/user.jpg"></v-img>
                <v-img aspect-ratio="1" v-else :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
              </v-avatar>
              <div class="message-infos infos-sent">
                <p class="message-sender">{{ this.$store.state.userInfos.firstName }}</p>
                <p class="message-content message-sent">{{ message.content }}</p>
              </div>
            </div>
            <!-- message reçu -->
            <div class="message-container received" v-if="message.senderId === this.userId">
              <v-avatar  class="message-avatar" size="50">
                <v-img aspect-ratio="1" v-if="this.$store.state.otherUser.profilePicture === ''" src="../assets/user.jpg"></v-img>
                <v-img aspect-ratio="1" v-else :src="this.$store.state.otherUser.profilePicture" cover class="post-avatar-img"></v-img>
              </v-avatar>
              <div class="message-infos infos-received">
                <p class="message-sender">{{ this.$store.state.otherUser.firstName }}</p>
                <p class="message-content message-received">{{ message.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- chmaps de texte message -->
        <v-text-field
        v-if="userId !== 0"
        class="message-send" v-model="messageToSend"
        label="Tapez un message et appuyez sur 'Entrée'"
        v-on:keyup.enter="sendMessage">
        <p v-if="messageToSend.length < 255" class="message-word-count">{{messageToSend.length}}/255</p>
        <p v-else class="message-word-count word-count-red">{{messageToSend.length}}/255</p>
        </v-text-field>
        <div v-else class="message-send not-selected">Cliquez sur un Utilisateur pour envoyer un message</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index.js'
import router from '../router/index.js'

export default {
  name: 'MessagesPage',
  data () {
    return {
      loaded: false,
      userId: router.currentRoute._value.params.id ? router.currentRoute._value.params.id : 0,
      userSearch: '',
      userInfos: {},
      messageToSend: ''
    }
  },
  mounted: () => {
    store.dispatch('getMessages')
      .then(() => {
        store.dispatch('getAllUsers')
      })
      .catch(error => {
        store.commit('setErrorMessage', error)
      })
  },
  comuted: {
    searchResults: () => { // not working
      console.log(this.userSearch)
      const query = this.searchUser.toLowerCase()
      console.log(query)
      if (query.length > 2) {
        return store.allUsers.filter(user => {
          const userName = user.firstName.toLowerCase() + user.lastName.toLowerCase()
          return userName.includes(query)
        })
      } else {
        return store.allUsers
      }
    }
  },
  methods: {
    switchUser (userId) {
      this.loaded = false
      this.userId = userId
      router.push('/messages/' + userId)
      store.dispatch('getOtherUser', userId)
        .then(() => {
          this.loaded = true
        })
    },
    sendMessage () {
      store.dispatch('sendMessage', {
        userId: this.userId,
        content: this.messageToSend
      })
        .then(() => {
          this.messageToSend = ''
          store.dispatch('getMessages')
            .then(() => {
              store.dispatch('getAllUsers')
            })
            .catch(error => {
              store.commit('setErrorMessage', error)
            })
        })
        .catch(error => {
          store.commit('setErrorMessage', error)
        })
    }
  }
}
</script>

<style scoped>
@import '../styles/pages/messages.css';
</style>
