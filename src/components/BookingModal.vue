<template>
  <slot :open="openModal" />

  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="bm-backdrop" @click.self="closeModal" role="dialog" aria-modal="true">
        <div class="bm-modal">

          <!-- Close -->
          <button class="bm-close" @click="closeModal" aria-label="Close modal">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Mobile step progress bar -->
          <div class="bm-steps-mobile">
            <div :class="['bm-step', { active: mobileStep >= 1, done: mobileStep > 1 }]">
              <span>1</span><small>Date</small>
            </div>
            <div class="bm-step-line" :class="{ active: mobileStep > 1 }"></div>
            <div :class="['bm-step', { active: mobileStep >= 2, done: mobileStep > 2 }]">
              <span>2</span><small>Time</small>
            </div>
            <div class="bm-step-line" :class="{ active: mobileStep > 2 }"></div>
            <div :class="['bm-step', { active: mobileStep >= 3 }]">
              <span>3</span><small>Details</small>
            </div>
          </div>

          <!-- ── INFO PANEL ─────────────────────── -->
          <div class="bm-info">
            <div class="bm-logo">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
                <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
                <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.4"/>
              </svg>
              <span>Cedar <em>Home Builder</em></span>
            </div>
            <p class="bm-meeting-type">Project Discovery Call</p>
            <h2 class="bm-meeting-title">Free<br/>Consultation</h2>
            <div class="bm-meta">
              <span>⏱ 30 min</span>
              <span>📹 Video call</span>
              <span>🆓 Free</span>
            </div>
            <p class="bm-desc">Speak with a Cedar Home Builder advisor about your project, budget, and location. No obligation.</p>
            <div class="bm-features">
              <div v-for="f in features" :key="f" class="bm-feat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="var(--gold)" stroke-width="1"/><path d="M3.5 6L5.5 8L8.5 4.5" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/></svg>
                {{ f }}
              </div>
            </div>
          </div>

          <!-- ── CALENDAR PANEL ──────────────────── -->
          <div class="bm-calendar" v-show="!isMobile || mobileStep === 1">
            <div class="bm-cal-top">
              <h3>{{ monthLabel }}</h3>
              <div class="bm-cal-nav">
                <button @click="prevMonth" :disabled="atMinMonth">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7L9 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </button>
                <button @click="nextMonth">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </button>
              </div>
            </div>

            <div class="bm-weekdays">
              <span v-for="d in ['S','M','T','W','T','F','S']" :key="d+'_wd'">{{ d }}</span>
            </div>

            <div class="bm-grid">
              <div v-for="(day, i) in calDays" :key="i"
                :class="['bm-cell', {
                  empty:     !day,
                  past:      day && isPast(day),
                  weekend:   day && isWeekend(day),
                  today:     day && isToday(day),
                  available: day && isAvailable(day),
                  selected:  day && selectedDate && sameDay(day, selectedDate),
                }]"
                @click="day && isAvailable(day) && selectDate(day)">
                <span v-if="day">{{ day.getDate() }}</span>
                <i v-if="day && isToday(day)" class="today-dot"></i>
              </div>
            </div>

            <div class="bm-cal-footer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1"/><path d="M3 6C3 7.7 4.3 9 6 9S9 7.7 9 6 7.7 3 6 3" stroke="currentColor" stroke-width="1"/></svg>
              {{ userTimezone }}
            </div>
          </div>

          <!-- ── TIME SLOTS PANEL ────────────────── -->
          <div class="bm-times" v-show="selectedDate && (!isMobile || mobileStep === 2)">
            <div class="bm-times-head">
              <div class="bm-date-pill" v-if="selectedDate">
                <strong>{{ selectedDateShort }}</strong>
                <span>{{ selectedDateYear }}</span>
              </div>
              <div class="bm-fmt-toggle">
                <button :class="{ active: fmt === '12h' }" @click="fmt = '12h'">12h</button>
                <button :class="{ active: fmt === '24h' }" @click="fmt = '24h'">24h</button>
              </div>
            </div>

            <!-- Slot list (before time picked) -->
            <div class="bm-slots" v-if="!selectedTime">
              <button v-for="slot in timeSlots" :key="slot.val"
                class="bm-slot" @click="pickTime(slot)">
                {{ fmt === '12h' ? slot.l12 : slot.l24 }}
              </button>
            </div>

            <!-- Confirm form (after time picked) -->
            <div class="bm-confirm" v-if="selectedTime && step !== 'success'">
              <div class="bm-summary">
                <div class="bm-sum-row">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="2" width="11" height="10" rx="1" stroke="var(--gold)" stroke-width="1"/><path d="M1 5.5H12M4 1V3M9 1V3" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/></svg>
                  {{ selectedDateShort }}, {{ selectedDateYear }}
                </div>
                <div class="bm-sum-row">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="var(--gold)" stroke-width="1"/><path d="M6.5 4V6.5L8.5 8" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/></svg>
                  {{ fmt === '12h' ? selectedTime.l12 : selectedTime.l24 }} · 30 min
                </div>
              </div>

              <button class="bm-retime" @click="selectedTime = null">← Different time</button>

              <form class="bm-form" @submit.prevent="submitBooking">
                <div class="bm-form-row">
                  <div class="bm-fg">
                    <label>First Name *</label>
                    <input v-model="form.firstName" type="text" placeholder="Adaeze" required />
                  </div>
                  <div class="bm-fg">
                    <label>Last Name *</label>
                    <input v-model="form.lastName" type="text" placeholder="Obi" required />
                  </div>
                </div>
                <div class="bm-fg">
                  <label>Email *</label>
                  <input v-model="form.email" type="email" placeholder="you@email.com" required />
                </div>
                <div class="bm-fg">
                  <label>Country *</label>
                  <select v-model="form.country" required>
                    <option value="" disabled>Select country...</option>
                    <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
                <div class="bm-fg">
                  <label>Your project (optional)</label>
                  <textarea v-model="form.message" rows="2" placeholder="e.g. 3-bed in Lekki, budget ₦35m…"></textarea>
                </div>
                <button type="submit" class="bm-confirm-btn" :disabled="!canSubmit">
                  Confirm Booking
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5H12M7.5 3L12 7.5L7.5 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                </button>
              </form>
            </div>

            <!-- Success -->
            <div class="bm-success" v-if="step === 'success'">
              <div class="bm-success-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="16" stroke="var(--gold)" stroke-width="1.5"/>
                  <path d="M11 18L16 23L25 13" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h4>You're booked!</h4>
              <p>{{ selectedDateShort }}, {{ selectedDateYear }}<br/>at {{ fmt === '12h' ? selectedTime.l12 : selectedTime.l24 }}</p>
              <small>A calendar invite is on its way to <em>{{ form.email }}</em></small>
              <button class="bm-close-btn" @click="closeModal">Close</button>
            </div>
          </div>

          <!-- Mobile nav buttons -->
          <div class="bm-mobile-nav">
            <button class="bm-mob-back" v-if="mobileStep > 1" @click="mobileStep--">← Back</button>
            <button class="bm-mob-next"
              v-if="mobileStep === 1 && selectedDate"
              @click="mobileStep = 2">
              Choose Time →
            </button>
            <button class="bm-mob-next"
              v-if="mobileStep === 2 && selectedTime"
              @click="mobileStep = 3">
              Fill Details →
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── State ──────────────────────────────────────
const isOpen   = ref(false)
const step     = ref('calendar')
const mobileStep = ref(1)          // 1=date, 2=time+form, 3=confirm (mobile only)
const isMobile = ref(false)

const now        = new Date()
const viewYear   = ref(now.getFullYear())
const viewMonth  = ref(now.getMonth())
const selectedDate = ref(null)
const selectedTime = ref(null)
const fmt          = ref('12h')

const form = ref({ firstName: '', lastName: '', email: '', country: '', message: '' })

const features  = ['Free, no obligation', 'Senior advisor', 'Cost estimate', 'Full process walkthrough']
const countries = ['United Kingdom','United States','Canada','Germany','Netherlands','Ireland','Australia','France','Italy','Sweden','Norway','Finland','Other']
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// ── Responsive detection ───────────────────────
const checkMobile = () => { isMobile.value = window.innerWidth <= 820 }
onMounted(() => { checkMobile(); window.addEventListener('resize', checkMobile) })
onUnmounted(() => window.removeEventListener('resize', checkMobile))

// ── Modal control ──────────────────────────────
const openModal = () => {
  isOpen.value = true
  mobileStep.value = 1
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => {
    step.value = 'calendar'; mobileStep.value = 1
    selectedDate.value = null; selectedTime.value = null
    form.value = { firstName:'', lastName:'', email:'', country:'', message:'' }
  }, 300)
}

// ── Calendar ───────────────────────────────────
const atMinMonth = computed(() =>
  viewYear.value === now.getFullYear() && viewMonth.value === now.getMonth()
)
const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
)
const calDays = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const last  = new Date(viewYear.value, viewMonth.value + 1, 0)
  const days  = []
  for (let i = 0; i < first.getDay(); i++) days.push(null)
  for (let d = 1; d <= last.getDate(); d++)
    days.push(new Date(viewYear.value, viewMonth.value, d))
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
const selectDate = d => {
  selectedDate.value = d
  selectedTime.value = null
  step.value = 'calendar'
}

// ── Date display ───────────────────────────────
const selectedDateShort = computed(() =>
  selectedDate.value?.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }) ?? ''
)
const selectedDateYear = computed(() =>
  selectedDate.value?.toLocaleDateString('en-US', { year: 'numeric' }) ?? ''
)

// ── Time slots ─────────────────────────────────
const timeSlots = [
  { val:'09:00', l12:'9:00am',  l24:'09:00' },
  { val:'09:30', l12:'9:30am',  l24:'09:30' },
  { val:'10:00', l12:'10:00am', l24:'10:00' },
  { val:'10:30', l12:'10:30am', l24:'10:30' },
  { val:'11:00', l12:'11:00am', l24:'11:00' },
  { val:'11:30', l12:'11:30am', l24:'11:30' },
  { val:'14:00', l12:'2:00pm',  l24:'14:00' },
  { val:'14:30', l12:'2:30pm',  l24:'14:30' },
  { val:'15:00', l12:'3:00pm',  l24:'15:00' },
  { val:'15:30', l12:'3:30pm',  l24:'15:30' },
  { val:'16:00', l12:'4:00pm',  l24:'16:00' },
  { val:'16:30', l12:'4:30pm',  l24:'16:30' },
]
const pickTime = slot => { selectedTime.value = slot; if (isMobile.value) mobileStep.value = 3 }

// ── Submit ─────────────────────────────────────
const canSubmit = computed(() => form.value.firstName && form.value.email && form.value.country)
const submitBooking = () => { if (canSubmit.value) step.value = 'success' }

defineExpose({ openModal })
</script>

<style scoped>
/* ── Backdrop ── */
.bm-backdrop {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(5,14,9,0.78);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

/* ── Modal shell ── */
.bm-modal {
  position: relative;
  display: grid;
  grid-template-columns: 220px 1fr 210px;
  grid-template-rows: auto;
  grid-template-areas: "info cal times";
  width: 100%; max-width: 900px;
  max-height: 88vh;
  background: var(--bg-secondary);
  border: 1px solid var(--border-gold);
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  border-radius: 4px;
  overflow: hidden;
}

.bm-close {
  position: absolute; top: 14px; right: 14px; z-index: 10;
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.bm-close:hover { background: var(--border-gold); color: var(--gold); }

/* Mobile step progress — hidden on desktop */
.bm-steps-mobile { display: none; }

/* ── Info panel ── */
.bm-info {
  grid-area: info;
  padding: 28px 22px;
  border-right: 1px solid var(--border);
  background: var(--bg-surface);
  display: flex; flex-direction: column; gap: 0;
  overflow-y: auto;
}
.bm-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 22px; }
.bm-logo span { font-family: 'Syne',sans-serif; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); }
.bm-logo em { font-style: normal; color: var(--gold); }
.bm-meeting-type { font-family: 'Syne',sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
.bm-meeting-title { font-family: 'Cormorant Garamond',Georgia,serif; font-size: 1.6rem; font-weight: 400; color: var(--text-primary); line-height: 1.15; margin-bottom: 16px; }
.bm-meta { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
.bm-meta span { font-size: 0.78rem; color: var(--text-secondary); }
.bm-desc { font-size: 0.76rem; line-height: 1.65; color: var(--text-muted); margin-bottom: 18px; }
.bm-features { display: flex; flex-direction: column; gap: 7px; margin-top: auto; }
.bm-feat { display: flex; align-items: center; gap: 7px; font-size: 0.74rem; color: var(--text-muted); }

/* ── Calendar panel ── */
.bm-calendar {
  grid-area: cal;
  padding: 28px 22px;
  border-right: 1px solid var(--border);
  overflow-y: auto;
}
.bm-cal-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.bm-cal-top h3 { font-family: 'Syne',sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
.bm-cal-nav { display: flex; gap: 6px; }
.bm-cal-nav button { width: 28px; height: 28px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-secondary); display: flex; align-items: center; justify-content: center; transition: background 0.2s, color 0.2s; }
.bm-cal-nav button:hover:not(:disabled) { background: var(--border-gold); color: var(--gold); }
.bm-cal-nav button:disabled { opacity: 0.25; }
.bm-weekdays { display: grid; grid-template-columns: repeat(7,1fr); margin-bottom: 6px; }
.bm-weekdays span { text-align: center; font-family: 'Syne',sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; color: var(--text-faint); padding: 3px 0; }
.bm-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 3px; }
.bm-cell {
  aspect-ratio: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border-radius: 6px; font-family: 'Syne',sans-serif; font-size: 0.78rem;
  color: var(--text-faint); position: relative;
  transition: background 0.15s, color 0.15s;
}
.bm-cell.available { background: var(--bg-card); color: var(--text-primary); cursor: none; }
.bm-cell.available:hover { background: var(--border-gold); color: var(--gold); }
.bm-cell.today { border: 1px solid var(--border-gold); color: var(--gold); }
.bm-cell.selected { background: var(--gold) !important; color: var(--forest-deep) !important; font-weight: 700; }
.bm-cell.past, .bm-cell.weekend { color: var(--text-faint); }
.today-dot { position: absolute; bottom: 2px; width: 3px; height: 3px; border-radius: 50%; background: var(--gold); }
.bm-cell.selected .today-dot { background: var(--forest-deep); }
.bm-cal-footer { margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border); display: flex; align-items: center; gap: 6px; font-family: 'Syne',sans-serif; font-size: 0.68rem; color: var(--text-muted); }

/* ── Time slots panel ── */
.bm-times {
  grid-area: times;
  padding: 28px 18px;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 0;
}
.bm-times-head { margin-bottom: 16px; display: flex; flex-direction: column; gap: 10px; }
.bm-date-pill { display: flex; flex-direction: column; gap: 2px; }
.bm-date-pill strong { font-family: 'Syne',sans-serif; font-size: 0.9rem; color: var(--text-primary); }
.bm-date-pill span { font-size: 0.72rem; color: var(--text-muted); }
.bm-fmt-toggle { display: flex; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; width: fit-content; }
.bm-fmt-toggle button { font-family: 'Syne',sans-serif; font-size: 0.68rem; font-weight: 600; padding: 4px 10px; background: transparent; border: none; color: var(--text-muted); transition: background 0.2s, color 0.2s; }
.bm-fmt-toggle button.active { background: var(--gold); color: var(--forest-deep); }
.bm-slots { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; }
.bm-slot {
  padding: 10px 12px; text-align: center;
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-primary); font-family: 'Syne',sans-serif; font-size: 0.82rem; font-weight: 600;
  border-radius: 4px; transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
}
.bm-slot:hover { background: var(--border-gold); border-color: var(--gold); color: var(--gold); transform: translateX(2px); }

/* ── Confirm form ── */
.bm-confirm { display: flex; flex-direction: column; gap: 10px; overflow-y: auto; flex: 1; }
.bm-summary { background: rgba(201,168,76,0.06); border: 1px solid var(--border-gold); padding: 10px 12px; border-radius: 4px; display: flex; flex-direction: column; gap: 6px; }
.bm-sum-row { display: flex; align-items: center; gap: 7px; font-size: 0.74rem; color: var(--text-secondary); font-family: 'Syne',sans-serif; }
.bm-retime { background: none; border: none; font-family: 'Syne',sans-serif; font-size: 0.68rem; color: var(--text-muted); padding: 0; text-align: left; transition: color 0.2s; }
.bm-retime:hover { color: var(--gold); }
.bm-form { display: flex; flex-direction: column; gap: 8px; }
.bm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.bm-fg { display: flex; flex-direction: column; gap: 4px; }
.bm-fg label { font-family: 'Syne',sans-serif; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
.bm-fg input, .bm-fg select, .bm-fg textarea {
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-primary); font-family: 'DM Sans',sans-serif; font-size: 0.8rem;
  padding: 8px 10px; border-radius: 3px; outline: none; resize: none;
  transition: border-color 0.2s;
}
.bm-fg input:focus, .bm-fg select:focus, .bm-fg textarea:focus { border-color: var(--gold); }
.bm-fg select option { background: var(--bg-secondary); color: var(--text-primary); }
.bm-confirm-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 12px;
  background: var(--gold); color: var(--forest-deep);
  font-family: 'Syne',sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em;
  border: none; border-radius: 3px;
  transition: background 0.2s, transform 0.2s;
}
.bm-confirm-btn:hover:not(:disabled) { background: var(--gold-light); transform: translateY(-1px); }
.bm-confirm-btn:disabled { opacity: 0.35; }

/* ── Success ── */
.bm-success { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; padding: 20px 0; flex: 1; justify-content: center; }
.bm-success-icon { margin-bottom: 6px; }
.bm-success h4 { font-family: 'Cormorant Garamond',serif; font-size: 1.5rem; font-weight: 400; color: var(--gold); }
.bm-success p { font-family: 'Syne',sans-serif; font-size: 0.82rem; color: var(--text-primary); line-height: 1.5; font-weight: 600; }
.bm-success small { font-size: 0.72rem; color: var(--text-muted); }
.bm-success small em { color: var(--gold); font-style: normal; }
.bm-close-btn { margin-top: 10px; padding: 9px 22px; background: var(--bg-card); border: 1px solid var(--border-gold); color: var(--gold); font-family: 'Syne',sans-serif; font-size: 0.75rem; font-weight: 600; border-radius: 3px; transition: background 0.2s; }
.bm-close-btn:hover { background: var(--border-gold); }

/* Mobile nav buttons — hidden on desktop */
.bm-mobile-nav { display: none; }

/* ── Transitions ── */
.modal-fade-enter-active { transition: opacity 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1); }
.modal-fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.modal-fade-enter-from   { opacity: 0; transform: scale(0.96) translateY(12px); }
.modal-fade-leave-to     { opacity: 0; transform: scale(0.97) translateY(6px); }

/* ════════════════════════════════════════════
   MOBILE — Step-by-step single-panel layout
   ════════════════════════════════════════════ */
@media (max-width: 820px) {
  .bm-backdrop { padding: 0; align-items: flex-end; }

  .bm-modal {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "steps"
      "info"
      "cal"
      "times"
      "mobnav";
    max-width: 100%;
    max-height: 92vh;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
    overflow-y: auto;
  }

  /* Step progress bar */
  .bm-steps-mobile {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; padding: 16px 24px 0;
    grid-area: steps;
  }
  .bm-step {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .bm-step span {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--bg-card); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne',sans-serif; font-size: 0.72rem; font-weight: 700;
    color: var(--text-muted);
    transition: background 0.3s, color 0.3s, border-color 0.3s;
  }
  .bm-step.active span { background: var(--gold); color: var(--forest-deep); border-color: var(--gold); }
  .bm-step.done span   { background: rgba(201,168,76,0.2); color: var(--gold); border-color: var(--border-gold); }
  .bm-step small { font-family: 'Syne',sans-serif; font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
  .bm-step-line { flex: 1; height: 1px; background: var(--border); max-width: 40px; transition: background 0.3s; margin-bottom: 12px; }
  .bm-step-line.active { background: var(--gold); }

  /* Info panel — compact horizontal on mobile */
  .bm-info {
    grid-area: info;
    border-right: none; border-bottom: 1px solid var(--border);
    padding: 16px 20px;
    flex-direction: row; flex-wrap: wrap; gap: 0;
  }
  .bm-logo { width: 100%; margin-bottom: 8px; }
  .bm-meeting-type { display: none; }
  .bm-meeting-title { font-size: 1.1rem; margin-bottom: 0; margin-right: 16px; }
  .bm-meta { flex-direction: row; gap: 12px; flex-wrap: wrap; }
  .bm-desc { display: none; }
  .bm-features { display: none; }

  /* Calendar */
  .bm-calendar {
    grid-area: cal;
    border-right: none; border-bottom: 1px solid var(--border);
    padding: 20px;
  }
  .bm-cell { font-size: 0.85rem; }

  /* Times */
  .bm-times {
    grid-area: times;
    padding: 20px;
    max-height: none;
    overflow: visible;
  }
  /* Slots grid on mobile (2 columns) */
  .bm-slots { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; overflow: visible; }
  .bm-slot { transform: none !important; }
  .bm-form-row { grid-template-columns: 1fr; }

  /* Mobile nav bar */
  .bm-mobile-nav {
    display: flex; align-items: center; justify-content: space-between;
    grid-area: mobnav;
    padding: 14px 20px 20px;
    border-top: 1px solid var(--border);
    gap: 12px;
  }
  .bm-mob-back {
    font-family: 'Syne',sans-serif; font-size: 0.78rem; font-weight: 600;
    color: var(--text-muted); background: none; border: none; padding: 0;
  }
  .bm-mob-next {
    font-family: 'Syne',sans-serif; font-size: 0.78rem; font-weight: 700;
    color: var(--forest-deep); background: var(--gold);
    border: none; padding: 11px 22px; border-radius: 3px;
    margin-left: auto;
    transition: background 0.2s;
  }
  .bm-mob-next:hover { background: var(--gold-light); }
}

@media (max-width: 480px) {
  .bm-modal { max-height: 95vh; }
  .bm-close { top: 10px; right: 10px; }
}
</style>
