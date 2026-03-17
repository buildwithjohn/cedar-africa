<template>
  <div id="app">
    <!-- Custom cursor — desktop only, hidden on touch devices -->
    <div class="cursor" ref="cursorEl" :class="{ hovering: isHovering }"></div>
    <div class="cursor-follower" ref="followerEl" :class="{ hovering: isHovering }"></div>

    <!-- Page loader -->
    <div class="loader" :class="{ loaded: pageLoaded }">
      <div class="loader-inner">
        <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L4 10V28H28V10L16 2Z" stroke="#C9A84C" stroke-width="1.5" fill="none"/>
          <path d="M10 28V18H22V28" stroke="#C9A84C" stroke-width="1.5"/>
          <path d="M16 10L10 14V20H22V14L16 10Z" fill="#C9A84C" opacity="0.3"/>
        </svg>
        <span class="loader-wordmark">Cedar Home Builder</span>
        <div class="loader-bar"><div class="loader-progress" :style="{ width: loadProgress + '%' }"></div></div>
        <span class="loader-sub">Initialising map platform...</span>
      </div>
    </div>

    <NavBar @hover="isHovering=true" @unhover="isHovering=false" />
    <HeroSection @hover="isHovering=true" @unhover="isHovering=false" />
    <TechnologySection @hover="isHovering=true" @unhover="isHovering=false" />
    <MapPlatformSection @hover="isHovering=true" @unhover="isHovering=false" />
    <AboutSection />
    <ServicesSection @hover="isHovering=true" @unhover="isHovering=false" />
    <ProcessSection @hover="isHovering=true" @unhover="isHovering=false" />
    <TestimonialsSection @hover="isHovering=true" @unhover="isHovering=false" />
    <BookingSection @hover="isHovering=true" @unhover="isHovering=false" />
    <FooterSection @hover="isHovering=true" @unhover="isHovering=false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import TechnologySection from './components/TechnologySection.vue'
import MapPlatformSection from './components/MapPlatformSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BookingSection from './components/BookingSection.vue'
import FooterSection from './components/FooterSection.vue'

const cursorEl = ref(null)
const followerEl = ref(null)
const isHovering = ref(false)
const pageLoaded = ref(false)
const loadProgress = ref(0)

let animFrame = null
let fx = -100, fy = -100

const onMouseMove = (e) => {
  if (cursorEl.value) {
    cursorEl.value.style.left = e.clientX + 'px'
    cursorEl.value.style.top = e.clientY + 'px'
  }
  const lerp = (a, b, t) => a + (b - a) * t
  const animate = () => {
    fx = lerp(fx, e.clientX, 0.1)
    fy = lerp(fy, e.clientY, 0.1)
    if (followerEl.value) {
      followerEl.value.style.left = fx + 'px'
      followerEl.value.style.top = fy + 'px'
    }
  }
  cancelAnimationFrame(animFrame)
  animFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  // Loader
  let prog = 0
  const interval = setInterval(() => {
    prog += Math.random() * 12
    loadProgress.value = Math.min(prog, 95)
    if (prog >= 95) {
      clearInterval(interval)
      setTimeout(() => {
        loadProgress.value = 100
        setTimeout(() => { pageLoaded.value = true }, 500)
      }, 300)
    }
  }, 80)

  // Only add cursor on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animFrame)
})
</script>

<style>
.loader { position: fixed; inset: 0; background: var(--forest-deep); display: flex; align-items: center; justify-content: center; z-index: 99997; transition: opacity 0.7s var(--ease-out-expo), visibility 0.7s; }
.loader.loaded { opacity: 0; visibility: hidden; pointer-events: none; }
.loader-inner { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.loader-inner svg { animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 0.6; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } }
.loader-wordmark { font-family: var(--font-ui); font-size: 1.1rem; font-weight: 700; color: var(--cream); letter-spacing: 0.06em; }
.loader-bar { width: 200px; height: 1px; background: rgba(247,242,232,0.08); overflow: hidden; }
.loader-progress { height: 100%; background: linear-gradient(90deg, var(--gold), var(--tech-blue)); transition: width 0.2s var(--ease-out-expo); }
.loader-sub { font-family: var(--font-ui); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(247,242,232,0.25); }
</style>
