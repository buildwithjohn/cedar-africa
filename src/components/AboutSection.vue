<template>
  <section class="about" id="platform">
    <div class="wrap">
      <div class="about-grid">
        <div class="about-left">
          <div class="about-number">01</div>
          <span class="eyebrow reveal">The Platform</span>
          <h2 class="about-title reveal reveal-delay-1">
            More than a<br/>construction firm.<br/>
            <em>A remote command centre.</em>
          </h2>
          <div class="divider reveal reveal-delay-2"></div>
          <div class="about-body reveal reveal-delay-2">
            <p>Cedar Home Builder is a <strong>technology-powered project management platform</strong> built for Nigerians in the diaspora who want to build or invest in property back home — without being physically present.</p>
            <p>Every project gets its own dashboard. Track milestones, view drone footage, approve invoices, communicate with your site manager — from your phone, anywhere in the world.</p>
          </div>
        </div>

        <div class="about-right">
          <div class="about-img-wrap reveal reveal-delay-1">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85" alt="Remote project management" />
            <div class="img-caption">
              <span class="eyebrow">Cedar Platform</span>
              <p>Remote construction management — fully digital</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Values strip -->
      <div class="values-strip">
        <div class="value-item reveal" :class="'reveal-delay-'+i" v-for="(v,i) in values" :key="v.title"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="value-icon">{{ v.icon }}</div>
          <strong>{{ v.title }}</strong>
          <p>{{ v.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover','unhover'])
useReveal('.about .reveal')
const values = [
  { icon:'📊', title:'Project Dashboard', desc:'Milestones, spend, team updates — one live view.' },
  { icon:'📡', title:'Remote Monitoring', desc:'Drone footage and GPS-verified photos monthly.' },
  { icon:'🤝', title:'Dedicated Manager', desc:'A named PM on the ground, reachable any time.' },
  { icon:'⚖️', title:'Legal & Title', desc:'Geo-verified land, C of O, digital documentation.' },
]
</script>
<style scoped>
.about { padding: 120px 0; background: var(--ink); position: relative; overflow: hidden; }
.about::before {
  content: 'CEDAR';
  position: absolute; top: -40px; right: -20px;
  font-family: var(--font-display); font-size: 22vw; font-weight: 900;
  color: rgba(245,239,224,0.03); line-height: 1; pointer-events: none; letter-spacing: -0.04em;
}

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }

.about-left { position: relative; }
.about-number {
  font-family: var(--font-display); font-size: 8rem; font-weight: 900;
  color: rgba(201,160,74,0.1); line-height: 1; margin-bottom: -20px;
  letter-spacing: -0.04em;
}
.eyebrow { display: block; margin-bottom: 20px; }
.about-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.2vw, 3.2rem);
  font-weight: 800; line-height: 1.12; color: var(--ivory);
  margin-bottom: 28px; letter-spacing: -0.02em;
}
.about-title em { font-style: italic; color: var(--gold); }
.divider { width: 48px; height: 2px; background: var(--gold); margin-bottom: 28px; }
.about-body { display: flex; flex-direction: column; gap: 14px; }
.about-body p { font-size: 0.95rem; line-height: 1.8; color: rgba(245,239,224,0.6); }
.about-body strong { color: var(--gold-light); font-weight: 600; }

.about-img-wrap { position: relative; border-radius: 2px; overflow: hidden; }
.about-img-wrap img { width: 100%; height: 480px; object-fit: cover; display: block; filter: brightness(0.85); }
.img-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(26,21,18,0.9));
  padding: 40px 28px 28px;
}
.img-caption .eyebrow { display: block; margin-bottom: 6px; }
.img-caption p { font-size: 0.85rem; color: rgba(245,239,224,0.7); }

/* Values strip */
.values-strip {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 1px; background: rgba(245,239,224,0.08);
  border: 1px solid rgba(245,239,224,0.08);
}
.value-item {
  padding: 36px 28px; background: var(--ink);
  transition: background .3s;
}
.value-item:hover { background: var(--ink-mid); }
.value-icon { font-size: 1.8rem; margin-bottom: 14px; }
.value-item strong { display: block; font-family: var(--font-body); font-size: 0.9rem; font-weight: 700; color: var(--ivory); margin-bottom: 8px; }
.value-item p { font-size: 0.82rem; line-height: 1.6; color: rgba(245,239,224,0.5); }

@media (max-width: 960px) { .about-grid { grid-template-columns: 1fr; gap: 48px; } .values-strip { grid-template-columns: 1fr 1fr; } .about-img-wrap img { height: 320px; } }
@media (max-width: 600px) { .about { padding: 80px 0; } .values-strip { grid-template-columns: 1fr; } }
</style>
