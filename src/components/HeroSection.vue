<template>
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="grid-lines"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="scan-line"></div>
    </div>

    <div class="hero-badges reveal">
      <span class="tech-badge"><span class="badge-dot"></span>Live Map Intelligence</span>
      <span class="tech-badge"><span class="badge-dot"></span>Drone Geo-Referenced Surveys</span>
      <span class="tech-badge"><span class="badge-dot"></span>Real-Time Site Tracking</span>
    </div>

    <div class="hero-content">
      <span class="section-label reveal reveal-delay-1">Cedar Home Builder · Powered by Cedar Africa</span>
      <h1 class="hero-title reveal reveal-delay-2">
        Build your home in<br/>
        Nigeria — guided by<br/>
        <em>precision technology.</em>
      </h1>
      <p class="hero-sub reveal reveal-delay-3">
        We combine <strong>interactive map intelligence</strong>, <strong>geo-referenced drone surveys</strong>, and <strong>real-time geolocation tracking</strong> with end-to-end construction management — so diaspora homeowners know exactly what's happening on their land, from anywhere on earth.
      </p>
      <div class="hero-actions reveal reveal-delay-4">
        <a href="#map-platform" class="btn-primary" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <span>Explore the Platform</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </a>
        <BookingModal>
          <template #default="{ open }">
            <button class="btn-ghost" @click="open" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Book a free consultation</button>
          </template>
        </BookingModal>
      </div>
    </div>

    <div class="hero-map-preview reveal reveal-delay-3">
      <div class="map-ui">
        <div class="map-topbar">
          <span class="map-brand">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none"><path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="2"/></svg>
            Cedar Home Builder · Map View
          </span>
          <div class="map-dots"><span></span><span></span><span></span></div>
        </div>
        <!-- FIX: use ref only, not id, to avoid DOM collisions -->
        <div ref="mapEl" class="hero-map-el"></div>
        <div class="map-overlays">
          <div class="map-pin-card">
            <div class="pin-pulse"></div>
            <div class="pin-info">
              <strong>Plot A-23 · Lekki Phase 1</strong>
              <span>📍 Geo-verified · Title confirmed</span>
              <span class="pin-status active">🟢 Under Construction</span>
            </div>
          </div>
          <div class="map-stat-row">
            <div class="ms"><span class="ms-val">6.4352°N</span><span class="ms-lbl">Latitude</span></div>
            <div class="ms"><span class="ms-val">3.4737°E</span><span class="ms-lbl">Longitude</span></div>
            <div class="ms"><span class="ms-val">±0.3m</span><span class="ms-lbl">GPS Accuracy</span></div>
          </div>
        </div>
      </div>
      <div class="map-drone-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--tech-blue)" stroke-width="1.5"/><path d="M2 17L12 22L22 17" stroke="var(--tech-blue)" stroke-width="1.5"/><path d="M2 12L12 17L22 12" stroke="var(--tech-blue)" stroke-width="1.5"/></svg>
        Drone footage available
      </div>
    </div>

    <div class="scroll-cue">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import BookingModal from './BookingModal.vue'
defineEmits(['hover', 'unhover'])
const mapEl = ref(null)
let mapInstance = null

onMounted(async () => {
  // Trigger reveal animations
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100)
  })

  // Init Leaflet using ref (not id) to avoid DOM ID collision
  await import('leaflet/dist/leaflet.css')
  const L = (await import('leaflet')).default
  if (!mapEl.value) return

  mapInstance = L.map(mapEl.value, {
    center: [6.4352, 3.4737],
    zoom: 14,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(mapInstance)

  const icon = L.divIcon({
    html: `<div style="width:16px;height:16px;background:var(--gold);border-radius:50%;border:2px solid white;box-shadow:0 0 12px rgba(201,168,76,0.8);"></div>`,
    className: '', iconAnchor: [8, 8],
  })
  L.marker([6.4352, 3.4737], { icon }).addTo(mapInstance)

  const bounds = [[6.4365, 3.4720],[6.4365, 3.4755],[6.4338, 3.4755],[6.4338, 3.4720]]
  L.polygon(bounds, { color: '#C9A84C', weight: 1.5, fillColor: '#C9A84C', fillOpacity: 0.07, dashArray: '6 4' }).addTo(mapInstance)

  const icon2 = L.divIcon({
    html: `<div style="width:10px;height:10px;background:#4ECDC4;border-radius:50%;box-shadow:0 0 8px rgba(78,205,196,0.7);"></div>`,
    className: '', iconAnchor: [5, 5],
  })
  L.marker([6.4362, 3.4748], { icon: icon2 }).addTo(mapInstance)
})

// FIX: destroy map on unmount to prevent memory leak & re-init errors
onUnmounted(() => {
  if (mapInstance) { mapInstance.remove(); mapInstance = null }
})
</script>

<style scoped>
.hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 60px; padding: 130px 80px 80px; background: var(--forest-deep); position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px); background-size: 50px 50px; }
.orb { position: absolute; border-radius: 50%; filter: blur(90px); }
.orb-1 { width: 600px; height: 600px; background: rgba(201,168,76,0.06); top: -200px; right: -150px; animation: floatOrb 10s ease-in-out infinite; }
.orb-2 { width: 400px; height: 400px; background: rgba(78,205,196,0.04); bottom: -100px; left: -80px; animation: floatOrb 14s ease-in-out infinite 4s; }
.scan-line { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(78,205,196,0.4), transparent); animation: scan 6s linear infinite; top: 0; }
@keyframes floatOrb { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,-30px); } }
@keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

.hero-badges { position: absolute; top: 110px; left: 80px; display: flex; gap: 12px; flex-wrap: wrap; z-index: 2; }
.tech-badge { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-ui); font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(247,242,232,0.6); background: rgba(247,242,232,0.04); border: 1px solid rgba(247,242,232,0.1); padding: 6px 12px; }
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--tech-blue); box-shadow: 0 0 6px var(--tech-blue); animation: blink 2s ease-in-out infinite; flex-shrink: 0; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

.hero-content { position: relative; z-index: 2; padding-top: 40px; }
.section-label { display: block; margin-bottom: 20px; }
.hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 4.5vw, 4.8rem); font-weight: 300; line-height: 1.1; color: var(--cream); margin-bottom: 28px; }
.hero-title em { font-style: italic; color: var(--gold); }
.hero-sub { font-size: 1rem; line-height: 1.8; color: rgba(247,242,232,0.6); max-width: 500px; margin-bottom: 44px; }
.hero-sub strong { color: var(--gold-light); font-weight: 500; }
.hero-actions { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
.btn-primary { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-ui); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; color: var(--forest-deep); background: var(--gold); padding: 16px 30px; transition: background 0.3s, transform 0.3s var(--spring), box-shadow 0.3s; }
.btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 20px 40px rgba(201,168,76,0.25); }
.btn-ghost { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 600; text-decoration: none; color: rgba(247,242,232,0.5); border-bottom: 1px solid rgba(247,242,232,0.2); padding-bottom: 2px; transition: color 0.3s, border-color 0.3s; }
.btn-ghost:hover { color: var(--gold); border-color: var(--gold); }

.hero-map-preview { position: relative; z-index: 2; }
.map-ui { border: 1px solid rgba(201,168,76,0.2); overflow: hidden; background: #0d1f18; }
.map-topbar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: rgba(10,31,20,0.9); border-bottom: 1px solid rgba(201,168,76,0.15); font-family: var(--font-ui); font-size: 0.7rem; color: rgba(247,242,232,0.5); letter-spacing: 0.06em; }
.map-brand { display: flex; align-items: center; gap: 8px; color: var(--gold-light); font-weight: 600; }
.map-dots { display: flex; gap: 5px; }
.map-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(247,242,232,0.1); }
.map-dots span:first-child { background: #ff5f57; }
.map-dots span:nth-child(2) { background: #ffbd2e; }
.map-dots span:last-child { background: #28c940; }

/* FIX: use class selector instead of #id to avoid collision */
.hero-map-el { width: 100%; height: 320px; }

.map-overlays { position: relative; padding: 12px 14px 14px; background: rgba(10,31,20,0.85); border-top: 1px solid rgba(201,168,76,0.1); display: flex; flex-direction: column; gap: 12px; }
.map-pin-card { display: flex; align-items: flex-start; gap: 12px; }
.pin-pulse { width: 14px; height: 14px; border-radius: 50%; background: var(--gold); flex-shrink: 0; margin-top: 2px; box-shadow: 0 0 0 0 rgba(201,168,76,0.6); animation: pulseRing 2s ease-out infinite; }
@keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(201,168,76,0.6); } 70% { box-shadow: 0 0 0 10px rgba(201,168,76,0); } 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); } }
.pin-info { display: flex; flex-direction: column; gap: 3px; }
.pin-info strong { font-family: var(--font-ui); font-size: 0.78rem; color: var(--cream); }
.pin-info span { font-size: 0.7rem; color: rgba(247,242,232,0.45); }
.pin-status.active { color: #4ade80 !important; }
.map-stat-row { display: flex; gap: 20px; padding-top: 8px; border-top: 1px solid rgba(247,242,232,0.06); }
.ms { display: flex; flex-direction: column; gap: 2px; }
.ms-val { font-family: var(--font-ui); font-size: 0.78rem; font-weight: 700; color: var(--tech-blue); }
.ms-lbl { font-size: 0.62rem; color: rgba(247,242,232,0.3); letter-spacing: 0.08em; text-transform: uppercase; }
.map-drone-badge { position: absolute; top: 60px; right: -10px; background: rgba(10,31,20,0.9); border: 1px solid rgba(78,205,196,0.3); color: var(--tech-blue); font-family: var(--font-ui); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; padding: 8px 14px; display: flex; align-items: center; gap: 8px; animation: floatBadge 4s ease-in-out infinite; }
@keyframes floatBadge { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.scroll-cue { position: absolute; bottom: 40px; left: 80px; display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 2; }
.scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2s ease-in-out infinite; }
@keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
.scroll-cue span { font-family: var(--font-ui); font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(247,242,232,0.3); writing-mode: vertical-rl; }

@media (max-width: 1060px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 80px 40px 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 40px;
  }
  /* Take badges out of absolute flow — stack naturally */
  .hero-badges {
    position: static;
    top: auto; left: auto;
    margin-top: 72px; /* space for fixed navbar */
    flex-wrap: wrap;
    gap: 8px;
  }
  .hero-content {
    padding-top: 0;
  }
  .scroll-cue { display: none; }
}

@media (max-width: 600px) {
  .hero { padding: 72px 20px 60px; gap: 32px; }
  .hero-badges { margin-top: 60px; }
  .hero-title { font-size: 2.5rem; }
  .tech-badge { font-size: 0.6rem; padding: 5px 10px; }
}
</style>
