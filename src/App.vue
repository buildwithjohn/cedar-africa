<template>
  <div id="app">
    <!-- Custom cursor (desktop only — hidden via CSS on touch) -->
    <div class="cursor" ref="cursorEl" :class="{ hovering: isHovering, active: cursorActive }"></div>
    <div class="cursor-follower" ref="followerEl" :class="{ hovering: isHovering, active: cursorActive }"></div>

    <!-- Page loader -->
    <div class="loader" :class="{ loaded: pageLoaded }">
      <div class="loader-inner">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L4 10V28H28V10L16 2Z" stroke="#C9A84C" stroke-width="1.5" fill="none"/>
          <path d="M10 28V18H22V28" stroke="#C9A84C" stroke-width="1.5"/>
          <path d="M16 10L10 14V20H22V14L16 10Z" fill="#C9A84C" opacity="0.3"/>
        </svg>
        <span class="loader-wordmark">Cedar Home Builder</span>
        <div class="loader-bar">
          <div class="loader-progress" :style="{ width: loadProgress + '%' }"></div>
        </div>
        <span class="loader-sub">Initialising map platform...</span>
      </div>
    </div>

    <NavBar            @hover="isHovering=true" @unhover="isHovering=false" />
    <HeroSection       @hover="isHovering=true" @unhover="isHovering=false" />
    <TechnologySection @hover="isHovering=true" @unhover="isHovering=false" />
    <MapPlatformSection @hover="isHovering=true" @unhover="isHovering=false" />
    <AboutSection />
    <ServicesSection   @hover="isHovering=true" @unhover="isHovering=false" />
    <ProcessSection    @hover="isHovering=true" @unhover="isHovering=false" />
    <TestimonialsSection @hover="isHovering=true" @unhover="isHovering=false" />
    <BookingSection    @hover="isHovering=true" @unhover="isHovering=false" />
    <FooterSection     @hover="isHovering=true" @unhover="isHovering=false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar            from './components/NavBar.vue'
import HeroSection       from './components/HeroSection.vue'
import TechnologySection from './components/TechnologySection.vue'
import MapPlatformSection from './components/MapPlatformSection.vue'
import AboutSection      from './components/AboutSection.vue'
import ServicesSection   from './components/ServicesSection.vue'
import ProcessSection    from './components/ProcessSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BookingSection    from './components/BookingSection.vue'
import FooterSection     from './components/FooterSection.vue'

const cursorEl    = ref(null)
const followerEl  = ref(null)
const isHovering  = ref(false)
const cursorActive = ref(false)
const pageLoaded  = ref(false)
const loadProgress = ref(0)

// Follower uses its own RAF loop for smooth lag
let followerX = -100, followerY = -100
let rafId = null
let targetX = -100, targetY = -100

const lerp = (a, b, t) => a + (b - a) * t

const animateFollower = () => {
  followerX = lerp(followerX, targetX, 0.1)
  followerY = lerp(followerY, targetY, 0.1)
  if (followerEl.value) {
    followerEl.value.style.left = followerX + 'px'
    followerEl.value.style.top  = followerY + 'px'
  }
  rafId = requestAnimationFrame(animateFollower)
}

const onMouseMove = (e) => {
  targetX = e.clientX
  targetY = e.clientY

  // Snap the dot cursor directly — no lag
  if (cursorEl.value) {
    cursorEl.value.style.left = e.clientX + 'px'
    cursorEl.value.style.top  = e.clientY + 'px'
  }

  // Activate on first move
  if (!cursorActive.value) {
    cursorActive.value = true
    if (!rafId) rafId = requestAnimationFrame(animateFollower)
  }
}

onMounted(() => {
  // Page loader progress
  let prog = 0
  const interval = setInterval(() => {
    prog += Math.random() * 14
    loadProgress.value = Math.min(prog, 95)
    if (prog >= 95) {
      clearInterval(interval)
      setTimeout(() => {
        loadProgress.value = 100
        setTimeout(() => { pageLoaded.value = true }, 500)
      }, 200)
    }
  }, 80)

  // Only wire up cursor on real pointer devices
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style>
/* Loader */
.loader {
  position: fixed; inset: 0;
  background: var(--forest-deep);
  display: flex; align-items: center; justify-content: center;
  z-index: 99997;
  transition: opacity 0.6s var(--ease-out-expo), visibility 0.6s;
}
.loader.loaded { opacity: 0; visibility: hidden; pointer-events: none; }
.loader-inner { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.loader-inner svg { animation: loaderPulse 1.4s ease-in-out infinite; }
@keyframes loaderPulse {
  0%, 100% { opacity: 0.5; transform: scale(0.94); }
  50%       { opacity: 1;   transform: scale(1.04); }
}
.loader-wordmark {
  font-family: var(--font-ui); font-size: 1rem; font-weight: 700;
  color: var(--cream); letter-spacing: 0.08em;
}
.loader-bar {
  width: 180px; height: 1px;
  background: rgba(247,242,232,0.08);
  overflow: hidden;
}
.loader-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--tech-blue));
  transition: width 0.25s var(--ease-out-expo);
}
.loader-sub {
  font-family: var(--font-ui); font-size: 0.6rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(247,242,232,0.22);
}
</style>
