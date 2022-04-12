<template>
<div>
  <div
  class="post"
  v-for="post of this.$store.state.allPosts"
  :key="post.id">
    <div class="post-main" v-if="post.content">
      <div class="post-header">
        <div class="post-header-section">
          <v-avatar  class="post-avatar" size="45" >
            <v-img v-if="post.User.profilePicture === ''" src="../assets/user.jpg"></v-img>
            <v-img v-else :src="post.User.profilePicture" cover class="post-avatar-img"></v-img>
          </v-avatar>
          <div>
            <h3>{{post.User.firstName + ' ' + post.User.lastName}}</h3>
            <p>{{post.createdAt}}</p>
          </div>
        </div>
        <div class="post-header-section" v-if="post.UserId === this.$store.state.user.userId">
          <v-btn
            class="post-header-btn mod"
            depressed
          >
            Modifier
          </v-btn>
          <v-btn
            class="post-header-btn del"
            depressed
          >
            Supprimer
          </v-btn>
        </div>
      </div>
      <div class="post-content">
        {{post.content}}
      </div>
      <a v-if="post.filePath != ''" class="post-img" :href="post.filePath" target="_blank">
        <img :src="post.filePath" alt="">
      </a>
      <div class="post-footer">
        <div class="post-likes">
          <v-btn
            icon
            small
            color="white"
            class="post-likes-btn"
          >
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          <p>{{post.likes}}</p>
        </div>
        <v-btn
          class="post-btn mod"
          elevation="2"
          plain
          raised
          small
          @click="showAddComment"
        >Ajouter un Commentaire</v-btn>
        <p>{{post.Comments.length}} commentaire</p>
      </div>
      <div class="post-comments" v-if="addComment == true">
        <v-text-field
          class="post-content"
          v-model="comment.content"
          label="">
        </v-text-field>
        <v-btn class="post-btn mod">Poster le Commentaire</v-btn>
      </div>
      <div class="post-comments"
        v-for="comment of post.Comments"
        :key="comment.id">
        <div class="post-comment">
          <v-avatar  class="post-comment-avatar" size="40" >
            <v-img v-if="comment.User.profilePicture === ''" src="../assets/user.jpg"></v-img>
            <v-img v-else :src="comment.User.profilePicture" cover class="post-avatar-img"></v-img>
          </v-avatar>
          <div class="post-comment-main">
            <div class="post-comment-content">
              <h4>{{comment.User.firstName + ' ' + comment.User.lastName}}</h4>
              <p>{{comment.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PostElement',
  data () {
    return {
      addComment: false,
      comment: {
        content: ''
      }
    }
  },
  methods: {
    showAddComment () {
      this.addComment = !this.addComment
    }
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
</style>
