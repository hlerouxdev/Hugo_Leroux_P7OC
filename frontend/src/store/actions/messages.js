exports.getMessages = ({ commit, state, dispatch }) => {
  instance.get('/messages/')
    .then(res => {
      res.data.forEach(message => {
        if (message.senderId !== state.user.userId) {
          dispatch('getMessageUserInfos', message.senderId)
        } else {
          dispatch('getMessageUserInfos', message.receiverId)
        }
        message.createdAt = moment(message.updatedAt).format('[posté le] Do MMMM YYYY [à] HH:mm')
      })
      commit('setMessages', res.data)
    })
    .catch(error => {
      commit('setErrorMessage', error.message)
    })
},
exports.getMessageUserInfos = ({ commit, state }, userId) => {
  let here = false
  state.messagesUsers.forEach(userHere => {
    if (userHere.id === userId) {
      here = true
    }
  })
  if (here === false) {
    instance.get('/auth/user/' + userId)
      .then(user => {
        commit('addMessageUser', user.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
},
exports.sendMessage = ({ commit, dispatch }, { userId, content }) => {
  instance.post('/messages/' + userId, { content })
    .then(() => {
      dispatch('getMessages')
    })
    .catch(error => {
      commit('setErrorMessage', error.message)
    })
}
