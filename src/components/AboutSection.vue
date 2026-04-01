<template>
  <section class="about" id="platform">
    <div class="section-wrap">
      <div class="about-inner">
        <div class="about-text">
          <span class="section-label reveal">The Platform</span>
          <h2 class="about-title reveal reveal-delay-1">
            A complete remote project<br/>management system for<br/><em>diaspora home builders.</em>
          </h2>
          <div class="about-body reveal reveal-delay-2">
            <p>Cedar Home Builder is not just a construction company — it is a <strong>technology-powered project management platform</strong> built specifically for Nigerians in the diaspora who want to build or invest in property back home without being physically present.</p>
            <p>Every project gets its own dashboard. You track milestones, view live drone footage, communicate with your site manager, approve invoices, and monitor your geo-referenced plot — from your phone or laptop, anywhere in the world.</p>
          </div>
          <div class="about-values reveal reveal-delay-3">
            <div class="value" v-for="v in values" :key="v.title">
              <div class="value-icon">{{ v.icon }}</div>
              <div>
                <strong>{{ v.title }}</strong>
                <span>{{ v.desc }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="about-visual reveal reveal-delay-2">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80" alt="Remote project management" />
          <div class="about-card">
            <span class="section-label">Our Mission</span>
            <p>"To make remote home building in Nigeria transparent, accountable, and stress-free — through technology every diaspora family can trust."</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
useReveal('.about .reveal')
const values = [
  { icon: '📊', title: 'Real-Time Dashboard', desc: 'Live milestones, budget tracking, and reports in one place.' },
  { icon: '📡', title: 'Remote Monitoring', desc: 'Drone footage, geo-tagged photos, GPS-verified site data monthly.' },
  { icon: '🤝', title: 'Dedicated Project Manager', desc: 'A named manager oversees your build and is always reachable.' },
]
</script>
<style scoped>
.about { padding: 100px 0; background: var(--off-white); }
.about-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.section-label { display: block; margin-bottom: 16px; }
.about-title { font-family: var(--font-display); font-size: clamp(2rem, 3vw, 3.2rem); font-weight: 300; line-height: 1.15; color: var(--navy); margin-bottom: 28px; }
.about-title em { font-style: italic; color: var(--gold); }
.about-body { display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; }
.about-body p { font-size: 0.95rem; line-height: 1.8; color: var(--muted); }
.about-body strong { color: var(--navy); font-weight: 600; }
.about-values { display: flex; flex-direction: column; gap: 14px; }
.value { display: flex; gap: 16px; padding: 16px 20px; background: var(--white); border-left: 3px solid var(--gold); border-radius: 0 8px 8px 0; transition: transform 0.3s var(--spring); }
.value:hover { transform: translateX(4px); }
.value-icon { font-size: 1.3rem; flex-shrink: 0; }
.value strong { display: block; font-family: var(--font-ui); font-size: 0.88rem; font-weight: 700; color: var(--navy); margin-bottom: 3px; }
.value span { font-size: 0.82rem; color: var(--muted); line-height: 1.5; }
.about-visual { position: relative; }
.about-visual img { width: 100%; height: 420px; object-fit: cover; border-radius: 8px; }
.about-card { position: absolute; bottom: -30px; left: -30px; background: var(--white); border: 1px solid var(--border); border-radius: 8px; padding: 28px; max-width: 280px; box-shadow: 0 8px 40px rgba(13,27,42,0.08); }
.about-card .section-label { margin-bottom: 12px; }
.about-card p { font-family: var(--font-display); font-size: 1rem; font-style: italic; line-height: 1.65; color: var(--navy-mid); }
@media (max-width: 960px) { .about-inner { grid-template-columns: 1fr; gap: 60px; } .about-visual img { height: 320px; } .about-card { position: relative; bottom: auto; left: auto; max-width: 100%; margin-top: 24px; } }
</style>
