<template>
  <div>
    <div class="post">
      <div class="picture-modal" v-if="imageZoom === true" @click="imageZoom = false" title="cliquez pour fermer">
        <div class="picture-modal-bg"></div>
        <v-img aspect-ratio="1" class="picture-modal-img" v-if="postImage !== ''" :src="postImage" transition="scale-transition"></v-img>
      </div>
      <div class="post-main" :id="`post_${postId}`">
        <div class="post-header">
          <div class="post-header-section">
            <!-- Pfhoto de profil -->
            <v-avatar  class="post-avatar" size="45" @click="profileMenu = !profileMenu">
              <v-img aspect-ratio="1" v-if="userPicture === ''" src="../assets/user.jpg"></v-img>
              <v-img aspect-ratio="1" v-else :src="userPicture" cover class="post-avatar-img"></v-img>
            </v-avatar>
            <!-- Menu de navigation utilisateur profil/messages -->
            <div class="user-menu" v-if="profileMenu === true" @mouseleave="profileMenu = false">
              <v-btn block class="mod user-menu-btn" @click="() => {
                  if (userId !== this.$store.state.user.userId) {
                    this.$router.push('/user/' + userId)
                  } else {
                    this.$router.push('my-profile/')
                  }
                }">Voir le profil</v-btn>
              <v-btn block class="mod user-menu-btn" @click="this.$router.push('/messages/')">Envoyer un message</v-btn>
            </div>
            <div>
              <h3 @click="profileMenu = !profileMenu">{{ userName }}</h3>
              <p>{{ postDate }}</p>
            </div>
          </div>
          <div class="post-header-section" v-if="userId === this.$store.state.user.userId || this.$store.state.user.isAdmin">
            <v-btn
              class="post-header-btn mod"
              depressed
              @click="() => { if (mode === 'change') {
                mode = ''
                } else {
                  postChanges = postContent
                  mode = 'change' }
                }"
            >
              Modifier
            </v-btn>
            <v-btn
              class="post-header-btn del"
              depressed
              @click="mode = 'delete'"
            >
              Supprimer
            </v-btn>
          </div>
        </div>
        <div v-if="mode === 'delete'" class="post-delete">
          <v-icon color="red">mdi-alert</v-icon>
          <h3>
            Êtes-vous sûr(e) de vouloir suprimer ce post?
          </h3>
          <v-btn class="post-header-btn mod" @click="deletePost(postId)">Oui</v-btn>
          <v-btn class="post-header-btn del" @click="mode = ''">Non</v-btn>
        </div>
        <v-text-field
        v-if="mode === 'change'"
        class="post-content"
        v-model="postChanges"
        label="Modifiez le post et appuyez sur 'Entrée'"
        v-on:keyup.enter="submitModifyPost(postId)"
        >
        </v-text-field>
        <v-file-input
          accept="image/png, image/jpeg, image/jpg, image/gif"
          v-if="mode === 'change'"
          class="mod btn-img"
          label="Image"
          title="Ajoutez une image"
          v-model="picture"
          prepend-icon="mdi-camera"
          density="compact"
        ></v-file-input>
        <div v-else class="post-content">
          {{ postContent }}
        </div>
        <a v-if="postImage != '' && postImage != null" class="post-img" @click="imageZoom = true">
          <img :src="postImage" :alt="postContent" title="Cliquez pour aggrandir l'image">
        </a>
        <div class="post-footer">
          <div class="post-likes" @click="likePost(postId, liked)">
            <v-btn
              icon
              small
              color="white"
              class="post-likes-notliked"
              v-if="liked === false"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="white"
              class="post-likes-liked"
              v-else
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <p>{{ likesNumber }}</p>
          </div>
          <p v-if="comments.length > 1">{{ comments.length }} commentaires</p>
          <p v-else>{{ comments.length }} commentaire</p>
        </div>
        <div class="post-comment-add">
          <v-avatar  class="post-comment-avatar" size="40" >
            <v-img aspect-ratio="1" v-if="this.$store.state.userInfos.profilePicture === ''" src="../assets/user.jpg" cover class="post-avatar-img"></v-img>
            <v-img aspect-ratio="1" v-else :src="this.$store.state.userInfos.profilePicture" cover class="post-avatar-img"></v-img>
          </v-avatar>
          <v-text-field
          class="post-comment-add-text"
          v-model="addComment"
          label="Tapez un commentaire puis appuyez sur entrée pour le poster"
          v-on:keyup.enter="submitComment(postId)">
            <p v-if="addComment.length < 255" class="word-count">
              {{ addComment.length }}/255
            </p>
            <p v-else class="word-count word-count-red">
              {{ addComment.length }}/255
            </p>
          </v-text-field>
        </div>
        <Comment class="post-comments"
          v-for="comment of comments"
          :key="comment.id"
          :commentId="comment.id" :commentUserName="comment.User.firstName + ' ' + comment.User.lastName"
          :commentUserPicture="comment.User.profilePicture" :commentContent="comment.content" :commentUserId="comment.User.id" :commentDate="comment.createdAt"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Comment from './Comment.vue'

export default {
  name: 'PostElement',
  props: [
    'postId', 'userPicture', 'userName', 'userId', 'postDate', 'postImage', 'postContent', 'likesNumber', 'comments', 'liked'
  ],
  components: {
    Comment
  },
  data () {
    return {
      profileMenu: false,
      imageZoom: false,
      mode: '',
      postChanges: '',
      picture: [],
      addComment: ''
    }
  },
  methods: {
    deletePost (postId) {
      this.$store.dispatch('deletePost', postId)
    },
    submitComment (postId) {
      this.$store.dispatch('commentPost', {
        postId: postId,
        content: this.addComment
      })
        .then(() => {
          this.addComment = ''
        })
    },
    submitModifyPost (postId) {
      console.log(this.picture[0], this.postChanges)
      this.$store.dispatch('modifyPost', {
        postId: postId,
        content: this.postChanges,
        image: this.picture[0]
      })
        .then(() => {
          this.mode = ''
        })
    },
    likePost (postId, postLiked) {
      console.log(postId, postLiked)
      let like
      if (postLiked) {
        like = 0
      } else {
        like = 1
      }
      this.$store.dispatch('likePost', {
        postId: postId,
        like: like
      })
    }
  }
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
  @import '../styles/comment.css';
</style>
