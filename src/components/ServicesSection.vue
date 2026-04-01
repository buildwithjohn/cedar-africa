<template>
  <section class="services" id="services">
    <div class="wrap">
      <div class="svc-header">
        <div class="svc-number">03</div>
        <span class="eyebrow reveal">What We Do</span>
        <h2 class="svc-title reveal reveal-delay-1">Everything you need<br/>to <em>build remotely.</em></h2>
      </div>
      <div class="svc-grid">
        <div class="svc-card reveal" :class="'reveal-delay-'+(i+1)"
          v-for="(s,i) in services" :key="s.title"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="svc-top">
            <span class="svc-icon">{{ s.icon }}</span>
            <span class="svc-tag" v-if="s.tag">{{ s.tag }}</span>
          </div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <ul><li v-for="f in s.features" :key="f">{{ f }}</li></ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover','unhover'])
useReveal('.services .reveal')
const services = [
  { icon:'📊', title:'Project Dashboard', tag:'Platform', desc:'Your command centre. Milestones, financials, team updates, site reports — one live view.', features:['Milestone tracker','Budget vs actual spend','Document vault','Team messaging'] },
  { icon:'🗺', title:'Geo-Verified Land Acquisition', tag:null, desc:'Every plot GPS-referenced and verified against government land records before you commit.', features:['GPS boundary mapping','Title verification','Satellite imagery','Secure escrow'] },
  { icon:'📐', title:'Design & Architecture', tag:null, desc:'3D renders and architectural plans reviewed and approved by you — remotely, before construction begins.', features:['3D virtual walkthrough','Structural drawings','Material selection','Remote approvals'] },
  { icon:'🏗', title:'Construction Management', tag:null, desc:'Licensed contractors, on-site supervisors, and milestone-based payments at every stage.', features:['Vetted contractors','Milestone-based releases','Quality sign-offs','Timeline alerts'] },
  { icon:'🛸', title:'Drone & Remote Monitoring', tag:'Platform', desc:'Monthly 4K aerial surveys with geo-tagged photographs delivered to your personal dashboard.', features:['Monthly 4K drone video','Geo-tagged photos','Progress comparisons','Shareable links'] },
  { icon:'🔑', title:'Handover & Property Management', tag:null, desc:'Virtual handover on completion. Ongoing tenant management, rent collection, and maintenance.', features:['Virtual handover tour','Tenant sourcing','Rent collection','Monthly statements'] },
]
</script>
<style scoped>
.services { padding: 120px 0; background: var(--ink-mid); position: relative; overflow: hidden; }
.svc-header { position: relative; margin-bottom: 64px; }
.svc-number { font-family: var(--font-display); font-size: 10rem; font-weight: 900; color: rgba(245,239,224,0.04); line-height: 1; letter-spacing: -0.04em; margin-bottom: -40px; }
.eyebrow { display: block; margin-bottom: 16px; }
.svc-title { font-family: var(--font-display); font-size: clamp(2.2rem, 4vw, 4rem); font-weight: 800; color: var(--ivory); line-height: 1.1; letter-spacing: -0.02em; }
.svc-title em { font-style: italic; color: var(--gold); }
.svc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(245,239,224,0.06); border: 1px solid rgba(245,239,224,0.06); }
.svc-card {
  background: var(--ink-mid); padding: 40px 32px;
  position: relative; transition: background .3s;
}
.svc-card:hover { background: var(--ink-light); }
.svc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.svc-icon { font-size: 2rem; }
.svc-tag { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); background: rgba(201,160,74,0.1); border: 1px solid rgba(201,160,74,0.2); padding: 4px 10px; border-radius: 20px; }
.svc-card h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: var(--ivory); margin-bottom: 10px; letter-spacing: -0.01em; }
.svc-card p { font-size: 0.85rem; line-height: 1.7; color: rgba(245,239,224,0.5); margin-bottom: 18px; }
.svc-card ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.svc-card li { font-size: 0.78rem; color: rgba(245,239,224,0.38); padding-left: 14px; position: relative; }
.svc-card li::before { content:''; position:absolute; left:0; top:7px; width:6px; height:1px; background:var(--gold); }

@media (max-width: 960px) { .svc-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .services { padding: 80px 0; } .svc-grid { grid-template-columns: 1fr; } }
</style>
