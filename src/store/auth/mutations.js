import {LocalStorage} from "quasar";

export function updateAuthState (state, type)  {
  state.user.token = LocalStorage.getItem('token');
  state.user.type = LocalStorage.getItem('role_id');
}
