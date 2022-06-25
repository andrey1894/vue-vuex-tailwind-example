import { Store, createLogger } from "vuex";
import userModule, { IUserState } from "./userModule";
import uiModule, { IUiState } from "./uiModule";

const debug = process.env.NODE_ENV !== "production";

export interface State {
  user: IUserState;
  ui: IUiState;
}

export default new Store<State>({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    user: userModule,
    ui: uiModule,
  },
});

// export default createStore({
//   // state: {},
//   // getters: {},
//   // mutations: {},
//   // actions: {},
//   strict: debug,
//   plugins: debug ? [createLogger()] : [],
//   modules: {
//     user,
//   },
// });
