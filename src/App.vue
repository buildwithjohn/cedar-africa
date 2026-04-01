<template>
  <div id="app">
    <div class="cursor" ref="cursorEl" :class="{ hovering: isHovering, active: cursorActive }"></div>
    <div class="cursor-follower" ref="followerEl" :class="{ hovering: isHovering, active: cursorActive }"></div>

    <div class="loader" :class="{ loaded: pageLoaded }">
      <div class="loader-inner">
        <img src="/cedar-logo.png" alt="Cedar Home Builder" class="loader-logo" />
        <div class="loader-bar"><div class="loader-fill" :style="{ width: loadProgress + '%' }"></div></div>
      </div>
    </div>

    <NavBar            @hover="isHovering=true" @unhover="isHovering=false" />
    <HeroSection       @hover="isHovering=true" @unhover="isHovering=false" />
    <AboutSection      @hover="isHovering=true" @unhover="isHovering=false" />
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

const cursorEl = ref(null), followerEl = ref(null)
const isHovering = ref(false), cursorActive = ref(false)
const pageLoaded = ref(false), loadProgress = ref(0)
let rafId = null, fx = -100, fy = -100, tx = -100, ty = -100
const lerp = (a,b,t) => a+(b-a)*t

const tick = () => {
  fx = lerp(fx, tx, 0.1); fy = lerp(fy, ty, 0.1)
  if (followerEl.value) { followerEl.value.style.left=fx+'px'; followerEl.value.style.top=fy+'px' }
  rafId = requestAnimationFrame(tick)
}
const onMove = (e) => {
  tx=e.clientX; ty=e.clientY
  if (cursorEl.value) { cursorEl.value.style.left=e.clientX+'px'; cursorEl.value.style.top=e.clientY+'px' }
  if (!cursorActive.value) { cursorActive.value=true; if(!rafId) rafId=requestAnimationFrame(tick) }
}
onMounted(() => {
  let p = 0
  const iv = setInterval(() => {
    p += Math.random()*14; loadProgress.value = Math.min(p,95)
    if (p>=95) { clearInterval(iv); setTimeout(()=>{loadProgress.value=100; setTimeout(()=>{pageLoaded.value=true},400)},200) }
  }, 70)
  if (window.matchMedia('(pointer:fine)').matches) window.addEventListener('mousemove', onMove, {passive:true})
})
onUnmounted(() => { window.removeEventListener('mousemove',onMove); if(rafId) cancelAnimationFrame(rafId) })
</script>

<style>
.loader { position:fixed; inset:0; background: var(--white); display:flex; align-items:center; justify-content:center; z-index:99997; transition:opacity .5s, visibility .5s; }
.loader.loaded { opacity:0; visibility:hidden; pointer-events:none; }
.loader-inner { display:flex; flex-direction:column; align-items:center; gap:28px; }
.loader-logo { height:64px; width:auto; animation:logoPulse 1.5s ease-in-out infinite; }
@keyframes logoPulse { 0%,100%{opacity:.5;transform:scale(.96)} 50%{opacity:1;transform:scale(1)} }
.loader-bar { width:140px; height:2px; background:var(--ivory-dark); border-radius:2px; overflow:hidden; }
.loader-fill { height:100%; background:var(--gold); border-radius:2px; transition:width .2s; }
</style>
