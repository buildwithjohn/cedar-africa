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

      <div class="nav-actions">
        <a href="https://app.cedarhomebuilder.com" class="nav-login" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Log In</a>
        <button class="nav-cta" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          Book a Meeting
        </button>
      </div>

      <button class="hamburger" @click="menuOpen = !menuOpen" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="mobile-menu">
      <ul>
        <li v-for="link in links" :key="link.id">
          <a :href="'#' + link.id" @click="menuOpen=false">{{ link.label }}</a>
        </li>
        <li><a href="https://app.cedarhomebuilder.com" @click="menuOpen=false">Log In</a></li>
        <li><button class="mobile-cta" @click="openCalendar(); menuOpen=false">Book a Meeting</button></li>
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
  { id: 'services',     label: 'Services' },
  { id: 'platform',     label: 'About' },
  { id: 'process',      label: 'How It Works' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'booking',      label: 'Contact' },
]

const openCalendar = () => {
  window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true', '_blank')
}

const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 18px 0;
  transition: padding 0.3s, background 0.3s, box-shadow 0.3s;
}
.navbar.scrolled {
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(16px);
  padding: 12px 0;
  box-shadow: 0 1px 0 var(--border);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 0 60px;
  display: flex; align-items: center; gap: 40px;
}
.nav-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
.logo-img { height: 42px; width: auto; object-fit: contain; }

.nav-links { display: flex; gap: 32px; list-style: none; margin-left: auto; }
.nav-links a {
  font-family: var(--font-ui); font-size: 0.78rem; font-weight: 500;
  letter-spacing: 0.04em; text-decoration: none; color: var(--muted);
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--navy); }

.nav-actions { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
.nav-login {
  font-family: var(--font-ui); font-size: 0.78rem; font-weight: 600;
  text-decoration: none; color: var(--navy);
  transition: color 0.2s;
}
.nav-login:hover { color: var(--gold); }
.nav-cta {
  font-family: var(--font-ui); font-size: 0.78rem; font-weight: 700;
  color: var(--white); background: var(--navy);
  border: 2px solid var(--navy);
  padding: 10px 22px; border-radius: 30px;
  white-space: nowrap;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.nav-cta:hover { background: var(--gold); border-color: var(--gold); color: var(--white); }

.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; margin-left: auto; }
.hamburger span { display: block; width: 22px; height: 1.5px; background: var(--navy); transition: all 0.3s; }
.menu-open .hamburger span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.menu-open .hamburger span:nth-child(2) { opacity: 0; }
.menu-open .hamburger span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

.mobile-menu {
  display: none; background: var(--white);
  padding: 0 24px; max-height: 0; overflow: hidden;
  transition: max-height 0.4s var(--ease-out-expo);
  border-bottom: 1px solid var(--border);
}
.menu-open .mobile-menu { max-height: 400px; padding: 20px 24px 28px; }
.mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 18px; }
.mobile-menu a { font-family: var(--font-ui); font-size: 1rem; font-weight: 500; text-decoration: none; color: var(--navy); }
.mobile-cta { background: none; border: none; font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--gold); padding: 0; text-align: left; }

@media (max-width: 960px) { .nav-links, .nav-actions { display: none; } .hamburger { display: flex; } .mobile-menu { display: block; } }
@media (max-width: 600px) { .nav-inner { padding: 0 20px; } .logo-img { height: 34px; } }
</style>
