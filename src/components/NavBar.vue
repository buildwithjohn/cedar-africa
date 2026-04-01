<template>
  <nav :class="['navbar', { scrolled: isScrolled, open: menuOpen }]">
    <div class="nav-wrap">
      <a href="#" class="logo" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <img src="/cedar-logo.png" alt="Cedar Home Builder" />
      </a>

      <ul class="links">
        <li v-for="l in links" :key="l.id">
          <a :href="'#'+l.id" @click="menuOpen=false" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">{{ l.label }}</a>
        </li>
      </ul>

      <div class="nav-right">
        <a href="https://app.cedarhomebuilder.com" class="login-link" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Log In</a>
        <button class="book-btn" @click="openCal" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Book a Meeting</button>
      </div>

      <button class="burger" @click="menuOpen=!menuOpen" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <span/><span/><span/>
      </button>
    </div>

    <div class="mobile-nav">
      <a v-for="l in links" :key="l.id" :href="'#'+l.id" @click="menuOpen=false">{{ l.label }}</a>
      <a href="https://app.cedarhomebuilder.com">Log In</a>
      <button @click="openCal();menuOpen=false">Book a Meeting</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineEmits(['hover','unhover'])
const isScrolled = ref(false)
const menuOpen = ref(false)
const links = [
  { id:'services', label:'Services' },
  { id:'platform', label:'About' },
  { id:'process',  label:'How It Works' },
  { id:'testimonials', label:'Stories' },
  { id:'booking',  label:'Contact' },
]
const openCal = () => window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true','_blank')
const onScroll = () => { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 20px 0;
  transition: all .35s var(--ease-expo);
}
.navbar.scrolled {
  background: rgba(245,239,224,0.96);
  backdrop-filter: blur(20px);
  padding: 12px 0;
  box-shadow: 0 1px 0 var(--ivory-dark), 0 4px 24px rgba(26,21,18,0.06);
}
.nav-wrap {
  max-width: 1280px; margin: 0 auto; padding: 0 64px;
  display: flex; align-items: center; gap: 48px;
}
.logo { flex-shrink: 0; text-decoration: none; }
.logo img { height: 44px; width: auto; }
.links { display: flex; gap: 36px; list-style: none; margin-left: auto; }
.links a {
  font-family: var(--font-body); font-size: 0.82rem; font-weight: 500;
  color: var(--ink-light); text-decoration: none; letter-spacing: 0.01em;
  transition: color .2s;
}
.links a:hover { color: var(--ink); }
.nav-right { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }
.login-link {
  font-family: var(--font-body); font-size: 0.82rem; font-weight: 600;
  color: var(--ink); text-decoration: none; transition: color .2s;
}
.login-link:hover { color: var(--gold); }
.book-btn {
  font-family: var(--font-body); font-size: 0.82rem; font-weight: 700;
  color: var(--ivory); background: var(--ink);
  border: none; padding: 11px 24px; border-radius: 4px;
  letter-spacing: 0.02em;
  transition: background .3s, transform .2s var(--ease-back);
}
.book-btn:hover { background: var(--gold); transform: translateY(-1px); }

.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; margin-left: auto; }
.burger span { display: block; width: 22px; height: 1.5px; background: var(--ink); transition: all .3s; }
.open .burger span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.open .burger span:nth-child(2) { opacity: 0; }
.open .burger span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

.mobile-nav {
  display: none; flex-direction: column; gap: 20px;
  background: var(--ivory); padding: 0 24px;
  max-height: 0; overflow: hidden;
  transition: max-height .4s var(--ease-expo), padding .4s;
  border-bottom: 1px solid var(--ivory-dark);
}
.open .mobile-nav { max-height: 500px; padding: 24px; }
.mobile-nav a, .mobile-nav button {
  font-family: var(--font-body); font-size: 1rem; font-weight: 500;
  color: var(--ink); text-decoration: none; background: none; border: none; text-align: left; padding: 0;
}
.mobile-nav button { font-weight: 700; color: var(--gold); }

@media (max-width: 960px) { .links, .nav-right { display: none; } .burger { display: flex; } .mobile-nav { display: flex; } }
@media (max-width: 600px) { .nav-wrap { padding: 0 20px; } .logo img { height: 36px; } }
</style>
