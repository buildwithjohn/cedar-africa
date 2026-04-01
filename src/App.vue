<template>
  <div id="app">
    <div class="cursor" ref="cursorEl" :class="{ hovering: isHovering, active: cursorActive }"></div>
    <div class="cursor-follower" ref="followerEl" :class="{ hovering: isHovering, active: cursorActive }"></div>

    <div class="loader" :class="{ loaded: pageLoaded }">
      <div class="loader-inner">
        <img src="/cedar-logo.png" alt="Cedar Home Builder" class="loader-logo" />
        <div class="loader-bar"><div class="loader-progress" :style="{ width: loadProgress + '%' }"></div></div>
      </div>
    </div>

    <NavBar            @hover="isHovering=true" @unhover="isHovering=false" />
    <HeroSection       @hover="isHovering=true" @unhover="isHovering=false" />
    <AboutSection />
    <TechnologySection @hover="isHovering=true" @unhover="isHovering=false" />
    <ServicesSection   @hover="isHovering=true" @unhover="isHovering=false" />
    <ProcessSection    @hover="isHovering=true" @unhover="isHovering=false" />
    <TestimonialsSection />
    <BookingSection    @hover="isHovering=true" @unhover="isHovering=false" />
    <FooterSection     @hover="isHovering=true" @unhover="isHovering=false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar             from './components/NavBar.vue'
import HeroSection        from './components/HeroSection.vue'
import AboutSection       from './components/AboutSection.vue'
import TechnologySection  from './components/TechnologySection.vue'
import ServicesSection    from './components/ServicesSection.vue'
import ProcessSection     from './components/ProcessSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BookingSection     from './components/BookingSection.vue'
import FooterSection      from './components/FooterSection.vue'

const cursorEl     = ref(null)
const followerEl   = ref(null)
const isHovering   = ref(false)
const cursorActive = ref(false)
const pageLoaded   = ref(false)
const loadProgress = ref(0)

let rafId = null
let followerX = -100, followerY = -100
let targetX   = -100, targetY   = -100
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
  targetX = e.clientX; targetY = e.clientY
  if (cursorEl.value) {
    cursorEl.value.style.left = e.clientX + 'px'
    cursorEl.value.style.top  = e.clientY + 'px'
  }
  if (!cursorActive.value) {
    cursorActive.value = true
    if (!rafId) rafId = requestAnimationFrame(animateFollower)
  }
}
onMounted(() => {
  let prog = 0
  const iv = setInterval(() => {
    prog += Math.random() * 15
    loadProgress.value = Math.min(prog, 95)
    if (prog >= 95) {
      clearInterval(iv)
      setTimeout(() => { loadProgress.value = 100; setTimeout(() => { pageLoaded.value = true }, 400) }, 200)
    }
  }, 70)
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
.loader { position: fixed; inset: 0; background: #fff; display: flex; align-items: center; justify-content: center; z-index: 99997; transition: opacity 0.5s ease, visibility 0.5s; }
.loader.loaded { opacity: 0; visibility: hidden; pointer-events: none; }
.loader-inner { display: flex; flex-direction: column; align-items: center; gap: 24px; }
.loader-logo { height: 60px; width: auto; animation: logoPulse 1.4s ease-in-out infinite; }
@keyframes logoPulse { 0%,100% { opacity:0.5; transform:scale(0.96); } 50% { opacity:1; transform:scale(1); } }
.loader-bar { width: 160px; height: 2px; background: #E8E4DC; border-radius: 2px; overflow: hidden; }
.loader-progress { height: 100%; background: var(--gold); transition: width 0.2s ease; border-radius: 2px; }
</style>
