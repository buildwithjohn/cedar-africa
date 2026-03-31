<template>
  <section class="process" id="process">
    <div class="process-inner">
      <div class="process-header">
        <span class="section-label reveal">How It Works</span>
        <h2 class="process-title reveal reveal-delay-1">
          From first call to<br/><em>completed home —</em><br/>managed entirely remotely.
        </h2>
      </div>

      <div class="steps">
        <div v-for="(step, i) in steps" :key="step.title"
          :class="['step', 'reveal', 'reveal-delay-' + (i+1), { active: activeStep === i }]"
          @mouseenter="activeStep = i; $emit('hover')"
          @mouseleave="activeStep = null; $emit('unhover')">
          <div class="step-num">
            <span>{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="step-connector" v-if="i < steps.length - 1">
            <div class="connector-line"></div>
            <div class="connector-dot"></div>
          </div>
          <div class="step-body">
            <div class="step-icon">{{ step.icon }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-duration">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--gold)" stroke-width="1"/><path d="M7 4V7L9 9" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/></svg>
              {{ step.duration }}
            </div>
          </div>
        </div>
      </div>

      <div class="process-cta reveal reveal-delay-6">
        <button class="btn-primary" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <span>Start Your Project Today</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.process .reveal')

const activeStep = ref(null)

const openCalendar = () => {
  window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true', '_blank')
}

const steps = [
  { icon: '📞', title: 'Book a Discovery Call', duration: 'Day 1',
    desc: 'Schedule a free 30-minute call with a Cedar Home Builder advisor. We discuss your vision, location, budget, and timeline. You get added to our platform immediately.' },
  { icon: '🗺', title: 'Site Sourcing & Geo-Verification', duration: 'Week 1–2',
    desc: 'We identify and present verified land or property options with GPS coordinates, satellite imagery, and title reports — all viewable in your dashboard.' },
  { icon: '✍️', title: 'Onboarding & Contract', duration: 'Week 2–3',
    desc: 'Legal agreements are signed digitally. Funds go into escrow. Your project dashboard is activated and your dedicated project manager is introduced.' },
  { icon: '🏗', title: 'Build Phase — Remotely Monitored', duration: 'Months 2–18',
    desc: 'Construction begins. Monthly drone surveys, geo-tagged photos, milestone approvals, and budget updates all arrive in your dashboard. Your PM is one message away.' },
  { icon: '🏠', title: 'Handover & Ongoing Management', duration: 'Final Phase',
    desc: 'A virtual handover tour is conducted via video. You receive all legal documents digitally. We can manage the property ongoing — tenants, rent, maintenance.' },
]
</script>

<style scoped>
.process { padding: 120px 80px; background: var(--navy-mid); position: relative; overflow: hidden; }
.process::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
.process-inner { max-width: 1100px; margin: 0 auto; }
.process-header { margin-bottom: 72px; text-align: center; }
.section-label { display: block; margin-bottom: 20px; }
.process-title { font-family: var(--font-display); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: var(--cream); line-height: 1.2; }
.process-title em { font-style: italic; color: var(--gold); }

.steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; position: relative; margin-bottom: 72px; }
.step { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 16px; transition: transform 0.3s var(--spring); }
.step.active { transform: translateY(-8px); }
.step-num { width: 56px; height: 56px; border: 1.5px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; background: var(--navy-mid); position: relative; z-index: 2; transition: background 0.3s; }
.step.active .step-num { background: var(--gold); }
.step-num span { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 700; color: var(--gold); transition: color 0.3s; }
.step.active .step-num span { color: var(--navy-deep); }
.step-connector { position: absolute; top: 28px; left: calc(50% + 28px); right: calc(-50% + 28px); display: flex; align-items: center; z-index: 1; }
.connector-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--gold), rgba(201,168,76,0.3)); }
.connector-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
.step-icon { font-size: 1.8rem; margin-bottom: 16px; }
.step-title { font-family: var(--font-ui); font-size: 0.88rem; font-weight: 700; color: var(--cream); margin-bottom: 10px; letter-spacing: 0.02em; }
.step-desc { font-size: 0.8rem; line-height: 1.65; color: rgba(240,244,255,0.5); margin-bottom: 14px; }
.step-duration { display: flex; align-items: center; gap: 6px; font-family: var(--font-ui); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; color: var(--gold); text-transform: uppercase; justify-content: center; }

.process-cta { text-align: center; }
.btn-primary { display: inline-flex; align-items: center; gap: 12px; font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--navy-deep); background: var(--gold); padding: 18px 40px; border: none; transition: background 0.3s, transform 0.3s var(--spring), box-shadow 0.3s; }
.btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 20px 40px rgba(201,168,76,0.2); }

@media (max-width: 1000px) { .process { padding: 80px 40px; } .steps { grid-template-columns: 1fr; gap: 40px; } .step-connector { display: none; } .step { flex-direction: row; text-align: left; gap: 24px; } .step-num { flex-shrink: 0; margin-bottom: 0; } .step-duration { justify-content: flex-start; } }
@media (max-width: 600px) { .process { padding: 60px 20px; } .step { flex-direction: column; text-align: center; } .step-duration { justify-content: center; } }
</style>
