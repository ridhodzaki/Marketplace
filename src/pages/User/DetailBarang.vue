<template>
  <q-page>
    <div class="col">
      <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12 q-pa-md">
        <div class="">
          <q-img
            :src="`${$baseImageURL}/${activeData.image}`"
            style="height: 300px; border-radius: 10px"/>
        </div>
      </div>
      <div class="col-md-8 col-lg-8 col-sm-6 col-xs-12 q-pa-md">
        <p style="font-size: 18px; font-weight: bold">{{ activeData.namabarang }}</p>
        <p style="font-size: 28px; font-weight: bold">Rp. {{ activeData.hargabarang }}</p>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="detail" label="Detail" />
          <q-tab name="ulasan" label="Ulasan" />
        </q-tabs>

        <q-separator />
        <q-scroll-area
          :visible="false"
          horizontal
          style="height: 250px; width:100%;">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="detail">
              <div class="text-h6">Detail Barang</div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non vel incidunt dicta esse eveniet laborum, unde molestias? Repudiandae autem magni pariatur doloremque cumque, harum laboriosam sed architecto eveniet qui. Alias.
            </q-tab-panel>

            <q-tab-panel name="ulasan">
              <div class="text-h6">Ulasan</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-scroll-area>

      </div>
      <div
          v-if="this.$q.screen.xl || this.$q.screen.md || this.$q.screen.sm || this.$q.screen.lg"
          class="q-pa-md">
          <div
            class="q-pa-sm"
            style="border-style: solid; border-width: 0.5px; border-color: #CECECE; border-radius: 5px">
            <p style="font-size: 16px">Atur jumlah dan catatan</p>
            <div class="row">
              <div class="">
                <q-input
                  v-model.number="jumlahBarang"
                  dense
                  flat
                  type="number"
                  filled
                  style="max-width: 100px"
                />
              </div>
              <q-space></q-space>
              <div class="flex flex-center">
                <p style="margin-top: 10px">Stok <span style="font-weight: bold">{{ activeData.stok }}</span></p>
              </div>
            </div>
            <div class="row">
              <p style="font-size: 14px" class="flex flex-center">Subtotal</p>
              <q-space></q-space>
              <p style="font-size: 20px; font-weight: bold">Rp. {{ subtotal(activeData.hargabarang) }}</p>
            </div>
            <div class="row flex flex-center">
              <q-btn
                class="button bg-primary text-white"
                no-caps
                @click="buy()"
                label="Keranjang"/>
            </div>
          </div>
        </div>
      <div
        v-if="this.$q.screen.xs"
        class="fixed-bottom q-mb-lg">
        <div class="row bg-white q-pa-sm  flex flex-center" style="margin-bottom: -24px;">
          <q-btn
            class="button bg-primary text-white"
            no-caps
            label="Keranjang"
            @click="buy()"/>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      tab: 'detail',
      jumlahBarang: 1,
      activeData: [],
      pesanan: []
    }
  },

  methods: {
    getPesanan () {
      this.$axios.get('order/getData/' + this.$route.params.id)
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
    getDetailBarang () {
      this.$axios.get('barang/getOneBarang/' + this.$route.params.id)
        .then((res) => {
          if (res.data.sukses) {
            this.activeData = res.data.data
            console.log(this.activeData)
          } else {
            this.$router.push({ name: 'homeuser' })
          }
        })
    },

    buy () {
      this.$axios.put('order/updateTransaksi/' + this.$route.params.idPesanan, {
        idBarang: this.pesanan.idBarang + this.activeData._id + ',',
        harga: this.pesanan.harga + this.activeData.hargabarang + ',',
        jumlah: this.pesanan.jumlah + this.jumlahBarang + ',',
        status: 1
      })
        .then(res => {
          if (res.data.sukses) {
            console.log(res.data.pesan)
            this.$router.push({ name: 'homeuser' })
          } else {
            console.log(res.data.pesan)
          }
        })
    },

    subtotal (harga) {
      const subtotal = this.jumlahBarang * harga
      return subtotal
    }
  },

  created () {
    this.getPesanan()
    this.getDetailBarang()
    console.log(this.$route.params)
  }
}
</script>
