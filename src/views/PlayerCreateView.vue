<template>
  <div>
    <h2>Add Player</h2>
    <PlayerForm submitText="Create" @submit="create" @cancel="goBack" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import PlayerForm from "../components/PlayerForm.vue";
import { addPlayer } from "../data/playersStore";

const router = useRouter();

function create(payload) {
  addPlayer(payload);
  router.push("/players");
}

function goBack() {
  router.push("/players");
}
</script>
