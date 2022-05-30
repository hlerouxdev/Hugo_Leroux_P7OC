import React from 'react'
import moment from 'moment'

moment.locale('fr')

export default function Comment({ comment }) {
  return (
    <>
      <img
        src={ comment.User.profilePicture }
        alt={ comment.User.firstName + comment.User.lastName }
        class="comment-user-avatar">
      </img>
      <div>
        <div class="comment-main">
          <h4>
            { comment.User.firstName + ' ' + comment.User.lastName }
          </h4>
          <p>
            { comment.content }
          </p>
        </div>
        <p class="comment-date">
          { moment(comment.createdAt).calendar() }
        </p>
      </div>
    </>
  )
}
