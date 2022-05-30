import React from 'react'

export default function CreatPost() {
  return (
    <div class="post create-post">
      <label for="creat-post-field">Créez un poste</label>
      <input type="text" id="create-post-field" class="text-field" name="creat-post-field" placeholder="Quoi de neuf?"></input>
      <div class="create-post-footer">
        <button>Ajouter une image</button>
      </div>
    </div>
  )
}
