<template>
  <q-page>

    <q-card
      class="q-ma-sm"
      v-for="(barang, index) in Barangs"
      :key="barang._id"
      style="border-radius: 10px">
      <div class="row">
        <div class="col-4">
          <q-img
            class="q-pa-sm"
            :src="`${$baseImageURL}/${barang.image}`"
            style="height: 200px; border-radius: 10px"/>
        </div>
        <div class="col q-pa-sm">
          <div class="column">
            <div class="row">
              <div class="text-h5"> {{ barang.namabarang }} </div>
              <q-space/>
              <q-btn icon="delete" flat dense color="negative" @click="onDelete(index)"/>
            </div>
            <div class="row absolute-bottom-center">
              <div class="col-md-6 col-xs-12 text-h5 q-mt-md text-red">Rp. {{ barang.hargabarang }}</div>
              <div class="col-md-6 col-xs-12 ">
                <q-input dense v-model="jumlah[index]" label="Jumlah Barang" class="text-h5" style="width: 120px;" type="number"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <div
      class="q-mb-xl text-white"
      style="height: 100px">EndOfLine</div>

    <div class="bg-white column fixed-bottom q-pa-md">
      <q-card class="q-pa-sm">
        <q-item>
          <q-item-section>
            <div class="text-body1">
              Total
            </div>
          </q-item-section>
          <q-item-section side>
            <div class="text-body1 text-black">
              Rp. {{ hasil }}
            </div>
          </q-item-section>
        </q-item>
      </q-card>
      <q-btn class="q-mt-sm" color="warning" icon="shopping_cart" label="Checkout" @click="onCheckout()"/>
    </div>

  </q-page>
</template>
<script>
export default {
  data () {
    return {
      Barangs: [],
      hargaBarang: [],
      jumlah: [],
      idBarang: []
    }
  },

  computed: {
    hasil () {
      // var total = this.totala
      let hasil = 0
      for (let i = 0; i < this.Barangs.length; i++) {
        hasil += this.subtot(i)
      }
      return hasil
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.$axios.get('order/getPesanan/' + this.$route.params.id)
        .then(res => {
          if (res.data.sukses) {
            console.log(res.data)
            this.idBarang = res.data.data.idBarang.split(',')
            this.hargaBarang = res.data.data.harga.split(',')
            this.jumlah = res.data.data.jumlah.split(',')

            let i = 0
            console.log(this.idBarang.length - 1)
            for (i; i < this.idBarang.length - 1; i++) {
              this.$axios.get('barang/getOneBarang/' + this.idBarang[i])
                .then(res => {
                  if (res.data.sukses) {
                    this.Barangs.push(res.data.data)
                    console.log(this.Barangs)
                  } else {
                    console.log('error')
                  }
                })
            }
          } else {
            console.log('Gagal')
          }
        })

      // const idUser = '6073cf444d6be8037018bc69,6073d7156fc31c08204aa4fc,6073d73a6fc31c08204aa4fd'
      // const level = '1,2,1'
      // const potongs = idUser.split(',')
      // this.level = level.split(',')
      // console.log(potongs)
      // let i = 0
      // for (i; i < potongs.length; i++) {
      //   this.$axios.get('user/getOneUser/' + potongs[i])
      //     .then(res => {
      //       this.user.push(res.data.data)
      //     })
      //   // console.log(potongs[i])
      // }
      // console.log(this.user)
      // // console.log(this.level)
    },

    subtot (index) {
      const hasil = parseInt(this.Barangs[index].hargabarang * this.jumlah[index])
      return hasil

      // return this.totals[index].harga * this.totals[index].jumlah
    },

    onDelete (index) {
      this.Barangs.splice(index, 1)
      this.idBarang.splice(index, 1)
      this.hargaBarang.splice(index, 1)
      this.jumlah.splice(index, 1)
      this.$axios.put('order/updateTransaksi/' + this.$route.params.id, {
        idBarang: this.idBarang.join(),
        harga: this.hargaBarang.join(),
        jumlah: this.jumlah.join(),
        status: 1
      }).then(res => {
        if (res.data.sukses) {
          console.log(res.data.pesan)
        } else {
          console.log(res.data.pesan)
        }
      })
    },

    onCheckout () {
      let idBarang = this.Barangs[0]._id + ','
      let harga = this.Barangs[0].hargabarang + ','
      let jumlah = this.jumlah[0] + ','
      let i = 1
      for (i; i < this.Barangs.length; i++) {
        idBarang += this.Barangs[i]._id + ','
        harga += this.Barangs[i].hargabarang + ','
        jumlah += jumlah + ','
        // console.log(idBarang)
      }
      this.$axios.put('order/updateTransaksi/' + this.$route.params.id, {
        idBarang: idBarang,
        harga: harga,
        jumlah: jumlah,
        status: 2
      }).then(res => {
        if (res.data.sukses) {
          console.log(res.data.pesan)
          this.$router.push({ name: 'homeuser' })
        } else {
          console.log(res.data.pesan)
        }
      })
    }
  }
}
</script>
