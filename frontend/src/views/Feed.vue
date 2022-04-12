<template>
  <div class="main">
    <div class="main-view">
      <CreatePost v-if="this.$store.state.user.userId >= 1"/>
      <Post/>
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
    this.$store.dispatch('getUser')
    this.$store.dispatch('getAllPosts')
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
}
  .main-view{
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #d8d8d8;
  box-shadow: #3e3e3e 0 0 5px 2px;
  }
</style>
