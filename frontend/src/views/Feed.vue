<template>
  <div class="main">
    <div class="main-view">
    </div>
  </div>
</template>

<script>

export default ({
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
  justify-content: space-between;
  background-color: white;
  box-shadow: #ccccd8 0 0 20px 5px;
  }
</style>
