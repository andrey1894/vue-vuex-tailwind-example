import { Store, createLogger } from "vuex";
import userModule, { IUserState } from "./userModule";

const debug = process.env.NODE_ENV !== "production";

export interface State {
  user: IUserState;
}

export default new Store<State>({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    user: userModule,
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
