<template>
  <q-page>
    <q-table
      title="Data User"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.idUSer[0].name }}
          </q-td>
          <q-td key="barang" :props="props">
            {{ props.row.dataBarang.length }}
          </q-td>
          <q-td key="total" :props="props">
            Rp.{{ props.row.total }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="col">
              <q-btn class="q-mr-sm" :to="{ name: 'edituser', params:{ id: props.row._id }}" color="warning" icon="mode" />
              <q-btn color="negative" @click="confirm = true" icon="delete" />
            </div>
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm">Apakah Anda Yakin ?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="Ya" @click="onDelete(props.row._id)" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      confirm: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nama Pembeli',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'barang', align: 'center', label: 'Banyak Barang', field: 'barang', sortable: true },
        { name: 'total', label: 'Total', field: 'total', sortable: true },
        { name: 'aksi', label: 'Aksi', align: 'center', field: 'aksi' }
      ],

      data: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    onDelete (id) {
      this.$axios.delete('user/deleteUser/' + id)
        .then(res => {
          if (res.data.sukses) {
            console.log(res)
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
    getData () {
      this.$axios.get('order/getAll')
        .then(res => {
          if (res.data.sukses) {
            const lengthData = res.data.data.idBarang.split(',')

            let i = 0
            let dataBarang
            for (i; i < lengthData.length - 1; i++) {
              this.$axios.get('barang/getOneBarang/' + this.idBarang[i])
                .then(res => {
                  if (res.data.sukses) {
                    dataBarang.push(res.data.data)
                  } else {
                    console.log('error')
                  }
                })
            }
            this.data = Object.assign(res.data.data, {
              dataBarang: dataBarang
            })
          } else {
            this.$q.notify({
              message: res.data.pesan,
              color: 'negative',
              timeout: 2000
            })
          }
        })
    }
  }
}
</script>
