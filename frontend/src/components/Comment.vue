<template>
  <div class="post-comment" :id="`comment_${commentId}`">
    <v-avatar  class="post-comment-avatar" size="40" @click="commentMenu = !commentMenu">
      <v-img aspect-ratio="1" v-if="commentUserPicture === ''" src="../assets/user.jpg"></v-img>
      <v-img aspect-ratio="1" v-else :src="commentUserPicture" cover class="post-avatar-img"></v-img>
    </v-avatar>
    <!--  -->
    <div class="user-menu" v-if="commentMenu === true" @mouseleave="commentMenu = false" transition="scale-transition">
      <v-btn
      block class="mod user-menu-btn"
      @click="() => {
          if (commentUserId !== this.$store.state.user.userId) {
            this.$router.push('/user/' + commentUserId)
          } else {
            this.$router.push('my-profile/')
          }
        }">
          Voir le profil
        </v-btn>
      <v-btn
      block class="mod user-menu-btn"
      v-if="commentUserId !== this.$store.state.user.userId"
      @click="this.$router.push('/messages/' + commentUserId)">Envoyer un message</v-btn>
    </div>
    <div class="post-comment-infos">
      <div class="post-comment-main" @click="showEdit = !showEdit" title="Cliquez pour modifier">
      <div class="post-comment-content">
        <h4>{{ commentUserName }}</h4>
        <v-text-field
        class="comment-text-field"
        v-if="edit === true"
        v-model="commentChanges"
        label="Modifiez le commentaire et appuyez sur 'Entrée'"
        v-on:keyup.enter="submitModifyComment(commentId)"
        >
        </v-text-field>
        <p v-else>{{ commentContent }}</p>
      </div>
      <div class="comment-edit" v-if="showEdit === true && (commentUserId === this.$store.state.user.userId || this.$store.state.user.isAdmin === true)">
        <v-icon class="comment-icon comment-icon-edit" @click="() => {
          edit = !edit
          commentChanges = commentContent
        }">mdi-grease-pencil</v-icon>
        <v-icon class="comment-icon comment-icon-delete" @click="submitDeleteComment(commentId)">mdi-delete</v-icon>
      </div>
    </div>
    <p class="comment-date">{{ commentDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentElement',
  props: [
    'commentId', 'commentUserName', 'commentUserPicture', 'commentContent', 'commentUserId', 'commentDate'
  ],
  data () {
    return {
      showEdit: false,
      edit: false,
      commentMenu: false,
      commentChanges: '',
      items: [
        { title: 'Voir le profil', link: this.redirProfile },
        { title: 'Envoyer un message', link: this.redirMessage }
      ]
    }
  },
  methods: {
    redirProfile () {
    },
    redirMessage () {
    },
    submitDeleteComment (commentId) {
      this.$store.dispatch('deleteComment', commentId)
    },
    submitModifyComment (commentId) {
      console.log(commentId, this.commentChanges)
      this.$store.dispatch('modifyComment', {
        commentId: commentId,
        content: this.commentChanges
      })
        .then(() => {
          this.showEdit = false
          this.edit = false
          this.commentChanges = ''
        })
    }
  }
}
</script>
