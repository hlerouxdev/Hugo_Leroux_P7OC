import React from 'react'
import Comment from './Comment'
import moment from 'moment'

moment.locale('fr')

export default function Post({ post }) {
  return (
    <>
      <div class="post-header">
        <img class="post-user-avatar" src={post.User.profilePicture} alt={post.User.firstName + ' ' + post.User.lastName}></img>
        <div class="post-header-infos">
          <h2 class="post-user-name">
            {post.User.firstName + ' ' + post.User.lastName}
          </h2>
          <p>
            posté le { moment(post.createdAt).format('Do MMMM YYYY [à] HH:mm') }
          </p>
        </div>
      </div>
      <h3>
        {post.content}
      </h3>
      <img
        class="post-image"
        src={post.filePath} alt={post.content + ' ' + post.User.firstName + ' ' + post.User.lastName}
        style={{ display: post.filePath !== '' ? 'block' : 'none' }}
        title="Cliquez pour aggrandire l'image"
        >
      </img>
      <div class="post-line"></div>
      <div class="post-footer">
        <div class="likes">
          <p>{post.Likes.length}</p>
          <i class={ post.liked ? "fa-solid fa-thumbs-up liked" : "fa-solid fa-thumbs-up not-liked" } title={ post.liked ? "Enlever un like" : "Ajouter un like" }></i>
        </div>
        <p>{post.Comments.length} commentaires</p>
      </div>
      <div class="post-line"></div>
      <div class="add-comment">
        <img class="comment-user-avatar" src={post.User.profilePicture} alt={post.User.firstName + ' ' + post.User.lastName}></img>
        <input type="text" id="add-comment-field" class="text-field" name="fname" placeholder="Appuyez sur entrée pour ajouter un commentaire">
        </input>
      </div>
      {
        post.Comments.map((comment) => (
          <ol key={comment.id} class="comment">
            <Comment comment={ comment } />
          </ol>
        ))
      }
    </>
  )
}
