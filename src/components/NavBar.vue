<template>
  <nav :class="['navbar', { scrolled: isScrolled, 'menu-open': menuOpen }]">
    <div class="nav-inner">
      <a href="#" class="nav-logo" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
          <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
          <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.4"/>
        </svg>
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

      <!-- Theme toggle -->
      <button class="theme-toggle" @click="$emit('toggleTheme')" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
        <Transition name="icon-swap" mode="out-in">
          <svg v-if="isDark" key="sun" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="4" stroke="currentColor" stroke-width="1.2"/>
            <path d="M9 1V3M9 15V17M1 9H3M15 9H17M3.2 3.2L4.6 4.6M13.4 13.4L14.8 14.8M3.2 14.8L4.6 13.4M13.4 4.6L14.8 3.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <svg v-else key="moon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15 10.5A7 7 0 0 1 7.5 3a7 7 0 1 0 7.5 7.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </Transition>
      </button>

      <BookingModal>
        <template #default="{ open }">
          <button class="nav-cta" @click="open(); menuOpen=false" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Book a Call
          </button>
        </template>
      </BookingModal>

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
          <BookingModal>
            <template #default="{ open }">
              <button class="mobile-cta" @click="open(); menuOpen=false">Book a Call</button>
            </template>
          </BookingModal>
        </li>
        <li class="mobile-theme-row">
          <span>{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
          <button class="mobile-theme-btn" @click="$emit('toggleTheme')">
            Switch to {{ isDark ? 'Light' : 'Dark' }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BookingModal from './BookingModal.vue'

const props = defineProps({ isDark: Boolean })
defineEmits(['hover', 'unhover', 'toggleTheme'])

const isScrolled = ref(false)
const menuOpen = ref(false)
const links = [
  { id: 'technology',  label: 'Technology' },
  { id: 'map-platform', label: 'Map Platform' },
  { id: 'services',    label: 'Services' },
  { id: 'process',     label: 'Process' },
  { id: 'testimonials', label: 'Stories' },
]
const handleScroll = () => { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 20px 0;
  transition: padding 0.4s, background 0.4s, border-color 0.4s;
}
.navbar.scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  padding: 12px 0;
  border-bottom: 1px solid var(--border-gold);
}
.nav-inner {
  max-width: 1240px; margin: 0 auto;
  padding: 0 40px;
  display: flex; align-items: center; gap: 32px;
}
.nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
.logo-text-wrap { display: flex; flex-direction: column; gap: 1px; }
.logo-text { font-family: 'Syne',sans-serif; font-size: 1rem; font-weight: 700; color: var(--text-primary); letter-spacing: 0.02em; }
.logo-text em { font-style: normal; color: var(--gold); }
.logo-sub { font-family: 'DM Sans',sans-serif; font-size: 0.62rem; color: var(--text-muted); letter-spacing: 0.08em; }

.nav-links { display: flex; gap: 28px; list-style: none; margin-left: auto; }
.nav-links a {
  font-family: 'Syne',sans-serif; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  text-decoration: none; color: var(--nav-text);
  position: relative; padding-bottom: 2px;
  transition: color 0.2s;
}
.nav-links a::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:var(--gold); transition: width 0.3s; }
.nav-links a:hover { color: var(--text-primary); }
.nav-links a:hover::after { width: 100%; }

/* Theme toggle */
.theme-toggle {
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.3s var(--spring);
  flex-shrink: 0;
}
.theme-toggle:hover { background: var(--border-gold); color: var(--gold); border-color: var(--gold); transform: rotate(20deg); }

.nav-cta {
  font-family: 'Syne',sans-serif; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--forest-deep); background: var(--gold);
  padding: 12px 22px; border: none; white-space: nowrap;
  transition: background 0.3s, transform 0.2s var(--spring);
  flex-shrink: 0;
}
.nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; margin-left: auto; }
.hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text-primary); transition: all 0.3s; }
.menu-open .hamburger span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.menu-open .hamburger span:nth-child(2) { opacity: 0; }
.menu-open .hamburger span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

.mobile-menu {
  display: none; background: var(--bg-secondary);
  padding: 0 24px; max-height: 0; overflow: hidden;
  transition: max-height 0.4s, padding 0.4s;
  border-bottom: 1px solid var(--border);
}
.menu-open .mobile-menu { max-height: 500px; padding: 20px 24px 28px; }
.mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 18px; }
.mobile-menu a { font-family: 'Syne',sans-serif; font-size: 1rem; font-weight: 600; text-decoration: none; color: var(--text-primary); }
.mobile-cta { background: none; border: none; font-family: 'Syne',sans-serif; font-size: 1rem; font-weight: 700; color: var(--gold); padding: 0; text-align: left; }
.mobile-theme-row { display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border); }
.mobile-theme-row > span { font-family: 'Syne',sans-serif; font-size: 0.78rem; color: var(--text-muted); }
.mobile-theme-btn { font-family: 'Syne',sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); padding: 6px 12px; transition: background 0.2s; }
.mobile-theme-btn:hover { background: rgba(201,168,76,0.15); }

/* Icon swap transition */
.icon-swap-enter-active, .icon-swap-leave-active { transition: opacity 0.2s, transform 0.2s; }
.icon-swap-enter-from { opacity: 0; transform: rotate(-30deg) scale(0.7); }
.icon-swap-leave-to  { opacity: 0; transform: rotate(30deg) scale(0.7); }

@media (max-width: 960px) { .nav-links { display: none; } .nav-cta { display: none; } .theme-toggle { display: none; } .hamburger { display: flex; } .mobile-menu { display: block; } }
@media (max-width: 600px) { .nav-inner { padding: 0 20px; } }
</style>
