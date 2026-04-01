<template>
  <section class="booking" id="booking">
    <!-- Full-bleed CTA -->
    <div class="booking-banner">
      <div class="wrap banner-inner">
        <div class="banner-left">
          <span class="eyebrow reveal">Schedule a Call</span>
          <h2 class="banner-title reveal reveal-delay-1">
            Start your project<br/><em>today.</em>
          </h2>
          <p class="banner-sub reveal reveal-delay-2">Free 30-minute consultation. No commitment — just a clear, honest conversation about your project and how we can help.</p>
        </div>
        <div class="banner-right reveal reveal-delay-2">
          <button class="btn-banner" @click="openCal" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Book a Meeting
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M2 7H16M6 1V3.5M12 1V3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </button>
          <p class="banner-note">Synced with Google Calendar · Instant confirmation</p>
        </div>
      </div>
    </div>

    <!-- Contact details -->
    <div class="booking-details">
      <div class="wrap details-grid">
        <div class="detail-col reveal">
          <span class="eyebrow">What to Expect</span>
          <ul class="expect-list">
            <li v-for="f in features" :key="f">{{ f }}</li>
          </ul>
        </div>
        <div class="detail-col reveal reveal-delay-1">
          <span class="eyebrow">Session Details</span>
          <div class="meta-items">
            <div class="meta-item"><span class="meta-label">Duration</span><span>30 minutes</span></div>
            <div class="meta-item"><span class="meta-label">Format</span><span>Google Meet video call</span></div>
            <div class="meta-item"><span class="meta-label">Cost</span><span class="free-badge">Free</span></div>
          </div>
        </div>
        <div class="detail-col reveal reveal-delay-2">
          <span class="eyebrow">Contact</span>
          <div class="contacts">
            <a href="mailto:hello@cedarhomebuilder.com" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="2.5" width="13" height="10" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M1 5L7.5 8.5L14 5" stroke="currentColor" stroke-width="1.1"/></svg>
              hello@cedarhomebuilder.com
            </a>
            <a href="https://wa.me/2348100000000" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1C3.9 1 1 3.9 1 7.5C1 8.7 1.3 9.8 1.9 10.7L1 14L4.4 13.1C5.3 13.7 6.4 14 7.5 14C11.1 14 14 11.1 14 7.5C14 3.9 11.1 1 7.5 1Z" stroke="currentColor" stroke-width="1.1"/></svg>
              WhatsApp us
            </a>
            <div class="contact-loc">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1C5 1 3 3 3 5.5C3 8.5 7.5 14 7.5 14S12 8.5 12 5.5C12 3 10 1 7.5 1Z" stroke="currentColor" stroke-width="1.1"/><circle cx="7.5" cy="5.5" r="1.5" stroke="currentColor" stroke-width="1.1"/></svg>
              Lagos, Nigeria · London, UK
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover','unhover'])
useReveal('.booking .reveal')
const openCal = () => window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true','_blank')
const features = ['Speak with a senior project advisor','Live platform demonstration','Discuss your vision, location & budget','Receive a clear project roadmap','No obligation, completely free']
</script>
<style scoped>
.booking { background: var(--ivory); }

/* Banner */
.booking-banner { background: var(--ink); padding: 100px 0; }
.banner-inner { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }
.eyebrow { display: block; margin-bottom: 16px; }
.banner-title { font-family: var(--font-display); font-size: clamp(2.8rem, 5vw, 5rem); font-weight: 900; color: var(--ivory); line-height: 1.0; letter-spacing: -0.03em; margin-bottom: 20px; }
.banner-title em { font-style: italic; color: var(--gold); }
.banner-sub { font-size: 1rem; line-height: 1.75; color: rgba(245,239,224,0.55); max-width: 440px; }
.banner-right { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.btn-banner {
  display: flex; align-items: center; gap: 12px; white-space: nowrap;
  font-family: var(--font-body); font-size: 0.9rem; font-weight: 700;
  color: var(--ink); background: var(--gold); border: none;
  padding: 18px 40px; border-radius: 4px;
  transition: background .3s, transform .2s var(--ease-back);
}
.btn-banner:hover { background: var(--gold-light); transform: translateY(-2px); }
.banner-note { font-family: var(--font-mono); font-size: 0.65rem; color: rgba(245,239,224,0.3); letter-spacing: 0.08em; text-align: center; }

/* Details */
.booking-details { padding: 80px 0; }
.details-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 48px; }
.detail-col .eyebrow { margin-bottom: 28px; }
.expect-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.expect-list li { font-size: 0.9rem; color: var(--muted); padding-left: 20px; position: relative; }
.expect-list li::before { content: '✓'; position: absolute; left: 0; color: var(--gold); font-size: 0.8rem; font-weight: 700; }
.meta-items { display: flex; flex-direction: column; gap: 14px; }
.meta-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid var(--ivory-dark); font-size: 0.88rem; }
.meta-label { color: var(--muted); font-size: 0.82rem; }
.meta-item span:last-child { color: var(--ink); font-weight: 600; }
.free-badge { background: rgba(74,103,65,0.1); color: var(--sage) !important; font-weight: 700 !important; padding: 3px 12px; border-radius: 20px; border: 1px solid rgba(74,103,65,0.2); font-size: 0.78rem; }
.contacts { display: flex; flex-direction: column; gap: 14px; }
.contacts a, .contact-loc { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: var(--muted); text-decoration: none; transition: color .2s; }
.contacts a:hover { color: var(--gold); }
.contact-loc { color: var(--muted); }

@media (max-width: 960px) { .banner-inner { grid-template-columns: 1fr; } .details-grid { grid-template-columns: 1fr; gap: 40px; } }
</style>
