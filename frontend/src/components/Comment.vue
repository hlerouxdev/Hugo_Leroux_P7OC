<template>
  <div class="post-comment" :id="`comment_${commentId}`">
    <v-avatar  class="post-comment-avatar" size="40" @click="commentMenu = !commentMenu">
      <v-img v-if="commentUserPicture === ''" src="../assets/user.jpg"></v-img>
      <v-img v-else :src="commentUserPicture" cover class="post-avatar-img"></v-img>
    </v-avatar>
    <div class="comment-user-menu user-menu" v-if="commentMenu === true">
      <h4>{{ commentUserName }}</h4>
      <v-btn block class="mod user-menu-btn">Voir le profil</v-btn>
      <v-btn block class="mod user-menu-btn">Envoyer un message</v-btn>
    </div>
    <div class="post-comment-main" @mouseover="showEdit = true" @mouseleave="showEdit = false">
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
  </div>
</template>

<script>
export default {
  name: 'CommentElement',
  props: [
    'commentId', 'commentUserName', 'commentUserPicture', 'commentContent', 'commentUserId'
  ],
  data () {
    return {
      showEdit: false,
      edit: false,
      commentMenu: false,
      commentChanges: '',
      items: [
        { title: 'Voir le profil' },
        { title: 'Envoyer un message' }
      ]
    }
  },
  methods: {
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
