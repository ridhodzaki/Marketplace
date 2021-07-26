<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-white">
        <!-- Tampilan Selain di Menu -->
          <!-- Tampilan Yang di Menu -->
        <div class="row no-wrap items-center q-pa-xs"
          v-if="$route.fullPath === '/home'"
          >
          <q-btn
            v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm"
            style="font-size: 25px; font-weight: bold;"
            flat
            dense
            no-caps
            class="text-primary q-mr-md">TaniApp</q-btn>
          <q-input
            outlined
            placeholder="Cari"
            style="width: 100%; border-radius: 30px;"
            dense />
          <q-btn
            v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm"
            class="button bg-white text-grey-5 q-ml-md"
            dense
            flat
            @click="goCart(userData._id)"
            icon="shopping_cart">
              <q-badge
                v-if="notification !== 0"
                color="red"
                floating> {{ notification }} </q-badge>
            </q-btn>
          <!-- <q-btn icon="shopping_cart" flat label="Login" /> -->
          <q-separator
            v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm"
            class="q-mx-sm"
            vertical
            inset />
          <q-btn
            v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm"
            icon="person"
            flat
            dense
            color="primary"
            @click="logout()"/>
        </div>
        <div class="row no-wrap items-center"
          v-else
          >
          <q-btn
            flat
            v-go-back.single
            color="primary"
            round
            dense
            icon="arrow_back" />

          <q-toolbar-title
            v-if="$route.fullPath !== '/home'"
            class="absolute-center text-primary">
            {{ title }}
          </q-toolbar-title>
        </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div
      v-if="this.$q.screen.xs && $route.fullPath === '/home'"
      class="fixed-bottom bg-white q-pa-sm"
      style="border-radius: 20px 20px 0px 0px;">
      <q-tabs
        v-model="menubar"
        dense
        indicator-color="transparent"
        align="justify"
        active-color="primary"
        class="bg-white text-green-3"
        :breakpoint="0"
      >
        <q-tab name="home" icon="home" />
        <q-tab clickable @click="goCart(userData._id)" name="cart" icon="shopping_cart">
          <q-badge
            v-if="notification !== 0"
            color="red"
            floating> {{ notification }}</q-badge>
            </q-tab>
        <q-tab name="person" icon="person" />
      </q-tabs>
    </div>
  </q-layout>
</template>
<script>

export default {
  data () {
    return {
      userData: null,
      login: false,
      drawer: false,
      miniState: true,
      menubar: 'home',
      notification: 0
    }
  },
  methods: {
    logout () {
      console.log('yeashh')
      this.$q.localStorage.clear()
      this.$router.push({ name: 'login' })
    },
    goCart (_id) {
      console.log(_id)
      this.$router.push({ name: 'checkout', params: { id: _id } })
      // this.$router.push({ name: 'dashboardAdmin' })
    },
    getPesanan () {
      this.$axios.get('order/getData/' + this.$q.localStorage.getItem('dataUser')._id)
        .then(res => {
          if (res.data.sukses) {
            const jumlah = res.data.data.jumlah.split(',')
            this.notification = jumlah.length - 1
            console.log(this.notification)
          } else {
            console.log(res.data.pesan)
          }
        })
    }
  },
  created () {
    // console.log(this.$q.localStorage.getItem('dataUser'))
    this.getPesanan()
    this.userData = this.$q.localStorage.getItem('dataUser')
    console.log(this.$route.fullPath)
  },
  computed: {
    title () {
      console.log(this.$route.name)
      const currentPath = this.$route.name
      if (currentPath === 'checkout') {
        return 'Checkout'
      } else if (currentPath === 'detail') {
        return 'Detail Barang'
      } else {
        return 'About'
      }
    }
  }
  // computed: {
  //   notification (data) {
  //     data = 2
  //     return data
  //   }
  // }
}
</script>
