<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="text-h6">Input Barang</div>
    </div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="form.namabarang"
        label="Nama Barang"
      />

      <q-input
        filled
        type="number"
        v-model="form.hargabarang"
        label="Harga Barang"
      />

      <q-input
        filled
        type="number"
        v-model="form.stok"
        label="Stok Tersedia"
      />

      <q-file accept=".jpg, image/*" filled v-model="image" label="Upload Gambar Barang">
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
      <div>
        <q-btn label="Add" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        namabarang: null,
        hargabarang: null,
        stok: null
      },
      image: null
    }
  },

  methods: {
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
              this.$router.push({ name: 'databarang' })
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
      this.namabarang = null
      this.hargabarang = null
      this.stok = null
    }
  }
}
</script>
