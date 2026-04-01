<template>
  <section class="testimonials" id="testimonials">
    <div class="wrap">
      <div class="t-header">
        <div class="t-number">05</div>
        <span class="eyebrow reveal">Client Stories</span>
        <h2 class="t-title reveal reveal-delay-1">What our<br/><em>clients say.</em></h2>
      </div>
      <div class="t-grid">
        <div class="t-card reveal" :class="'reveal-delay-'+(i+1)" v-for="(t,i) in testimonials" :key="t.name">
          <div class="t-card-top">
            <div class="t-stars">★★★★★</div>
            <div class="t-location">{{ t.location }}</div>
          </div>
          <p class="t-text">"{{ t.text }}"</p>
          <div class="t-footer">
            <div class="t-avatar" :style="{background:t.color}">{{ t.name[0] }}</div>
            <div>
              <strong>{{ t.name }}</strong>
              <span>{{ t.project }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
useReveal('.testimonials .reveal')
const testimonials = [
  { text:"I managed my entire 4-bedroom build from Manchester without visiting Nigeria once until handover. The dashboard showed every milestone, the drone footage was incredible, and my project manager responded within hours. This platform changed everything.", name:"Ngozi Adeyemi", location:"Manchester, UK", project:"4-Bed Duplex · Lekki", color:"#1E4D8C" },
  { text:"The GPS-verified title documentation gave me confidence I had never felt before in Nigerian property. Cedar Home Builder's geo-referenced maps and government cross-checks were unlike anything I had seen from an agent.", name:"Emeka Okonkwo", location:"Houston, USA", project:"Land Acquisition · Abuja", color:"#C9A04A" },
  { text:"I approved every design and every payment remotely through the platform. It felt like I was on the ground even from Toronto. My 3-bedroom is now rented out — fully managed by the Cedar team.", name:"Amara Diallo", location:"Toronto, Canada", project:"3-Bed Bungalow · Enugu", color:"#4A6741" },
]
</script>
<style scoped>
.testimonials { padding: 120px 0; background: var(--ink); position: relative; overflow: hidden; }
.testimonials::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 50%, rgba(201,160,74,0.06) 0%, transparent 60%); pointer-events:none; }
.t-header { position: relative; margin-bottom: 64px; }
.t-number { font-family: var(--font-display); font-size: 10rem; font-weight: 900; color: rgba(245,239,224,0.04); line-height: 1; letter-spacing: -0.04em; margin-bottom: -40px; }
.eyebrow { display: block; margin-bottom: 16px; }
.t-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 900; color: var(--ivory); line-height: 1.0; letter-spacing: -0.03em; }
.t-title em { font-style: italic; color: var(--gold); }
.t-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(245,239,224,0.06); border: 1px solid rgba(245,239,224,0.06); }
.t-card {
  background: var(--ink); padding: 40px 36px;
  display: flex; flex-direction: column; gap: 0;
  transition: background .3s;
}
.t-card:hover { background: var(--ink-mid); }
.t-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.t-stars { color: var(--gold); font-size: 0.85rem; letter-spacing: 2px; }
.t-location { font-family: var(--font-mono); font-size: 0.65rem; color: rgba(245,239,224,0.35); letter-spacing: 0.08em; }
.t-text { font-family: var(--font-display); font-size: 1.05rem; font-style: italic; font-weight: 700; line-height: 1.7; color: rgba(245,239,224,0.85); margin-bottom: 28px; flex: 1; }
.t-footer { display: flex; align-items: center; gap: 14px; padding-top: 20px; border-top: 1px solid rgba(245,239,224,0.08); }
.t-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: white; flex-shrink: 0; }
.t-footer strong { display: block; font-family: var(--font-body); font-size: 0.85rem; font-weight: 700; color: var(--ivory); margin-bottom: 2px; }
.t-footer span { font-family: var(--font-mono); font-size: 0.68rem; color: var(--gold); letter-spacing: 0.06em; }

@media (max-width: 768px) { .t-grid { grid-template-columns: 1fr; } .testimonials { padding: 80px 0; } }
</style>
