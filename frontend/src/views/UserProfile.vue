<template>
  <div class="profile-main">
    <div class="profile-main profile-form" v-if="change ===  true">
      <div class="profile-form-bg"></div>
      <v-form class="profile-form-container" v-if="mode === 'picture'">
        <v-btn @click="change = false; mode = ''" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <v-avatar rounded size="200" class="profile-infos_left_avatar form-avatar">
            <v-img aspect-ratio="1" cover v-if="this.$store.state.otherUser.profilePicture != ''"
              :src="this.$store.state.otherUser.profilePicture"
              :href="this.$store.state.otherUser.profilePicture"
              target="_blank"
              ></v-img>
            <v-img aspect-ratio="1" v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
          <v-file-input
          accept="image/png, image/jpeg, image/jpg"
          v-model="profilePicture"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Sélectionner une nouvelle photo de profil"
          class="form-profile-picture"
        ></v-file-input>
        <v-btn @click="changeProfilePicture(userId)" class="form-button mod">
          Changer la photo de profil
          </v-btn>
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
          <v-text-field
            v-model="form.bio"
            label="à propos"
          ></v-text-field>
          <v-btn @click="changeProfile(userId)" class="form-button mod">
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
          <v-btn @click="changePasswor(userId)" class="form-button mod">
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
          <div class="form-row">
            <v-btn @click="deleteUser(userId)" class="form-button del">
              Oui Je suis sûr!
            </v-btn>
            <v-btn @click="change = false; mode = ''" class="form-button mod">
              Non, Annulez!
            </v-btn>
          </div
          >
        </v-container>
      </v-form>
    </div>
    <div class="profile-infos">
      <div class="profile-infos_left" v-if="loaded === true">
        <div class="profile-infos_left_presentation">
          <v-avatar rounded size="150" class="profile-infos_left_avatar">
            <v-img aspect-ratio="1" v-if="this.$store.state.otherUser.profilePicture != ''"
              :src="$store.state.otherUser.profilePicture"
              cover
              class="profile-infos_left_avatar_image"></v-img>
            <v-img aspect-ratio="1" v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
          <h1>{{$store.state.otherUser.firstName + " " + this.$store.state.otherUser.lastName}}</h1>
          <h2 v-if="$store.state.otherUser.bio != ''">à propos</h2>
          <p v-if="$store.state.otherUser.bio != ''" class="profile-bio">{{this.$store.state.otherUser.bio}}</p>
        </div>
        <div class="profile-infos_left_otherinfos">
          <div class ="base-infos">
            <p><strong>E-mail:</strong> {{this.$store.state.otherUser.email}}</p>
            <p><strong>Adresse:</strong> {{this.$store.state.otherUser.adress}}</p>
            <p><strong>Fonction:</strong> {{this.$store.state.otherUser.department}}</p>
          </div>
          <div class="button-group">
            <v-btn
            prepend-icon="mdi-camera"
            class="mod mod-button"
            v-if="this.$store.state.user.isAdmin === true"
            @click="change = true; mode ='picture'">
              Modifier la photo de profil
            </v-btn>
            <v-btn
            class="mod mod-button"
            v-if="this.$store.state.user.isAdmin === true"
            @click="change = true; mode ='profile'">
              Modifier le Profil
            </v-btn>
            <v-btn
            class="mod mod-button"
            v-if="this.$store.state.user.isAdmin === true"
            @click="change = true; mode ='password'">
              Changer le mot de passe
            </v-btn>
            <v-btn
            class="del mod-button"
            v-if="this.$store.state.user.isAdmin === true"
            @click="change = true; mode ='delete'">
              Supprimer le compte
            </v-btn>
            <v-btn
            class="mod mod-button"
            @click="this.$router.push('/messages/' + this.$store.state.otherUser.id)">
              Envoyer un message
            </v-btn>
            <v-btn color="success" class="mod-button" @click="$router.push('/admin/')" v-if="this.$store.state.user.isAdmin === true">Page Admin</v-btn>
          </div>
        </div>
      </div>
      <div class="profile-infos_right">
        <Post
        class="posts-container"
        v-for="post of this.$store.state.allPosts"
        :key="post.id"
        :postId="post.id" :userName="post.User.firstName + ' ' + post.User.lastName" :userPicture="post.User.profilePicture" :userId="post.UserId" :liked="post.liked"
        :postDate="post.createdAt" :postImage="post.filePath" :postContent="post.content" :likesNumber="post.Likes.length" :comments="post.Comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'

export default ({
  name: 'UserProfilePage',
  components: {
    Post
  },
  data () {
    return {
      userId: 0,
      loaded: false,
      mode: '',
      change: false,
      profilePicture: [],
      form: {},
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
    this.userId = this.$route.params.id
    this.$store.dispatch('getOtherUser', this.$route.params.id)
      .then(() => {
        this.loaded = true
        this.form = {
          firstName: this.$store.state.otherUser.firstName,
          lastName: this.$store.state.otherUser.lastName,
          email: this.$store.state.otherUser.email,
          adress: this.$store.state.otherUser.adress,
          department: this.$store.state.otherUser.department,
          bio: this.$store.state.otherUser.bio
        }
        this.$store.dispatch('getUserPosts', this.$route.params.id)
      })
  },
  methods: {
    changeProfilePicture (userId) {
      this.$store
        .dispatch('changeProfilePicture', {
          user: userId,
          image: this.profilePicture[0]
        })
        .then(() => {
          this.change = false
          this.mode = ''
        })
    },
    changeProfile (userId) {
      this.$store
        .dispatch('changeUserInfos', {
          form: {
            ...this.form,
            profilePicture: this.$store.state.otherUser.profilePicture
          },
          user: userId
        })
        .then(() => {
          this.change = false
          this.mode = ''
        })
        .catch(error => { console.log(error) })
    },
    changePassword (userId) {
      this.loaded = false
      this.$store
        .dispatch('changeUserPassword', {
          form: {
            password: this.formPass.newPass1,
            oldPassword: this.formPass.password
          },
          user: userId
        })
        .then(() => {
          this.loaded = true
          this.change = false
          this.mode = ''
        })
        .catch(error => { console.log(error) })
    },
    deleteUser (userId) {
      this.change = false
      this.mode = ''
      this.$store
        .dispatch('deleteUser', userId)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
    }
  }
})
</script>

<style scoped>
  @import '../styles/pages/profile.css';
  @import '../styles/post.css';
  @import '../styles/buttons.css';
</style>
