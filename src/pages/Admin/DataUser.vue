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
            {{ props.row.name }}
          </q-td>
          <q-td key="username" :props="props">
            {{ props.row.username }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="points" :props="props">
            {{ props.row.points }}
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
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'username', align: 'center', label: 'Username', field: 'username', sortable: true },
        { name: 'email', label: 'Email', field: 'email', sortable: true },
        { name: 'points', label: 'Points', field: 'points' },
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
      this.$axios.get('user/getUser')
        .then(res => {
          if (res.data.sukses) {
            console.log(res)
            this.$q.notify({
              message: res.data.pesan,
              color: 'positive',
              timeout: 2000
            })
            this.data = res.data.data
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
