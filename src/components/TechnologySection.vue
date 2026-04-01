<template>
  <section class="tech" id="technology">
    <div class="section-wrap">
      <div class="tech-header">
        <span class="section-label reveal">Core Technology</span>
        <h2 class="tech-title reveal reveal-delay-1">
          The technology that keeps you<br/><em>connected to your build.</em>
        </h2>
        <p class="tech-sub reveal reveal-delay-2">
          Three powerful technology pillars give you unprecedented visibility and control over your property — from thousands of miles away.
        </p>
      </div>
      <div class="tech-pillars">
        <div class="pillar reveal" :class="'reveal-delay-' + (i+1)"
          v-for="(p, i) in pillars" :key="p.title"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="pillar-num">0{{ i+1 }}</div>
          <div class="pillar-icon">{{ p.icon }}</div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.desc }}</p>
          <ul>
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.tech .reveal')
const pillars = [
  { icon: '🗺', title: 'Interactive Map Integration', desc: 'Every plot is pinned on a live interactive map with satellite imagery, GPS coordinates, and government land registry data.', features: ['Satellite + street-level hybrid', 'Government registry overlay', 'Plot boundary visualisation', 'Neighbourhood development view'] },
  { icon: '📍', title: 'Geo-Referencing & Geolocation', desc: 'We survey every plot using precision GPS — anchoring all data to real-world coordinates with sub-metre accuracy.', features: ['Sub-metre GPS accuracy', 'Government survey cross-reference', 'Real-time live location feed', 'Coordinate-stamped photos'] },
  { icon: '🛸', title: 'Drone Footage & Aerial Surveys', desc: 'Scheduled aerial surveys over every active site. Monthly 4K video walkthroughs and geo-tagged photos delivered to your dashboard.', features: ['Monthly 4K aerial video', 'Geo-tagged progress photos', 'Month-on-month overlays', 'Shareable client portal'] },
]
</script>
<style scoped>
.tech { padding: 100px 0; background: var(--white); }
.tech-header { max-width: 640px; margin-bottom: 64px; }
.section-label { display: block; margin-bottom: 16px; }
.tech-title { font-family: var(--font-display); font-size: clamp(2rem, 3.2vw, 3.2rem); font-weight: 300; color: var(--navy); line-height: 1.2; margin-bottom: 18px; }
.tech-title em { font-style: italic; color: var(--gold); }
.tech-sub { font-size: 0.95rem; line-height: 1.75; color: var(--muted); }
.tech-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; border: 1px solid var(--border); }
.pillar { padding: 40px 36px; background: var(--white); border-right: 1px solid var(--border); transition: background 0.3s; position: relative; }
.pillar:last-child { border-right: none; }
.pillar:hover { background: var(--off-white); }
.pillar-num { font-family: var(--font-display); font-size: 4rem; font-weight: 700; color: var(--light-mid); position: absolute; top: 20px; right: 24px; line-height: 1; }
.pillar-icon { font-size: 2rem; margin-bottom: 20px; }
.pillar h3 { font-family: var(--font-ui); font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 12px; }
.pillar p { font-size: 0.85rem; line-height: 1.7; color: var(--muted); margin-bottom: 20px; }
.pillar ul { list-style: none; display: flex; flex-direction: column; gap: 7px; }
.pillar li { font-size: 0.78rem; color: var(--muted); padding-left: 14px; position: relative; }
.pillar li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 1px; background: var(--gold); }
@media (max-width: 960px) { .tech-pillars { grid-template-columns: 1fr; } .pillar { border-right: none; border-bottom: 1px solid var(--border); } .pillar:last-child { border-bottom: none; } }
</style>
