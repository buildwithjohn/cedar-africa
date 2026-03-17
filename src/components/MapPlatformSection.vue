<template>
  <section class="mapplatform" id="map-platform">
    <div class="mp-inner">
      <div class="mp-header">
        <span class="section-label reveal">Live Platform Demo</span>
        <h2 class="mp-title reveal reveal-delay-1">
          Your property. On the map.<br/><em>Right now.</em>
        </h2>
        <p class="mp-sub reveal reveal-delay-2">
          Every Cedar Home Builder client gets access to a live, geo-referenced property dashboard. Below is a real-time view of Lagos — the same technology powering your project tracker.
        </p>
      </div>

      <div class="mp-layout">
        <!-- Main Map -->
        <div class="mp-map-wrap reveal reveal-delay-2">
          <div class="map-chrome">
            <div class="chrome-bar">
              <div class="chrome-dots"><span></span><span></span><span></span></div>
              <span class="chrome-url">🔒 app.cedarhomebuilder.com / map / client-dashboard</span>
              <div class="chrome-actions">
                <span>Layers</span>
                <span>Filter</span>
                <span>Export</span>
              </div>
            </div>
            <div class="map-layer-tabs">
              <button
                v-for="tab in mapTabs" :key="tab"
                :class="['layer-tab', { active: activeTab === tab }]"
                @click="activeTab = tab"
                @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')"
              >{{ tab }}</button>
            </div>
            <div id="platform-map" ref="mapEl" class="platform-map"></div>
            <div class="map-legend">
              <div class="leg-item"><span class="leg-dot gold"></span>Your Plots</div>
              <div class="leg-item"><span class="leg-dot teal"></span>Drone Survey Area</div>
              <div class="leg-item"><span class="leg-dot white"></span>Verified Boundaries</div>
            </div>
          </div>
        </div>

        <!-- Side panel -->
        <div class="mp-sidebar reveal reveal-delay-3">
          <div class="sidebar-section">
            <h4>Active Projects</h4>
            <div class="project-card" v-for="p in projects" :key="p.name"
              :class="{ selected: selectedProject === p.name }"
              @click="selectedProject = p.name; flyTo(p)"
              @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <div class="proj-indicator" :style="{ background: p.color }"></div>
              <div class="proj-info">
                <strong>{{ p.name }}</strong>
                <span>{{ p.location }}</span>
                <div class="proj-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: p.progress + '%', background: p.color }"></div>
                  </div>
                  <span class="progress-label">{{ p.progress }}% complete</span>
                </div>
              </div>
              <div class="proj-status" :class="p.statusClass">{{ p.status }}</div>
            </div>
          </div>

          <div class="sidebar-section">
            <h4>Geo Data</h4>
            <div class="geo-data">
              <div class="gd-row" v-for="g in geoData" :key="g.label">
                <span class="gd-label">{{ g.label }}</span>
                <span class="gd-val">{{ g.val }}</span>
              </div>
            </div>
          </div>

          <div class="sidebar-section">
            <h4>Latest Drone Flight</h4>
            <div class="drone-preview">
              <div class="drone-thumb">
                <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80" alt="Drone view" />
                <div class="play-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="white" stroke-width="1.2"/>
                    <path d="M8 7L14 10L8 13V7Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div class="drone-meta">
                <strong>Aerial Survey — March 2025</strong>
                <span>Plot A-23 · Lekki Phase 1</span>
                <span>📍 6.4352°N, 3.4737°E</span>
                <a href="#booking" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" class="view-link">View full footage →</a>
              </div>
            </div>
          </div>

          <a href="#booking" class="sidebar-cta" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Get access to your own dashboard
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])

const mapEl = ref(null)
const activeTab = ref('Satellite')
const selectedProject = ref('Plot A-23')
const mapTabs = ['Satellite', 'Street', 'Terrain', 'Drone']
let map = null
let mapCleanup = null

const projects = [
  { name: 'Plot A-23', location: 'Lekki Phase 1, Lagos', progress: 68, status: 'Building', statusClass: 'status-active', color: '#C9A84C', lat: 6.4352, lng: 3.4737 },
  { name: 'Lot B-07', location: 'Maitama, Abuja', progress: 32, status: 'Foundation', statusClass: 'status-build', color: '#4ECDC4', lat: 9.0765, lng: 7.3986 },
  { name: 'Plot C-11', location: 'GRA, Port Harcourt', progress: 91, status: 'Finishing', statusClass: 'status-finish', color: '#a8e063', lat: 4.8396, lng: 7.0498 },
]
const geoData = [
  { label: 'Coordinates', val: '6.4352°N, 3.4737°E' },
  { label: 'GPS Accuracy', val: '±0.3 metres' },
  { label: 'Survey Date', val: 'March 14, 2025' },
  { label: 'Title Status', val: '✓ Verified C of O' },
  { label: 'Plot Size', val: '600 sqm' },
  { label: 'Drone Flight', val: 'Mar 10, 2025' },
]

const flyTo = (project) => {
  if (map) map.flyTo([project.lat, project.lng], 15, { duration: 1.5 })
}

useReveal('.mapplatform .reveal')

onMounted(async () => {

  await import('leaflet/dist/leaflet.css')
  const L = (await import('leaflet')).default
  map = L.map(mapEl.value, {
    center: [6.4352, 3.4737],
    zoom: 13,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map)

  // Markers for each project
  projects.forEach(p => {
    const icon = L.divIcon({
      html: `<div style="width:14px;height:14px;background:${p.color};border-radius:50%;border:2px solid white;box-shadow:0 0 12px ${p.color}99;"></div>`,
      className: '', iconAnchor: [7, 7],
    })
    L.marker([p.lat, p.lng], { icon }).bindTooltip(`<b>${p.name}</b><br>${p.location}`, { className: 'map-tooltip' }).addTo(map)
  })

  // Drone survey polygon for main plot
  const poly = [[6.4365,3.4720],[6.4365,3.4755],[6.4338,3.4755],[6.4338,3.4720]]
  L.polygon(poly, { color:'#4ECDC4', weight:1.5, fillColor:'#4ECDC4', fillOpacity:0.06, dashArray:'6 4' }).addTo(map)
  L.polygon(poly.map(c => [c[0]+0.0002, c[1]+0.0002]), { color:'#C9A84C', weight:1.5, fillColor:'#C9A84C', fillOpacity:0.04, dashArray:'4 6' }).addTo(map)
})
onUnmounted(() => { if (map) { map.remove(); map = null } })
</script>

<style scoped>
.mapplatform {
  padding: 130px 80px;
  background: var(--cream);
  position: relative;
}
.mp-inner { max-width: 1240px; margin: 0 auto; }
.mp-header { margin-bottom: 64px; }
.section-label { display: block; margin-bottom: 20px; }
.mp-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.8vw, 3.8rem);
  font-weight: 300; line-height: 1.2; color: var(--forest);
  margin-bottom: 20px;
}
.mp-title em { font-style: italic; color: var(--gold); }
.mp-sub { font-size: 0.95rem; line-height: 1.75; color: var(--muted); max-width: 560px; }

.mp-layout { display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start; }

/* Chrome browser frame */
.map-chrome {
  border: 1px solid rgba(28,58,43,0.12);
  overflow: hidden;
  background: var(--forest-deep);
  box-shadow: 0 30px 80px rgba(28,58,43,0.1);
}
.chrome-bar {
  display: flex; align-items: center; gap: 16px;
  padding: 10px 16px;
  background: #1a2a22;
  border-bottom: 1px solid rgba(247,242,232,0.06);
}
.chrome-dots { display: flex; gap: 5px; }
.chrome-dots span { width: 10px; height: 10px; border-radius: 50%; }
.chrome-dots span:nth-child(1) { background: #ff5f57; }
.chrome-dots span:nth-child(2) { background: #ffbd2e; }
.chrome-dots span:nth-child(3) { background: #28c940; }
.chrome-url { flex: 1; font-family: var(--font-ui); font-size: 0.68rem; color: rgba(247,242,232,0.35); letter-spacing: 0.04em; text-align: center; }
.chrome-actions { display: flex; gap: 12px; }
.chrome-actions span { font-family: var(--font-ui); font-size: 0.65rem; color: rgba(247,242,232,0.3); letter-spacing: 0.08em; cursor: none; }
.map-layer-tabs { display: flex; border-bottom: 1px solid rgba(247,242,232,0.06); background: #132018; }
.layer-tab { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; padding: 8px 18px; background: none; border: none; color: rgba(247,242,232,0.35); border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }
.layer-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
.platform-map { width: 100%; height: 420px; }
.map-legend { display: flex; gap: 20px; padding: 12px 16px; background: rgba(10,31,20,0.8); border-top: 1px solid rgba(247,242,232,0.06); }
.leg-item { display: flex; align-items: center; gap: 7px; font-family: var(--font-ui); font-size: 0.68rem; color: rgba(247,242,232,0.45); }
.leg-dot { width: 8px; height: 8px; border-radius: 50%; }
.leg-dot.gold { background: var(--gold); }
.leg-dot.teal { background: var(--tech-blue); }
.leg-dot.white { border: 1px solid rgba(247,242,232,0.4); background: none; border-radius: 0; }

/* Sidebar */
.mp-sidebar { display: flex; flex-direction: column; gap: 16px; }
.sidebar-section { background: var(--white); border: 1px solid rgba(28,58,43,0.08); padding: 20px; }
.sidebar-section h4 { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
.project-card { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border: 1px solid transparent; transition: border-color 0.2s, background 0.2s; margin-bottom: 8px; cursor: none; }
.project-card:last-child { margin-bottom: 0; }
.project-card.selected { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.04); }
.project-card:hover { background: rgba(28,58,43,0.04); }
.proj-indicator { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; box-shadow: 0 0 8px currentColor; }
.proj-info { flex: 1; }
.proj-info strong { display: block; font-family: var(--font-ui); font-size: 0.82rem; color: var(--forest); margin-bottom: 2px; }
.proj-info > span { display: block; font-size: 0.72rem; color: var(--muted); margin-bottom: 8px; }
.proj-progress { display: flex; flex-direction: column; gap: 4px; }
.progress-bar { height: 3px; background: rgba(28,58,43,0.1); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 2px; transition: width 1s var(--ease-out-expo); }
.progress-label { font-family: var(--font-ui); font-size: 0.65rem; color: var(--muted); }
.proj-status { font-family: var(--font-ui); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; padding: 4px 8px; white-space: nowrap; flex-shrink: 0; }
.status-active { background: rgba(201,168,76,0.1); color: var(--gold); }
.status-build { background: rgba(78,205,196,0.1); color: var(--tech-blue); }
.status-finish { background: rgba(168,224,99,0.1); color: #a8e063; }

.geo-data { display: flex; flex-direction: column; gap: 8px; }
.gd-row { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid rgba(28,58,43,0.06); }
.gd-row:last-child { border-bottom: none; }
.gd-label { font-size: 0.75rem; color: var(--muted); }
.gd-val { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 600; color: var(--forest); }

.drone-preview { display: flex; gap: 12px; align-items: flex-start; }
.drone-thumb { position: relative; width: 90px; height: 70px; flex-shrink: 0; overflow: hidden; }
.drone-thumb img { width: 100%; height: 100%; object-fit: cover; }
.play-btn { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; }
.drone-meta { display: flex; flex-direction: column; gap: 3px; }
.drone-meta strong { font-family: var(--font-ui); font-size: 0.78rem; color: var(--forest); }
.drone-meta span { font-size: 0.7rem; color: var(--muted); }
.view-link { font-family: var(--font-ui); font-size: 0.72rem; font-weight: 600; color: var(--gold); text-decoration: none; margin-top: 4px; display: block; }
.view-link:hover { color: var(--forest); }

.sidebar-cta {
  display: flex; align-items: center; justify-content: space-between;
  font-family: var(--font-ui); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em;
  text-decoration: none; color: var(--white);
  background: var(--forest); padding: 18px 20px;
  transition: background 0.3s;
}
.sidebar-cta:hover { background: var(--gold); color: var(--forest-deep); }

:global(.map-tooltip) { background: var(--forest-deep); border: 1px solid var(--gold); color: var(--cream); font-family: var(--font-ui); font-size: 0.75rem; }

@media (max-width: 1060px) {
  .mapplatform { padding: 80px 40px; }
  .mp-layout { grid-template-columns: 1fr; }
  .mp-sidebar { display: grid; grid-template-columns: 1fr 1fr; }
  .sidebar-cta { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .mapplatform { padding: 60px 20px; }
  .mp-sidebar { grid-template-columns: 1fr; }
  .platform-map { height: 300px; }
}
</style>
