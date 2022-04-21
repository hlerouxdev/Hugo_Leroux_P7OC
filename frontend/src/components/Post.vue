<template>
  <div>
    <div
    class="post">
      <div class="post-main" :id="`post_${postId}`">
        <div class="post-header">
          <div class="post-header-section">
            <v-avatar  class="post-avatar" size="45" >
              <v-img v-if="userPicture === ''" src="../assets/user.jpg"></v-img>
              <v-img v-else :src="userPicture" cover class="post-avatar-img"></v-img>
            </v-avatar>
            <div>
              <h3>{{userName}}</h3>
              <p>{{postDate}}</p>
            </div>
          </div>
          <div class="post-header-section" v-if="userId === this.$store.state.user.userId || this.$store.state.user.isAdmin">
            <v-btn
              class="post-header-btn mod"
              depressed
            >
              Modifier
            </v-btn>
            <v-btn
              class="post-header-btn del"
              depressed
              @click="deletePost(PostId)"
            >
              Supprimer
            </v-btn>
          </div>
        </div>
        <div class="post-content">
          {{postContent}}
        </div>
        <a v-if="postImage != ''" class="post-img" :href="postImage" target="_blank">
          <img :src="postImage" alt="">
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
            <p>{{likesNumber}}</p>
          </div>
          <p>{{comments.length}} commentaire</p>
        </div>
        <!-- <div class="post-comments" v-if="addCommentId != null && addCommentId == postId">
        </div> -->
        <div class="post-comment-add">
          <v-avatar  class="post-comment-avatar" size="40" >
            <v-img v-if="this.$store.state.userInfos.profilePicture === ''" src="../assets/user.jpg" cover class="post-avatar-img"></v-img>
            <v-img v-else :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
          </v-avatar>
          <v-text-field
            class="post-comment-add-text"
            v-model="addComment"
            label="Tapez un commentaire puis appuyez sur entrée pour le poster"
            v-on:keyup.enter="submitComment(postId)">
          </v-text-field>
        </div>
        <div class="post-comments"
          v-for="comment of comments"
          :key="comment.id">
          <div class="post-comment" :id="`comment_${comment.id}`">
            <v-avatar  class="post-comment-avatar" size="40" @click="commentMenu = !commentMenu">
              <v-img v-if="comment.User.profilePicture === ''" src="../assets/user.jpg"></v-img>
              <v-img v-else :src="comment.User.profilePicture" cover class="post-avatar-img"></v-img>
            </v-avatar>
            <div class="comment-user-menu user-menu" v-if="commentMenu === true">
              <h4>{{comment.User.firstName + ' ' + comment.User.lastName}}</h4>
              <v-btn block class="mod user-menu-btn">Voir le profil</v-btn>
              <v-btn block class="mod user-menu-btn">Envoyer un message</v-btn>
            </div>
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
  props: [
    'postId', 'userPicture', 'userName', 'userId', 'postDate', 'postImage', 'postContent', 'likesNumber', 'comments'
  ],
  data () {
    return {
      commentMenu: false,
      offset: true,
      addComment: '',
      items: [
        { title: 'Voir le profil' },
        { title: 'Envoyer un message' }
      ]
    }
  },
  methods: {
    deletePost (postId) {
      this.$store.dispatch('deletePost', postId)
        .then(() => {
          this.$store.dispatch('getAllPosts')
        })
    },
    submitComment (postId) {
      this.$store.dispatch('commentPost', {
        postId: postId,
        content: this.addComment
      })
    }
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
</style>
