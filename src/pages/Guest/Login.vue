<template>
  <q-page class="q-pa-md">
    <div class="flex flex-center">
      <p class="header text-positive">MarketPlace</p>
    </div>
    <div class="row q-pt-xl flex flex-center">
      <div
        class="col-5 q-pa-md"
        v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm">
        <div class="flex flex-center">
          <img
            alt="Login logo"
            src="~assets/headerlogo.jpg"
            style="height: 200px;"
          >
        </div>
        <p class="title text-center">Jual Beli Hasil Pertanian Dengan Mudah Hanya di TaniApp</p>
        <p class="subtitle text-center">Gabung dan rasakan kemudahan bertransaksi di TaniApp</p>
      </div>
      <div class="col-sm-12 col-xs-12 col-md-5 q-pa-md">
        <q-card class="q-pa-md" style="border-radius: 10px">
          <p class="title text-center" style="color: #4C4C4C; font-size: 30px; margin-top: -10px">Masuk</p>
          <p class="subtitle text-center" style="color: #C1C8BC; margin-top: -20px">Belum Punya akun Tani App? <q-btn flat no-caps dense to="/register" class="text-blue" color="primary" label="Daftar Disini"/> </p>
          <q-form
            class="q-gutter-md">
            <q-input
              filled
              v-model="username"
              label="Username"
            />

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
          <div class="">
            <div class="col" style="margin-top: 10px; margin-bottom: 10px">
              <q-separator size="2px" />
              <p
                class="text-center bg-white"
                style="margin-left: 100px; margin-right: 100px; margin-top: -10px;">atau masuk dengan</p>
            </div>
            <div class="flex flex-center">
              <img
                @click="onGet('facebook')"
                clickable
                class="q-pa-sm"
                alt="Facebook logo"
                src="~assets/facebook.png"
                style="height: 50px; max-width: 50px"
              >
              <img
                @click="onGet('google')"
                clickable
                class="q-pa-sm"
                alt="Google logo"
                src="~assets/google.png"
                style="height: 50px; max-width: 50px"
              >
            </div>
          </div>
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

      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== false || this.username !== null || this.password !== null) {
        this.$axios.post('user/login', {
          username: this.username,
          password: this.password
        }).then(res => {
          console.log(res.data)
          if (res.data.sukses) {
            this.$q.localStorage.set('dataUser', res.data.data)
            console.log(this.$q.localStorage.getItem('dataUser'))
            // Admin: 1, User: 2
            if (res.data.data.level === 1) {
              this.$q.notify({
                message: res.data.pesan,
                color: 'positive',
                timeout: 2000
              })
              this.$router.push({ name: 'homeadmin' })
            } else if (res.data.data.level === 2) {
              this.$q.notify({
                message: res.data.pesan,
                color: 'positive',
                timeout: 2000
              })
              this.$router.push({ name: 'homeuser' })
            } else {
              this.$q.notify({
                message: 'Hayooo Mau Kemana',
                color: 'positive',
                timeout: 2000
              })
            }
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
          message: 'Data diisi semua dan menceklist lisensi',
          color: 'negative',
          timeout: 2000
        })
      }
    },

    onReset () {
      this.username = null
      this.password = null

      this.accept = false
    },

    onGet (get) {
      console.log(get)
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
