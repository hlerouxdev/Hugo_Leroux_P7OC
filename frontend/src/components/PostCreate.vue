<template>
  <div class="post">
          <div class="post-main">
            <div class="post-header">
              <div class="post-header-section">
                <v-avatar rounded size="45" class="post-avatar">
                  <v-img v-if="this.$store.state.userInfos.profilePicture != '' ||
                    this.$store.state.userInfos.profilePicture == null" :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
                  <v-img v-else  src="../assets/user.jpg"></v-img>
                </v-avatar>
                <h3>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h3>
              </div>
            </div>
            <v-text-field
            class="post-content"
            v-model="form.content"
            label=""
            >
            </v-text-field>
            <div class="post-create-buttons">
              <v-btn
                prepend-icon="mdi-camera"
                class="mod create-btn picture-btn"
              >Ajoutez une image</v-btn>
              <v-btn
                small
                class="mod create-btn"
                @click="createPost"
              >
                Créer un Poste
              </v-btn>
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
        filePath: ''
      }
    }
  },
  methods: {
    createPost () {
      this.$store
        .dispatch('createPost', this.form)
    }
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
  .post-create-buttons{
    display: flex;
  }
</style>
