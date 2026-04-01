<template>
  <footer class="footer">
    <div class="section-wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#" class="footer-logo">
            <img src="/cedar-logo.png" alt="Cedar Home Builder" />
          </a>
          <p>A remote project management platform for diaspora Nigerians building homes back home — geo-technology, drone monitoring, and a dedicated team on the ground.</p>
          <div class="socials">
            <a v-for="s in socials" :key="s.name" :href="s.href" :title="s.name" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" v-html="s.icon"></a>
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
        <div class="footer-bottom-left">
          <span>© {{ year }} Cedar Home Builder Ltd. All rights reserved.</span>
          <span class="powered-by">
            Powered by <a href="#">
              <em>Energol</em> Ones and Zeros Technology
            </a>
          </span>
        </div>
        <div class="footer-legal">
          <a href="#" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Privacy Policy</a>
          <a href="#" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Terms of Service</a>
        </div>
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
  { name: 'Twitter / X', href: '#', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.3 4.3 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>' },
]
const linkCols = [
  { title: 'Platform', links: [
    { label: 'Project Dashboard', href: '#platform' },
    { label: 'Remote Monitoring', href: '#technology' },
    { label: 'Drone Surveys', href: '#technology' },
    { label: 'Geo-referencing', href: '#technology' },
  ]},
  { title: 'Services', links: [
    { label: 'Land Acquisition', href: '#services' },
    { label: 'Construction Management', href: '#services' },
    { label: 'Property Management', href: '#services' },
    { label: 'Legal & Title Services', href: '#services' },
  ]},
  { title: 'Contact', links: [
    { label: 'Lagos, Nigeria', href: '#' },
    { label: 'London, UK', href: '#' },
    { label: 'hello@cedarhomebuilder.com', href: 'mailto:hello@cedarhomebuilder.com' },
    { label: 'Book a Project Call', href: '#booking' },
  ]},
]
</script>
<style scoped>
.footer { background: var(--navy); color: rgba(255,255,255,0.7); padding: 72px 0 36px; }
.footer-top { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; margin-bottom: 56px; padding-bottom: 56px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-logo { display: inline-flex; margin-bottom: 18px; }
.footer-logo img { height: 48px; width: auto; object-fit: contain; }
.footer-brand p { font-size: 0.84rem; line-height: 1.75; color: rgba(255,255,255,0.45); margin-bottom: 24px; }
.socials { display: flex; gap: 10px; }
.socials a { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4); text-decoration: none; transition: border-color 0.2s, color 0.2s; }
.socials a:hover { border-color: var(--gold); color: var(--gold); }
.footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
.fl-col h4 { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 18px; }
.fl-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.fl-col a { font-size: 0.83rem; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
.fl-col a:hover { color: white; }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.76rem; color: rgba(255,255,255,0.25); }
.footer-bottom-left { display: flex; flex-direction: column; gap: 5px; }
.powered-by a { text-decoration: none; color: rgba(255,255,255,0.3); transition: color 0.2s; }
.powered-by a:hover { color: var(--gold); }
.powered-by em { font-style: normal; color: var(--gold); font-family: var(--font-ui); font-weight: 700; }
.footer-legal { display: flex; gap: 20px; }
.footer-legal a { color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.2s; }
.footer-legal a:hover { color: var(--gold); }
@media (max-width: 900px) { .footer-top { grid-template-columns: 1fr; gap: 40px; } .footer-links { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .footer-links { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; gap: 14px; text-align: center; } }
</style>
