<template>
  <section class="about" id="about">
    <div class="about-inner">
      <div class="about-text">
        <span class="section-label reveal" ref="label">Who We Are</span>
        <h2 class="about-title reveal reveal-delay-1">
          Building bridges between<br/>
          <em>diaspora dreams</em> &<br/>
          Nigerian soil.
        </h2>
        <div class="about-body reveal reveal-delay-2">
          <p>
            Cedar Home Builder was born from a simple truth: millions of Nigerians abroad want to build at home but lack the trusted partner on the ground to make it happen safely.
          </p>
          <p>
            We are that partner — a geo-technology platform and construction firm with deep roots in Nigeria and deep understanding of what diaspora families need: precision technology, transparency, and results.
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
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Cedar Home Builder team" />
          <div class="about-img-accent"></div>
        </div>
        <div class="mission-card reveal reveal-delay-4">
          <span class="section-label">Our Mission</span>
          <p>"To make property ownership in Nigeria accessible, safe, and stress-free for every African in the diaspora."</p>
          <div class="card-sig">
            <div class="sig-avatar"></div>
            <div>
              <strong>Adaeze Obi</strong>
              <span>CEO & Co-founder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '../composables/useReveal.js'

const values = [
  { icon: '🛡', title: 'Trusted Custodians', desc: 'We hold your investment with care and full accountability.' },
  { icon: '🔍', title: 'Full Transparency', desc: 'Monthly photo/video updates. No surprises.' },
  { icon: '🌍', title: 'Diaspora-First', desc: 'Built for how you live — remote, global, and goal-oriented.' },
]

useReveal('.about .reveal')
</script>

<style scoped>
.about {
  padding: 120px 80px;
  background: var(--cream);
  position: relative;
  overflow: hidden;
}
.about::before {
  content: 'CEDAR';
  position: absolute;
  top: -20px; right: -40px;
  font-family: var(--font-display);
  font-size: 20vw;
  font-weight: 700;
  color: rgba(28,58,43,0.04);
  pointer-events: none;
  line-height: 1;
}
.about-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about-text { position: relative; z-index: 2; }
.section-label { display: block; margin-bottom: 20px; }
.about-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--forest);
  margin-bottom: 32px;
}
.about-title em {
  font-style: italic;
  color: var(--gold);
}
.about-body { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
.about-body p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
}
.about-values { display: flex; flex-direction: column; gap: 20px; }
.value {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: var(--white);
  border-left: 3px solid var(--gold);
  transition: transform 0.3s var(--spring), box-shadow 0.3s;
}
.value:hover { transform: translateX(6px); box-shadow: 4px 0 20px rgba(201,168,76,0.15); }
.value-icon { font-size: 1.4rem; flex-shrink: 0; }
.value strong { display: block; font-family: var(--font-ui); font-size: 0.9rem; font-weight: 600; color: var(--forest); margin-bottom: 4px; }
.value span { font-size: 0.85rem; color: var(--muted); line-height: 1.5; }

.about-visual { position: relative; }
.about-img-wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
.about-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.about-img-accent {
  position: absolute;
  bottom: -20px; right: -20px;
  width: 60%;
  height: 60%;
  border: 2px solid var(--gold);
  z-index: -1;
}

.mission-card {
  position: absolute;
  bottom: -40px; left: -40px;
  background: var(--forest);
  color: var(--cream);
  padding: 32px;
  max-width: 300px;
  box-shadow: 0 30px 60px rgba(15,33,25,0.25);
}
.mission-card .section-label { color: var(--gold-light); margin-bottom: 14px; }
.mission-card p {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  line-height: 1.65;
  color: rgba(247,242,232,0.85);
  margin-bottom: 20px;
}
.card-sig { display: flex; align-items: center; gap: 14px; }
.sig-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}
.card-sig strong { display: block; font-family: var(--font-ui); font-size: 0.85rem; color: var(--cream); }
.card-sig span { font-size: 0.75rem; color: rgba(247,242,232,0.5); }

@media (max-width: 1000px) {
  .about { padding: 80px 40px; }
  .about-inner { grid-template-columns: 1fr; gap: 60px; }
  .about-img-wrap { height: 360px; }
  .mission-card { position: relative; bottom: auto; left: auto; max-width: 100%; margin-top: 30px; }
}
@media (max-width: 600px) {
  .about { padding: 60px 20px; }
}
</style>
