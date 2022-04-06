<template>
  <div class="post">
          <div class="post-main">
            <div class="post-header">
              <div class="post-header-section">
                <v-avatar rounded size="45" class="post-avatar">
                  <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture"></v-img>
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
            <div post-create-buttons>
              <v-btn
                small
              >
                Ajouter une Image
              </v-btn>
              <v-btn
                small
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
  createPost () {
    this.$store
      .dispatch('createPost', this.form)
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
</style>
