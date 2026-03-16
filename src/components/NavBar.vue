<template>
  <nav :class="['navbar', { scrolled: isScrolled, 'menu-open': menuOpen }]">
    <div class="nav-inner">
      <a href="#" class="nav-logo" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <span class="logo-icon">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
            <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
            <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.4"/>
          </svg>
        </span>
        <div class="logo-text-wrap">
          <span class="logo-text">Cedar <em>Home Builder</em></span>
          <span class="logo-sub">by Cedar Africa</span>
        </div>
      </a>

      <ul class="nav-links">
        <li v-for="link in links" :key="link.id">
          <a :href="'#' + link.id" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" @click="menuOpen=false">{{ link.label }}</a>
        </li>
      </ul>

      <a href="/dashboard" class="nav-portal" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.5" stroke="currentColor" stroke-width="1.1"/><rect x="8" y="1" width="5" height="5" rx="0.5" stroke="currentColor" stroke-width="1.1"/><rect x="1" y="8" width="5" height="5" rx="0.5" stroke="currentColor" stroke-width="1.1"/><rect x="8" y="8" width="5" height="5" rx="0.5" stroke="currentColor" stroke-width="1.1"/></svg>
        Client Portal
      </a>
      <a href="#booking" class="nav-cta" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" @click="menuOpen=false">
        Book a Call
      </a>

      <button class="hamburger" @click="menuOpen = !menuOpen" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="mobile-menu">
      <ul>
        <li v-for="link in links" :key="link.id">
          <a :href="'#' + link.id" @click="menuOpen=false">{{ link.label }}</a>
        </li>
        <li><a href="#booking" class="mobile-cta" @click="menuOpen=false">Book a Call</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineEmits(['hover', 'unhover'])
const isScrolled = ref(false)
const menuOpen = ref(false)
const links = [
  { id: 'technology', label: 'Technology' },
  { id: 'map-platform', label: 'Map Platform' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Stories' },
]
const handleScroll = () => { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 20px 0; transition: padding 0.4s var(--ease-out-expo), background 0.4s; }
.navbar.scrolled { background: rgba(10,31,20,0.92); backdrop-filter: blur(20px); padding: 12px 0; border-bottom: 1px solid rgba(201,168,76,0.15); }
.nav-inner { max-width: 1240px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; gap: 40px; }
.nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
.logo-text-wrap { display: flex; flex-direction: column; gap: 1px; }
.logo-text { font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--cream); letter-spacing: 0.02em; }
.logo-text em { font-style: normal; color: var(--gold); }
.logo-sub { font-family: var(--font-body); font-size: 0.62rem; color: rgba(247,242,232,0.35); letter-spacing: 0.08em; }
.nav-links { display: flex; gap: 32px; list-style: none; margin-left: auto; }
.nav-links a { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; color: rgba(247,242,232,0.7); position: relative; padding-bottom: 2px; transition: color 0.2s; }
.nav-links a::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s var(--ease-out-expo); }
.nav-links a:hover { color: var(--cream); }
.nav-links a:hover::after { width: 100%; }
.nav-portal { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; color: rgba(247,242,232,0.6); background: rgba(247,242,232,0.05); border: 1px solid rgba(247,242,232,0.12); padding: 10px 18px; white-space: nowrap; display: flex; align-items: center; gap: 7px; transition: color 0.2s, border-color 0.2s; }
.nav-portal:hover { color: var(--gold); border-color: rgba(201,168,76,0.3); }
.nav-cta { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; color: var(--forest-deep); background: var(--gold); padding: 12px 22px; white-space: nowrap; transition: background 0.3s, transform 0.2s var(--spring); }
.nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; margin-left: auto; }
.hamburger span { display: block; width: 22px; height: 1.5px; background: var(--cream); transition: all 0.3s; }
.menu-open .hamburger span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.menu-open .hamburger span:nth-child(2) { opacity: 0; }
.menu-open .hamburger span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
.mobile-menu { display: none; background: var(--forest-deep); padding: 0 40px; max-height: 0; overflow: hidden; transition: max-height 0.4s var(--ease-out-expo); }
.menu-open .mobile-menu { max-height: 400px; padding: 20px 40px 32px; }
.mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 20px; }
.mobile-menu a { font-family: var(--font-ui); font-size: 1rem; font-weight: 600; text-decoration: none; color: var(--cream); }
.mobile-cta { color: var(--gold) !important; }
@media (max-width: 960px) { .nav-links, .nav-cta { display: none; } .hamburger { display: flex; } .mobile-menu { display: block; } }
@media (max-width: 600px) { .nav-inner { padding: 0 20px; } }
</style>
