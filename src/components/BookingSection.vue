<template>
  <section class="bks" id="booking">
    <div class="bks-inner">

      <!-- Left: copy -->
      <div class="bks-copy">
        <span class="bks-label reveal">Schedule a Call</span>
        <h2 class="bks-title reveal reveal-delay-1">
          Let's start building<br/><em>your future.</em>
        </h2>
        <p class="bks-sub reveal reveal-delay-2">
          Book a free 30-minute consultation with a Cedar Home Builder advisor.
          We'll map out your project, verify your plot on our live map, and give
          you a clear cost estimate — no strings attached.
        </p>

        <ul class="bks-features reveal reveal-delay-3">
          <li v-for="f in features" :key="f">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="var(--gold)" stroke-width="1.2"/>
              <path d="M5 8L7 10L11 6" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            {{ f }}
          </li>
        </ul>

        <div class="bks-contacts reveal reveal-delay-4">
          <a href="mailto:hello@cedarhomebuilder.com" class="bks-contact" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M1 5L8 9L15 5" stroke="currentColor" stroke-width="1.1"/></svg>
            hello@cedarhomebuilder.com
          </a>
          <a href="https://wa.me/2348100000000" class="bks-contact" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.1 1.8 10.1 2.3 11L1.5 14.5L5.1 13.7C6 14.2 7 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="currentColor" stroke-width="1.1"/></svg>
            WhatsApp us
          </a>
        </div>
      </div>

      <!-- Right: booking card -->
      <div class="bks-card reveal reveal-delay-2">
        <div class="bks-card-head">
          <div class="bks-card-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
              <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
              <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.3"/>
            </svg>
          </div>
          <div>
            <strong>Project Discovery Call</strong>
            <span>Cedar Home Builder</span>
          </div>
        </div>

        <div class="bks-card-badges">
          <span class="badge">⏱ 30 min</span>
          <span class="badge">📹 Video call</span>
          <span class="badge badge-free">🆓 Free</span>
        </div>

        <ul class="bks-card-list">
          <li>Geo-map your plot in real time</li>
          <li>Realistic build cost estimate</li>
          <li>Full technology platform walkthrough</li>
          <li>Ask anything about building in Nigeria</li>
        </ul>

        <BookingModal>
          <template #default="{ open }">
            <button class="bks-card-btn" @click="open" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <span>Select a Date & Time</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="1" stroke="currentColor" stroke-width="1.2"/>
                <path d="M2 7H16M6 1V4M12 1V4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
          </template>
        </BookingModal>

        <p class="bks-card-note">No sign up required. Instant confirmation.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useReveal } from '../composables/useReveal.js'
import BookingModal from './BookingModal.vue'
defineEmits(['hover', 'unhover'])
useReveal('.bks .reveal')

const features = [
  'Speak directly with a senior advisor',
  'Get a live geo-referenced map demo',
  'Receive a project cost estimate',
  'Understand our full tech process',
]
</script>

<style scoped>
/* ── Section wrapper — sits between dark sections ── */
.bks {
  background: #FFFFFF;
  padding: 120px 80px;
  position: relative;
}
/* Subtle top/bottom borders to transition cleanly from dark sections */
.bks::before, .bks::after {
  content: '';
  position: absolute; left: 0; right: 0;
  height: 1px;
}
.bks::before { top: 0;    background: linear-gradient(90deg, transparent, var(--gold), transparent); }
.bks::after  { bottom: 0; background: linear-gradient(90deg, transparent, rgba(28,58,43,0.2), transparent); }

.bks-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center;
}

/* ── Left copy ── */
.bks-label {
  display: block; margin-bottom: 16px;
  font-family: var(--font-ui); font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.25em; text-transform: uppercase;
  color: var(--gold);
}
.bks-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 300; line-height: 1.12; color: var(--charcoal);
  margin-bottom: 22px;
}
.bks-title em { font-style: italic; color: var(--forest); }
.bks-sub { font-size: 0.95rem; line-height: 1.78; color: #555; margin-bottom: 32px; max-width: 440px; }

.bks-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.bks-features li { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: #333; }

.bks-contacts { display: flex; flex-direction: column; gap: 10px; }
.bks-contact {
  display: inline-flex; align-items: center; gap: 9px;
  text-decoration: none; font-size: 0.85rem; color: #777;
  transition: color 0.2s;
}
.bks-contact:hover { color: var(--forest); }

/* ── Right card ── */
.bks-card {
  background: #FAFAF8;
  border: 1px solid #E8E4DC;
  border-radius: 8px;
  padding: 36px;
  box-shadow: 0 8px 40px rgba(28,58,43,0.08), 0 1px 3px rgba(28,58,43,0.05);
}

.bks-card-head {
  display: flex; align-items: center; gap: 14px;
  padding-bottom: 20px; margin-bottom: 20px;
  border-bottom: 1px solid #ECEAE4;
}
.bks-card-icon {
  width: 52px; height: 52px; border-radius: 8px;
  background: #F0EDE5;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.bks-card-head strong { display: block; font-family: var(--font-ui); font-size: 0.92rem; color: var(--charcoal); margin-bottom: 3px; }
.bks-card-head span { font-size: 0.74rem; color: #999; }

.bks-card-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.badge {
  font-family: var(--font-ui); font-size: 0.68rem; font-weight: 600;
  letter-spacing: 0.06em; padding: 5px 11px;
  background: #F0EDE5; border: 1px solid #E0DDD5;
  border-radius: 20px; color: #666;
}
.badge-free { background: rgba(28,58,43,0.07); border-color: rgba(28,58,43,0.15); color: var(--forest); }

.bks-card-list {
  list-style: none; display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 28px;
}
.bks-card-list li {
  font-size: 0.85rem; color: #555; padding-left: 16px; position: relative; line-height: 1.5;
}
.bks-card-list li::before {
  content: '';
  position: absolute; left: 0; top: 8px;
  width: 7px; height: 1.5px;
  background: var(--gold);
}

.bks-card-btn {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 16px 20px;
  background: var(--forest); color: #FDFAF5;
  font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700;
  letter-spacing: 0.06em; border: none; border-radius: 5px;
  margin-bottom: 12px;
  transition: background 0.3s, transform 0.2s var(--spring), box-shadow 0.3s;
}
.bks-card-btn:hover {
  background: var(--forest-light);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(28,58,43,0.2);
}

.bks-card-note { text-align: center; font-size: 0.74rem; color: #AAA; }

/* ── Responsive ── */
@media (max-width: 1000px) { .bks { padding: 80px 40px; } .bks-inner { grid-template-columns: 1fr; gap: 48px; } }
@media (max-width: 600px)  { .bks { padding: 60px 20px; } }
</style>
