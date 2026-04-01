<template>
  <section class="hero" id="hero">
    <!-- Full-viewport hero image -->
    <div class="hero-media">
      <img src="/hero-image.png" alt="Cedar Home Builder" class="hero-bg-img" />
      <div class="hero-overlay"></div>
    </div>

    <!-- Text on top of image -->
    <div class="hero-body">
      <div class="hero-content">
        <div class="hero-eyebrow reveal">
          <span class="eyebrow-dot"></span>
          <span class="eyebrow">Remote Project Management Platform</span>
        </div>

        <h1 class="hero-title reveal reveal-delay-1">
          Build Your Home<br/>
          in Nigeria —<br/>
          <em>From Anywhere.</em>
        </h1>

        <p class="hero-sub reveal reveal-delay-2">
          Cedar Home Builder gives diaspora Nigerians a powerful platform to plan, monitor, and complete home construction projects remotely — geo-verified land, live drone updates, dedicated team on the ground.
        </p>

        <div class="hero-actions reveal reveal-delay-3">
          <button class="btn-gold" @click="openCal" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Book a Meeting
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <a href="#services" class="btn-outline" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Explore Platform
          </a>
        </div>
      </div>

      <!-- Bottom floating tags -->
      <div class="hero-tags reveal reveal-delay-4">
        <div class="hero-tag" v-for="t in tags" :key="t">
          <span class="tag-dot"></span>{{ t }}
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-hint">
      <div class="scroll-track"><div class="scroll-thumb"></div></div>
      <span>scroll</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
defineEmits(['hover','unhover'])

const tags = ['Geo-Referenced Land', 'Drone Monitoring', 'Live Dashboard', 'Dedicated Project Manager']
const openCal = () => window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true','_blank')

onMounted(() => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 100)
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Image fills viewport */
.hero-media { position: absolute; inset: 0; }
.hero-bg-img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 40%;
}
/* Gradient: dark at bottom-left (text area), transparent top-right (show image) */
.hero-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(105deg,
      rgba(11,22,35,0.92) 0%,
      rgba(11,22,35,0.75) 38%,
      rgba(11,22,35,0.35) 62%,
      rgba(11,22,35,0.06) 100%
    );
}

/* Content layer */
.hero-body {
  position: relative; z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 140px 64px 60px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.hero-content { max-width: 640px; }

.hero-eyebrow {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 28px;
}
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 10px rgba(201,160,74,0.6);
  animation: pulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6.5vw, 6.5rem);
  font-weight: 900;
  line-height: 1.0;
  color: #FDFAF5;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
}
.hero-title em {
  font-style: italic;
  font-weight: 800;
  color: var(--gold);
  text-shadow: 0 0 60px rgba(201,160,74,0.3);
}

.hero-sub {
  font-size: 1.05rem; line-height: 1.75; font-weight: 400;
  color: rgba(253,250,245,0.72);
  max-width: 520px;
  margin-bottom: 44px;
}

.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.btn-gold {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-body); font-size: 0.9rem; font-weight: 700;
  color: var(--ink); background: var(--gold);
  border: none; padding: 15px 32px; border-radius: 4px;
  letter-spacing: 0.01em;
  transition: background .3s, transform .2s var(--ease-back), box-shadow .3s;
}
.btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,160,74,0.35); }
.btn-outline {
  display: inline-flex; align-items: center;
  font-family: var(--font-body); font-size: 0.9rem; font-weight: 600;
  color: rgba(253,250,245,0.85);
  text-decoration: none;
  border: 1.5px solid rgba(253,250,245,0.3);
  padding: 15px 32px; border-radius: 4px;
  transition: border-color .3s, color .3s, background .3s;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,160,74,0.06); }

/* Bottom tags */
.hero-tags {
  display: flex; gap: 12px; flex-wrap: wrap;
  padding-top: 40px;
  border-top: 1px solid rgba(253,250,245,0.12);
  margin-top: 40px;
}
.hero-tag {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(253,250,245,0.55);
  background: rgba(253,250,245,0.06);
  border: 1px solid rgba(253,250,245,0.1);
  padding: 7px 14px; border-radius: 20px;
}
.tag-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

/* Scroll hint */
.scroll-hint {
  position: absolute; bottom: 36px; right: 64px; z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.scroll-track {
  width: 1.5px; height: 48px;
  background: rgba(253,250,245,0.15); border-radius: 2px;
  overflow: hidden;
}
.scroll-thumb {
  width: 100%; height: 40%;
  background: var(--gold); border-radius: 2px;
  animation: scrollDown 2s ease-in-out infinite;
}
@keyframes scrollDown { 0% { transform:translateY(-100%); } 100% { transform:translateY(350%); } }
.scroll-hint span {
  font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(253,250,245,0.3);
  writing-mode: vertical-rl;
}

@media (max-width: 768px) {
  .hero-body { padding: 110px 24px 48px; }
  .hero-title { font-size: clamp(2.6rem, 10vw, 4rem); }
  .hero-sub { font-size: 0.95rem; }
  .scroll-hint { display: none; }
  .hero-tags { display: none; }
}
</style>
