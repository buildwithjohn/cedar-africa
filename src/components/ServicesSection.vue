<template>
  <section class="services" id="services">
    <div class="services-inner">
      <div class="services-header">
        <span class="section-label reveal">Platform Services</span>
        <h2 class="services-title reveal reveal-delay-1">
          Everything you need to manage<br/>a home build <em>remotely.</em>
        </h2>
        <p class="services-sub reveal reveal-delay-2">
          From land acquisition to final handover — every stage is managed through the platform, giving you full visibility and control without being on the ground.
        </p>
      </div>

      <div class="services-grid">
        <div class="service-card reveal" :class="'reveal-delay-' + (i+1)"
          v-for="(s, i) in services" :key="s.title"
          :style="{ '--accent': s.color }"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="card-number">0{{ i + 1 }}</div>
          <div class="card-icon">{{ s.icon }}</div>
          <h3 class="card-title">{{ s.title }}</h3>
          <p class="card-desc">{{ s.desc }}</p>
          <ul class="card-features">
            <li v-for="f in s.features" :key="f">{{ f }}</li>
          </ul>
          <div class="card-tech-tag" v-if="s.techTag">
            <span class="badge-dot"></span>{{ s.techTag }}
          </div>
          <div class="card-glow"></div>
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
  { icon: '📊', title: 'Project Dashboard', color: 'var(--gold)', techTag: 'Live Platform',
    desc: 'Your personal command centre for every active project. View milestones, financials, team updates, and site reports in one place.',
    features: ['Milestone tracker', 'Budget vs actual spend', 'Document vault', 'Team communication log'] },
  { icon: '🗺', title: 'Geo-Verified Land Acquisition', color: 'var(--tech-blue)', techTag: 'GPS + Map Platform',
    desc: 'Every plot is geo-referenced and verified against government land records before you commit a single naira.',
    features: ['GPS boundary mapping', 'Title verification', 'Satellite imagery', 'Secure escrow payment'] },
  { icon: '📐', title: 'Design & Architecture', color: 'var(--gold)', techTag: null,
    desc: 'Architects create your plans and 3D renders. Review and approve designs remotely through the platform before construction begins.',
    features: ['3D virtual walkthrough', 'Structural drawings', 'Material selection', 'Remote approval workflow'] },
  { icon: '🏗', title: 'Construction Management', color: 'var(--tech-blue)', techTag: null,
    desc: 'Licensed contractors, on-site supervisors, and milestone-based payments ensure quality at every stage.',
    features: ['Vetted contractors', 'Milestone-based releases', 'Quality sign-offs', 'Timeline alerts'] },
  { icon: '🛸', title: 'Drone & Remote Monitoring', color: 'var(--gold)', techTag: 'Drone + Geo-tag',
    desc: 'Monthly 4K aerial surveys with geo-tagged photographs delivered to your dashboard. See everything your project manager sees.',
    features: ['Monthly 4K drone video', 'Geo-tagged site photos', 'Progress comparisons', 'Shareable links'] },
  { icon: '🔑', title: 'Handover & Property Management', color: 'var(--tech-blue)', techTag: null,
    desc: 'Once complete, we manage your property — finding tenants, collecting rent, and maintaining the asset on your behalf.',
    features: ['Virtual handover tour', 'Tenant sourcing', 'Rent collection', 'Monthly statements'] },
]
</script>

<style scoped>
.services { padding: 130px 80px; background: var(--navy-deep); position: relative; overflow: hidden; }
.services::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 10% 90%, rgba(30,77,140,0.12) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(201,168,76,0.05) 0%, transparent 40%); pointer-events: none; }
.services-inner { max-width: 1240px; margin: 0 auto; }
.services-header { margin-bottom: 72px; max-width: 800px; }
.section-label { display: block; margin-bottom: 20px; }
.services-title { font-family: var(--font-display); font-size: clamp(2.2rem, 3.5vw, 3.5rem); font-weight: 300; line-height: 1.2; color: var(--cream); margin-bottom: 20px; }
.services-title em { font-style: italic; color: var(--gold); }
.services-sub { font-size: 0.95rem; line-height: 1.75; color: rgba(240,244,255,0.5); max-width: 520px; }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
.service-card { position: relative; background: rgba(240,244,255,0.03); border: 1px solid rgba(240,244,255,0.07); padding: 40px 36px; overflow: hidden; transition: background 0.4s, transform 0.4s var(--spring), border-color 0.4s; }
.service-card:hover { background: rgba(240,244,255,0.06); border-color: var(--accent); transform: translateY(-4px); }
.card-number { position: absolute; top: 24px; right: 24px; font-family: var(--font-display); font-size: 3.5rem; font-weight: 700; color: rgba(240,244,255,0.04); line-height: 1; }
.card-icon { font-size: 2rem; margin-bottom: 24px; }
.card-title { font-family: var(--font-ui); font-size: 0.95rem; font-weight: 700; color: var(--cream); margin-bottom: 12px; line-height: 1.3; }
.card-desc { font-size: 0.86rem; line-height: 1.72; color: rgba(240,244,255,0.48); margin-bottom: 20px; }
.card-features { list-style: none; display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
.card-features li { font-size: 0.78rem; color: rgba(240,244,255,0.35); padding-left: 14px; position: relative; }
.card-features li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 1px; background: var(--accent); }
.card-tech-tag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-ui); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--tech-blue); background: rgba(91,164,245,0.08); border: 1px solid rgba(91,164,245,0.2); padding: 5px 10px; }
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--tech-blue); animation: blink 2s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
.card-glow { position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%); width: 160px; height: 160px; background: var(--accent); border-radius: 50%; filter: blur(50px); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
.service-card:hover .card-glow { opacity: 0.1; }

@media (max-width: 1060px) { .services { padding: 80px 40px; } .services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .services { padding: 60px 20px; } .services-grid { grid-template-columns: 1fr; } }
</style>
