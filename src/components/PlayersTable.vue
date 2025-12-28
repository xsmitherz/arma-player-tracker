<template>
  <div class="card">
    <div class="toolbar">
      <input class="input" v-model.trim="query" placeholder="Search name / SteamID…" />

      <select class="select" v-model="roleFilter">
        <option value="">All roles</option>
        <option>Civilian</option>
        <option>APD</option>
        <option>Medic</option>
        <option>Staff</option>
      </select>

      <select class="select" v-model="statusFilter">
        <option value="">All statuses</option>
        <option>Active</option>
        <option>LOA</option>
        <option>Suspended</option>
        <option>Banned</option>
        <option>Watchlist</option>
      </select>

      <select class="select" v-model="squadFilter">
        <option value="">All squads</option>
        <option>None</option>
        <option>Alpha</option>
        <option>Bravo</option>
        <option>Charlie</option>
        <option>Delta</option>
        <option>Echo</option>
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>SteamID</th>
          <th>Role</th>
          <th>Status</th>
          <th>Squad</th>
          <th>Last Seen</th>
          <th style="width: 170px;">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in filtered" :key="p.id">
          <td class="mono">{{ p.name }}</td>
          <td class="mono">{{ p.steamId }}</td>
          <td>{{ p.role }}</td>
          <td>
            <span class="pill" :class="pillClass(p.status)">{{ p.status }}</span>
          </td>
          <td>{{ p.squad }}</td>
          <td class="mono">{{ p.lastSeen }}</td>
          <td class="actions">
            <RouterLink class="btn" :to="`/players/${p.id}/edit`">Edit</RouterLink>
            <button class="btn danger" @click="$emit('delete', p.id)">Delete</button>
          </td>
        </tr>

        <tr v-if="filtered.length === 0">
          <td colspan="7" class="empty">No matching players.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
});

defineEmits(["delete"]);

const query = ref("");
const roleFilter = ref("");
const statusFilter = ref("");
const squadFilter = ref("");

const filtered = computed(() => {
  const q = query.value.toLowerCase();

  return props.items.filter((p) => {
    const matchesQuery =
      !q ||
      String(p.name).toLowerCase().includes(q) ||
      String(p.steamId).toLowerCase().includes(q);

    const matchesRole = !roleFilter.value || p.role === roleFilter.value;
    const matchesStatus = !statusFilter.value || p.status === statusFilter.value;
    const matchesSquad = !squadFilter.value || p.squad === squadFilter.value;

    return matchesQuery && matchesRole && matchesStatus && matchesSquad;
  });
});

function pillClass(status) {
  switch (status) {
    case "Active":
      return "ok";
    case "LOA":
      return "warn";
    case "Suspended":
      return "warn";
    case "Banned":
      return "bad";
    case "Watchlist":
      return "info";
    default:
      return "";
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.empty {
  text-align: center;
  padding: 18px 8px;
  color: var(--muted);
}

.mono {
  font-family: var(--mono);
}
</style>
