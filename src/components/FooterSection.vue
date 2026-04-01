<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/cedar-logo.png" alt="Cedar Home Builder" class="footer-logo" />
          <p>Remote project management platform for diaspora Nigerians building homes back home — geo-technology, drone monitoring, dedicated team on the ground.</p>
          <div class="socials">
            <a v-for="s in socials" :key="s.name" :href="s.href" :title="s.name" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" v-html="s.icon"></a>
          </div>
        </div>
        <div class="footer-links">
          <div class="fl-col" v-for="col in cols" :key="col.title">
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
        <span class="powered">
          Powered by <a href="#">
            <em>Energol</em> Ones and Zeros Technology
          </a>
        </span>
        <div class="footer-legal">
          <a href="#" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Privacy</a>
          <a href="#" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
defineEmits(['hover','unhover'])
const year = new Date().getFullYear()
const socials = [
  { name:'Instagram', href:'#', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>' },
  { name:'LinkedIn', href:'#', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10V17M7 7V7.01M11 17V13C11 11.9 11.9 11 13 11C14.1 11 15 11.9 15 13V17M11 10V17"/></svg>' },
  { name:'Twitter', href:'#', icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.3 4.3 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>' },
]
const cols = [
  { title:'Platform', links:[
    { label:'Project Dashboard', href:'#platform' },
    { label:'Remote Monitoring', href:'#technology' },
    { label:'Drone Surveys', href:'#technology' },
    { label:'Geo-Referencing', href:'#technology' },
  ]},
  { title:'Services', links:[
    { label:'Land Acquisition', href:'#services' },
    { label:'Construction Management', href:'#services' },
    { label:'Property Management', href:'#services' },
    { label:'Legal & Title', href:'#services' },
  ]},
  { title:'Get in Touch', links:[
    { label:'Lagos, Nigeria', href:'#' },
    { label:'London, UK', href:'#' },
    { label:'hello@cedarhomebuilder.com', href:'mailto:hello@cedarhomebuilder.com' },
    { label:'Book a Project Call', href:'#booking' },
  ]},
]
</script>
<style scoped>
.footer { background: var(--ink); padding: 80px 0 36px; }
.footer-top { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; margin-bottom: 56px; padding-bottom: 56px; border-bottom: 1px solid rgba(248,249,251,0.08); }
.footer-logo { height: 50px; width: auto; margin-bottom: 20px; display: block; }
.footer-brand p { font-size: 0.85rem; line-height: 1.75; color: rgba(200,215,235,0.5); margin-bottom: 24px; }
.socials { display: flex; gap: 10px; }
.socials a { width: 36px; height: 36px; border: 1px solid rgba(248,249,251,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(200,215,235,0.5); text-decoration: none; transition: border-color .2s, color .2s; }
.socials a:hover { border-color: var(--gold); color: var(--gold); }
.footer-links { display: grid; grid-template-columns: repeat(3,1fr); gap: 36px; }
.fl-col h4 { font-family: var(--font-mono); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
.fl-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.fl-col a { font-size: 0.84rem; color: rgba(200,215,235,0.5); text-decoration: none; transition: color .2s; }
.fl-col a:hover { color: #F0F5FF; }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.76rem; color: rgba(200,215,235,0.25); }
.powered a { text-decoration: none; color: rgba(245,239,224,0.3); transition: color .2s; }
.powered a:hover { color: var(--gold); }
.powered em { font-style: normal; color: var(--gold); font-family: var(--font-body); font-weight: 700; }
.footer-legal { display: flex; gap: 20px; }
.footer-legal a { color: rgba(200,215,235,0.25); text-decoration: none; transition: color .2s; }
.footer-legal a:hover { color: var(--gold); }
@media (max-width: 900px) { .footer-top { grid-template-columns: 1fr; gap: 40px; } .footer-links { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 600px) { .footer-links { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; align-items: flex-start; gap: 10px; } }
</style>
