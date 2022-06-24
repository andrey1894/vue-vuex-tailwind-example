import { ActionContext } from "vuex";
import { IUserOutDto } from "@/models";
import { getCurrentUser, logout } from "@/api";
import { State } from ".";

export interface IUserState {
  user: IUserOutDto | null;
}

export default {
  namespaced: true,
  state: (): IUserState => ({
    user: null,
  }),
  getters: {
    userName: (state: IUserState) => {
      return state.user ? state.user.firstName + " " + state.user.lastName : "";
    },
  },
  mutations: {
    setUser: (state: IUserState, user: IUserOutDto | null): void => {
      state.user = user;
    },
  },
  actions: {
    async initCurrentUser({ commit }: ActionContext<IUserState, State>) {
      try {
        const user = await getCurrentUser();
        commit("setUser", user);
        return true;
      } catch {
        return false;
      }
    },

    async logout({ commit }: ActionContext<IUserState, State>) {
      try {
        await logout();
        commit("setUser", null);
        return true;
      } catch {
        return false;
      }
    },
  },
};
