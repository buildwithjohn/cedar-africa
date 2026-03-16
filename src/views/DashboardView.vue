<template>
  <div class="dashboard-shell">
    <!-- Sidebar -->
    <aside :class="['db-sidebar', { collapsed: sidebarCollapsed }]">
      <div class="sidebar-logo">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
          <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
          <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.4"/>
        </svg>
        <div class="sidebar-brand" v-if="!sidebarCollapsed">
          <span>Cedar <em>Home Builder</em></span>
          <small>Client Portal</small>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-group">
          <span class="nav-group-label" v-if="!sidebarCollapsed">Main</span>
          <a v-for="item in navMain" :key="item.id"
            :class="['nav-item', { active: activeNav === item.id }]"
            @click="activeNav = item.id"
            :title="item.label">
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-label" v-if="!sidebarCollapsed">{{ item.label }}</span>
            <span class="nav-badge" v-if="item.badge && !sidebarCollapsed">{{ item.badge }}</span>
          </a>
        </div>
        <div class="nav-group">
          <span class="nav-group-label" v-if="!sidebarCollapsed">Technology</span>
          <a v-for="item in navTech" :key="item.id"
            :class="['nav-item', { active: activeNav === item.id }]"
            @click="activeNav = item.id"
            :title="item.label">
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-label" v-if="!sidebarCollapsed">{{ item.label }}</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-user" v-if="!sidebarCollapsed">
        <div class="user-avatar">NK</div>
        <div class="user-info">
          <strong>Ngozi Kalu</strong>
          <span>Manchester, UK</span>
        </div>
        <button class="user-more">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="3" r="1" fill="currentColor"/>
            <circle cx="7" cy="7" r="1" fill="currentColor"/>
            <circle cx="7" cy="11" r="1" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path :d="sidebarCollapsed ? 'M6 4L10 8L6 12' : 'M10 4L6 8L10 12'"
            stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
      </button>
    </aside>

    <!-- Main area -->
    <div class="db-main">
      <!-- Top bar -->
      <header class="db-topbar">
        <div class="topbar-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <span class="page-sub">{{ pageSub }}</span>
        </div>
        <div class="topbar-right">
          <div class="search-box">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.2"/>
              <path d="M11 11L14 14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            <input type="text" placeholder="Search projects, plots…" />
          </div>
          <button class="topbar-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2C9 2 4 4 4 9.5V13L2 15H16L14 13V9.5C14 4 9 2 9 2Z" stroke="currentColor" stroke-width="1.2"/>
              <path d="M7 15C7 16.1 7.9 17 9 17C10.1 17 11 16.1 11 15" stroke="currentColor" stroke-width="1.2"/>
              <circle cx="13" cy="4" r="2.5" fill="var(--gold)"/>
            </svg>
            <span class="notif-dot"></span>
          </button>
          <a href="/" class="topbar-btn" title="Back to website">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L2 7V16H7V11H11V16H16V7L9 2Z" stroke="currentColor" stroke-width="1.2"/>
            </svg>
          </a>
          <div class="topbar-avatar">NK</div>
        </div>
      </header>

      <!-- Dashboard content -->
      <div class="db-content" v-if="activeNav === 'dashboard'">

        <!-- Stat cards -->
        <div class="stat-grid">
          <div class="stat-card" v-for="(s, i) in statCards" :key="s.label"
            :class="{ 'stat-card--accent': i === 0 }">
            <div class="stat-card-top">
              <div class="stat-icon" :style="{ background: s.iconBg }">
                <span v-html="s.icon"></span>
              </div>
              <div :class="['stat-trend', s.trend > 0 ? 'up' : 'down']">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path :d="s.trend > 0 ? 'M2 9L6 3L10 9' : 'M2 3L6 9L10 3'"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ Math.abs(s.trend) }}%
              </div>
            </div>
            <div class="stat-val">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
            <div class="stat-sub">{{ s.sub }}</div>
          </div>
        </div>

        <!-- Charts row -->
        <div class="charts-row">
          <!-- Activity chart -->
          <div class="chart-card chart-card--wide">
            <div class="chart-card-header">
              <div>
                <h3>Project Activity</h3>
                <p>Construction milestones over the last 60 days</p>
              </div>
              <div class="chart-tabs">
                <button v-for="t in ['Activity', 'Spend', 'Drone Flights']" :key="t"
                  :class="['chart-tab', { active: activeChartTab === t }]"
                  @click="activeChartTab = t">{{ t }}</button>
              </div>
            </div>
            <div class="chart-wrap">
              <canvas ref="activityChart"></canvas>
            </div>
          </div>

          <!-- Milestone donut -->
          <div class="chart-card">
            <div class="chart-card-header">
              <div>
                <h3>Milestones</h3>
                <p>Overall completion</p>
              </div>
            </div>
            <div class="donut-wrap">
              <canvas ref="donutChart"></canvas>
              <div class="donut-center">
                <span class="donut-pct">68%</span>
                <span>complete</span>
              </div>
            </div>
            <div class="milestone-legend">
              <div class="ml-item" v-for="m in milestones" :key="m.label">
                <span class="ml-dot" :style="{ background: m.color }"></span>
                <span class="ml-label">{{ m.label }}</span>
                <span class="ml-pct">{{ m.pct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects table + Map -->
        <div class="bottom-row">
          <!-- Projects table -->
          <div class="table-card">
            <div class="table-header">
              <div>
                <h3>Your Projects</h3>
                <p>{{ projects.length }} active projects in your portfolio</p>
              </div>
              <div class="table-actions">
                <button class="tbl-btn" v-for="f in ['All','Active','Planning','Completed']" :key="f"
                  :class="{ active: tableFilter === f }"
                  @click="tableFilter = f">{{ f }}</button>
              </div>
            </div>
            <table class="project-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Next Drone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in filteredProjects" :key="p.name"
                  :class="{ 'row-selected': selectedRow === p.name }"
                  @click="selectedRow = p.name">
                  <td>
                    <div class="proj-name-cell">
                      <span class="proj-dot" :style="{ background: p.color }"></span>
                      <div>
                        <strong>{{ p.name }}</strong>
                        <small>{{ p.id }}</small>
                      </div>
                    </div>
                  </td>
                  <td><span class="loc-cell">📍 {{ p.location }}</span></td>
                  <td><span class="type-tag">{{ p.type }}</span></td>
                  <td>
                    <div class="tbl-progress">
                      <div class="tbl-bar">
                        <div class="tbl-fill" :style="{ width: p.progress + '%', background: p.color }"></div>
                      </div>
                      <span>{{ p.progress }}%</span>
                    </div>
                  </td>
                  <td><span :class="['status-pill', 'status-' + p.statusKey]">{{ p.status }}</span></td>
                  <td class="date-cell">{{ p.startDate }}</td>
                  <td class="date-cell drone-cell">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1L2 3.5V9H10V3.5L6 1Z" stroke="var(--tech-blue)" stroke-width="1"/>
                    </svg>
                    {{ p.nextDrone }}
                  </td>
                  <td>
                    <button class="row-action">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mini map + quick actions -->
          <div class="side-cards">
            <!-- Live map -->
            <div class="mini-map-card">
              <div class="side-card-header">
                <h3>Live Site Map</h3>
                <span class="live-badge"><span></span>LIVE</span>
              </div>
              <div id="dash-map" ref="dashMapEl"></div>
              <div class="map-footer">
                <span>3 plots tracked · Updated now</span>
                <a href="#" class="map-expand">Full map →</a>
              </div>
            </div>

            <!-- Recent activity -->
            <div class="activity-card">
              <div class="side-card-header">
                <h3>Recent Activity</h3>
                <span class="view-all">View all</span>
              </div>
              <div class="activity-list">
                <div class="activity-item" v-for="a in recentActivity" :key="a.text">
                  <div class="act-icon" :style="{ background: a.iconBg }">{{ a.icon }}</div>
                  <div class="act-body">
                    <span class="act-text">{{ a.text }}</span>
                    <span class="act-time">{{ a.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Placeholder for other nav items -->
      <div class="db-content placeholder-content" v-else>
        <div class="placeholder-page">
          <div class="ph-icon" v-html="currentNavIcon"></div>
          <h2>{{ pageTitle }}</h2>
          <p>This section is under development.<br/>Check back after the next sprint.</p>
          <button class="ph-btn" @click="activeNav = 'dashboard'">← Back to Dashboard</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const sidebarCollapsed = ref(false)
const activeNav = ref('dashboard')
const activeChartTab = ref('Activity')
const tableFilter = ref('All')
const selectedRow = ref(null)
const activityChart = ref(null)
const donutChart = ref(null)
const dashMapEl = ref(null)
let actChartInstance = null
let donutInstance = null

const navMain = [
  { id: 'dashboard', label: 'Dashboard', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/></svg>' },
  { id: 'projects', label: 'My Projects', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L2 5V13L9 17L16 13V5L9 1Z" stroke="currentColor" stroke-width="1.2"/><path d="M9 1V17M2 5L16 13M16 5L2 13" stroke="currentColor" stroke-width="1.2" opacity="0.4"/></svg>', badge: '4' },
  { id: 'invoices', label: 'Invoices', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M6 6H12M6 9H12M6 12H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>' },
  { id: 'milestones', label: 'Milestones', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.2"/><path d="M9 5V9L12 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>' },
  { id: 'tickets', label: 'Support Tickets', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4H16V14H2V4Z" stroke="currentColor" stroke-width="1.2" rx="1"/><path d="M2 7H16" stroke="currentColor" stroke-width="1.2"/><circle cx="5" cy="11" r="1" fill="currentColor"/></svg>' },
]
const navTech = [
  { id: 'map', label: 'Map Platform', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 2L2 4V16L6 14L12 16L16 14V2L12 4L6 2Z" stroke="currentColor" stroke-width="1.2"/><path d="M6 2V14M12 4V16" stroke="currentColor" stroke-width="1.2"/></svg>' },
  { id: 'drone', label: 'Drone Footage', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 7L4 10V15H14V10L9 7Z" stroke="currentColor" stroke-width="1.2"/><line x1="4" y1="7" x2="2" y2="5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="14" y1="7" x2="16" y2="5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="2" cy="4.5" r="1.5" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="4.5" r="1.5" stroke="currentColor" stroke-width="1"/></svg>' },
  { id: 'geo', label: 'Geo Reports', icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.2"/><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.2"/><line x1="9" y1="2" x2="9" y2="4" stroke="currentColor" stroke-width="1.2"/><line x1="9" y1="14" x2="9" y2="16" stroke="currentColor" stroke-width="1.2"/><line x1="2" y1="9" x2="4" y2="9" stroke="currentColor" stroke-width="1.2"/><line x1="14" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="1.2"/></svg>' },
]

const statCards = [
  { label: 'Active Projects', value: '4', sub: '2 ahead of schedule', trend: 12.5, icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1L2 6V18H18V6L10 1Z" stroke="currentColor" stroke-width="1.4"/></svg>', iconBg: 'rgba(201,168,76,0.15)' },
  { label: 'Milestone Completion', value: '68%', sub: '9 of 13 milestones done', trend: 8.3, icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M10 6V10L13 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>', iconBg: 'rgba(78,205,196,0.12)' },
  { label: 'Total Invoice Value', value: '₦4,875,000', sub: '₦1,175,000 pending', trend: 8.3, icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="1" stroke="currentColor" stroke-width="1.4"/><path d="M7 8H13M7 11H13M7 14H10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>', iconBg: 'rgba(168,224,99,0.12)' },
  { label: 'Drone Surveys', value: '12', sub: 'Next flight in 8 days', trend: -2.1, icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 8L4 12V18H16V12L10 8Z" stroke="currentColor" stroke-width="1.4"/><line x1="4" y1="8" x2="2" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><line x1="16" y1="8" x2="18" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="2" cy="5.5" r="1.8" stroke="currentColor" stroke-width="1.2"/><circle cx="18" cy="5.5" r="1.8" stroke="currentColor" stroke-width="1.2"/></svg>', iconBg: 'rgba(201,168,76,0.15)' },
]

const milestones = [
  { label: 'Foundation', pct: 100, color: '#4ECDC4' },
  { label: 'Structural', pct: 85, color: '#C9A84C' },
  { label: 'Roofing', pct: 60, color: '#a8e063' },
  { label: 'Finishing', pct: 20, color: 'rgba(247,242,232,0.2)' },
]

const projects = [
  { name: 'Plot A-23 Duplex', id: 'CHB-2024-001', location: 'Lekki Phase 1, Lagos', type: 'Residential', progress: 68, status: 'Active', statusKey: 'active', startDate: 'Apr 23, 2024', nextDrone: 'Mar 24', color: '#C9A84C', lat: 6.4352, lng: 3.4737 },
  { name: 'Maitama Bungalow', id: 'CHB-2024-002', location: 'Maitama, Abuja', type: 'Residential', progress: 32, status: 'Foundation', statusKey: 'foundation', startDate: 'Jun 10, 2024', nextDrone: 'Mar 22', color: '#4ECDC4', lat: 9.0765, lng: 7.3986 },
  { name: 'GRA Terrace', id: 'CHB-2024-003', location: 'GRA, Port Harcourt', type: 'PropertyDev', progress: 91, status: 'Finishing', statusKey: 'finishing', startDate: 'Jan 5, 2024', nextDrone: 'Mar 20', color: '#a8e063', lat: 4.8396, lng: 7.0498 },
  { name: 'Ikoyi Penthouse', id: 'CHB-2025-004', location: 'Ikoyi, Lagos', type: 'Luxury', progress: 12, status: 'Planning', statusKey: 'planning', startDate: 'Mar 1, 2025', nextDrone: 'Apr 2', color: '#e07a5f', lat: 6.4500, lng: 3.4363 },
]

const recentActivity = [
  { icon: '🛸', iconBg: 'rgba(78,205,196,0.15)', text: 'Drone survey completed — Plot A-23', time: '2 hours ago' },
  { icon: '📸', iconBg: 'rgba(201,168,76,0.15)', text: '24 new geo-tagged photos uploaded', time: '2 hours ago' },
  { icon: '✅', iconBg: 'rgba(168,224,99,0.12)', text: 'Milestone reached: Roofing 60%', time: 'Yesterday' },
  { icon: '📄', iconBg: 'rgba(201,168,76,0.1)', text: 'Invoice #INV-0042 issued — ₦875,000', time: '3 days ago' },
  { icon: '📍', iconBg: 'rgba(224,122,95,0.12)', text: 'New plot geo-referenced — Ikoyi', time: '5 days ago' },
]

const filteredProjects = computed(() => {
  if (tableFilter.value === 'All') return projects
  if (tableFilter.value === 'Active') return projects.filter(p => p.statusKey === 'active')
  if (tableFilter.value === 'Planning') return projects.filter(p => p.statusKey === 'planning')
  if (tableFilter.value === 'Completed') return projects.filter(p => p.statusKey === 'completed')
  return projects
})

const pageTitle = computed(() => navMain.concat(navTech).find(n => n.id === activeNav.value)?.label || 'Dashboard')
const pageSub = computed(() => {
  const subs = { dashboard: 'Welcome back, Ngozi · Monday, March 2025', projects: 'All your active construction projects', map: 'Live geo-referenced plot tracker', drone: 'Aerial survey footage library', geo: 'Survey and boundary reports' }
  return subs[activeNav.value] || 'Cedar Home Builder Platform'
})
const currentNavIcon = computed(() => navMain.concat(navTech).find(n => n.id === activeNav.value)?.icon || '')

const buildActivityChart = () => {
  if (actChartInstance) actChartInstance.destroy()
  const ctx = activityChart.value?.getContext('2d')
  if (!ctx) return
  const labels = Array.from({ length: 28 }, (_, i) => {
    const d = new Date('2025-02-08')
    d.setDate(d.getDate() + i * 2)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  })
  const grad = ctx.createLinearGradient(0, 0, 0, 200)
  grad.addColorStop(0, 'rgba(201,168,76,0.35)')
  grad.addColorStop(1, 'rgba(201,168,76,0.01)')
  actChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: [2,4,1,4,2,5,3,4,2,3,5,4,2,4,3,5,4,2,5,4,3,4,5,3,4,5,3,4],
        borderColor: '#C9A84C',
        borderWidth: 2,
        backgroundColor: grad,
        fill: true,
        tension: 0.45,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#C9A84C',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: '#0A1F14', borderColor: 'rgba(201,168,76,0.3)', borderWidth: 1,
        titleColor: '#C9A84C', bodyColor: 'rgba(247,242,232,0.7)',
        titleFont: { family: 'Syne', size: 11 }, bodyFont: { family: 'DM Sans', size: 12 },
        padding: 12, displayColors: false,
      }},
      scales: {
        x: { grid: { color: 'rgba(247,242,232,0.04)', drawBorder: false }, ticks: { color: 'rgba(247,242,232,0.3)', font: { family: 'Syne', size: 10 }, maxTicksLimit: 7 }, border: { display: false } },
        y: { grid: { color: 'rgba(247,242,232,0.04)', drawBorder: false }, ticks: { color: 'rgba(247,242,232,0.3)', font: { family: 'Syne', size: 10 }, stepSize: 2 }, border: { display: false }, min: 0, max: 8 },
      }
    }
  })
}

const buildDonutChart = () => {
  if (donutInstance) donutInstance.destroy()
  const ctx = donutChart.value?.getContext('2d')
  if (!ctx) return
  donutInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [100, 85, 60, 20],
        backgroundColor: ['#4ECDC4', '#C9A84C', '#a8e063', 'rgba(247,242,232,0.08)'],
        borderWidth: 0, borderRadius: 2, spacing: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '74%',
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }
  })
}

onMounted(async () => {
  await nextTick()
  buildActivityChart()
  buildDonutChart()

  // Mini dashboard map
  const L = (await import('leaflet')).default
  const dmap = L.map(dashMapEl.value, {
    center: [7.5, 5.0], zoom: 5,
    zoomControl: false, scrollWheelZoom: false,
    dragging: false, attributionControl: false,
  })
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(dmap)
  projects.forEach(p => {
    const icon = L.divIcon({
      html: `<div style="width:10px;height:10px;background:${p.color};border-radius:50%;box-shadow:0 0 8px ${p.color}aa;"></div>`,
      className: '', iconAnchor: [5,5],
    })
    L.marker([p.lat, p.lng], { icon }).addTo(dmap)
  })
})
</script>

<style scoped>
/* ─── Shell ────────────────────────────── */
.dashboard-shell {
  display: flex;
  height: 100vh;
  background: #0c1a13;
  font-family: var(--font-body);
  overflow: hidden;
}

/* ─── Sidebar ──────────────────────────── */
.db-sidebar {
  width: 240px;
  background: #0A1710;
  border-right: 1px solid rgba(201,168,76,0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.3s var(--ease-out-expo);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.db-sidebar.collapsed { width: 64px; }

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(201,168,76,0.08);
  flex-shrink: 0;
}
.sidebar-brand span { font-family: var(--font-ui); font-size: 0.85rem; font-weight: 700; color: var(--cream); display: block; white-space: nowrap; }
.sidebar-brand em { font-style: normal; color: var(--gold); }
.sidebar-brand small { font-size: 0.6rem; color: rgba(247,242,232,0.3); letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }

.sidebar-nav { flex: 1; padding: 16px 8px; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; overflow-x: hidden; }
.nav-group { display: flex; flex-direction: column; gap: 2px; margin-bottom: 16px; }
.nav-group-label { font-family: var(--font-ui); font-size: 0.58rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(247,242,232,0.2); padding: 0 8px 6px; white-space: nowrap; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 10px;
  border-radius: 6px;
  color: rgba(247,242,232,0.45);
  text-decoration: none;
  font-family: var(--font-ui); font-size: 0.82rem; font-weight: 500;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap; overflow: hidden;
  cursor: none;
  position: relative;
}
.nav-item:hover { background: rgba(247,242,232,0.04); color: rgba(247,242,232,0.75); }
.nav-item.active { background: rgba(201,168,76,0.1); color: var(--gold); }
.nav-item.active .nav-icon { color: var(--gold); }
.nav-icon { flex-shrink: 0; display: flex; }
.nav-label { flex: 1; }
.nav-badge { background: var(--gold); color: var(--forest-deep); font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 10px; }

.sidebar-user {
  padding: 14px 12px;
  border-top: 1px solid rgba(201,168,76,0.08);
  display: flex; align-items: center; gap: 10px;
  flex-shrink: 0;
}
.user-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-family: var(--font-ui); font-size: 0.72rem; font-weight: 700; color: var(--forest-deep); flex-shrink: 0; }
.user-info { flex: 1; overflow: hidden; }
.user-info strong { display: block; font-family: var(--font-ui); font-size: 0.78rem; color: var(--cream); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-info span { font-size: 0.68rem; color: rgba(247,242,232,0.35); white-space: nowrap; }
.user-more { background: none; border: none; color: rgba(247,242,232,0.3); padding: 4px; transition: color 0.2s; }
.user-more:hover { color: var(--gold); }

.collapse-btn {
  position: absolute; bottom: 72px; right: -1px;
  width: 20px; height: 36px;
  background: #0A1710;
  border: 1px solid rgba(201,168,76,0.15);
  border-right: none;
  color: rgba(247,242,232,0.3);
  display: flex; align-items: center; justify-content: center;
  transition: color 0.2s;
  border-radius: 4px 0 0 4px;
}
.collapse-btn:hover { color: var(--gold); }

/* ─── Main ─────────────────────────────── */
.db-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

.db-topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: #0c1a13;
  border-bottom: 1px solid rgba(201,168,76,0.08);
  flex-shrink: 0;
}
.topbar-left { display: flex; align-items: baseline; gap: 12px; }
.page-title { font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--cream); }
.page-sub { font-size: 0.75rem; color: rgba(247,242,232,0.3); }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.search-box { display: flex; align-items: center; gap: 8px; background: rgba(247,242,232,0.04); border: 1px solid rgba(247,242,232,0.07); padding: 8px 14px; }
.search-box svg { color: rgba(247,242,232,0.25); flex-shrink: 0; }
.search-box input { background: none; border: none; outline: none; font-family: var(--font-body); font-size: 0.8rem; color: var(--cream); width: 180px; }
.search-box input::placeholder { color: rgba(247,242,232,0.25); }
.topbar-btn { width: 38px; height: 38px; background: rgba(247,242,232,0.04); border: 1px solid rgba(247,242,232,0.07); color: rgba(247,242,232,0.45); display: flex; align-items: center; justify-content: center; position: relative; transition: border-color 0.2s, color 0.2s; text-decoration: none; }
.topbar-btn:hover { border-color: rgba(201,168,76,0.3); color: var(--gold); }
.notif-dot { position: absolute; top: 7px; right: 7px; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); border: 1px solid #0c1a13; }
.topbar-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-family: var(--font-ui); font-size: 0.72rem; font-weight: 700; color: var(--forest-deep); }

/* ─── Content ──────────────────────────── */
.db-content { flex: 1; overflow-y: auto; padding: 28px 32px; display: flex; flex-direction: column; gap: 24px; }

/* Stat cards */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-card {
  background: rgba(247,242,232,0.03);
  border: 1px solid rgba(247,242,232,0.07);
  padding: 22px 22px 20px;
  border-radius: 2px;
  transition: border-color 0.3s, transform 0.3s var(--spring);
  position: relative;
  overflow: hidden;
}
.stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); opacity: 0; transition: opacity 0.3s; }
.stat-card:hover { border-color: rgba(201,168,76,0.2); transform: translateY(-2px); }
.stat-card:hover::before { opacity: 1; }
.stat-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.stat-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gold); }
.stat-trend { display: flex; align-items: center; gap: 4px; font-family: var(--font-ui); font-size: 0.72rem; font-weight: 700; }
.stat-trend.up { color: #4ade80; }
.stat-trend.down { color: #f87171; }
.stat-val { font-family: var(--font-display); font-size: 1.9rem; font-weight: 500; color: var(--cream); line-height: 1; margin-bottom: 4px; }
.stat-label { font-family: var(--font-ui); font-size: 0.72rem; font-weight: 600; color: rgba(247,242,232,0.5); margin-bottom: 4px; letter-spacing: 0.04em; }
.stat-sub { font-size: 0.72rem; color: rgba(247,242,232,0.25); }

/* Charts */
.charts-row { display: grid; grid-template-columns: 1fr 300px; gap: 16px; }
.chart-card {
  background: rgba(247,242,232,0.03);
  border: 1px solid rgba(247,242,232,0.07);
  padding: 22px;
  border-radius: 2px;
}
.chart-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
.chart-card-header h3 { font-family: var(--font-ui); font-size: 0.9rem; font-weight: 700; color: var(--cream); margin-bottom: 4px; }
.chart-card-header p { font-size: 0.75rem; color: rgba(247,242,232,0.3); }
.chart-tabs { display: flex; gap: 4px; }
.chart-tab { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 600; padding: 6px 12px; background: transparent; border: 1px solid rgba(247,242,232,0.07); color: rgba(247,242,232,0.35); transition: all 0.2s; border-radius: 2px; }
.chart-tab.active { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.3); color: var(--gold); }
.chart-wrap { height: 180px; position: relative; }

.donut-wrap { position: relative; height: 160px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.donut-center { position: absolute; text-align: center; display: flex; flex-direction: column; gap: 2px; }
.donut-pct { font-family: var(--font-display); font-size: 2rem; font-weight: 500; color: var(--gold); line-height: 1; }
.donut-center span { font-size: 0.7rem; color: rgba(247,242,232,0.35); }
.milestone-legend { display: flex; flex-direction: column; gap: 8px; }
.ml-item { display: flex; align-items: center; gap: 8px; }
.ml-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
.ml-label { flex: 1; font-size: 0.78rem; color: rgba(247,242,232,0.5); }
.ml-pct { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 600; color: rgba(247,242,232,0.6); }

/* Bottom row */
.bottom-row { display: grid; grid-template-columns: 1fr 280px; gap: 16px; }

/* Table */
.table-card { background: rgba(247,242,232,0.03); border: 1px solid rgba(247,242,232,0.07); border-radius: 2px; overflow: hidden; }
.table-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 22px 16px; border-bottom: 1px solid rgba(247,242,232,0.06); }
.table-header h3 { font-family: var(--font-ui); font-size: 0.9rem; font-weight: 700; color: var(--cream); margin-bottom: 3px; }
.table-header p { font-size: 0.75rem; color: rgba(247,242,232,0.3); }
.table-actions { display: flex; gap: 4px; }
.tbl-btn { font-family: var(--font-ui); font-size: 0.68rem; font-weight: 600; padding: 5px 10px; background: transparent; border: 1px solid rgba(247,242,232,0.07); color: rgba(247,242,232,0.35); transition: all 0.2s; border-radius: 2px; }
.tbl-btn.active { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.3); color: var(--gold); }

.project-table { width: 100%; border-collapse: collapse; }
.project-table th { font-family: var(--font-ui); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(247,242,232,0.25); padding: 10px 22px; text-align: left; border-bottom: 1px solid rgba(247,242,232,0.05); white-space: nowrap; }
.project-table td { padding: 14px 22px; border-bottom: 1px solid rgba(247,242,232,0.04); vertical-align: middle; }
.project-table tr:last-child td { border-bottom: none; }
.project-table tr { transition: background 0.2s; cursor: none; }
.project-table tr:hover td { background: rgba(247,242,232,0.02); }
.row-selected td { background: rgba(201,168,76,0.04) !important; }
.proj-name-cell { display: flex; align-items: center; gap: 10px; }
.proj-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.proj-name-cell strong { display: block; font-family: var(--font-ui); font-size: 0.82rem; color: var(--cream); }
.proj-name-cell small { font-size: 0.68rem; color: rgba(247,242,232,0.25); font-family: var(--font-ui); letter-spacing: 0.04em; }
.loc-cell { font-size: 0.78rem; color: rgba(247,242,232,0.45); white-space: nowrap; }
.type-tag { font-family: var(--font-ui); font-size: 0.65rem; font-weight: 600; letter-spacing: 0.06em; padding: 3px 8px; background: rgba(247,242,232,0.05); border: 1px solid rgba(247,242,232,0.08); color: rgba(247,242,232,0.4); white-space: nowrap; }
.tbl-progress { display: flex; align-items: center; gap: 8px; min-width: 100px; }
.tbl-bar { flex: 1; height: 3px; background: rgba(247,242,232,0.07); border-radius: 2px; overflow: hidden; }
.tbl-fill { height: 100%; border-radius: 2px; }
.tbl-progress span { font-family: var(--font-ui); font-size: 0.72rem; color: rgba(247,242,232,0.45); width: 28px; text-align: right; flex-shrink: 0; }
.status-pill { font-family: var(--font-ui); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 2px; white-space: nowrap; }
.status-active { background: rgba(201,168,76,0.12); color: var(--gold); border: 1px solid rgba(201,168,76,0.2); }
.status-foundation { background: rgba(78,205,196,0.1); color: var(--tech-blue); border: 1px solid rgba(78,205,196,0.2); }
.status-finishing { background: rgba(168,224,99,0.1); color: #a8e063; border: 1px solid rgba(168,224,99,0.2); }
.status-planning { background: rgba(224,122,95,0.1); color: #e07a5f; border: 1px solid rgba(224,122,95,0.2); }
.date-cell { font-family: var(--font-ui); font-size: 0.75rem; color: rgba(247,242,232,0.35); white-space: nowrap; }
.drone-cell { color: var(--tech-blue) !important; display: flex; align-items: center; gap: 5px; }
.row-action { background: none; border: 1px solid rgba(247,242,232,0.08); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: rgba(247,242,232,0.3); transition: all 0.2s; }
.row-action:hover { border-color: var(--gold); color: var(--gold); }

/* Side cards */
.side-cards { display: flex; flex-direction: column; gap: 16px; }
.mini-map-card, .activity-card { background: rgba(247,242,232,0.03); border: 1px solid rgba(247,242,232,0.07); border-radius: 2px; overflow: hidden; }
.side-card-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid rgba(247,242,232,0.06); }
.side-card-header h3 { font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; color: var(--cream); }
.live-badge { display: flex; align-items: center; gap: 5px; font-family: var(--font-ui); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; color: #4ade80; }
.live-badge span { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: blink 1.5s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.view-all { font-family: var(--font-ui); font-size: 0.68rem; color: var(--gold); letter-spacing: 0.06em; cursor: none; }
#dash-map { height: 160px; }
.map-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; }
.map-footer span { font-size: 0.7rem; color: rgba(247,242,232,0.3); }
.map-expand { font-family: var(--font-ui); font-size: 0.7rem; color: var(--gold); text-decoration: none; }
.activity-list { padding: 8px 0; }
.activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 16px; transition: background 0.2s; }
.activity-item:hover { background: rgba(247,242,232,0.02); }
.act-icon { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }
.act-body { display: flex; flex-direction: column; gap: 3px; }
.act-text { font-size: 0.78rem; color: rgba(247,242,232,0.6); line-height: 1.4; }
.act-time { font-family: var(--font-ui); font-size: 0.65rem; color: rgba(247,242,232,0.25); }

/* Placeholder */
.placeholder-content { display: flex; align-items: center; justify-content: center; }
.placeholder-page { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.ph-icon { width: 64px; height: 64px; background: rgba(201,168,76,0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); }
.placeholder-page h2 { font-family: var(--font-display); font-size: 2rem; font-weight: 300; color: var(--cream); }
.placeholder-page p { font-size: 0.9rem; color: rgba(247,242,232,0.4); line-height: 1.7; }
.ph-btn { font-family: var(--font-ui); font-size: 0.78rem; font-weight: 600; padding: 12px 24px; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); color: var(--gold); transition: background 0.2s; margin-top: 8px; }
.ph-btn:hover { background: rgba(201,168,76,0.18); }
</style>
