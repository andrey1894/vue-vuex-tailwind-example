import { ActionContext } from "vuex";
import { INotification } from "@/models";
import { State } from ".";

export interface IUiState {
  notifications: INotification[];
}

export default {
  namespaced: true,
  state: (): IUiState => ({
    notifications: [],
  }),
  getters: {
    newNotifications(state: IUiState) {
      return state.notifications.filter((n) => !n.checked);
    },
  },
  mutations: {
    addNotification: (
      state: IUiState,
      { message, checked }: { message: string; checked: boolean }
    ): void => {
      state.notifications.push({
        message,
        checked,
      });
    },
    removeNotification: (
      state: IUiState,
      { index }: { index: number }
    ): void => {
      state.notifications.splice(index, 1);
    },
    resetNotificationsStatus: (state: IUiState): void => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        checked: true,
      }));
    },
    clearNotifications: (state: IUiState): void => {
      state.notifications = [];
    },
  },
  actions: {
    addNotification(
      { commit }: ActionContext<IUiState, State>,
      { message }: { message: string }
    ) {
      commit("addNotification", { message, checked: false });
    },
    removeNotification(
      { commit }: ActionContext<IUiState, State>,
      { index }: { index: number }
    ) {
      commit("removeNotification", { index });
    },
    resetNotificationsStatus({ commit }: ActionContext<IUiState, State>) {
      commit("resetNotificationsStatus");
    },
    clearNotifications({ commit }: ActionContext<IUiState, State>) {
      commit("clearNotifications");
    },
  },
};
