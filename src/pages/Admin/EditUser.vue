<template>
  <q-page class="q-pa-md">
    <div class="row q-pt-xl flex flex-center">
      <div class="col-sm-12 col-xs-12 col-md-5 q-pa-md">
        <q-card class="q-pa-md" style="border-radius: 10px">
          <p class="title text-center" style="color: #4C4C4C; font-size: 30px; margin-top: -10px">Edit User</p>
          <q-form
            class="q-gutter-md">
            <q-input
              filled
              v-model="username"
              label="Username"
            />

            <q-input
              filled
              v-model="name"
              label="Name"
            />

            <q-input
              filled
              v-model="email"
              label="Email"
            />

            <q-input
              filled
              v-model="skor"
              label="Skor User"
            />

            <q-select filled v-model="level" :options="levelselect" label="Standard" />

            <q-input v-model="password" label="Password" filled :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div class="flex flex-center">
              <q-btn class="full-width" label="Submit" @click="onSubmit()" color="primary"/>
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null,
      email: null,
      name: null,
      isPwd: true,
      level: null,
      skor: null,

      accept: false,
      oldPassword: null,
      levelselect: [
        {
          label: 'Admin',
          value: '1'
        },
        {
          label: 'User',
          value: '2'
        }
      ]
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.$axios.get('user/getOneUser/' + this.$route.params.id)
        .then(res => {
          console.log(res)
          this.username = res.data.data.username
          this.name = res.data.data.name
          this.skor = res.data.data.points
          this.email = res.data.data.email
          if (res.data.data.level === 1) {
            this.level = 'Admin'
          } else {
            this.level = 'User'
          }
          this.oldPassword = res.data.data.password
        })
    },
    onSubmit () {
      if (this.username !== null || this.name !== null || this.email !== null) {
        if (this.password === '' || this.password === null) {
          this.password = this.oldPassword
        }
        // console.log(this.level.value)
        this.$axios.put('user/updateUser/' + this.$route.params.id, {
          username: this.username,
          name: this.name,
          email: this.email,
          points: this.skor,
          level: this.level.value,
          password: this.password
        }).then(res => {
          console.log(res.data)
          if (res.data.sukses) {
            this.$q.notify({
              message: res.data.pesan,
              color: 'positive',
              timeout: 2000
            })
            this.$router.push({ name: 'datauser' })
          } else {
            this.$q.notify({
              message: res.data.pesan,
              color: 'negative',
              timeout: 2000
            })
          }
        })
      } else {
        this.$q.notify({
          message: 'Data diisi semua',
          color: 'negative',
          timeout: 2000
        })
      }
    }
  }
}
</script>
<style lang="scss">
.header {
  font-size: 40px;
  font-family: 'Ubuntu';
  color: #1976D2;
}
</style>
