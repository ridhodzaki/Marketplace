<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <!-- Header Home -->
    <q-header elevated class="bg-white">
      <q-toolbar>
        <q-btn
          v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md || this.$q.screen.sm"
          flat
          dense
          no-caps
          class="text-primary q-mr-md text-weight-bold text-h5">TaniApp</q-btn>
        <q-input
          dense
          outlined
          v-model="search"
          placeholder="Cari"
          style="width: 100%; border-radius: 30px;"
          @input="SeacrhData()" >
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="goToOri()" />
          </template>
        </q-input>
        <!-- <q-input
          dark
          dense
          flat
          outline
          standout
          placeholder="Cari"
          v-model="search"
          style="width: 100%; border-radius: 30px;"
          class="text-black">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input> -->
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
      </q-toolbar>
    </q-header>
    <!-- Akhir Header Home -->
    <!-- Tampilan Home -->
    <q-page-container>
      <q-page>
        <div class="row q-pa-sm" style="margin-top: 5px">
          <div
            class="col-xs-6 col-sm-3"
            v-for="barang in barangs"
            clickable
            @click="goDetail(barang._id)"
            :key="barang._id">
            <q-card
              class="q-ma-xs q-pa-sm"
              >
              <q-img
                :src="`${$baseImageURL}/${barang.image}`"
                style="height: 150px"/>
                <div class="col" style="margin-top: 5px">
                  <div class="col ellipsis" style="font-size: 12px">
                    {{ barang.namabarang }}
                  </div>
                  <div class="col" style="font-size: 14px; font-weight: bold;">
                    Rp. {{ barang.hargabarang }}
                  </div>
                  <div class="text-caption text-grey">
                    Stok Tersedia : {{ barang.stok }}
                  </div>
                </div>
            </q-card>
          </div>
        </div>
        <div class="q-pb-lg text-white">EndOfLine</div>
      </q-page>
    </q-page-container>
    <!-- Akhir Tampilan Home -->
    <!-- Button Untuk Tampil Android -->
    <div
      v-if="this.$q.screen.xs"
      class="fixed-bottom bg-white q-pa-sm row"
      style="border-radius: 20px 20px 0px 0px;">
      <q-btn class="col-4" icon="home" color="primary" flat dense/>
      <q-btn class="col-4" @click="goCart(idUser)" icon="shopping_cart" color="green-3" flat>
        <q-badge
            v-if="notification !== 0"
            color="red"
            floating> {{ notification }}
        </q-badge>
      </q-btn>
      <q-btn class="col-4" icon="person" color="green-3" flat dense/>
      <!-- <q-tabs
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
      </q-tabs> -->
    </div>
    <!-- Akhir Button Untuk Tampil Android -->
  </q-layout>
</template>

<script>

export default {
  data () {
    return {
      search: '',
      idUser: null,
      jumlah: null,
      jumlahBarang: 1,
      barangs: [],
      originals: [],
      pesanan: [],
      menubar: 'home',
      notification: 0
    }
  },

  created () {
    this.idUser = this.$q.localStorage.getItem('dataUser')._id
    console.log(this.idUser)
    this.getData()
    this.getPesanan()
  },

  methods: {
    goToOri () {
      this.search = ''
      this.SeacrhData()
    },
    SeacrhData () {
      this.barangs = this.originals.filter(r => {
        return r.namabarang.toLowerCase().includes(this.search)
      })
    },
    getData () {
      this.$axios.get('barang/getBarang')
        .then(res => {
          if (res.data.sukses) {
            this.barangs = this.originals = res.data.data
          } else {
            this.$q.notify({
              message: res.data.pesan,
              color: 'negative',
              timeout: 2000
            })
          }
        })
    },

    goDetail (id) {
      console.log(id)
      this.$router.push({ name: 'detail', params: { id, idPesanan: this.pesanan._id } })
    },

    getPesanan () {
      this.$axios.get('order/getData/' + this.$q.localStorage.getItem('dataUser')._id)
        .then(res => {
          if (res.data.sukses) {
            console.log(res.data.data)
            this.pesanan = res.data.data
            if (res.data.data.jumlah !== '') {
              const jumlahBarang = this.pesanan.jumlah.split(',')
              this.notification = jumlahBarang.length - 1
            }
            console.log(this.notification)
          } else {
            console.log(res.data.pesan)
          }
        })
    },

    // buy () {
    //   this.$axios.put('order/updateTransaksi/' + this.pesanan._id, {
    //     idBarang: this.pesanan.idBarang + this.activeData._id + ',',
    //     harga: this.pesanan.harga + this.activeData.hargabarang + ',',
    //     jumlah: this.pesanan.jumlah + this.jumlah + ',',
    //     status: 1
    //   })
    //     .then(res => {
    //       if (res.data.sukses) {
    //         console.log(res.data.pesan)
    //         this.getPesanan()
    //       } else {
    //         console.log(res.data.pesan)
    //       }
    //     })
    // },

    // subtotal (harga) {
    //   const subtotal = this.jumlahBarang * harga
    //   return subtotal
    // },

    logout () {
      console.log('yeashh')
      this.$q.localStorage.clear()
      this.$router.push({ name: 'login' })
    },
    goCart (_id) {
      console.log(_id)
      this.$router.push({ name: 'checkout', params: { id: _id } })
      // this.$router.push({ name: 'dashboardAdmin' })
    }
  }
}
</script>
<style lang="scss" scoped>

.q.screen-md {
  .my-card {
    width: 100%;
    max-width: 100px;
    height: 100%;
    max-height: 200px;
  }
}
</style>
