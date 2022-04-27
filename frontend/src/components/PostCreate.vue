<template>
  <div class="post">
    <div class="post-main">
      <div class="post-header">
        <div class="post-header-section">
          <v-avatar rounded size="45" class="post-avatar">
            <v-img aspect-ratio="1" v-if="this.$store.state.userInfos.profilePicture != '' ||
              this.$store.state.userInfos.profilePicture == null" :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
            <v-img aspect-ratio="1" v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
          <h3>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h3>
        </div>
      </div>
      <v-text-field
      class="post-content"
      v-model="form.content"
      label="Créez un nouveau post"
      v-on:keyup.enter="createPost"
      >
      </v-text-field>
      <div class="post-create-buttons">
        <v-file-input
          accept="image/png, image/jpeg, image/jpg"
          v-model="form.image"
          class="mod btn-img"
          label="Image"
          prepend-icon="mdi-camera"
          density="compact"
        ></v-file-input>
        <v-btn
          v-if="form.content === '' || form.content.length > 255"
          small
          disabled
          class="create-btn"
          @click="createPost"
        >
          Créer un Poste
        </v-btn>
        <v-btn
          v-else
          small
          class="mod create-btn"
          @click="createPost"
        >
          Créer un Poste
        </v-btn>
        <p v-if="form.content.length < 255" class="word-count">
          {{ form.content.length }}/255
        </p>
        <p v-else class="word-count word-count-red">
          {{ form.content.length }}/255
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostCreate',
  data () {
    return {
      form: {
        content: '',
        image: []
      }
    }
  },
  methods: {
    createPost () {
      const data = {
        content: this.form.content,
        image: this.form.image[0]
      }
      this.$store.dispatch('createPost', data)
        .then(() => {
          this.form = {
            content: '',
            image: []
          }
        })
    }
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
</style>
