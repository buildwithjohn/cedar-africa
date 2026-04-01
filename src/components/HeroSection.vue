<template>
  <section class="hero" id="hero">
    <!-- Top copy — above the image -->
    <div class="hero-top">
      <div class="hero-copy reveal">
        <span class="section-label">Remote Project Management Platform</span>
        <h1 class="hero-title">
          Manage your home build<br/>
          in Nigeria —<br/>
          <em>from anywhere in the world.</em>
        </h1>
        <p class="hero-sub">
          Cedar Home Builder gives diaspora Nigerians a powerful platform to plan, monitor, and complete home construction projects remotely — with real-time drone updates, geo-verified land, and a dedicated team on the ground.
        </p>
        <div class="hero-actions reveal reveal-delay-2">
          <button class="btn-primary" @click="openCalendar" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Book a Meeting
          </button>
          <a href="#services" class="btn-ghost" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            Explore Services
          </a>
        </div>
      </div>
    </div>

    <!-- Full-width hero image -->
    <div class="hero-image-wrap reveal reveal-delay-1">
      <img src="/hero-image.png" alt="Cedar Home Builder — Remote monitoring of construction sites in Nigeria" class="hero-img" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
defineEmits(['hover', 'unhover'])

const openCalendar = () => {
  window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zpTqSehcwegH0km1LLZqKWuUFaMqzVfiKo0H5fpj2qoECms8vbq27a_9vp8oGA0FqRUybkiZQ?gv=true', '_blank')
}

onMounted(() => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 80)
  })
})
</script>

<style scoped>
.hero {
  background: var(--white);
  padding-top: 90px; /* nav offset */
  overflow: hidden;
}

/* ── Copy block ── */
.hero-top {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 60px 48px;
  text-align: center;
}
.section-label { display: block; margin-bottom: 22px; }

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5.5vw, 5rem);
  font-weight: 300; line-height: 1.1;
  color: var(--navy);
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.hero-title em { font-style: italic; color: var(--gold); }

.hero-sub {
  font-size: 1.05rem; line-height: 1.8;
  color: var(--muted);
  max-width: 620px; margin: 0 auto 40px;
}

.hero-actions {
  display: flex; gap: 14px;
  align-items: center; justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--white); background: var(--navy);
  border: 2px solid var(--navy);
  padding: 14px 32px; border-radius: 30px;
  transition: background 0.3s, border-color 0.3s, transform 0.2s var(--spring);
}
.btn-primary:hover { background: var(--gold); border-color: var(--gold); transform: translateY(-2px); }
.btn-ghost {
  font-family: var(--font-ui); font-size: 0.82rem; font-weight: 600;
  text-decoration: none; color: var(--navy);
  border: 2px solid var(--border-mid);
  padding: 14px 32px; border-radius: 30px;
  transition: border-color 0.3s, color 0.3s;
}
.btn-ghost:hover { border-color: var(--navy); color: var(--navy); }

/* ── Hero image — full width, no crop ── */
.hero-image-wrap {
  width: 100%;
  line-height: 0;
}
.hero-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

@media (max-width: 768px) {
  .hero-top { padding: 60px 24px 36px; }
  .hero-title { font-size: clamp(2rem, 7vw, 3rem); }
  .hero-sub { font-size: 0.95rem; }
}
</style>
