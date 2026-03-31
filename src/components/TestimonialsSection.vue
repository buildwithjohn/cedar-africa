<template>
  <section class="testimonials" id="testimonials">
    <div class="testimonials-inner">
      <div class="t-header">
        <span class="section-label reveal">Client Stories</span>
        <h2 class="t-title reveal reveal-delay-1">Real projects.<br/><em>Real results.</em></h2>
      </div>

      <div class="t-slider"
        @mouseenter="pauseAuto" @mouseleave="resumeAuto"
        @touchstart="pauseAuto" @touchend="resumeAuto">
        <div class="t-track" :style="{ transform: `translateX(-${active * 100}%)` }">
          <div class="t-card" v-for="t in testimonials" :key="t.name">
            <div class="t-quote">"</div>
            <p class="t-text">{{ t.text }}</p>
            <div class="t-author">
              <div class="t-avatar" :style="{ background: t.color }">{{ t.name[0] }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.location }}</span>
              </div>
              <div class="t-stars">★★★★★</div>
            </div>
            <div class="t-tag">{{ t.project }}</div>
          </div>
        </div>

        <div class="t-controls">
          <button class="t-btn" @click="prev" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16 10H4M10 4L4 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <div class="t-dots">
            <button v-for="(t, i) in testimonials" :key="i" class="t-dot" :class="{ active: active === i }" @click="active = i"></button>
          </div>
          <button class="t-btn" @click="next" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>

      <div class="t-stats reveal reveal-delay-3">
        <div class="t-stat" v-for="s in stats" :key="s.label">
          <span class="t-stat-num">{{ s.num }}</span>
          <span class="t-stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.testimonials .reveal')

const active = ref(0)
const testimonials = [
  { text: "I managed my entire 4-bedroom build from Manchester without visiting Nigeria once until handover. The dashboard showed every milestone, the drone footage was incredible, and my project manager responded within hours every time. This platform changed everything for me.", name: "Ngozi Adeyemi", location: "Manchester, UK", project: "4-Bedroom Duplex · Lekki Phase 1", color: "#1E4D8C" },
  { text: "What impressed me most was the GPS-verified title documentation. I had been scammed before by a different agent. Cedar Home Builder's geo-referenced maps and government cross-checks gave me confidence I had never felt before in Nigerian property.", name: "Emeka Okonkwo", location: "Houston, USA", project: "Land Acquisition · Maitama, Abuja", color: "#C9A84C" },
  { text: "I approved every design, every payment, and every contractor appointment remotely through the platform. It felt like I was on the ground even from Toronto. My 3-bedroom is now rented out and generating income — all managed by the Cedar team.", name: "Amara Diallo", location: "Toronto, Canada", project: "3-Bedroom Bungalow · Enugu", color: "#1A3A5C" },
  { text: "The monthly drone videos are worth everything. My family visits the site and confirms what I already see on my dashboard. Cedar Home Builder is the only platform I trust for remote construction management in Nigeria.", name: "Chisom Eze", location: "Berlin, Germany", project: "Remote Monitoring · Port Harcourt", color: "#2563B0" },
]
const stats = [
  { num: '98%', label: 'Client satisfaction rate' },
  { num: '200+', label: 'Projects completed' },
  { num: '0', label: 'Title disputes ever' },
  { num: '100%', label: 'Dashboard uptime' },
]

let timer = null
const next = () => { active.value = (active.value + 1) % testimonials.length }
const prev = () => { active.value = (active.value - 1 + testimonials.length) % testimonials.length }
const pauseAuto  = () => { if (timer) { clearInterval(timer); timer = null } }
const resumeAuto = () => { if (!timer) timer = setInterval(next, 6000) }
onMounted(() => { timer = setInterval(next, 6000) })
onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.testimonials { padding: 120px 80px; background: var(--navy-deep); position: relative; overflow: hidden; }
.testimonials::before { content: '❝'; position: absolute; top: -60px; right: 60px; font-size: 30vw; color: rgba(91,164,245,0.04); font-family: var(--font-display); line-height: 1; pointer-events: none; }
.testimonials-inner { max-width: 900px; margin: 0 auto; }
.t-header { margin-bottom: 56px; }
.section-label { display: block; margin-bottom: 16px; }
.t-title { font-family: var(--font-display); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: var(--cream); line-height: 1.2; }
.t-title em { font-style: italic; color: var(--gold); }
.t-slider { position: relative; overflow: hidden; margin-bottom: 56px; }
.t-track { display: flex; transition: transform 0.6s var(--ease-out-expo); }
.t-card { flex: 0 0 100%; background: rgba(240,244,255,0.04); border: 1px solid rgba(240,244,255,0.08); padding: 48px; position: relative; }
.t-quote { font-family: var(--font-display); font-size: 6rem; color: var(--gold); line-height: 0.6; margin-bottom: 28px; opacity: 0.5; }
.t-text { font-family: var(--font-display); font-size: 1.15rem; font-style: italic; line-height: 1.75; color: rgba(240,244,255,0.85); margin-bottom: 36px; }
.t-author { display: flex; align-items: center; gap: 16px; }
.t-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-ui); font-size: 1.1rem; font-weight: 700; color: #FAFCFF; flex-shrink: 0; }
.t-author strong { display: block; font-family: var(--font-ui); font-size: 0.9rem; color: var(--cream); margin-bottom: 3px; }
.t-author span { font-size: 0.78rem; color: rgba(240,244,255,0.45); }
.t-stars { margin-left: auto; color: var(--gold); font-size: 0.85rem; letter-spacing: 2px; }
.t-tag { position: absolute; top: 36px; right: 36px; font-family: var(--font-ui); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); background: rgba(201,168,76,0.1); padding: 6px 12px; border: 1px solid rgba(201,168,76,0.2); }
.t-controls { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 32px; }
.t-btn { width: 44px; height: 44px; border: 1px solid rgba(240,244,255,0.15); background: transparent; color: var(--cream); display: flex; align-items: center; justify-content: center; transition: background 0.3s, border-color 0.3s; }
.t-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--navy-deep); }
.t-dots { display: flex; gap: 8px; }
.t-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(240,244,255,0.2); border: none; transition: background 0.3s, width 0.3s; }
.t-dot.active { background: var(--gold); width: 24px; border-radius: 3px; }
.t-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; border-top: 1px solid rgba(240,244,255,0.08); padding-top: 48px; }
.t-stat { display: flex; flex-direction: column; gap: 6px; align-items: center; text-align: center; padding: 24px; }
.t-stat-num { font-family: var(--font-display); font-size: 2.5rem; font-weight: 500; color: var(--gold); line-height: 1; }
.t-stat-label { font-size: 0.8rem; color: rgba(240,244,255,0.4); }
@media (max-width: 800px) { .testimonials { padding: 80px 30px; } .t-card { padding: 32px 24px; } .t-tag { display: none; } .t-stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .testimonials { padding: 60px 20px; } }
</style>
