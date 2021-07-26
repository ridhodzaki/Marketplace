<template>
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
    <!-- <q-btn label="lihat pesanan" :to="{ name: 'ujicoba', params:{ id: this.pesanan._id }}"/> -->
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      popup: false,
      jumlah: null,
      jumlahBarang: 1,
      barangs: [
      ],
      pesanan: []
    }
  },

  created () {
    this.getData()
    this.getPesanan()
  },

  methods: {
    getData () {
      this.$axios.get('barang/getBarang')
        .then(res => {
          if (res.data.sukses) {
            // console.log(res)
            // this.$q.notify({
            //   message: res.data.pesan,
            //   color: 'positive',
            //   timeout: 2000
            // })
            this.barangs = res.data.data
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
            console.log(res.data.pesan)
            console.log(res.data.data)
            this.pesanan = res.data.data
          } else {
            console.log(res.data.pesan)
          }
        })
    },

    buy () {
      this.$axios.put('order/updateTransaksi/' + this.pesanan._id, {
        idBarang: this.pesanan.idBarang + this.activeData._id + ',',
        harga: this.pesanan.harga + this.activeData.hargabarang + ',',
        jumlah: this.pesanan.jumlah + this.jumlah + ',',
        status: 1
      })
        .then(res => {
          if (res.data.sukses) {
            console.log(res.data.pesan)
            this.getPesanan()
          } else {
            console.log(res.data.pesan)
          }
        })
    },

    subtotal (harga) {
      const subtotal = this.jumlahBarang * harga
      return subtotal
    }
  }
}
</script>
<style lang="scss" scoped>
// .q.screen-lg {
//   .my-card {
//     width: 100%;
//     max-width: 150px;
//     height: 100%;
//     max-height: 250px;
//   }
// }

.q.screen-md {
  .my-card {
    width: 100%;
    max-width: 100px;
    height: 100%;
    max-height: 200px;
  }
}
</style>
