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
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Sélectionner une nouvelle photo de profile"
          class="form-profile-picture"
        ></v-file-input>
        <v-btn @click="changeProfilePicture" class="form-button mod">
          Changer la photo de profile
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
            <v-btn @click="deleteUser" class="form-button del">
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
      <div class="profile-infos_left">
        <v-avatar rounded size="150" class="profile-infos_left_avatar">
          <v-img v-if="this.$store.state.userInfos.profilePicture != ''" :src="this.$store.state.userInfos.profilePicture"></v-img>
          <v-img v-else  src="../assets/user.jpg"></v-img>
        </v-avatar>
        <h1>{{this.$store.state.userInfos.firstName + " " + this.$store.state.userInfos.lastName}}</h1>
        <div class ="base-infos">
          <p>E-mail: {{this.$store.state.userInfos.email}}</p>
          <p>Adresse: {{this.$store.state.userInfos.adress}}</p>
          <p>Fonction: {{this.$store.state.userInfos.department}}</p>
        </div>
        <div class="button-group">
          <v-btn prepend-icon="mdi-camera" class="mod mod-button" @click="change = true; mode ='picture'">Modifier la photo de profile</v-btn>
          <v-btn class="mod mod-button" @click="change = true; mode ='profile'">Modifier le Profile</v-btn>
          <v-btn class="mod mod-button" @click="change = true; mode ='password'">Changer le mot de passe</v-btn>
          <v-btn class="del mod-button" @click="change = true; mode ='delete'">Supprimer le compte</v-btn>
        </div>
      </div>
      <div class="profile-infos_right">
        <PostCreate />
        <Post></Post>
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
      mode: '',
      change: false,
      profilePicture: '',
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
    changeProfilePicture () {
      console.log(document.getElementsByClassName('form-profile-picture')[0])
    },
    changeProfile () {
      this.$store
        .dispatch('changeUserInfos', {
          form: {
            ...this.form,
            profilePicture: this.$store.state.userInfos.profilePicture
          },
          user: this.$store.state.user.userId
        })
        .then(() => {
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
  @import '../styles/profile.css';
  @import '../styles/post.css';
</style>
