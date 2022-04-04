<template>
  <div class="main">
    <div class="main profile-form" v-if="change ===  true">
      <div class="profile-form-bg"></div>
      <v-form class="profile-form-container" v-if="mode === 'picture'">
        <v-btn @click="change = false; mode = ''" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Sélectionner une nouvelle photo de profile"
          @click="changeProfilePicture"
        ></v-file-input>
        </v-container>
      </v-form>
      <v-form class="profile-form-container" v-if="mode === 'profile'">
        <v-btn @click="change = false; mode = ''" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <v-text-field
            v-model="form.firstName"
            label="Prénom"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="form.lastName"
            label="Nom de famille"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="form.adress"
            label="Adresse"
          ></v-text-field>
          <v-text-field
            v-model="form.department"
            label="Département"
          ></v-text-field>
          <v-btn block @click="changeProfile">
          Changer les informations
          </v-btn>
        </v-container>
      </v-form>
      <v-form class="profile-form-container" v-if="mode === 'password'">
        <v-btn @click="change = false; mode = ''" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <v-text-field
            v-model="formPass.newPass1"
            label="Nouveau mot de passe"
          ></v-text-field>
          <v-text-field
            v-model="formPass.newPass2"
            label="Confirmation du nouveau mot de passe"
          ></v-text-field>
          <v-text-field
            v-model="formPass.password"
            label="Mot de passe"
          ></v-text-field>
          <v-btn block @click="changePassword">
          Changer le mot de passe
          </v-btn>
        </v-container>
      </v-form>
      <v-form class="profile-form-container" v-if="mode === 'delete'">
        <v-btn @click="change = false; mode = ''" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <h2>Cette action est irreversible. Êtes-vous sûr de bien vouloir supprimer votre compte?</h2>
          <div>
            <v-btn @click="deleteProfile">
              Oui Je suis sûr!
            </v-btn>
            <v-btn @click="change = false; mode = ''">
              Non, Annulez!
            </v-btn>
          </div
          >
        </v-container>
      </v-form>
    </div>
    <div class="profile-infos">
      <div class="profile-infos_left">
        <v-avatar rounded size="150" class="profile-infos_left_avatar">
          <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture"></v-img>
          <v-img v-else  src="../assets/user.jpg"></v-img>
        </v-avatar>
        <div class ="base-infos">
          <h1>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h1>
          <p>E-mail: {{this.$store.state.userInfos.email}}</p>
          <p>Adresse: {{this.$store.state.userInfos.adress}}</p>
          <p>Fonction: {{this.$store.state.userInfos.department}}</p>
        </div>
        <div class="button-group">
          <v-btn prepend-icon="mdi-camera" class="mod button" @click="change = true; mode ='picture'">Modifier la photo de profile</v-btn>
          <v-btn class="mod button" @click="change = true; mode ='profile'">Modifier le Profile</v-btn>
          <v-btn class="mod button" @click="change = true; mode ='password'">Changer le mot de passe</v-btn>
          <v-btn class="del button" @click="change = true; mode ='delete'">Supprimer le compte</v-btn>
        </div>
      </div>
      <div class="profile-infos_right">
        <div class="post">
          <div class="post-main">
            <div class="post-header">
              <div class="post-header-section">
                <v-avatar  class="post-avatar" size="45" >
                  <v-img src="../assets/user.jpg"></v-img>
                </v-avatar>
                <div>
                  <h3>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h3>
                  <p>une date</p>
                </div>
              </div>
              <div class="post-header-section">
                <v-btn
                  class="post-header-btn"
                  depressed
                  color="primary"
                >
                  Modifier
                </v-btn>
                <v-btn
                  class="post-header-btn"
                  depressed
                  color="error"
                >
                  Supprimer
                </v-btn>
              </div>
            </div>
            <div class="post-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum est dolores ipsam architecto repellendus dolor obcaecati tempore modi fugiat, earum temporibus praesentium adipisci, quasi sint? Eius fuga, iste, et porro voluptatum soluta odio ab obcaecati commodi quasi inventore. Sequi provident architecto aspernatur voluptas impedit officia eaque itaque voluptates autem blanditiis quibusdam magni quos cupiditate, soluta minus iste nobis ex veniam commodi. Minus est earum unde at non laborum quisquam voluptas illo hic dolor! Reprehenderit pariatur velit, fugit sed adipisci beatae?
            </div>
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
                <p>1</p>
              </div>
              <v-btn
                class="post-btn"
                elevation="2"
                plain
                raised
                small
              >Ajouter un Commentaire</v-btn>
              <p>1 commentaire</p>
            </div>
            <div class="post-comments">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default ({
  name: 'ProfilePage',
  data () {
    return {
      mode: '',
      change: false,
      form: {
        firstName: this.$store.state.userInfos.firstName,
        lastName: this.$store.state.userInfos.lastName,
        email: this.$store.state.userInfos.email,
        adress: this.$store.state.userInfos.adress,
        department: this.$store.state.userInfos.department
      },
      formPass: {
        newPass1: '',
        newPass2: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'Ce champs doit être rempli',
        v => /.+@.+/.test(v) || 'L\'E-mail doit être valide'
      ],
      nameRules: [
        v => !!v || 'Ce champs doit être rempli',
        v => v.length <= 2 || 'Ce nom est trop court'
      ]
    }
  },
  mounted: function () {
    if (this.$store.state.user.userId < 1) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('getUser')
    }
  },
  methods: {
    deleteProfile () {
      console.log('bye bye account')
    },
    changeProfile () {
      console.log('test change 1')
      this.$store
        .dispatch('changeUserInfos', {
          form: this.form,
          user: this.$store.state.user.userId
        })
        .then(() => {
          console.log('test change 2')
          this.change = false
          this.mode = ''
        })
        .catch(error => { console.log(error) })
    },
    changePassword () {
      console.log('password change')
    },
    changeProfilePicture () {
      console.log('pp change')
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
.profile-infos{
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  box-shadow: #ccccd8 0 0 20px 5px;
  }
  .profile-infos_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    box-shadow: #ccccd8 0 0 20px 5px;
  }
  .profile-infos_left h1{
    margin: 20px 0 20px 0px;
  }
  .profile-infos_ .v-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-infos_left_avatar {
    margin-top: 20px;
    box-shadow: #ccccd8 0 0 20px 5px;
  }
  .base-infos {
    margin-bottom: 30px;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 150px;
    margin-top: 20px;
  }
  :deep(.button) {
    margin-top: 26px;
    color: white;
    width: 100%;
    overflow: hidden;
  }
  .mod {
    background-color: #2196f3
  }
  .del {
    background-color: red;
  }
  .profile-infos_right {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 66%;
    overflow-y: scroll;
  }
  .profile-form {
    position:absolute;
  }
  .profile-form-bg {
    background-color: black;
    opacity: 50%;
    height: 100%;
    width: 100%;
    z-index: 5;
  }
  .profile-form-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 6;
    width: 50%;
    border-radius: 10px;
  }
  .close-btn {
    margin-left: calc(100% - 64px);
    margin-top: -66px;
  }
  .post {
    box-shadow: #ccccd8 0 0 20px 5px;
    margin: 20px;
    border-radius: 10px;
  }
  .post-main {
    margin: 30px;
  }
  .post-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .post-header-section {
    display: flex;
    align-items: center;
  }
  .post-avatar {
    box-shadow: #ccccd8 0 0 5px 2px;
    margin-right: 20px;
  }
  .post-header-btn {
    margin-left: 20px;
  }
  .post-content {
    margin-bottom: 20px;
    text-align: justify;
  }
  .post-footer {
    margin-bottom: 20px;
    border-top: solid 2px #ccccd8;
    border-bottom: solid 2px #ccccd8;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-likes {
    display: flex;
    align-items: center;
  }
  .post-likes-btn {
    margin: 10px 20px 10px 0;
  }
  .post-btn {
    margin: 10px;
  }
  .post-comment {
    display: flex;
  }
  .post-comment-avatar {
    box-shadow: #ccccd8 0 0 5px 2px;
  }
  .post-comment-main {
    max-width: calc(100% - 50px);
    margin-left: 10px;
    border-radius: 20px;
    background-color: #ccccd8;
  }
  .post-comment-content {
    margin: 10px;
    text-align: justify;
  }
</style>
