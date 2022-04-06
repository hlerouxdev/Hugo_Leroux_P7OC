<template>
  <div class="main">
    <div class="main-view">
      <CreatePost />
      <Post />
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
  mounted: function () {
    if (this.$store.state.user.userId < 1) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getUser')
    }
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
  .main-view{
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #d8d8d8;
  box-shadow: #3e3e3e 0 0 5px 2px;
  }
</style>
