<template>
  <form @submit.prevent="onSubmit" class="card">
    <div class="grid">
      <div class="row">
        <label>Name</label>
        <input class="input" v-model.trim="form.name" required placeholder="Player name" />
      </div>

      <div class="row">
        <label>SteamID (64-bit)</label>
        <input
          class="input"
          v-model.trim="form.steamId"
          required
          placeholder="7656119..."
          inputmode="numeric"
        />
        <small v-if="steamIdError" class="error">{{ steamIdError }}</small>
      </div>

      <div class="row">
        <label>Role</label>
        <select class="select" v-model="form.role" required>
          <option>Civilian</option>
          <option>APD</option>
          <option>Medic</option>
          <option>Staff</option>
        </select>
      </div>

      <div class="row">
        <label>Status</label>
        <select class="select" v-model="form.status" required>
          <option>Active</option>
          <option>LOA</option>
          <option>Suspended</option>
          <option>Banned</option>
          <option>Watchlist</option>
        </select>
      </div>

      <div class="row">
        <label>Squad</label>
        <select class="select" v-model="form.squad" required>
          <option>None</option>
          <option>Alpha</option>
          <option>Bravo</option>
          <option>Charlie</option>
          <option>Delta</option>
          <option>Echo</option>
        </select>
      </div>

      <div class="row">
        <label>Last Seen</label>
        <input class="input" v-model="form.lastSeen" type="date" required />
      </div>

      <div class="row full">
        <label>Notes</label>
        <textarea
          class="textarea"
          v-model.trim="form.notes"
          rows="4"
          placeholder="Any notes…"
        />
      </div>
    </div>

    <div class="actions">
      <button class="btn primary" type="submit" :disabled="!!steamIdError">
        {{ submitText }}
      </button>
      <button class="btn" type="button" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>


<script setup>
import { reactive, watch, computed } from "vue";

const props = defineProps({
  initial: {
    type: Object,
    default: () => ({
      name: "",
      steamId: "",
      role: "Civilian",
      status: "Active",
      squad: "None",
      lastSeen: new Date().toISOString().slice(0, 10),
      notes: "",
    }),
  },
  submitText: { type: String, default: "Save" },
});

const emit = defineEmits(["submit", "cancel"]);

const form = reactive({ ...props.initial });

watch(
  () => props.initial,
  (v) => Object.assign(form, v),
  { deep: true }
);

const steamIdError = computed(() => {
  // Loose validation: numeric and typical SteamID64 length range
  const s = String(form.steamId || "").trim();
  if (!s) return "SteamID is required.";
  if (!/^\d+$/.test(s)) return "SteamID must be numbers only.";
  if (s.length < 15 || s.length > 20) return "SteamID length looks off.";
  return "";
});

function onSubmit() {
  if (steamIdError.value) return;
  emit("submit", { ...form });
}
</script>

<style scoped>
.card {
  max-width: 900px;
}

.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.row {
  display: grid;
  gap: 6px;
}

.row.full {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
}

.error {
  color: var(--danger);
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

