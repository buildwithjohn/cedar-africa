<template>
  <section class="process" id="process">
    <div class="section-wrap">
      <div class="process-header">
        <span class="section-label reveal">How It Works</span>
        <h2 class="process-title reveal reveal-delay-1">
          Three steps to get started.
        </h2>
      </div>
      <div class="steps-grid">
        <div class="step reveal" :class="'reveal-delay-' + (i+1)"
          v-for="(s, i) in steps" :key="s.title"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="step-number">{{ String(i+1).padStart(2,'0') }}</div>
          <div class="step-icon">{{ s.icon }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
      <div class="process-cta reveal reveal-delay-4">
        <button class="btn-primary" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          Get Started Now
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.process .reveal')
const openCalendar = () => { window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true', '_blank') }
const steps = [
  { icon: '📞', title: 'Book a Meeting', desc: 'Schedule a free 30-minute call with a Cedar Home Builder advisor. We\'ll discuss your project needs, budget, and timeline — then walk you through the platform.' },
  { icon: '🖥', title: 'Access Your Dashboard', desc: 'Your project dashboard is set up. Track milestones, view documents, communicate with your site manager, and monitor drone footage — all in one place.' },
  { icon: '🏠', title: 'Build With Confidence', desc: 'Our team begins work on the ground. You receive regular updates, approve key decisions remotely, and watch your home come to life — from anywhere in the world.' },
]
</script>
<style scoped>
.process { padding: 100px 0; background: var(--white); }
.process-header { margin-bottom: 64px; }
.section-label { display: block; margin-bottom: 14px; }
.process-title { font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3.5rem); font-weight: 300; color: var(--navy); }
.steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); border: 1px solid var(--border); margin-bottom: 56px; }
.step { background: var(--white); padding: 48px 36px; position: relative; transition: background 0.3s; }
.step:hover { background: var(--off-white); }
.step-number { font-family: var(--font-display); font-size: 4rem; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 24px; opacity: 0.6; }
.step-icon { font-size: 1.8rem; margin-bottom: 20px; }
.step h3 { font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 12px; }
.step p { font-size: 0.88rem; line-height: 1.75; color: var(--muted); }
.process-cta { text-align: center; }
.btn-primary { font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em; color: var(--white); background: var(--navy); border: 2px solid var(--navy); padding: 16px 40px; border-radius: 30px; transition: background 0.3s, border-color 0.3s, transform 0.2s var(--spring); }
.btn-primary:hover { background: var(--gold); border-color: var(--gold); transform: translateY(-2px); }
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } .step { border-bottom: 1px solid var(--border); } }
</style>
