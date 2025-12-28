import { ref } from "vue";

const nextId = (() => {
  let id = 6;
  return () => String(id++);
})();

export const players = ref([
  {
    id: "1",
    name: "xsmitherz",
    steamId: "76561198443819754",
    role: "APD",
    status: "Active",
    squad: "Echo",
    lastSeen: "2025-12-28",
    notes: "Chief of Police",
  },
  {
    id: "2",
    name: "Rexo",
    steamId: "76561198193130069",
    role: "APD",
    status: "Active",
    squad: "Alpha",
    lastSeen: "2025-12-27",
    notes: "Senior leadership",
  },
  {
    id: "3",
    name: "Kaotic",
    steamId: "76561198088758250",
    role: "APD",
    status: "Active",
    squad: "Delta",
    lastSeen: "2025-12-26",
    notes: "Response unit",
  },
  {
    id: "4",
    name: "Caden",
    steamId: "76561198216100232",
    role: "APD",
    status: "Active",
    squad: "Bravo",
    lastSeen: "2025-12-24",
    notes: "Solid patrol presence",
  },
  {
    id: "5",
    name: "Nicole",
    steamId: "76561198000000000",
    role: "Staff",
    status: "Active",
    squad: "None",
    lastSeen: "2025-12-22",
    notes: "Web/dev side",
  },
]);

export function addPlayer(payload) {
  players.value.unshift({
    id: nextId(),
    ...normalize(payload),
  });
}

export function updatePlayer(id, payload) {
  const idx = players.value.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  players.value[idx] = { ...players.value[idx], ...normalize(payload) };
  return true;
}

export function deletePlayer(id) {
  players.value = players.value.filter((p) => p.id !== id);
}

export function getPlayerById(id) {
  return players.value.find((p) => p.id === id) || null;
}

function normalize(payload) {
  // Keep this simple, but consistent
  return {
    name: String(payload.name ?? "").trim(),
    steamId: String(payload.steamId ?? "").trim(),
    role: payload.role ?? "Civilian",
    status: payload.status ?? "Active",
    squad: payload.squad ?? "None",
    lastSeen: payload.lastSeen || new Date().toISOString().slice(0, 10),
    notes: String(payload.notes ?? "").trim(),
  };
}
