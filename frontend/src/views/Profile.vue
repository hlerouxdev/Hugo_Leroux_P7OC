<template>
  <div class="profile-main">
    <!-- Profile Form -->
    <div class="profile-main profile-form" v-if="change ===  true">
      <div class="profile-form-bg"></div>
      <v-form class="profile-form-container" v-if="mode === 'picture'">
        <v-btn @click="change = false; mode = ''" color="white" fab class="close-btn">
            X
          </v-btn>
        <v-container>
          <v-avatar rounded size="200" class="profile-infos_left_avatar form-avatar">
            <v-img aspect-ratio="1" cover v-if="this.$store.state.userInfos.profilePicture != ''"
              :src="this.$store.state.userInfos.profilePicture"
              :href="this.$store.state.userInfos.profilePicture"
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
        <v-btn @click="changeProfilePicture" class="form-button mod">
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
          <v-btn @click="changeProfile" class="form-button mod">
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
          <v-btn @click="changePassword" class="form-button mod">
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
            <v-btn @click="deleteUser()" class="form-button del">
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
    <!-- User Profile -->
    <div class="profile-infos">
      <!-- User Infos -->
      <div class="profile-infos_left" v-if="loaded === true">
        <div class="profile-infos_left_presentation">
          <v-avatar rounded size="150" class="profile-infos_left_avatar">
            <v-img aspect-ratio="1" v-if="this.$store.state.userInfos.profilePicture != ''"
              :src="this.$store.state.userInfos.profilePicture"
              cover
              class="profile-infos_left_avatar_image"></v-img>
            <v-img aspect-ratio="1" v-else  src="../assets/user.jpg"></v-img>
          </v-avatar>
          <h1>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h1>
          <h2 v-if="this.$store.state.userInfos.bio != ''">à propos</h2>
          <p v-if="this.$store.state.userInfos.bio != ''" class="profile-bio">{{this.$store.state.userInfos.bio}}</p>
        </div>
        <div class="profile-infos_left_otherinfos">
          <div class ="base-infos">
            <p><strong>E-mail:</strong> {{this.$store.state.userInfos.email}}</p>
            <p><strong>Adresse:</strong> {{this.$store.state.userInfos.adress}}</p>
            <p><strong>Fonction:</strong> {{this.$store.state.userInfos.department}}</p>
          </div>
          <div class="button-group">
            <v-btn prepend-icon="mdi-camera" class="mod mod-button" @click="change = true; mode ='picture'">Modifier la photo de profil</v-btn>
            <v-btn class="mod mod-button" @click="change = true; mode ='profile'">Modifier le Profil</v-btn>
            <v-btn class="mod mod-button" @click="change = true; mode ='password'">Changer le mot de passe</v-btn>
            <v-btn class="del mod-button" @click="change = true; mode ='delete'">Supprimer le compte</v-btn>
            <v-btn color="success" class="mod-button" @click="this.$router.push('/admin/')" v-if="this.$store.state.user.isAdmin === true">Page Admin</v-btn>
          </div>
        </div>
      </div>
      <!-- User Posts -->
      <div class="profile-infos_right" v-if="loaded === true">
        <PostCreate />
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
import PostCreate from '../components/PostCreate.vue'

export default ({
  name: 'ProfilePage',
  components: {
    Post, PostCreate
  },
  data () {
    return {
      loaded: false,
      mode: '',
      change: false,
      profilePicture: [],
      form: {
        firstName: this.$store.state.userInfos.firstName,
        lastName: this.$store.state.userInfos.lastName,
        email: this.$store.state.userInfos.email,
        adress: this.$store.state.userInfos.adress,
        department: this.$store.state.userInfos.department,
        bio: this.$store.state.userInfos.bio
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
    this.$store.dispatch('getUser')
      .then(() => {
        this.loaded = true
        this.$store.dispatch('getUserPosts', this.$store.state.user.userId)
      })
  },
  methods: {
    changeProfilePicture () {
      this.loaded = false
      this.$store
        .dispatch('changeProfilePicture', {
          user: this.$store.state.user.userId,
          image: this.profilePicture[0]
        })
        .then(() => {
          this.$store.dispatch('getUser')
            .then(() => {
              this.loaded = true
              this.change = false
              this.mode = ''
            })
        })
    },
    changeProfile () {
      this.loaded = false
      this.$store
        .dispatch('changeUserInfos', {
          form: {
            ...this.form,
            profilePicture: this.$store.state.userInfos.profilePicture
          },
          user: this.$store.state.user.userId
        })
        .then(() => {
          this.loaded = true
          this.change = false
          this.mode = ''
        })
        .catch(error => { console.log(error) })
    },
    changePassword () {
      this.$store
        .dispatch('changeUserPassword', {
          form: {
            password: this.formPass.newPass1,
            oldPassword: this.formPass.password
          },
          user: this.$store.state.user.userId
        })
        .then(() => {
          this.change = false
          this.mode = ''
        })
        .catch(error => { console.log(error) })
    },
    deleteUser () {
      this.change = false
      this.mode = ''
      this.$store
        .dispatch('deleteUser', this.$store.state.user.userId)
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
