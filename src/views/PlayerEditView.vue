<template>
  <div v-if="player">
    <h2>Edit Player</h2>
    <PlayerForm :initial="player" submitText="Update" @submit="save" @cancel="goBack" />
  </div>

  <div v-else class="card">
    Player not found.
    <div style="margin-top: 10px;">
      <RouterLink to="/players">Back to list</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import PlayerForm from "../components/PlayerForm.vue";
import { getPlayerById, updatePlayer } from "../data/playersStore";

const props = defineProps({ id: { type: String, required: true } });
const router = useRouter();

const player = computed(() => getPlayerById(props.id));

function save(payload) {
  updatePlayer(props.id, payload);
  router.push("/players");
}

function goBack() {
  router.push("/players");
}
</script>

<style scoped>
.card {
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: white;
}
</style>
