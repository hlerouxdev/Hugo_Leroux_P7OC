<template>
<div>
  <div
  class="post"
  v-for="post in this.$store.state.allPosts"
  :key="post.id">
    <div class="post-main">
      <div class="post-header">
        <div class="post-header-section">
          <v-avatar  class="post-avatar" size="45" >
            <v-img src="../assets/user.jpg"></v-img>
          </v-avatar>
          <div>
            <h3>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h3>
            <p>{{post.createdAt}}</p>
          </div>
        </div>
        <div class="post-header-section">
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
        >Ajouter un Commentaire</v-btn>
        <p>1 commentaire</p>
      </div>
      <!-- <div class="post-comments">
        <div class="post-comment">
          <v-avatar  class="post-comment-avatar" size="40" >
            <v-img src="../assets/user.jpg"></v-img>
          </v-avatar>
          <div class="post-comment-main">
            <div class="post-comment-content">
              <h4>utilisateur commentaire</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dignissimos laboriosam necessitatibus? Quaerat voluptate fugit iste harum nostrum perferendis impedit illum magni, veritatis earum. Amet in fugiat aut magnam ab, assumenda ducimus dolore est maxime explicabo illum, inventore quis error repellat tempora sed sint laboriosam? Vel, explicabo repellat corporis libero officiis iste rerum sequi enim at nobis aliquam molestias? Ipsum cupiditate possimus minima quas iure asperiores error, laboriosam nemo, et enim totam vitae soluta mollitia exercitationem molestiae perferendis quae iusto!</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PostElement'
}
</script>

<style scoped>
  @import '../styles/post.css';
  @import '../styles/buttons.css';
</style>
