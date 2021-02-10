import { LocalStorage } from 'quasar'
export default function () {
  return {
    user:{
      token: LocalStorage.getItem('token') || '',
      type: LocalStorage.getItem('role_id') || '',
    }

  }
}
