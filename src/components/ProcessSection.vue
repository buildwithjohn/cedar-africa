<template>
  <section class="process" id="process">
    <div class="process-inner">
      <div class="process-header">
        <span class="section-label reveal">How It Works</span>
        <h2 class="process-title reveal reveal-delay-1">
          Simple. Transparent.<br/><em>Effortless.</em>
        </h2>
      </div>

      <div class="steps">
        <div
          class="step reveal"
          v-for="(step, i) in steps"
          :key="step.title"
          @mouseenter="active = i; $emit('hover')"
          @mouseleave="active = null; $emit('unhover')"
          :class="['step', 'reveal', 'reveal-delay-' + (i+1), { active: active === i }]"
        >
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
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="var(--gold)" stroke-width="1"/>
                <path d="M7 4V7L9 9" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/>
              </svg>
              {{ step.duration }}
            </div>
          </div>
        </div>
      </div>

      <div class="process-cta reveal reveal-delay-5">
        <a href="#booking" class="btn-primary" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <span>Start Your Journey Today</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
defineEmits(['hover', 'unhover'])
const active = ref(null)

const steps = [
  { icon: '📞', title: 'Free Consultation', duration: 'Day 1', desc: 'Book a 30-minute call with our team. Tell us your vision, budget, and preferred location. We listen first.' },
  { icon: '🗺', title: 'Site Sourcing & Verification', duration: 'Week 1–2', desc: 'We present verified land options with full title checks, survey plans, and government approvals. You approve remotely.' },
  { icon: '✍️', title: 'Agreement & Escrow', duration: 'Week 2–3', desc: 'Legal agreements are signed, funds go into secure escrow. Your money is protected before a single brick is laid.' },
  { icon: '🏗', title: 'Design & Build', duration: 'Months 3–18', desc: 'Our team gets to work. You receive monthly video updates, access your live dashboard, and can call your project manager anytime.' },
  { icon: '🏠', title: 'Handover & Management', duration: 'Final Phase', desc: 'We walk you through your completed property virtually. Then we manage it — or hand you the keys at your arrival.' },
]

useReveal('.process .reveal')
</script>

<style scoped>
.process {
  padding: 120px 80px;
  background: var(--cream-dark);
  position: relative;
  overflow: hidden;
}
.process::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.process-inner { max-width: 1100px; margin: 0 auto; }
.process-header { margin-bottom: 72px; text-align: center; }
.section-label { display: block; margin-bottom: 20px; }
.process-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 300;
  color: var(--forest);
  line-height: 1.2;
}
.process-title em { font-style: italic; color: var(--gold); }

.steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;
  margin-bottom: 72px;
}
.step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  transition: transform 0.3s var(--spring);
}
.step.active { transform: translateY(-8px); }
.step-num {
  width: 56px; height: 56px;
  border: 1.5px solid var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: var(--cream-dark);
  position: relative;
  z-index: 2;
  transition: background 0.3s, color 0.3s;
}
.step.active .step-num { background: var(--gold); }
.step-num span {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gold);
  transition: color 0.3s;
}
.step.active .step-num span { color: var(--forest-deep); }
.step-connector {
  position: absolute;
  top: 28px;
  left: calc(50% + 28px);
  right: calc(-50% + 28px);
  display: flex;
  align-items: center;
  z-index: 1;
}
.connector-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold), rgba(201,168,76,0.3));
}
.connector-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}
.step-icon { font-size: 1.8rem; margin-bottom: 16px; }
.step-title {
  font-family: var(--font-ui);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--forest);
  margin-bottom: 10px;
  letter-spacing: 0.02em;
}
.step-desc { font-size: 0.82rem; line-height: 1.65; color: var(--muted); margin-bottom: 14px; }
.step-duration {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-ui);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--gold);
  text-transform: uppercase;
}

.process-cta { text-align: center; }
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-ui);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--white);
  background: var(--forest);
  padding: 18px 40px;
  transition: background 0.3s, transform 0.3s var(--spring), box-shadow 0.3s;
}
.btn-primary:hover {
  background: var(--gold);
  color: var(--forest-deep);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(201,168,76,0.2);
}

@media (max-width: 1000px) {
  .process { padding: 80px 40px; }
  .steps { grid-template-columns: 1fr; gap: 40px; }
  .step-connector { display: none; }
  .step { flex-direction: row; text-align: left; gap: 24px; }
  .step-num { flex-shrink: 0; margin-bottom: 0; }
}
@media (max-width: 600px) {
  .process { padding: 60px 20px; }
  .step { flex-direction: column; text-align: center; }
}
</style>
