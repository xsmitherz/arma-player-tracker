import { createRouter, createWebHistory } from "vue-router";
import PlayersListView from "../views/PlayersListView.vue";
import PlayerCreateView from "../views/PlayerCreateView.vue";
import PlayerEditView from "../views/PlayerEditView.vue";

const routes = [
  { path: "/", redirect: "/players" },
  { path: "/players", component: PlayersListView },
  { path: "/players/new", component: PlayerCreateView },
  { path: "/players/:id/edit", component: PlayerEditView, props: true },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
