import { Dialog } from 'quasar'

const show = (message, jenis, image) => {
  Dialog.create({
    message: message
  })
}

export default async ({ Vue }) => {
  Vue.prototype.$showNotif = show
}
