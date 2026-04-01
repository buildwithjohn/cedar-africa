<template>
  <section class="hero" id="hero">
    <div class="hero-bg">
      <div class="grid-lines"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="scan-line"></div>
    </div>

    <div class="hero-badges reveal">
      <span class="tech-badge"><span class="badge-dot"></span>Remote Project Monitoring</span>
      <span class="tech-badge"><span class="badge-dot"></span>Geo-Referenced Drone Surveys</span>
      <span class="tech-badge"><span class="badge-dot"></span>Live Construction Dashboard</span>
    </div>

    <div class="hero-content">
      <span class="section-label reveal reveal-delay-1">Cedar Home Builder · Project Management Platform</span>

      <h1 class="hero-title reveal reveal-delay-2">
        Manage your home build<br/>
        in Nigeria — <em>from anywhere</em><br/>
        in the world.
      </h1>

      <p class="hero-sub reveal reveal-delay-3">
        Cedar Home Builder is a <strong>remote project management platform</strong> for diaspora Nigerians. Track construction milestones, monitor your site via <strong>live drone footage</strong>, verify land boundaries with <strong>geo-referenced maps</strong>, and communicate with your project team — all from one dashboard.
      </p>

      <div class="hero-actions reveal reveal-delay-4">
        <a href="#platform" class="btn-primary" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <span>See the Platform</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </a>
        <button class="btn-ghost" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          Book a free project call
        </button>
      </div>
    </div>

    <div class="scroll-cue">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
defineEmits(['hover', 'unhover'])


const openCalendar = () => {
  window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true', '_blank')
}

onMounted(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100)
  })
})
</script>

<style scoped>
.hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 140px 40px 100px; background: var(--navy-deep); position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(91,164,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91,164,245,0.04) 1px, transparent 1px); background-size: 52px 52px; }
.orb { position: absolute; border-radius: 50%; filter: blur(100px); animation: floatOrb 12s ease-in-out infinite; }
.orb-1 { width: 700px; height: 700px; background: rgba(30,77,140,0.35); top: -200px; left: -200px; animation-delay: 0s; }
.orb-2 { width: 500px; height: 500px; background: rgba(201,168,76,0.08); bottom: -100px; right: -150px; animation-delay: 4s; }
.orb-3 { width: 400px; height: 400px; background: rgba(37,99,176,0.2); top: 40%; left: 50%; transform: translateX(-50%); animation-delay: 8s; }
.scan-line { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(91,164,245,0.5), transparent); animation: scan 7s linear infinite; }
@keyframes floatOrb { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-30px) scale(1.04); } }
@keyframes scan { 0% { top:0; opacity:0; } 8% { opacity:1; } 92% { opacity:1; } 100% { top:100%; opacity:0; } }

.hero-badges { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 36px; position: relative; z-index: 2; }
.tech-badge { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-ui); font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(240,244,255,0.55); background: rgba(91,164,245,0.06); border: 1px solid rgba(91,164,245,0.15); padding: 6px 14px; border-radius: 20px; }
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--tech-blue); box-shadow: 0 0 6px var(--tech-blue); animation: blink 2s ease-in-out infinite; flex-shrink: 0; }
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

.hero-content { position: relative; z-index: 2; max-width: 880px; width: 100%; display: flex; flex-direction: column; align-items: center; }
.section-label { display: block; margin-bottom: 22px; }
.hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 5.5vw, 5.2rem); font-weight: 300; line-height: 1.1; color: var(--cream); margin-bottom: 28px; }
.hero-title em { font-style: italic; color: var(--gold); }
.hero-sub { font-size: 1.05rem; line-height: 1.8; color: rgba(240,244,255,0.6); max-width: 660px; margin-bottom: 44px; }
.hero-sub strong { color: var(--gold-light); font-weight: 500; }

.hero-actions { display: flex; gap: 16px; align-items: center; justify-content: center; flex-wrap: wrap; margin-bottom: 0; }
.btn-primary { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; color: var(--navy-deep); background: var(--gold); padding: 16px 32px; transition: background 0.3s, transform 0.3s var(--spring), box-shadow 0.3s; }
.btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 16px 40px rgba(201,168,76,0.3); }
.btn-ghost { font-family: var(--font-ui); font-size: 0.82rem; font-weight: 600; background: none; border: 1px solid rgba(240,244,255,0.2); color: rgba(240,244,255,0.6); padding: 15px 28px; transition: border-color 0.3s, color 0.3s, background 0.3s; }
.btn-ghost:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.06); }



.hero-stat:last-child { border-right: none; }
.hero-stat:hover { background: rgba(91,164,245,0.06); }



.scroll-cue { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 2; }
.scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2s ease-in-out infinite; }
@keyframes scrollPulse { 0%,100% { opacity:0.3; } 50% { opacity:1; } }
.scroll-cue span { font-family: var(--font-ui); font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(240,244,255,0.25); writing-mode: vertical-rl; }

@media (max-width: 768px) { .hero { padding: 100px 24px 80px; } .hero-title { font-size: clamp(2.2rem, 8vw, 3.2rem); } .hero-sub { font-size: 0.95rem; }   .scroll-cue { display: none; } }
@media (max-width: 480px) { .hero-badges { gap: 7px; } .tech-badge { font-size: 0.58rem; padding: 5px 10px; }   }
</style>
