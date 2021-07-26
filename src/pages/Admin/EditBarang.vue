<template>
  <q-page class="q-pa-md">
    <q-form
      @submit= onSubmit()
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
        <q-btn label="Update" type="submit" color="primary"/>
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
        hargabarang: 0,
        stok: 0
      },

      image: null
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.$axios.get('barang/getOneBarang/' + this.$route.params.id)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$route.push({ name: 'databarang' })
          }
        })
    },
    onSubmit () {
      // const formData = new FormData()
      // formData.append('image', this.image)
      // formData.append('data', JSON.stringify(this.form))
      this.$axios.post(`barang/updateBarang/${this.$route.params.id}`, {
        image: this.image,
        data: JSON.stringify(this.form)
      })
        .then(res => {
          console.log(res)
          if (res.data.sukses) {
            this.$q.notify({
              message: res.data.pesan,
              color: 'positive',
              timeout: 1000
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
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
