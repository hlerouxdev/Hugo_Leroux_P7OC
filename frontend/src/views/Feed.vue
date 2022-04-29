<template>
  <div class="main">
    <div class="main-view">
      <CreatePost v-if="mode !== 'search'"/>
      <Post
      class="posts-container"
      v-for="post of this.$store.state.allPosts"
      :key="post.id"
      :postId="post.id" :userName="post.User.firstName + ' ' + post.User.lastName" :userPicture="post.User.profilePicture" :userId="post.UserId" :liked="post.liked"
      :postDate="post.createdAt" :postImage="post.filePath" :postContent="post.content" :likesNumber="post.Likes.length" :comments="post.Comments"
      />
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import CreatePost from '../components/PostCreate.vue'

export default ({
  components: {
    CreatePost, Post
  },
  name: 'FeedPage',
  data () {
    return {
      mode: ''
    }
  },
  mounted: function () {
    this.$store.dispatch('getUser')
    this.$store.dispatch('getAllPosts')
  }
})
</script>

<style scoped>
  @import '../styles/pages/feed.css';
</style>
