<template>
  <slot :open="openModal" />

  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="bm-backdrop" @click.self="closeModal" role="dialog" aria-modal="true">
        <div class="bm-modal">

          <!-- Close -->
          <button class="bm-close" @click="closeModal" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Mobile step indicator -->
          <div class="bm-stepper">
            <div v-for="(s, i) in ['Date', 'Time', 'Details']" :key="s"
              :class="['bm-step-item', { active: mobileStep >= i+1, done: mobileStep > i+1 }]">
              <div class="bm-step-dot">
                <svg v-if="mobileStep > i+1" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4.5 7.5L8 3" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span v-else>{{ i+1 }}</span>
              </div>
              <small>{{ s }}</small>
            </div>
            <div class="bm-step-track">
              <div class="bm-step-fill" :style="{ width: ((mobileStep-1)/2 * 100) + '%' }"></div>
            </div>
          </div>

          <!-- ══ INFO PANEL ══ -->
          <div class="bm-info">
            <div class="bm-logo">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--forest)" stroke-width="1.5" fill="none"/>
                <path d="M10 28V18H22V28" stroke="var(--forest)" stroke-width="1.5"/>
                <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--forest)" opacity="0.25"/>
              </svg>
              <span>Cedar <em>Home Builder</em></span>
            </div>

            <div class="bm-info-type">Project Discovery Call</div>
            <h3 class="bm-info-title">Free<br/>Consultation</h3>

            <div class="bm-info-meta">
              <div class="bm-meta-row">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#999" stroke-width="1"/><path d="M7 4V7L9 8.5" stroke="#999" stroke-width="1" stroke-linecap="round"/></svg>
                <span>30 minutes</span>
              </div>
              <div class="bm-meta-row">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="10" rx="1" stroke="#999" stroke-width="1"/><path d="M4 1V3M10 1V3M1 6H13" stroke="#999" stroke-width="1" stroke-linecap="round"/></svg>
                <span>Video call</span>
              </div>
              <div class="bm-meta-row">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#999" stroke-width="1"/><path d="M4 7C4 8.7 5.3 10 7 10S10 8.7 10 7 8.7 4 7 4" stroke="#999" stroke-width="1"/></svg>
                <span>{{ userTimezone }}</span>
              </div>
            </div>

            <p class="bm-info-desc">
              Speak with an advisor about your vision, location, and budget. We'll walk you through our geo-tech platform and give you a clear project roadmap.
            </p>

            <div class="bm-info-features">
              <div class="bm-if" v-for="f in features" :key="f">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="var(--gold)" stroke-width="1"/><path d="M3.5 6L5.5 8L8.5 4" stroke="var(--gold)" stroke-width="1.1" stroke-linecap="round"/></svg>
                {{ f }}
              </div>
            </div>

            <div class="bm-info-divider"></div>
            <p class="bm-info-note">No sign up required. Instant confirmation by email.</p>
          </div>

          <!-- ══ CALENDAR PANEL ══ -->
          <div class="bm-cal-panel" v-show="!isMobile || mobileStep === 1">
            <div class="bm-cal-nav-row">
              <h4>{{ monthLabel }}</h4>
              <div class="bm-cal-arrows">
                <button @click="prevMonth" :disabled="atMinMonth" aria-label="Prev">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7L9 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </button>
                <button @click="nextMonth" aria-label="Next">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </button>
              </div>
            </div>

            <div class="bm-wdays">
              <span v-for="d in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="d">{{ d }}</span>
            </div>

            <div class="bm-cal-grid">
              <div v-for="(day, i) in calDays" :key="i"
                :class="['bm-day', {
                  empty:     !day,
                  past:      day && isPast(day),
                  weekend:   day && isWeekend(day),
                  today:     day && isToday(day),
                  available: day && isAvailable(day),
                  selected:  day && selectedDate && sameDay(day, selectedDate),
                }]"
                @click="day && isAvailable(day) && selectDate(day)">
                <span v-if="day">{{ day.getDate() }}</span>
                <i v-if="day && isToday(day)" class="today-pip"></i>
              </div>
            </div>

            <div class="bm-cal-footer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#999" stroke-width="1"/><path d="M3 6C3 7.7 4.3 9 6 9" stroke="#999" stroke-width="1"/></svg>
              <span>{{ userTimezone }}</span>
            </div>
          </div>

          <!-- ══ TIMES PANEL ══ -->
          <div class="bm-times-panel" v-show="selectedDate && (!isMobile || mobileStep >= 2)">

            <!-- Date header -->
            <div class="bm-times-hd">
              <div class="bm-sel-date" v-if="selectedDate">
                <strong>{{ selDay }}</strong>
                <span>{{ selMonthYear }}</span>
              </div>
              <div class="bm-fmt-toggle">
                <button :class="{ active: fmt === '12h' }" @click="fmt = '12h'">12h</button>
                <button :class="{ active: fmt === '24h' }" @click="fmt = '24h'">24h</button>
              </div>
            </div>

            <!-- Slot list -->
            <div class="bm-slot-list" v-if="!selectedTime">
              <button v-for="slot in timeSlots" :key="slot.val"
                class="bm-slot" @click="pickTime(slot)">
                {{ fmt === '12h' ? slot.l12 : slot.l24 }}
              </button>
            </div>

            <!-- Confirm form -->
            <div class="bm-confirm" v-if="selectedTime && step !== 'success'">
              <div class="bm-confirm-summary">
                <div class="bcs-row">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1.5" width="11" height="10" rx="1" stroke="var(--gold)" stroke-width="1"/><path d="M1 5H12M4 0.5V2.5M9 0.5V2.5" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/></svg>
                  {{ selDay }}, {{ selMonthYear }}
                </div>
                <div class="bcs-row">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="var(--gold)" stroke-width="1"/><path d="M6.5 3.5V6.5L8.5 8" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/></svg>
                  {{ fmt === '12h' ? selectedTime.l12 : selectedTime.l24 }} · 30 min
                </div>
              </div>
              <button class="bm-retime" @click="selectedTime = null">← Choose different time</button>

              <form class="bm-form" @submit.prevent="submitBooking">
                <div class="bm-row-2">
                  <div class="bm-field">
                    <label>First Name *</label>
                    <input v-model="form.firstName" type="text" placeholder="Adaeze" required />
                  </div>
                  <div class="bm-field">
                    <label>Last Name *</label>
                    <input v-model="form.lastName" type="text" placeholder="Obi" required />
                  </div>
                </div>
                <div class="bm-field">
                  <label>Email Address *</label>
                  <input v-model="form.email" type="email" placeholder="you@email.com" required />
                </div>
                <div class="bm-field">
                  <label>Country you're based in *</label>
                  <select v-model="form.country" required>
                    <option value="" disabled>Select country…</option>
                    <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
                <div class="bm-field">
                  <label>About your project <span>(optional)</span></label>
                  <textarea v-model="form.message" rows="2" placeholder="e.g. 3-bed in Lekki, budget ₦35m…"></textarea>
                </div>
                <button type="submit" class="bm-submit" :disabled="!canSubmit">
                  Confirm Booking
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                </button>
              </form>
            </div>

            <!-- Success -->
            <div class="bm-success" v-if="step === 'success'">
              <div class="bm-success-ring">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#1C3A2B" stroke-width="1.5"/>
                  <path d="M12 20L17.5 25.5L28 14" stroke="#1C3A2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h4>You're confirmed!</h4>
              <p>{{ selDay }}, {{ selMonthYear }}<br/>at {{ fmt === '12h' ? selectedTime.l12 : selectedTime.l24 }}</p>
              <small>Calendar invite sent to <em>{{ form.email }}</em></small>
              <button class="bm-done" @click="closeModal">Done</button>
            </div>

          </div>

          <!-- Mobile navigation row -->
          <div class="bm-mob-nav">
            <button class="bm-back-btn" v-if="mobileStep > 1" @click="mobileStep--">
              ← Back
            </button>
            <button class="bm-next-btn" v-if="mobileStep === 1 && selectedDate" @click="mobileStep = 2">
              Choose a time →
            </button>
            <button class="bm-next-btn" v-if="mobileStep === 2 && selectedTime" @click="mobileStep = 3">
              Fill details →
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isOpen     = ref(false)
const step       = ref('calendar')
const mobileStep = ref(1)
const isMobile   = ref(false)

const now        = new Date()
const viewYear   = ref(now.getFullYear())
const viewMonth  = ref(now.getMonth())
const selectedDate = ref(null)
const selectedTime = ref(null)
const fmt          = ref('12h')
const form = ref({ firstName:'', lastName:'', email:'', country:'', message:'' })

const features  = ['Free, no obligation', 'Senior advisor', 'Cost estimate', 'Process walkthrough']
const countries = ['United Kingdom','United States','Canada','Germany','Netherlands','Ireland','Australia','France','Italy','Sweden','Norway','Finland','Other']
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const checkMobile = () => { isMobile.value = window.innerWidth <= 820 }
onMounted(() => { checkMobile(); window.addEventListener('resize', checkMobile) })
onUnmounted(() => window.removeEventListener('resize', checkMobile))

const openModal  = () => { isOpen.value = true; mobileStep.value = 1; document.body.style.overflow = 'hidden' }
const closeModal = () => {
  isOpen.value = false; document.body.style.overflow = ''
  setTimeout(() => {
    step.value = 'calendar'; mobileStep.value = 1
    selectedDate.value = null; selectedTime.value = null
    form.value = { firstName:'', lastName:'', email:'', country:'', message:'' }
  }, 300)
}

const atMinMonth  = computed(() => viewYear.value === now.getFullYear() && viewMonth.value === now.getMonth())
const monthLabel  = computed(() => new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-US', { month:'long', year:'numeric' }))
const calDays     = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const last  = new Date(viewYear.value, viewMonth.value + 1, 0)
  const days  = []
  for (let i = 0; i < first.getDay(); i++) days.push(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(viewYear.value, viewMonth.value, d))
  return days
})
const isPast      = d => { const t = new Date(); t.setHours(0,0,0,0); return d < t }
const isWeekend   = d => d.getDay() === 0 || d.getDay() === 6
const isAvailable = d => !isPast(d) && !isWeekend(d)
const isToday     = d => sameDay(d, new Date())
const sameDay     = (a, b) => a.toDateString() === b.toDateString()

const prevMonth = () => {
  if (atMinMonth.value) return
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- } else viewMonth.value--
}
const nextMonth = () => {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ } else viewMonth.value++
}
const selectDate  = d => { selectedDate.value = d; selectedTime.value = null; step.value = 'calendar' }

const selDay       = computed(() => selectedDate.value?.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }) ?? '')
const selMonthYear = computed(() => selectedDate.value?.toLocaleDateString('en-US', { year:'numeric' }) ?? '')

const timeSlots = [
  { val:'09:00', l12:'9:00am',  l24:'09:00' }, { val:'09:30', l12:'9:30am',  l24:'09:30' },
  { val:'10:00', l12:'10:00am', l24:'10:00' }, { val:'10:30', l12:'10:30am', l24:'10:30' },
  { val:'11:00', l12:'11:00am', l24:'11:00' }, { val:'11:30', l12:'11:30am', l24:'11:30' },
  { val:'14:00', l12:'2:00pm',  l24:'14:00' }, { val:'14:30', l12:'2:30pm',  l24:'14:30' },
  { val:'15:00', l12:'3:00pm',  l24:'15:00' }, { val:'15:30', l12:'3:30pm',  l24:'15:30' },
  { val:'16:00', l12:'4:00pm',  l24:'16:00' }, { val:'16:30', l12:'4:30pm',  l24:'16:30' },
]
const pickTime    = slot => { selectedTime.value = slot; if (isMobile.value) mobileStep.value = 3 }
const canSubmit   = computed(() => form.value.firstName && form.value.email && form.value.country)
const submitBooking = () => { if (canSubmit.value) step.value = 'success' }

defineExpose({ openModal })
</script>

<style scoped>
/* ══════════════════════════════════════════
   All booking UI is WHITE / LIGHT
   using hardcoded light values — never
   inheriting dark site colours
   ══════════════════════════════════════════ */

/* ── Backdrop ── */
.bm-backdrop {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(15, 20, 15, 0.65);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

/* ── Modal ── */
.bm-modal {
  position: relative;
  display: grid;
  grid-template-columns: 230px 1fr 220px;
  grid-template-areas: "stepper stepper stepper" "info cal times" "mobnav mobnav mobnav";
  width: 100%; max-width: 920px;
  max-height: 88vh;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06);
  overflow: hidden;
  color: #1A1A1A; /* reset — override site dark colour */
}

/* ── Close ── */
.bm-close {
  position: absolute; top: 14px; right: 14px; z-index: 20;
  width: 30px; height: 30px; border-radius: 50%;
  background: #F5F3EE; border: 1px solid #E8E5DE;
  color: #999;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.bm-close:hover { background: #ECEAE4; color: #444; }

/* ── Stepper (hidden desktop) ── */
.bm-stepper {
  grid-area: stepper;
  display: none;
  padding: 20px 24px 0;
  position: relative;
}
.bm-step-track {
  position: absolute;
  top: 34px; left: calc(24px + 36px); right: calc(24px + 36px);
  height: 2px; background: #EEE; z-index: 0;
}
.bm-step-fill { height: 100%; background: var(--gold); border-radius: 2px; transition: width 0.4s; }
.bm-step-item { display: flex; flex-direction: column; align-items: center; gap: 5px; z-index: 1; position: relative; }
.bm-step-dot {
  width: 28px; height: 28px; border-radius: 50%;
  background: #F0EDE5; border: 2px solid #DDD;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne',sans-serif; font-size: 0.72rem; font-weight: 700; color: #AAA;
  transition: all 0.3s;
}
.bm-step-item.active .bm-step-dot  { background: var(--gold); border-color: var(--gold); color: #fff; }
.bm-step-item.done .bm-step-dot    { background: var(--forest); border-color: var(--forest); color: #fff; }
.bm-step-item small { font-family: 'Syne',sans-serif; font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: #BBB; }
.bm-step-item.active small { color: var(--charcoal); }

/* ── Info panel ── */
.bm-info {
  grid-area: info;
  padding: 32px 24px;
  background: #FAFAF8;
  border-right: 1px solid #ECEAE4;
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.bm-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 22px; }
.bm-logo span { font-family: 'Syne',sans-serif; font-size: 0.82rem; font-weight: 700; color: #1A1A1A; }
.bm-logo em { font-style: normal; color: var(--forest); }
.bm-info-type { font-family: 'Syne',sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
.bm-info-title { font-family: 'Cormorant Garamond',serif; font-size: 1.65rem; font-weight: 400; color: #1A1A1A; line-height: 1.15; margin-bottom: 18px; }
.bm-info-meta { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.bm-meta-row { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #666; }
.bm-info-desc { font-size: 0.77rem; line-height: 1.68; color: #888; margin-bottom: 18px; }
.bm-info-features { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
.bm-if { display: flex; align-items: center; gap: 7px; font-size: 0.74rem; color: #555; }
.bm-info-divider { height: 1px; background: #ECEAE4; margin-bottom: 14px; }
.bm-info-note { font-size: 0.7rem; color: #BBB; line-height: 1.5; margin-top: auto; }

/* ── Calendar ── */
.bm-cal-panel {
  grid-area: cal;
  padding: 32px 24px;
  border-right: 1px solid #ECEAE4;
  background: #FFFFFF;
  overflow-y: auto;
}
.bm-cal-nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.bm-cal-nav-row h4 { font-family: 'Syne',sans-serif; font-size: 0.95rem; font-weight: 700; color: #1A1A1A; }
.bm-cal-arrows { display: flex; gap: 4px; }
.bm-cal-arrows button { width: 28px; height: 28px; border-radius: 6px; background: #F5F3EE; border: 1px solid #E8E5DE; color: #666; display: flex; align-items: center; justify-content: center; transition: background 0.2s, color 0.2s; }
.bm-cal-arrows button:hover:not(:disabled) { background: #F0EDE5; color: var(--forest); }
.bm-cal-arrows button:disabled { opacity: 0.3; }
.bm-wdays { display: grid; grid-template-columns: repeat(7,1fr); margin-bottom: 6px; }
.bm-wdays span { text-align: center; font-family: 'Syne',sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.06em; color: #CCC; padding: 3px 0; }
.bm-cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
.bm-day {
  aspect-ratio: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border-radius: 7px; font-family: 'Syne',sans-serif; font-size: 0.8rem;
  color: #CCC; position: relative;
  transition: background 0.15s, color 0.15s;
}
.bm-day.available { color: #1A1A1A; cursor: none; }
.bm-day.available:hover { background: #F5F0E8; color: var(--forest); }
.bm-day.today { border: 1.5px solid var(--gold); color: #C9A84C; font-weight: 700; }
.bm-day.selected { background: var(--forest) !important; color: #FDFAF5 !important; font-weight: 700; border-radius: 7px; }
.bm-day.past, .bm-day.weekend { color: #DDD; }
.today-pip { position: absolute; bottom: 3px; width: 3px; height: 3px; border-radius: 50%; background: var(--gold); }
.bm-day.selected .today-pip { background: rgba(255,255,255,0.5); }
.bm-cal-footer { margin-top: 14px; padding-top: 12px; border-top: 1px solid #F0EDE5; display: flex; align-items: center; gap: 6px; font-size: 0.7rem; color: #BBB; font-family: 'Syne',sans-serif; }

/* ── Times panel ── */
.bm-times-panel {
  grid-area: times;
  padding: 32px 20px;
  background: #FFFFFF;
  overflow-y: auto;
  display: flex; flex-direction: column;
}
.bm-times-hd { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.bm-sel-date strong { display: block; font-family: 'Syne',sans-serif; font-size: 0.88rem; font-weight: 700; color: #1A1A1A; margin-bottom: 2px; }
.bm-sel-date span { font-size: 0.72rem; color: #999; }
.bm-fmt-toggle { display: flex; border: 1px solid #E8E5DE; border-radius: 6px; overflow: hidden; width: fit-content; }
.bm-fmt-toggle button { font-family: 'Syne',sans-serif; font-size: 0.68rem; font-weight: 600; padding: 5px 12px; background: transparent; border: none; color: #AAA; transition: background 0.2s, color 0.2s; }
.bm-fmt-toggle button.active { background: var(--forest); color: #FDFAF5; }

.bm-slot-list { display: flex; flex-direction: column; gap: 7px; overflow-y: auto; flex: 1; }
.bm-slot {
  width: 100%; padding: 10px 14px; text-align: left;
  background: #FAFAF8; border: 1.5px solid #E8E5DE;
  color: #333; font-family: 'Syne',sans-serif; font-size: 0.85rem; font-weight: 600;
  border-radius: 7px;
  transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s;
}
.bm-slot:hover { background: #F0EDE5; border-color: var(--gold); color: var(--forest); transform: translateX(3px); }

/* ── Confirm form ── */
.bm-confirm { display: flex; flex-direction: column; gap: 10px; flex: 1; overflow-y: auto; }
.bm-confirm-summary {
  background: #F8F5EE; border: 1px solid #E8E5DC;
  border-radius: 7px; padding: 12px 14px;
  display: flex; flex-direction: column; gap: 7px;
}
.bcs-row { display: flex; align-items: center; gap: 7px; font-size: 0.76rem; color: #555; font-family: 'Syne',sans-serif; }
.bm-retime { background: none; border: none; font-family: 'Syne',sans-serif; font-size: 0.7rem; color: #AAA; padding: 0; text-align: left; transition: color 0.2s; }
.bm-retime:hover { color: var(--forest); }
.bm-form { display: flex; flex-direction: column; gap: 9px; }
.bm-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.bm-field { display: flex; flex-direction: column; gap: 4px; }
.bm-field label { font-family: 'Syne',sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #999; }
.bm-field label span { color: #CCC; font-weight: 400; text-transform: none; letter-spacing: 0; }
.bm-field input, .bm-field select, .bm-field textarea {
  background: #FAFAF8; border: 1.5px solid #E8E5DE;
  color: #1A1A1A; font-family: 'DM Sans',sans-serif; font-size: 0.82rem;
  padding: 9px 11px; border-radius: 6px; outline: none; resize: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.bm-field input:focus, .bm-field select:focus, .bm-field textarea:focus {
  border-color: var(--forest); box-shadow: 0 0 0 3px rgba(28,58,43,0.08);
}
.bm-field select option { background: #FFFFFF; color: #1A1A1A; }
.bm-submit {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 13px;
  background: var(--forest); color: #FDFAF5;
  font-family: 'Syne',sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em;
  border: none; border-radius: 7px;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.bm-submit:hover:not(:disabled) { background: var(--forest-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(28,58,43,0.2); }
.bm-submit:disabled { opacity: 0.35; }

/* ── Success ── */
.bm-success {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 10px; flex: 1; justify-content: center; padding: 16px 0;
}
.bm-success-ring {
  width: 64px; height: 64px; border-radius: 50%;
  background: #F0EDE5;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 4px;
}
.bm-success h4 { font-family: 'Cormorant Garamond',serif; font-size: 1.5rem; font-weight: 500; color: var(--forest); }
.bm-success p { font-family: 'Syne',sans-serif; font-size: 0.85rem; font-weight: 600; color: #333; line-height: 1.5; }
.bm-success small { font-size: 0.72rem; color: #AAA; }
.bm-success small em { color: var(--forest); font-style: normal; }
.bm-done { margin-top: 8px; padding: 10px 28px; background: var(--forest); color: #FDFAF5; font-family: 'Syne',sans-serif; font-size: 0.78rem; font-weight: 700; border: none; border-radius: 6px; transition: background 0.2s; }
.bm-done:hover { background: var(--forest-light); }

/* ── Mobile nav (hidden desktop) ── */
.bm-mob-nav { grid-area: mobnav; display: none; }

/* ── Transition ── */
.modal-fade-enter-active { transition: opacity 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
.modal-fade-leave-active { transition: opacity 0.2s, transform 0.2s ease; }
.modal-fade-enter-from   { opacity: 0; transform: scale(0.96) translateY(16px); }
.modal-fade-leave-to     { opacity: 0; transform: scale(0.97); }

/* ══════════════════════════
   MOBILE  ≤ 820px
   ══════════════════════════ */
@media (max-width: 820px) {
  .bm-backdrop { padding: 0; align-items: flex-end; }

  .bm-modal {
    grid-template-columns: 1fr;
    grid-template-areas:
      "stepper"
      "info"
      "cal"
      "times"
      "mobnav";
    max-width: 100%;
    max-height: 93vh;
    border-radius: 18px 18px 0 0;
    box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
    overflow-y: auto;
  }

  /* Show step indicator */
  .bm-stepper {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 20px 28px 8px;
  }

  /* Compact info header */
  .bm-info {
    border-right: none; border-bottom: 1px solid #ECEAE4;
    padding: 14px 20px; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 10px;
  }
  .bm-logo { margin-bottom: 0; width: 100%; }
  .bm-info-title { font-size: 1rem; margin-bottom: 0; white-space: nowrap; }
  .bm-info-meta { flex-direction: row; gap: 12px; }
  .bm-info-meta .bm-meta-row:nth-child(3) { display: none; }  /* hide tz on mobile */
  .bm-info-type, .bm-info-desc, .bm-info-features, .bm-info-divider, .bm-info-note { display: none; }

  /* Calendar full width */
  .bm-cal-panel { border-right: none; border-bottom: 1px solid #ECEAE4; padding: 20px; }
  .bm-day { font-size: 0.88rem; }

  /* Times full width */
  .bm-times-panel { padding: 20px; max-height: none; overflow: visible; }
  .bm-slot-list { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; overflow: visible; }
  .bm-slot { transform: none !important; text-align: center; }
  .bm-row-2 { grid-template-columns: 1fr; }

  /* Mobile nav row */
  .bm-mob-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px 24px;
    border-top: 1px solid #ECEAE4;
    background: #FFFFFF;
    position: sticky; bottom: 0;
  }
  .bm-back-btn { font-family: 'Syne',sans-serif; font-size: 0.8rem; font-weight: 600; color: #AAA; background: none; border: none; padding: 0; }
  .bm-next-btn {
    font-family: 'Syne',sans-serif; font-size: 0.82rem; font-weight: 700;
    color: #FDFAF5; background: var(--forest);
    border: none; padding: 12px 24px; border-radius: 7px;
    margin-left: auto; transition: background 0.2s;
  }
  .bm-next-btn:hover { background: var(--forest-light); }
}

@media (max-width: 480px) {
  .bm-modal { max-height: 96vh; }
}
</style>
