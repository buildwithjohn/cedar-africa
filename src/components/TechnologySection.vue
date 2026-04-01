<template>
  <section class="tech" id="technology">
    <div class="wrap">
      <div class="tech-intro">
        <div class="tech-intro-left">
          <div class="tech-number">02</div>
          <span class="eyebrow reveal">Technology</span>
          <h2 class="tech-title reveal reveal-delay-1">
            The tech that keeps<br/><em>you connected</em><br/>to your build.
          </h2>
        </div>
        <p class="tech-sub reveal reveal-delay-2">
          Three powerful technology pillars give you unprecedented visibility and control over your property — from thousands of miles away.
        </p>
      </div>

      <div class="tech-cards">
        <div class="tech-card reveal" :class="'reveal-delay-'+(i+1)"
          v-for="(p,i) in pillars" :key="p.title"
          :style="{'--card-accent': p.accent }"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="tc-top">
            <div class="tc-num">0{{i+1}}</div>
            <div class="tc-icon">{{ p.icon }}</div>
          </div>
          <h3 class="tc-title">{{ p.title }}</h3>
          <p class="tc-desc">{{ p.desc }}</p>
          <ul class="tc-list">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
          <div class="tc-glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover','unhover'])
useReveal('.tech .reveal')
const pillars = [
  { icon:'🗺', title:'Interactive Map Integration', accent:'#C9A04A',
    desc:'Every plot pinned on a live map with satellite imagery, GPS coordinates, and government land registry data.',
    features:['Satellite + street hybrid','Government registry overlay','Plot boundary mapping','Neighbourhood development view'] },
  { icon:'📍', title:'Geo-Referencing & Geolocation', accent:'#2A6EBF',
    desc:'Precision GPS geo-referencing anchors all survey data to real-world coordinates with sub-metre accuracy.',
    features:['Sub-metre GPS accuracy','Government survey cross-ref','Real-time location feed','Coordinate-stamped photos'] },
  { icon:'🛸', title:'Drone Footage & Aerial Surveys', accent:'#1B3050',
    desc:'Scheduled aerial surveys deliver 4K video walkthroughs and geo-tagged photos to your dashboard monthly.',
    features:['Monthly 4K aerial video','Geo-tagged site photos','Month-on-month overlays','Shareable client portal'] },
]
</script>
<style scoped>
.tech { padding: 120px 0; background: var(--white); position: relative; }
.tech-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 72px; }
.tech-intro-left { position: relative; }
.tech-number { font-family: var(--font-display); font-size: 8rem; font-weight: 900; color: rgba(26,21,18,0.06); line-height: 1; margin-bottom: -20px; letter-spacing: -0.04em; }
.eyebrow { display: block; margin-bottom: 18px; }
.tech-title { font-family: var(--font-display); font-size: clamp(2rem, 3.2vw, 3.2rem); font-weight: 800; line-height: 1.12; color: var(--ink); letter-spacing: -0.02em; }
.tech-title em { font-style: italic; color: var(--gold); }
.tech-sub { font-size: 1rem; line-height: 1.8; color: var(--muted); align-self: end; }

.tech-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; background: var(--ivory-dark); border: 1px solid var(--ivory-dark); }
.tech-card {
  background: var(--white);
  padding: 44px 36px;
  position: relative; overflow: hidden;
  transition: background .3s;
}
.tech-card:hover { background: var(--white); }
.tech-card:hover .tc-glow { opacity: 1; }
.tc-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
.tc-num { font-family: var(--font-display); font-size: 3.5rem; font-weight: 900; color: var(--card-accent); opacity: 0.2; line-height: 1; }
.tc-icon { font-size: 2.2rem; }
.tc-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: var(--ink); margin-bottom: 14px; line-height: 1.2; letter-spacing: -0.01em; }
.tc-desc { font-size: 0.88rem; line-height: 1.72; color: var(--muted); margin-bottom: 22px; }
.tc-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.tc-list li { font-size: 0.8rem; color: var(--muted); padding-left: 16px; position: relative; }
.tc-list li::before { content:''; position:absolute; left:0; top:8px; width:6px; height:1.5px; background:var(--card-accent); }
.tc-glow {
  position: absolute; bottom: -60px; right: -60px;
  width: 160px; height: 160px; border-radius: 50%;
  background: var(--card-accent); filter: blur(60px);
  opacity: 0; transition: opacity .4s;
}

@media (max-width: 960px) { .tech-intro { grid-template-columns: 1fr; gap: 24px; } .tech-cards { grid-template-columns: 1fr; } }
</style>
