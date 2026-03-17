<template>
  <section class="booking-cta" id="booking">
    <div class="bk-inner">
      <div class="bk-left">
        <span class="section-label reveal">Schedule a Call</span>
        <h2 class="bk-title reveal reveal-delay-1">
          Let's start building<br/><em>your future.</em>
        </h2>
        <p class="bk-sub reveal reveal-delay-2">
          Book a free 30-minute consultation with a Cedar Home Builder advisor. No obligation — just a clear, honest conversation about your project.
        </p>
        <div class="bk-features reveal reveal-delay-3">
          <div class="bkf" v-for="f in features" :key="f">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="var(--gold)" stroke-width="1"/>
              <path d="M5 7.5L7 9.5L10.5 6" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/>
            </svg>
            {{ f }}
          </div>
        </div>
        <div class="bk-actions reveal reveal-delay-4">
          <BookingModal ref="modal">
            <template #default="{ open }">
              <button class="btn-book" @click="open" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
                <span>Book a Free Consultation</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </template>
          </BookingModal>
          <div class="bk-alts">
            <a href="mailto:hello@cedarhomebuilder.com" class="alt-link" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M1 5L8 9L15 5" stroke="currentColor" stroke-width="1.1"/></svg>
              hello@cedarhomebuilder.com
            </a>
            <a href="https://wa.me/2348100000000" class="alt-link" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.1 1.8 10.1 2.3 11L1.5 14.5L5.1 13.7C6 14.2 7 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="currentColor" stroke-width="1.1"/></svg>
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div class="bk-right reveal reveal-delay-2">
        <div class="bk-card">
          <div class="bk-card-header">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
              <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
            </svg>
            <div>
              <strong>Project Discovery Call</strong>
              <span>Cedar Home Builder</span>
            </div>
          </div>
          <div class="bk-card-meta">
            <span>⏱ 30 minutes</span>
            <span>📹 Video call</span>
            <span>🆓 Free</span>
          </div>
          <ul class="bk-card-list">
            <li>Discuss your project vision & location</li>
            <li>Get a realistic budget estimate</li>
            <li>Understand the full geo-tech process</li>
            <li>Ask any question about building in Nigeria</li>
          </ul>
          <BookingModal ref="modal2">
            <template #default="{ open }">
              <button class="bk-card-btn" @click="open" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
                Select a Date & Time
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2" width="14" height="13" rx="1" stroke="currentColor" stroke-width="1.1"/>
                  <path d="M1 6H15M5 1V3M11 1V3" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
                </svg>
              </button>
            </template>
          </BookingModal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal.js'
import BookingModal from './BookingModal.vue'
defineEmits(['hover', 'unhover'])
useReveal('.booking-cta .reveal')

const modal  = ref(null)
const modal2 = ref(null)

const features = [
  '100% free — no obligation',
  'Speak with a senior advisor',
  'Geo-tech platform walkthrough',
  'Clear path to your build',
]
</script>

<style scoped>
.booking-cta {
  padding: 120px 80px;
  background: var(--cream);
  position: relative;
}
.booking-cta::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.bk-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center;
}

.section-label { display: block; margin-bottom: 18px; }
.bk-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3.5rem);
  font-weight: 300; line-height: 1.15; color: var(--forest);
  margin-bottom: 20px;
}
.bk-title em { font-style: italic; color: var(--gold); }
.bk-sub { font-size: 0.95rem; line-height: 1.75; color: var(--muted); margin-bottom: 28px; max-width: 440px; }
.bk-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 36px; }
.bkf { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: var(--forest); }

.bk-actions { display: flex; flex-direction: column; gap: 20px; }
.btn-book {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--white); background: var(--forest);
  padding: 17px 34px; border: none;
  transition: background 0.3s, transform 0.3s var(--spring), box-shadow 0.3s;
  width: fit-content;
}
.btn-book:hover { background: var(--gold); color: var(--forest-deep); transform: translateY(-2px); box-shadow: 0 16px 40px rgba(201,168,76,0.2); }

.bk-alts { display: flex; flex-direction: column; gap: 10px; }
.alt-link {
  display: flex; align-items: center; gap: 9px;
  text-decoration: none; color: var(--muted); font-size: 0.85rem;
  transition: color 0.2s;
}
.alt-link:hover { color: var(--gold); }

/* Right card */
.bk-right { display: flex; justify-content: center; }
.bk-card {
  background: var(--forest-deep);
  border: 1px solid rgba(201,168,76,0.18);
  padding: 36px;
  width: 100%; max-width: 380px;
  box-shadow: 0 24px 60px rgba(10,31,20,0.18);
}
.bk-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(247,242,232,0.07); }
.bk-card-header strong { display: block; font-family: var(--font-ui); font-size: 0.9rem; color: var(--cream); margin-bottom: 3px; }
.bk-card-header span { font-size: 0.72rem; color: rgba(247,242,232,0.35); }
.bk-card-meta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
.bk-card-meta span { font-family: var(--font-ui); font-size: 0.72rem; color: rgba(247,242,232,0.45); letter-spacing: 0.04em; }
.bk-card-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.bk-card-list li { font-size: 0.82rem; color: rgba(247,242,232,0.55); padding-left: 14px; position: relative; line-height: 1.5; }
.bk-card-list li::before { content: ''; position: absolute; left: 0; top: 8px; width: 6px; height: 1px; background: var(--gold); }
.bk-card-btn {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 15px 18px;
  background: var(--gold); color: var(--forest-deep);
  font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700;
  letter-spacing: 0.06em; border: none;
  transition: background 0.3s, transform 0.2s var(--spring);
}
.bk-card-btn:hover { background: var(--gold-light); transform: translateY(-1px); }

@media (max-width: 1000px) { .booking-cta { padding: 80px 40px; } .bk-inner { grid-template-columns: 1fr; gap: 48px; } }
@media (max-width: 600px) { .booking-cta { padding: 60px 20px; } }
</style>
