<template>
  <div>
    <div class="topbar">
      <div>
        <h2>Player Tracker</h2>
        <p class="muted">In-memory CRUD list for Arma 3 / Olympus-style tracking.</p>
      </div>

      <RouterLink class="btn primary" to="/players/new">+ Add Player</RouterLink>
    </div>

    <PlayersTable :items="players" @delete="handleDelete" />
  </div>
</template>

<script setup>
import PlayersTable from "../components/PlayersTable.vue";
import { players, deletePlayer } from "../data/playersStore";

function handleDelete(id) {
  if (confirm("Delete this player?")) deletePlayer(id);
}
</script>

<style scoped>
.topbar {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.muted {
  margin: 6px 0 0;
  color: var(--muted);
}
</style>
