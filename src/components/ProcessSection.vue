<template>
  <section class="process" id="process">
    <div class="wrap">
      <div class="proc-header">
        <div class="proc-number">04</div>
        <span class="eyebrow reveal">How It Works</span>
        <h2 class="proc-title reveal reveal-delay-1">Three steps<br/>to get started.</h2>
      </div>
      <div class="proc-steps">
        <div class="proc-step reveal" :class="'reveal-delay-'+(i+1)"
          v-for="(s,i) in steps" :key="s.title"
          @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <div class="ps-num">{{ String(i+1).padStart(2,'0') }}</div>
          <div class="ps-icon">{{ s.icon }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <div class="ps-line" v-if="i < steps.length-1"></div>
        </div>
      </div>
      <div class="proc-cta reveal reveal-delay-4">
        <button class="btn-cta" @click="openCal" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          Get Started — Book a Free Call
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover','unhover'])
useReveal('.process .reveal')
const openCal = () => window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true','_blank')
const steps = [
  { icon:'📞', title:'Book a Meeting', desc:'Schedule a free 30-minute call. We discuss your project vision, location, and budget — then walk you through the platform live.' },
  { icon:'🖥', title:'Access Your Dashboard', desc:'Your project dashboard is activated. Track milestones, view documents, communicate with your site manager, monitor drone footage — all in one place.' },
  { icon:'🏠', title:'Build With Confidence', desc:'Our team works on the ground. You approve key decisions remotely, receive regular updates, and watch your home come to life from anywhere in the world.' },
]
</script>
<style scoped>
.process { padding: 120px 0; background: var(--ivory-dark); }
.proc-header { position: relative; margin-bottom: 72px; }
.proc-number { font-family: var(--font-display); font-size: 10rem; font-weight: 900; color: rgba(26,21,18,0.05); line-height: 1; letter-spacing: -0.04em; margin-bottom: -40px; }
.eyebrow { display: block; margin-bottom: 16px; }
.proc-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 900; color: var(--ink); line-height: 1.0; letter-spacing: -0.03em; }
.proc-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; border: 1px solid var(--ivory-mid); margin-bottom: 64px; position: relative; }
.proc-step {
  padding: 48px 40px; background: var(--ivory-dark);
  border-right: 1px solid var(--ivory-mid);
  position: relative; transition: background .3s;
}
.proc-step:last-child { border-right: none; }
.proc-step:hover { background: var(--white); }
.ps-num { font-family: var(--font-display); font-size: 4rem; font-weight: 900; color: var(--gold); opacity: 0.3; line-height: 1; margin-bottom: 20px; }
.ps-icon { font-size: 2.2rem; margin-bottom: 20px; }
.proc-step h3 { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.01em; }
.proc-step p { font-size: 0.9rem; line-height: 1.75; color: var(--muted); }
.proc-cta { text-align: center; }
.btn-cta {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--font-body); font-size: 0.92rem; font-weight: 700;
  color: var(--ivory); background: var(--ink); border: none;
  padding: 18px 44px; border-radius: 4px;
  transition: background .3s, transform .2s var(--ease-back), box-shadow .3s;
}
.btn-cta:hover { background: var(--gold); color: var(--ink); transform: translateY(-2px); box-shadow: 0 16px 40px rgba(201,160,74,0.25); }

@media (max-width: 768px) { .proc-steps { grid-template-columns: 1fr; } .proc-step { border-right: none; border-bottom: 1px solid var(--ivory-mid); } .process { padding: 80px 0; } }
</style>
