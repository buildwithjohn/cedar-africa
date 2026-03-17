<template>
  <section class="tech" id="technology">
    <div class="tech-inner">
      <div class="tech-header">
        <span class="section-label reveal">Core Technology</span>
        <h2 class="tech-title reveal reveal-delay-1">
          The technology stack<br/>behind every<br/><em>Cedar Home Builder</em> project.
        </h2>
        <p class="tech-sub reveal reveal-delay-2">
          We don't just manage construction — we digitise it. Three powerful technology pillars give you unprecedented visibility and control over your property from thousands of miles away.
        </p>
      </div>

      <!-- Tech pillars -->
      <div class="tech-pillars">
        <!-- Pillar 1: Map Integration -->
        <div class="pillar reveal reveal-delay-1" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="pillar-icon map-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="24" fill="rgba(201,168,76,0.1)"/>
              <path d="M18 12L12 14V36L18 34L30 36L36 34V12L30 14L18 12Z" stroke="var(--gold)" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
              <path d="M18 12V34M30 14V36" stroke="var(--gold)" stroke-width="1.5"/>
              <circle cx="24" cy="22" r="3" fill="var(--gold)" opacity="0.6"/>
              <path d="M24 25C24 25 20 29 20 31.5C20 33.2 21.8 34 24 34C26.2 34 28 33.2 28 31.5C28 29 24 25 24 25Z" fill="var(--gold)" opacity="0.4"/>
            </svg>
          </div>
          <div class="pillar-num">01</div>
          <h3>Interactive Map Integration</h3>
          <p>Every plot in our system is pinned on a live interactive map. Browse available land, verify boundaries, and track nearby development — all before signing a single document. Our map layer combines satellite imagery, street-level views, and government land registry data.</p>
          <ul class="pillar-features">
            <li>Satellite + street-level hybrid layers</li>
            <li>Government land registry overlay</li>
            <li>Neighbourhood development heatmap</li>
            <li>Proximity to amenities radius tool</li>
            <li>Plot boundary visualisation</li>
          </ul>
          <div class="pillar-glow gold-glow"></div>
        </div>

        <!-- Pillar 2: Geo-referencing & Geolocation -->
        <div class="pillar pillar-center reveal reveal-delay-2" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="pillar-icon geo-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="24" fill="rgba(78,205,196,0.1)"/>
              <circle cx="24" cy="24" r="10" stroke="var(--tech-blue)" stroke-width="1.5" fill="none"/>
              <circle cx="24" cy="24" r="3" fill="var(--tech-blue)"/>
              <line x1="24" y1="10" x2="24" y2="14" stroke="var(--tech-blue)" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="24" y1="34" x2="24" y2="38" stroke="var(--tech-blue)" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="10" y1="24" x2="14" y2="24" stroke="var(--tech-blue)" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="34" y1="24" x2="38" y2="24" stroke="var(--tech-blue)" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="24" cy="24" r="16" stroke="rgba(78,205,196,0.2)" stroke-width="1" stroke-dasharray="4 4"/>
            </svg>
          </div>
          <div class="pillar-num tech-num">02</div>
          <h3>Geo-Referencing & Geolocation</h3>
          <p>We survey every plot using precision GPS geo-referencing — anchoring all survey data to real-world coordinates with sub-metre accuracy. Live geolocation lets you open your client dashboard and see your exact plot on a map in real time, confirmed against government survey records.</p>
          <ul class="pillar-features tech-features">
            <li>Sub-metre GPS accuracy (±0.3m)</li>
            <li>Government survey cross-referencing</li>
            <li>Real-time live geolocation feed</li>
            <li>Coordinate-stamped construction photos</li>
            <li>Digital boundary certificates</li>
          </ul>
          <div class="pillar-badge">FLAGSHIP TECH</div>
          <div class="pillar-glow tech-glow"></div>
        </div>

        <!-- Pillar 3: Drone Footage -->
        <div class="pillar reveal reveal-delay-3" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="pillar-icon drone-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="24" fill="rgba(201,168,76,0.1)"/>
              <path d="M24 20L14 26V34H34V26L24 20Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
              <path d="M16 26L24 22L32 26" stroke="var(--gold)" stroke-width="1" opacity="0.5"/>
              <!-- Drone arms -->
              <line x1="14" y1="18" x2="10" y2="14" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="34" y1="18" x2="38" y2="14" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="9" cy="13" r="3" stroke="var(--gold)" stroke-width="1.2" fill="none"/>
              <circle cx="39" cy="13" r="3" stroke="var(--gold)" stroke-width="1.2" fill="none"/>
              <circle cx="24" cy="19" r="2" fill="var(--gold)" opacity="0.5"/>
            </svg>
          </div>
          <div class="pillar-num">03</div>
          <h3>Drone Footage & Aerial Surveys</h3>
          <p>Our licensed drone operators fly scheduled aerial surveys over every active construction site. You receive cinematic 4K video walkthroughs, geo-tagged aerial photos, and volumetric progress measurements — every month, no exceptions.</p>
          <ul class="pillar-features">
            <li>Monthly 4K aerial video reports</li>
            <li>Geo-tagged progress photographs</li>
            <li>3D volumetric site modelling</li>
            <li>Comparison overlays (month-on-month)</li>
            <li>Shareable client drone portal</li>
          </ul>
          <div class="pillar-glow gold-glow"></div>
        </div>
      </div>

      <!-- Tech stats bar -->
      <div class="tech-stats reveal reveal-delay-4">
        <div class="ts" v-for="s in techStats" :key="s.label">
          <span class="ts-val">{{ s.val }}</span>
          <span class="ts-label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])

const techStats = [
  { val: '±0.3m', label: 'GPS accuracy on every survey' },
  { val: '4K', label: 'Drone footage resolution' },
  { val: '30 days', label: 'Max time between aerial updates' },
  { val: '100%', label: 'Plots geo-referenced before sale' },
]

useReveal('.tech .reveal')
</script>

<style scoped>
.tech {
  padding: 130px 80px;
  background: var(--forest-deep);
  position: relative;
  overflow: hidden;
}
.tech::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 15% 50%, rgba(78,205,196,0.05) 0%, transparent 40%),
    radial-gradient(circle at 85% 50%, rgba(201,168,76,0.06) 0%, transparent 40%);
  pointer-events: none;
}
.tech::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.tech-inner { max-width: 1240px; margin: 0 auto; }

.tech-header { max-width: 720px; margin-bottom: 80px; }
.section-label { display: block; margin-bottom: 20px; }
.tech-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.8vw, 3.8rem);
  font-weight: 300; line-height: 1.15; color: var(--cream);
  margin-bottom: 24px;
}
.tech-title em { font-style: italic; color: var(--gold); }
.tech-sub { font-size: 1rem; line-height: 1.8; color: rgba(247,242,232,0.55); max-width: 560px; }

.tech-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-bottom: 80px;
}
.pillar {
  position: relative;
  background: rgba(247,242,232,0.02);
  border: 1px solid rgba(247,242,232,0.07);
  padding: 48px 40px 48px;
  overflow: hidden;
  transition: background 0.4s, border-color 0.4s, transform 0.4s var(--spring);
}
.pillar:hover { background: rgba(247,242,232,0.05); transform: translateY(-6px); border-color: rgba(201,168,76,0.3); }
.pillar-center { border-color: rgba(78,205,196,0.2); background: rgba(78,205,196,0.03); }
.pillar-center:hover { border-color: rgba(78,205,196,0.5); }

.pillar-icon { margin-bottom: 28px; }
.pillar-num {
  font-family: var(--font-display);
  font-size: 5rem; font-weight: 700;
  color: rgba(247,242,232,0.04);
  position: absolute; top: 20px; right: 24px;
  line-height: 1;
}
.tech-num { color: rgba(78,205,196,0.06); }

.pillar h3 {
  font-family: var(--font-ui);
  font-size: 1.05rem; font-weight: 700;
  color: var(--cream); margin-bottom: 16px;
  line-height: 1.35;
}
.pillar p {
  font-size: 0.88rem; line-height: 1.75;
  color: rgba(247,242,232,0.5);
  margin-bottom: 28px;
}
.pillar-features { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.pillar-features li {
  font-size: 0.8rem; color: rgba(247,242,232,0.4);
  padding-left: 16px; position: relative; line-height: 1.4;
}
.pillar-features li::before { content: ''; position: absolute; left: 0; top: 7px; width: 7px; height: 1px; background: var(--gold); }
.tech-features li::before { background: var(--tech-blue); }

.pillar-badge {
  position: absolute; top: 24px; left: 24px;
  font-family: var(--font-ui); font-size: 0.6rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--tech-blue);
  background: rgba(78,205,196,0.1);
  border: 1px solid rgba(78,205,196,0.25);
  padding: 5px 10px;
}

.pillar-glow {
  position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%);
  width: 200px; height: 200px; border-radius: 50%; filter: blur(50px);
  opacity: 0; transition: opacity 0.4s;
  pointer-events: none;
}
.gold-glow { background: rgba(201,168,76,0.15); }
.tech-glow { background: rgba(78,205,196,0.12); }
.pillar:hover .pillar-glow { opacity: 1; }

/* Tech stats */
.tech-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgba(247,242,232,0.07);
}
.ts {
  padding: 36px 32px; display: flex; flex-direction: column; gap: 8px;
  border-right: 1px solid rgba(247,242,232,0.07);
  transition: background 0.3s;
}
.ts:last-child { border-right: none; }
.ts:hover { background: rgba(247,242,232,0.03); }
.ts-val {
  font-family: var(--font-display);
  font-size: 2.4rem; font-weight: 500; color: var(--gold); line-height: 1;
}
.ts-label { font-size: 0.82rem; color: rgba(247,242,232,0.38); line-height: 1.4; }

@media (max-width: 1060px) {
  .tech { padding: 80px 40px; }
  .tech-pillars { grid-template-columns: 1fr; }
  .tech-stats { grid-template-columns: repeat(2, 1fr); }
  .ts:nth-child(2) { border-right: none; }
  .ts { border-right: 1px solid rgba(247,242,232,0.07); border-bottom: 1px solid rgba(247,242,232,0.07); }
}
@media (max-width: 600px) {
  .tech { padding: 60px 20px; }
  .tech-stats { grid-template-columns: 1fr 1fr; }
  .pillar { padding: 36px 24px; }
}
</style>
