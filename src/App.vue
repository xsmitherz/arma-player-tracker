<template>
  <div class="shell">
    <aside class="sidebar card">
      <div class="brand">
        <div class="logoDot"></div>
        <div>
          <div class="brandTitle">xsmitherz web app</div>
          <div class="brandSub">Player Tracker</div>
        </div>
      </div>

      <nav class="nav">
        <RouterLink class="navItem" to="/players" active-class="active">
          Players
        </RouterLink>
        <RouterLink class="navItem" to="/players/new" active-class="active">
          Add Player
        </RouterLink>

        <hr class="soft" />

        <a class="navItem muted" href="#" @click.prevent>
          Settings (mock)
        </a>
      </nav>

      <div class="sidebarFooter">
        <div class="muted small">volunteering for slavery</div>
      </div>
    </aside>

    <div class="content">
      <header class="topbar card">
        <div class="topLeft">
          <div class="pageTitle">{{ title }}</div>
          <div class="muted small subtitle">{{ subtitle }}</div>
        </div>

        <div class="topRight">
          <RouterLink class="btn primary" to="/players/new">+ New</RouterLink>
          <a class="btn" href="#" @click.prevent>Refresh</a>
        </div>
      </header>

      <main class="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = computed(() => {
  if (route.path === "/players") return "Players";
  if (route.path === "/players/new") return "Add Player";
  if (route.path.includes("/edit")) return "Edit Player";
  return "LifeControl";
});

const subtitle = computed(() => {
  if (route.path === "/players") return "Search, filter, and manage in-memory roster entries.";
  if (route.path === "/players/new") return "Create a new roster entry.";
  if (route.path.includes("/edit")) return "Update player details.";
  return " ";
});
</script>

<style scoped>
.shell {
  max-width: 1300px;
  margin: 0 auto;
  padding: 18px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;
}

.sidebar {
  padding: 14px;
  position: sticky;
  top: 18px;
  height: calc(100vh - 36px);
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 6px 14px;
}

.logoDot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(78,161,255,0.15);
}

.brandTitle { font-weight: 800; letter-spacing: 0.02em; }
.brandSub { color: var(--muted); font-size: 12px; margin-top: 2px; }

.nav { display: grid; gap: 6px; margin-top: 6px; }
.navItem {
  padding: 10px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  color: var(--text);
}
.navItem:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.06); }
.navItem.active { background: rgba(78,161,255,0.12); border-color: rgba(78,161,255,0.24); }

.muted { color: var(--muted); }
.small { font-size: 12px; }
.subtitle { margin-top: 2px; }

.sidebarFooter { margin-top: auto; padding-top: 12px; }

.content { display: grid; gap: 14px; }

.topbar {
  padding: 10px 14px;       /* reduced vertical padding */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* Slightly tighter title block */
.pageTitle {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
}

.topRight {
  display: flex;
  gap: 10px;
  align-items: center;
}

.main { padding: 2px; }

@media (max-width: 980px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar { position: relative; height: auto; }
}
</style>
