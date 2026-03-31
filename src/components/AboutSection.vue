<template>
  <section class="about" id="platform">
    <div class="about-inner">
      <div class="about-text">
        <span class="section-label reveal">The Platform</span>
        <h2 class="about-title reveal reveal-delay-1">
          A complete remote<br/>
          <em>project management</em><br/>
          system for home building.
        </h2>
        <div class="about-body reveal reveal-delay-2">
          <p>
            Cedar Home Builder is not just a construction company — it is a <strong>technology-powered project management platform</strong> built specifically for Nigerians in the diaspora who want to build or invest in property back home without being physically present.
          </p>
          <p>
            Every project gets its own dashboard. You track milestones, view live drone footage, communicate with your site manager, approve invoices, and monitor your geo-referenced plot in real time — from your phone or laptop, anywhere in the world.
          </p>
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
        <div class="about-img-wrap">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80" alt="Construction project managed remotely" />
          <div class="about-img-accent"></div>
        </div>
        <div class="mission-card reveal reveal-delay-4">
          <span class="section-label">Our Mission</span>
          <p>"To make remote home building in Nigeria transparent, accountable, and stress-free — through technology every diaspora family can trust."</p>
          <div class="card-sig">
            <div class="sig-avatar"></div>
            <div>
              <strong>Cedar Home Builder</strong>
              <span>Project Management Platform</span>
            </div>
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
  { icon: '📊', title: 'Real-Time Dashboard', desc: 'Live project status, milestone tracking, and financial reports in one place.' },
  { icon: '📡', title: 'Remote Monitoring', desc: 'Drone footage, geo-tagged photos, and GPS-verified site data sent monthly.' },
  { icon: '🤝', title: 'Dedicated Project Manager', desc: 'A named manager oversees your project and is reachable any time.' },
]
</script>

<style scoped>
.about { padding: 120px 80px; background: var(--navy-mid); position: relative; overflow: hidden; }
.about::before { content: 'CEDAR'; position: absolute; top: -20px; right: -40px; font-family: var(--font-display); font-size: 20vw; font-weight: 700; color: rgba(91,164,245,0.03); pointer-events: none; line-height: 1; }
.about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.section-label { display: block; margin-bottom: 20px; }
.about-title { font-family: var(--font-display); font-size: clamp(2.2rem, 3.5vw, 3.5rem); font-weight: 300; line-height: 1.15; color: var(--cream); margin-bottom: 32px; }
.about-title em { font-style: italic; color: var(--gold); }
.about-body { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
.about-body p { font-size: 1rem; line-height: 1.8; color: rgba(240,244,255,0.6); }
.about-body strong { color: var(--gold-light); font-weight: 500; }
.about-values { display: flex; flex-direction: column; gap: 16px; }
.value { display: flex; align-items: flex-start; gap: 16px; padding: 18px 20px; background: rgba(91,164,245,0.05); border-left: 3px solid var(--gold); transition: transform 0.3s var(--spring), background 0.3s; }
.value:hover { transform: translateX(6px); background: rgba(91,164,245,0.08); }
.value-icon { font-size: 1.4rem; flex-shrink: 0; }
.value strong { display: block; font-family: var(--font-ui); font-size: 0.9rem; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
.value span { font-size: 0.85rem; color: rgba(240,244,255,0.5); line-height: 1.5; }

.about-visual { position: relative; }
.about-img-wrap { position: relative; width: 100%; height: 500px; }
.about-img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85); }
.about-img-accent { position: absolute; bottom: -20px; right: -20px; width: 60%; height: 60%; border: 2px solid var(--gold); z-index: -1; }
.mission-card { position: absolute; bottom: -40px; left: -40px; background: var(--navy-deep); border: 1px solid rgba(201,168,76,0.2); color: var(--cream); padding: 32px; max-width: 300px; box-shadow: 0 30px 60px rgba(8,15,26,0.4); }
.mission-card .section-label { color: var(--gold-light); margin-bottom: 14px; }
.mission-card p { font-family: var(--font-display); font-size: 1.05rem; font-style: italic; line-height: 1.65; color: rgba(240,244,255,0.85); margin-bottom: 20px; }
.card-sig { display: flex; align-items: center; gap: 14px; }
.sig-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
.card-sig strong { display: block; font-family: var(--font-ui); font-size: 0.85rem; color: var(--cream); }
.card-sig span { font-size: 0.75rem; color: rgba(240,244,255,0.5); }

@media (max-width: 1000px) { .about { padding: 80px 40px; } .about-inner { grid-template-columns: 1fr; gap: 60px; } .about-img-wrap { height: 360px; } .mission-card { position: relative; bottom: auto; left: auto; max-width: 100%; margin-top: 30px; } }
@media (max-width: 600px) { .about { padding: 60px 20px; } }
</style>
