<template>
  <section class="bks" id="booking">
    <!-- CTA banner -->
    <div class="bks-banner">
      <div class="section-wrap bks-banner-inner">
        <div class="bks-banner-text">
          <h2 class="reveal">Schedule a meeting to get started today.</h2>
          <p class="reveal reveal-delay-1">Schedule a free consultation to discuss your project needs and goals. We'll walk through your vision and provide initial recommendations for bringing it to life.</p>
        </div>
        <button class="bks-banner-btn reveal reveal-delay-2" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          Book a Meeting
        </button>
      </div>
    </div>

    <!-- Contact + details -->
    <div class="section-wrap bks-body">
      <div class="bks-left">
        <span class="section-label reveal">Get In Touch</span>
        <h3 class="bks-subtitle reveal reveal-delay-1">Project Discovery Call</h3>
        <div class="bks-meta reveal reveal-delay-2">
          <div class="bks-meta-row">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--gold)" stroke-width="1.2"/><path d="M8 4.5V8L10.5 10" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round"/></svg>
            30 minutes · Free
          </div>
          <div class="bks-meta-row">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="12" rx="2" stroke="var(--gold)" stroke-width="1.2"/><path d="M4 1V3M12 1V3M1 6H15" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round"/></svg>
            Google Meet video call
          </div>
          <div class="bks-meta-row">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="var(--gold)" stroke-width="1.2"/><path d="M5 8C5 9.7 6.3 11 8 11" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round"/></svg>
            Synced with Google Calendar
          </div>
        </div>
        <ul class="bks-list reveal reveal-delay-3">
          <li v-for="f in features" :key="f">{{ f }}</li>
        </ul>
      </div>

      <div class="bks-card reveal reveal-delay-2">
        <img src="/cedar-logo.png" alt="Cedar Home Builder" class="bks-logo" />
        <h4>Cedar Home Builder</h4>
        <p>Remote Project Management Platform for diaspora Nigerians</p>
        <ul class="bks-card-list">
          <li>Platform walkthrough & live demo</li>
          <li>Project vision & location discussed</li>
          <li>Realistic cost estimate provided</li>
          <li>Geo-tech process explained</li>
        </ul>
        <button class="bks-card-btn" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M2 7H16M5 1V3.5M13 1V3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          Select a Date & Time
        </button>
        <p class="bks-gcal-note">Real-time availability · Instant confirmation</p>
      </div>

      <div class="bks-contacts reveal reveal-delay-3">
        <h4>Other ways to reach us</h4>
        <a href="mailto:hello@cedarhomebuilder.com" class="contact-row" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M1 5L8 9L15 5" stroke="currentColor" stroke-width="1.1"/></svg>
          hello@cedarhomebuilder.com
        </a>
        <a href="https://wa.me/2348100000000" class="contact-row" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.1 1.8 10.1 2.3 11L1.5 14.5L5.1 13.7C6 14.2 7 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="currentColor" stroke-width="1.1"/></svg>
          WhatsApp us
        </a>
        <div class="contact-row no-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.2 1 3 3.2 3 6C3 9.5 8 15 8 15S13 9.5 13 6C13 3.2 10.8 1 8 1Z" stroke="currentColor" stroke-width="1.1"/><circle cx="8" cy="6" r="2" stroke="currentColor" stroke-width="1.1"/></svg>
          Lagos, Nigeria · London, UK
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useReveal } from '../composables/useReveal.js'
defineEmits(['hover', 'unhover'])
useReveal('.bks .reveal')
const features = ['100% free, no obligation', 'Speak with a senior project advisor', 'Live platform demonstration', 'Clear project roadmap provided']
const openCalendar = () => { window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true', '_blank') }
</script>
<style scoped>
.bks { background: var(--white); }

/* Banner */
.bks-banner { background: var(--navy); padding: 80px 0; }
.bks-banner-inner { display: flex; align-items: center; justify-content: space-between; gap: 60px; }
.bks-banner-text { max-width: 560px; }
.bks-banner-text h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 300; color: white; line-height: 1.2; margin-bottom: 16px; }
.bks-banner-text p { font-size: 0.9rem; line-height: 1.75; color: rgba(255,255,255,0.6); }
.bks-banner-btn { font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; color: var(--navy); background: var(--gold); border: none; padding: 16px 36px; border-radius: 30px; white-space: nowrap; flex-shrink: 0; transition: background 0.3s, transform 0.2s var(--spring); }
.bks-banner-btn:hover { background: var(--gold-light); transform: translateY(-2px); }

/* Body */
.bks-body { padding: 80px 60px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 48px; }

/* Left */
.section-label { display: block; margin-bottom: 14px; }
.bks-subtitle { font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; color: var(--navy); margin-bottom: 20px; }
.bks-meta { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.bks-meta-row { display: flex; align-items: center; gap: 9px; font-size: 0.85rem; color: var(--muted); }
.bks-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.bks-list li { font-size: 0.85rem; color: var(--muted); padding-left: 16px; position: relative; }
.bks-list li::before { content: '✓'; position: absolute; left: 0; color: var(--gold); font-size: 0.75rem; }

/* Card */
.bks-card { background: var(--off-white); border: 1px solid var(--border); border-radius: 10px; padding: 32px; display: flex; flex-direction: column; gap: 0; }
.bks-logo { height: 40px; width: auto; object-fit: contain; margin-bottom: 14px; }
.bks-card h4 { font-family: var(--font-ui); font-size: 0.9rem; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.bks-card > p { font-size: 0.75rem; color: var(--muted); margin-bottom: 20px; line-height: 1.5; }
.bks-card-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.bks-card-list li { font-size: 0.82rem; color: var(--muted); padding-left: 14px; position: relative; }
.bks-card-list li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 1px; background: var(--gold); }
.bks-card-btn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 14px 18px; background: var(--navy); color: white; border: none; border-radius: 6px; font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; transition: background 0.3s, transform 0.2s var(--spring); margin-bottom: 10px; }
.bks-card-btn:hover { background: var(--gold); transform: translateY(-1px); }
.bks-gcal-note { font-size: 0.7rem; color: var(--muted); text-align: center; }

/* Contacts */
.bks-contacts h4 { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 700; color: var(--navy); margin-bottom: 18px; letter-spacing: 0.04em; }
.contact-row { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--muted); text-decoration: none; margin-bottom: 14px; transition: color 0.2s; }
.contact-row:hover { color: var(--navy); }
.contact-row.no-link { cursor: default; }

@media (max-width: 960px) {
  .bks-banner-inner { flex-direction: column; text-align: center; gap: 32px; }
  .bks-body { grid-template-columns: 1fr; padding: 60px 24px; gap: 40px; }
}
</style>
