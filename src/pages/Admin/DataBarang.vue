<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <q-btn label="Input Barang" to="/inputbarang" icon="add" color="primary"/>
    </div>
    <q-table
      hide-bottom
      title="Data Barang"
      :data="data"
      :columns="columns"
      row-key="namabarang"
      :filter="filter"
      grid
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section class="flex flex-center">
              <q-img
                :src="`${$baseImageURL}/${props.row.image}`"
                style="width: 200px; height: 200px"/>
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
            <q-card-section>
              <div class="row">
                <q-btn class="q-mr-sm" :to="{ name: 'editbarang', params:{ id: props.row._id }}" color="warning" icon="mode" />
                <q-space/>
                <q-btn color="negative" @click="confirm = true" icon="delete" />
              </div>
            </q-card-section>
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="delete" color="negative" text-color="white" />
                  <span class="q-ml-sm">Apaah Anda Yakin Menghapus Barang {{ props.row.namabarang }}?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="Yes" @click="deleteBarang(props.row._id)" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card>
        </div>
      </template>
    </q-table>
    <!-- <q-table
      grid
      title="Data Barang"
      :data="data"
      :columns="columns"
      row-key="namabarang"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="namabarang" :props="props">
            {{ props.row.namabarang }}
          </q-td>
          <q-td key="hargabarang" :props="props">
            Rp. {{ props.row.hargabarang }}
          </q-td>
          <q-td key="stok" :props="props">
            {{ props.row.stok }}
          </q-td>
          <q-td key="image" :props="props">
            <q-img
              :src="`http://localhost:3000/${props.row.image}`"
              spinner-color="white"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="col">
              <q-btn class="q-mr-sm" :to="{ name: 'editbarang', params:{ id: props.row._id }}" color="warning" icon="mode" />
              <q-btn color="negative" @click="confirm = true" icon="delete" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table> -->
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      // bagian delete
      confirm: false,

      // filter data
      filter: '',

      // Data Barang
      columns: [
        {
          name: 'namabarang',
          required: true,
          label: 'Nama Barang',
          align: 'left',
          field: row => row.namabarang,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'hargabarang', align: 'center', label: 'Harga Barang', field: 'hargabarang', sortable: true },
        { name: 'stok', label: 'Stok', field: 'stok', sortable: true }
      ],

      data: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getDetail () {
      console.log('asd')
    },
    getData () {
      this.$axios.get('barang/getBarang')
        .then(res => {
          if (res.data.sukses) {
            console.log(res)
            this.data = res.data.data
          } else {
            this.$q.notify({
              message: res.data.pesan,
              color: 'negative',
              timeout: 2000
            })
          }
        })
    },

    deleteBarang (id) {
      this.$axios.delete('barang/deleteBarang/' + id)
        .then(res => {
          if (res.data.sukses) {
            this.$q.notify({
              message: res.data.pesan,
              color: 'positive',
              timeout: 2000
            })
            this.getData()
          } else {
            this.$q.notify({
              message: res.data.pesan,
              color: 'negative',
              timeout: 2000
            })
          }
        })
    },

    onSubmit () {
      if (this.namabarang !== null || this.hargabarang !== null || this.stok !== null) {
        const formData = new FormData()
        formData.append('image', this.image)
        formData.append('data', JSON.stringify(this.form))
        this.$axios.post('barang/input', formData)
          .then(res => {
            console.log(res)
            if (res.data.sukses) {
              this.$q.notify({
                message: res.data.pesan,
                color: 'positive',
                timeout: 2000
              })
              this.inputbarang = false
              this.getData()
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
          message: 'Silahkan isi semua formnya',
          color: 'negative',
          timeout: 2000
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
