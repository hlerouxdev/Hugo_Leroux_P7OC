<template>
  <div>
    <div
    class="post"
    v-for="post of this.$store.state.allPosts"
    :key="post.id">
      <div class="post-main" v-if="post.content" :id="`post_${post.id}`">
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
          <div class="post-header-section" v-if="post.UserId === this.$store.state.user.userId || this.$store.state.user.isAdmin">
            <v-btn
              class="post-header-btn mod"
              depressed
            >
              Modifier
            </v-btn>
            <v-btn
              class="post-header-btn del"
              depressed
              @click="deletePost(post.id)"
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
          <p>{{post.Comments.length}} commentaire</p>
        </div>
        <div class="post-comments" v-if="addCommentId != null && addCommentId == post.id">
        </div>
        <div class="post-comments"
          v-for="comment of post.Comments"
          :key="comment.id">
          <div class="post-comment" :id="`comment_${comment.id}`">
            <v-menu
              top
              :offset-x="offset"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                TEST
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>test 1</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>test 2</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
        <div class="post-comment-add">
          <v-avatar  class="post-comment-avatar" size="40" >
            <v-img v-if="this.$store.state.userInfos.profilePicture === ''" src="../assets/user.jpg" cover class="post-avatar-img"></v-img>
            <v-img v-else :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
          </v-avatar>
          <v-text-field
            class="post-comment-add-text"
            v-model="addComment"
            label="Ajouter un commentaire">
          </v-text-field>
        </div>
        <v-btn class="post-btn mod">Poster le Commentaire</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostElement',
  data () {
    return {
      offset: true,
      addCommentId: null,
      addComment: ''
    }
  },
  methods: {
    deletePost (postId) {
      this.$store.dispatch('deletePost', postId)
        .then(() => {
          this.$store.dispatch('getAllPosts')
        })
    }
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
</style>
