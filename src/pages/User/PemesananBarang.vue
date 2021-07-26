<template>
  <q-page>
    <div class="col q-pa-sm" style="margin-top: 5px">
      <p style="font-size: 20px; font-weight: bold">Peralatan</p>
      <q-scroll-area
        visible="false"
        horizontal
        style="height: 250px; width:170; margin-top: -15px">
        <div class="row no-wrap">
          <div
            v-for="i in 100"
            :key="i"
            style="width: 150px">
            <q-card class="q-ma-xs q-pa-sm">
              <q-img
                :src="`${$baseImageURL}/${barangs[0].image}`"
                style="height: 150px"/>
                <div class="col" style="margin-top: 5px">
                  <div class="col ellipsis" style="font-size: 12px">
                    {{ barangs[0].namabarang }}
                  </div>
                  <div class="col" style="font-size: 14px; font-weight: bold;">
                    Rp. {{ barangs[0].hargabarang }}
                  </div>
                  <div class="text-caption text-grey">
                    Stok Tersedia : {{ barangs[0].stok }}
                  </div>
                </div>
            </q-card>
          </div>

          <!-- <q-dialog v-model="popup">
            <q-card>
              <q-card-section>
                <div class="text-h6">Pembelian</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-body2">
                  {{ activeData.namabarang }}
                </div>
                <div class="text-caption text-grey">
                  {{ activeData.hargabarang }}
                </div>
                <q-input label="Jumlah" type="number" v-model="jumlah"/>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" @click="buy(activeData._id)" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
        </div>
      </q-scroll-area>
    </div>

    <q-separator inset/>

    <div class="col q-pa-sm" style="margin-top: 5px">
      <p style="font-size: 20px; font-weight: bold">Pupuk</p>
      <q-scroll-area
        visible="false"
        horizontal
        style="height: 250px; width:170; margin-top: -15px">
        <div class="row no-wrap">
          <div
            v-for="barang in barangs"
            :key="barang._id"
            style="width: 150px">
            <q-card
              class="q-ma-xs q-pa-sm"
              @click="detail (barang)">
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

          <q-dialog v-model="popup" full-width full-height>
            <q-card class="q-pa-md" >
              <div class="row">
                <div class="col-3 q-pa-md">
                  <q-img
                    :src="`${$baseImageURL}/${activeData.image}`"
                    style="height: 240px; border-radius: 10px"/>
                </div>
                <div class="col-6 q-pa-md">
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

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="detail">
                      <div class="text-h6">Detail Barang</div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>

                    <q-tab-panel name="ulasan">
                      <div class="text-h6">Ulasan</div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>
                  </q-tab-panels>
                </div>
                <div class="col-3 q-pa-md">
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
                    <div class="row">
                      <div class="col">
                        <q-btn
                          padding="6px 30px"
                          class="button q-mr-sm bg-white text-primary"
                          outline
                          no-caps
                          label="Beli"/>
                      </div>

                      <div class="col">
                        <q-btn
                          class="button bg-primary text-white"
                          no-caps
                          label="Keranjang"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-dialog>
        </div>
      </q-scroll-area>
    </div>
    <q-btn label="lihat pesanan" :to="{ name: 'ujicoba', params:{ id: this.pesanan._id }}"/>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      popup: true,
      jumlah: null,
      jumlahBarang: 1,
      tab: 'detail',
      barangs: [
        {
          image: '2021-04-24T04-15-39.996Z.png',
          namabarang: 'apa aja',
          hargabarang: 500000,
          stok: 10
        }
      ],
      activeData: {
        image: '2021-04-24T04-15-39.996Z.png',
        namabarang: 'apa aja',
        hargabarang: 500000,
        stok: 10
      },
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
            console.log(res)
            this.$q.notify({
              message: res.data.pesan,
              color: 'positive',
              timeout: 2000
            })
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

    detail (barang) {
      this.activeData = barang
      console.log(barang)
      this.popup = true
    },

    buy (id) {
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
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 150px
  height: 100%
  max-height: 250px
</style>
