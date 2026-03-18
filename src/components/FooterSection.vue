<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="#" class="footer-logo" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
            <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
            <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.3"/>
          </svg>
          <span>Cedar<em>Africa</em></span>
        </a>
        <p>Your trusted partner for property ownership in Nigeria — from the diaspora, for the diaspora.</p>
        <div class="socials">
          <a v-for="s in socials" :key="s.name" :href="s.href" :title="s.name" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <span v-html="s.icon"></span>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <div class="fl-col" v-for="col in linkCols" :key="col.title">
          <h4>{{ col.title }}</h4>
          <ul>
            <li v-for="l in col.links" :key="l.label">
              <a :href="l.href" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">{{ l.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} Cedar Home Builder Ltd. All rights reserved.</span>
      <div class="footer-legal">
        <a href="#" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Privacy Policy</a>
        <a href="#" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['hover', 'unhover'])
const year = new Date().getFullYear()

const socials = [
  { name: 'Instagram', href: '#', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>' },
  { name: 'LinkedIn', href: '#', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10V17M7 7V7.01M11 17V13C11 11.9 11.9 11 13 11C14.1 11 15 11.9 15 13V17M11 10V17"/></svg>' },
  { name: 'Twitter', href: '#', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.3 4.3 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>' },
]
const linkCols = [
  { title: 'Services', links: [
    { label: 'Land Acquisition', href: '#services' },
    { label: 'Construction', href: '#services' },
    { label: 'Property Management', href: '#services' },
    { label: 'Legal Services', href: '#services' },
  ]},
  { title: 'Company', links: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Client Stories', href: '#testimonials' },
    { label: 'Book a Call', href: '#booking' },
  ]},
  { title: 'Contact', links: [
    { label: 'Lagos, Nigeria', href: '#' },
    { label: 'London, UK', href: '#' },
    { label: 'hello@cedarhomebuilder.com', href: 'mailto:hello@cedarhomebuilder.com' },
    { label: '+234 810 000 0000', href: 'tel:+2348100000000' },
  ]},
]
</script>

<style scoped>
.footer {
  background: var(--navy-deep);
  padding: 80px 80px 40px;
  border-top: 1px solid rgba(201,168,76,0.15);
}
.footer-top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-bottom: 60px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(240,244,255,0.06);
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 20px;
}
.footer-logo span {
  font-family: var(--font-ui);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--cream);
}
.footer-logo em { font-style: normal; color: var(--gold); }
.footer-brand p { font-size: 0.85rem; line-height: 1.7; color: rgba(240,244,255,0.4); margin-bottom: 28px; }
.socials { display: flex; gap: 12px; }
.socials a {
  width: 38px; height: 38px;
  border: 1px solid rgba(240,244,255,0.1);
  display: flex; align-items: center; justify-content: center;
  color: rgba(240,244,255,0.4);
  text-decoration: none;
  transition: border-color 0.3s, color 0.3s, background 0.3s;
}
.socials a:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.05); }
.footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.fl-col h4 {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}
.fl-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.fl-col a {
  font-size: 0.85rem;
  color: rgba(240,244,255,0.45);
  text-decoration: none;
  transition: color 0.2s;
}
.fl-col a:hover { color: var(--cream); }
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  color: rgba(240,244,255,0.25);
}
.footer-legal { display: flex; gap: 24px; }
.footer-legal a { color: rgba(240,244,255,0.25); text-decoration: none; transition: color 0.2s; }
.footer-legal a:hover { color: var(--gold); }

@media (max-width: 900px) {
  .footer { padding: 60px 40px 32px; }
  .footer-top { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 600px) {
  .footer { padding: 48px 20px 28px; }
  .footer-links { grid-template-columns: repeat(2, 1fr); }
  .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
</style>
