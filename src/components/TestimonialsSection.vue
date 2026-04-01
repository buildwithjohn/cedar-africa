<template>
  <section class="testimonials" id="testimonials">
    <div class="section-wrap">
      <div class="t-header">
        <span class="section-label reveal">Client Stories</span>
        <h2 class="t-title reveal reveal-delay-1">What our clients say.</h2>
      </div>
      <div class="t-grid">
        <div class="t-card reveal" :class="'reveal-delay-' + (i+1)"
          v-for="(t, i) in testimonials" :key="t.name">
          <div class="t-stars">★★★★★</div>
          <p class="t-text">"{{ t.text }}"</p>
          <div class="t-author">
            <div class="t-avatar" :style="{ background: t.color }">{{ t.name[0] }}</div>
            <div>
              <strong>{{ t.name }}</strong>
              <span>{{ t.location }}</span>
            </div>
          </div>
          <div class="t-project">{{ t.project }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.testimonials .reveal')
const testimonials = [
  { text: "I managed my entire build from Manchester without visiting Nigeria once until handover. The dashboard showed every milestone, the drone footage was incredible, and my project manager responded within hours. This platform changed everything.", name: "Ngozi Adeyemi", location: "Manchester, UK", project: "4-Bedroom Duplex · Lekki Phase 1", color: "#1E4D8C" },
  { text: "What impressed me most was the GPS-verified title documentation. Cedar Home Builder's geo-referenced maps and government cross-checks gave me confidence I had never felt before in Nigerian property.", name: "Emeka Okonkwo", location: "Houston, USA", project: "Land Acquisition · Maitama, Abuja", color: "#C9A84C" },
  { text: "I approved every design, every payment remotely through the platform. It felt like I was on the ground even from Toronto. My 3-bedroom is now rented out — managed entirely by the Cedar team.", name: "Amara Diallo", location: "Toronto, Canada", project: "3-Bedroom Bungalow · Enugu", color: "#2A4A6A" },
]
</script>
<style scoped>
.testimonials { padding: 100px 0; background: var(--light); }
.t-header { margin-bottom: 56px; }
.section-label { display: block; margin-bottom: 14px; }
.t-title { font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3.5rem); font-weight: 300; color: var(--navy); }
.t-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.t-card { background: var(--white); border: 1px solid var(--border); border-radius: 8px; padding: 36px; display: flex; flex-direction: column; gap: 0; transition: box-shadow 0.3s, transform 0.3s var(--spring); }
.t-card:hover { box-shadow: 0 12px 40px rgba(13,27,42,0.08); transform: translateY(-4px); }
.t-stars { color: var(--gold); font-size: 0.9rem; letter-spacing: 3px; margin-bottom: 18px; }
.t-text { font-family: var(--font-display); font-size: 1.05rem; font-style: italic; line-height: 1.7; color: var(--navy-mid); margin-bottom: 24px; flex: 1; }
.t-author { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.t-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: white; flex-shrink: 0; }
.t-author strong { display: block; font-family: var(--font-ui); font-size: 0.85rem; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
.t-author span { font-size: 0.75rem; color: var(--muted); }
.t-project { font-family: var(--font-ui); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); }
@media (max-width: 768px) { .t-grid { grid-template-columns: 1fr; } }
</style>
