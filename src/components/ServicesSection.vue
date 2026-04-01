<template>
  <section class="services" id="services">
    <div class="section-wrap">
      <div class="services-head">
        <div>
          <span class="section-label reveal">What We Do</span>
          <h2 class="services-title reveal reveal-delay-1">Everything you need<br/><em>to build remotely.</em></h2>
        </div>
        <p class="services-sub reveal reveal-delay-2">From land acquisition to final handover — every stage managed through the platform, giving you full visibility without being on the ground.</p>
      </div>
      <div class="services-grid">
        <div class="service-card reveal" :class="'reveal-delay-' + (i+1)"
          v-for="(s, i) in services" :key="s.title"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="card-icon">{{ s.icon }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <ul>
            <li v-for="f in s.features" :key="f">{{ f }}</li>
          </ul>
          <div class="card-tag" v-if="s.tag">{{ s.tag }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.services .reveal')
const services = [
  { icon: '📊', title: 'Project Dashboard', desc: 'Your command centre. View milestones, financials, team updates, and site reports in one place.', features: ['Milestone tracker', 'Budget vs actual spend', 'Document vault', 'Team messaging'], tag: 'Platform Feature' },
  { icon: '🗺', title: 'Geo-Verified Land Acquisition', desc: 'Every plot GPS-referenced and verified against government land records before you commit.', features: ['GPS boundary mapping', 'Title verification', 'Satellite imagery', 'Secure escrow'], tag: null },
  { icon: '📐', title: 'Design & Architecture', desc: 'Architects create your plans and 3D renders. Review and approve designs remotely before construction begins.', features: ['3D virtual walkthrough', 'Structural drawings', 'Material selection', 'Remote approvals'], tag: null },
  { icon: '🏗', title: 'Construction Management', desc: 'Licensed contractors, on-site supervisors, and milestone-based payments ensure quality at every stage.', features: ['Vetted contractors', 'Milestone-based releases', 'Quality sign-offs', 'Timeline alerts'], tag: null },
  { icon: '🛸', title: 'Drone & Remote Monitoring', desc: 'Monthly 4K aerial surveys with geo-tagged photographs delivered to your dashboard.', features: ['Monthly 4K drone video', 'Geo-tagged site photos', 'Progress comparisons', 'Shareable links'], tag: 'Platform Feature' },
  { icon: '🔑', title: 'Handover & Property Management', desc: 'Virtual handover tour on completion. We manage tenants, rent collection, and maintenance ongoing.', features: ['Virtual handover', 'Tenant sourcing', 'Rent collection', 'Monthly statements'], tag: null },
]
</script>
<style scoped>
.services { padding: 100px 0; background: var(--off-white); }
.services-head { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 56px; }
.section-label { display: block; margin-bottom: 14px; }
.services-title { font-family: var(--font-display); font-size: clamp(2rem, 3.2vw, 3.2rem); font-weight: 300; color: var(--navy); line-height: 1.15; }
.services-title em { font-style: italic; color: var(--gold); }
.services-sub { font-size: 0.95rem; line-height: 1.75; color: var(--muted); align-self: end; }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.service-card { background: var(--white); padding: 36px 32px; position: relative; transition: background 0.3s; }
.service-card:hover { background: var(--gold-pale); }
.card-icon { font-size: 1.8rem; margin-bottom: 18px; }
.service-card h3 { font-family: var(--font-ui); font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
.service-card p { font-size: 0.85rem; line-height: 1.7; color: var(--muted); margin-bottom: 18px; }
.service-card ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.service-card li { font-size: 0.78rem; color: var(--muted); padding-left: 14px; position: relative; }
.service-card li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 1px; background: var(--gold); }
.card-tag { position: absolute; top: 20px; right: 20px; font-family: var(--font-ui); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); background: var(--gold-pale); border: 1px solid rgba(201,168,76,0.25); padding: 4px 10px; border-radius: 20px; }
@media (max-width: 960px) { .services-head { grid-template-columns: 1fr; gap: 20px; } .services-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .services-grid { grid-template-columns: 1fr; } }
</style>
