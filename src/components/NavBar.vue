<template>
  <nav :class="['navbar', { scrolled: isScrolled, 'menu-open': menuOpen }]">
    <div class="nav-inner">
      <a href="#" class="nav-logo" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <img src="/cedar-logo.png" alt="Cedar Home Builder" class="logo-img" />
      </a>

      <ul class="nav-links">
        <li v-for="link in links" :key="link.id">
          <a :href="'#' + link.id" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" @click="menuOpen=false">{{ link.label }}</a>
        </li>
      </ul>

      <button class="nav-cta" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        Book a Call
      </button>

      <button class="hamburger" @click="menuOpen = !menuOpen" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="mobile-menu">
      <ul>
        <li v-for="link in links" :key="link.id">
          <a :href="'#' + link.id" @click="menuOpen=false">{{ link.label }}</a>
        </li>
        <li>
          <button class="mobile-cta" @click="openCalendar(); menuOpen=false">Book a Call</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineEmits(['hover', 'unhover'])

const isScrolled = ref(false)
const menuOpen   = ref(false)

const links = [
  { id: 'platform',     label: 'Platform' },
  { id: 'technology',   label: 'Technology' },
  { id: 'services',     label: 'Services' },
  { id: 'process',      label: 'How It Works' },
  { id: 'testimonials', label: 'Stories' },
]

const openCalendar = () => {
  window.open(
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true',
    '_blank'
  )
}

const handleScroll = () => { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 14px 0; transition: padding 0.4s, background 0.4s, border-color 0.4s; }
.navbar.scrolled { background: rgba(8,15,26,0.96); backdrop-filter: blur(20px); padding: 10px 0; border-bottom: 1px solid rgba(201,168,76,0.15); }
.nav-inner { max-width: 1240px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; gap: 32px; }

/* Real logo image */
.nav-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
.logo-img { height: 44px; width: auto; object-fit: contain; filter: drop-shadow(0 0 8px rgba(201,168,76,0.25)); }

.nav-links { display: flex; gap: 24px; list-style: none; margin-left: auto; }
.nav-links a { font-family: var(--font-ui); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; color: rgba(240,244,255,0.65); position: relative; padding-bottom: 2px; transition: color 0.2s; }
.nav-links a::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
.nav-links a:hover { color: var(--cream); }
.nav-links a:hover::after { width: 100%; }

.nav-cta { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--navy-deep); background: var(--gold); padding: 11px 22px; border: none; white-space: nowrap; flex-shrink: 0; transition: background 0.3s, transform 0.2s var(--spring); }
.nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; margin-left: auto; }
.hamburger span { display: block; width: 22px; height: 1.5px; background: var(--cream); transition: all 0.3s; }
.menu-open .hamburger span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.menu-open .hamburger span:nth-child(2) { opacity: 0; }
.menu-open .hamburger span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

.mobile-menu { display: none; background: var(--navy-deep); padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.4s, padding 0.4s; border-bottom: 1px solid rgba(201,168,76,0.1); }
.menu-open .mobile-menu { max-height: 420px; padding: 20px 24px 28px; }
.mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 18px; }
.mobile-menu a { font-family: var(--font-ui); font-size: 1rem; font-weight: 600; text-decoration: none; color: var(--cream); }
.mobile-cta { background: none; border: none; font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--gold); padding: 0; text-align: left; }

@media (max-width: 1060px) { .nav-links { gap: 16px; } .nav-links a { font-size: 0.68rem; } }
@media (max-width: 960px) { .nav-links, .nav-cta { display: none; } .hamburger { display: flex; } .mobile-menu { display: block; } }
@media (max-width: 600px) { .nav-inner { padding: 0 20px; } .logo-img { height: 36px; } }
</style>
