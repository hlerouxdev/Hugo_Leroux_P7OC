import { instance } from '../axios'

exports.commentPost =
  ({ commit, dispatch }, { postId, content }) => {
    console.log(postId)
    instance.post(`/posts/comment/${postId}`, { content })
      .then(res => {
        commit('setSuccessMessage', res.data.message)
        dispatch('refresh')
      })
      .catch(error => {
        commit('setErrorMessage', error.message)
      })
  }
