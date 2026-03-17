<template>
  <!-- Trigger button — rendered wherever BookingModal is placed -->
  <slot :open="openModal" />

  <!-- Backdrop + Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal" role="dialog" aria-modal="true" aria-label="Book a consultation">

          <!-- Close button -->
          <button class="modal-close" @click="closeModal" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- ── Panel 1: Info ────────────────── -->
          <div class="panel panel-info">
            <div class="panel-logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 10V28H28V10L16 2Z" stroke="var(--gold)" stroke-width="1.5" fill="none"/>
                <path d="M10 28V18H22V28" stroke="var(--gold)" stroke-width="1.5"/>
                <path d="M16 10L10 14V20H22V14L16 10Z" fill="var(--gold)" opacity="0.4"/>
              </svg>
              <span>Cedar <em>Home Builder</em></span>
            </div>

            <div class="meeting-type">Project Discovery Call</div>
            <h2 class="meeting-title">Free Consultation</h2>

            <div class="meeting-meta">
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.1"/>
                  <path d="M7.5 4V7.5L10 9" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
                </svg>
                30 minutes
              </div>
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="1" y="3" width="13" height="11" rx="1" stroke="currentColor" stroke-width="1.1"/>
                  <path d="M1 7H14" stroke="currentColor" stroke-width="1.1"/>
                  <path d="M5 1V4M10 1V4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
                </svg>
                Video Call
              </div>
              <div class="meta-item">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.1"/>
                  <path d="M4 7.5C4 9.4 5.6 11 7.5 11S11 9.4 11 7.5 9.4 4 7.5 4" stroke="currentColor" stroke-width="1.1"/>
                </svg>
                {{ userTimezone }}
              </div>
            </div>

            <p class="meeting-desc">
              Speak directly with a Cedar Home Builder advisor. We'll understand your vision, location preferences, and budget — and map out a clear path to your home.
            </p>

            <div class="meeting-features">
              <div class="mf" v-for="f in features" :key="f">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="var(--gold)" stroke-width="1"/>
                  <path d="M4 6.5L6 8.5L9.5 5" stroke="var(--gold)" stroke-width="1" stroke-linecap="round"/>
                </svg>
                {{ f }}
              </div>
            </div>
          </div>

          <!-- ── Panel 2: Calendar ────────────── -->
          <div class="panel panel-calendar" v-if="!selectedTime || step === 'calendar'">
            <div class="cal-top">
              <h3>{{ monthLabel }}</h3>
              <div class="cal-nav">
                <button @click="prevMonth" :disabled="atMinMonth" aria-label="Previous month">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </button>
                <button @click="nextMonth" aria-label="Next month">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="cal-weekdays">
              <span v-for="d in ['SUN','MON','TUE','WED','THU','FRI','SAT']" :key="d">{{ d }}</span>
            </div>

            <div class="cal-grid">
              <div
                v-for="(day, i) in calDays" :key="i"
                :class="['cal-cell', {
                  empty:    !day,
                  past:     day && isPast(day),
                  weekend:  day && isWeekend(day),
                  today:    day && isToday(day),
                  selected: day && selectedDate && sameDay(day, selectedDate),
                  available: day && isAvailable(day),
                }]"
                @click="day && isAvailable(day) && selectDate(day)"
                :aria-label="day ? formatDate(day) : ''"
              >
                <span v-if="day">{{ day.getDate() }}</span>
                <span v-if="day && isToday(day)" class="today-dot"></span>
              </div>
            </div>

            <div class="cal-footer">
              <span class="tz-label">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1"/>
                  <path d="M3.5 6.5C3.5 8.2 4.8 9.5 6.5 9.5S9.5 8.2 9.5 6.5 8.2 3.5 6.5 3.5" stroke="currentColor" stroke-width="1"/>
                </svg>
                {{ userTimezone }}
              </span>
            </div>
          </div>

          <!-- ── Panel 3: Time slots ──────────── -->
          <Transition name="slide-in">
            <div class="panel panel-times" v-if="selectedDate">
              <div class="times-header">
                <div class="selected-date-display">
                  <span class="sdd-day">{{ selectedDateDay }}</span>
                  <div>
                    <strong>{{ selectedDateFull }}</strong>
                    <span>{{ selectedDateMonth }}</span>
                  </div>
                </div>
                <div class="time-format-toggle">
                  <button :class="{ active: timeFormat === '12h' }" @click="timeFormat = '12h'">12h</button>
                  <button :class="{ active: timeFormat === '24h' }" @click="timeFormat = '24h'">24h</button>
                </div>
              </div>

              <div class="slots-list" v-if="!selectedTime">
                <button
                  v-for="slot in timeSlots" :key="slot.val"
                  class="slot-btn"
                  @click="pickTime(slot)"
                >
                  {{ timeFormat === '12h' ? slot.label12 : slot.label24 }}
                </button>
              </div>

              <!-- Confirm step -->
              <div class="confirm-step" v-if="selectedTime && step === 'confirm'">
                <div class="confirm-summary">
                  <div class="cs-row">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1" stroke="var(--gold)" stroke-width="1.1"/><path d="M1 6H13M4 1V3M10 1V3" stroke="var(--gold)" stroke-width="1.1" stroke-linecap="round"/></svg>
                    {{ selectedDateFull }}, {{ selectedDateMonth }}
                  </div>
                  <div class="cs-row">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--gold)" stroke-width="1.1"/><path d="M7 4V7L9.5 8.5" stroke="var(--gold)" stroke-width="1.1" stroke-linecap="round"/></svg>
                    {{ timeFormat === '12h' ? selectedTime.label12 : selectedTime.label24 }} · 30 min
                  </div>
                  <div class="cs-row">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--gold)" stroke-width="1.1"/><path d="M4 7C4 8.7 5.3 10 7 10S10 8.7 10 7 8.7 4 7 4" stroke="var(--gold)" stroke-width="1.1"/></svg>
                    {{ userTimezone }}
                  </div>
                </div>

                <button class="back-btn" @click="selectedTime = null; step = 'calendar'">
                  ← Pick a different time
                </button>

                <form class="confirm-form" @submit.prevent="submitBooking">
                  <div class="form-row">
                    <div class="fg">
                      <label>First Name *</label>
                      <input v-model="form.firstName" type="text" placeholder="Adaeze" required />
                    </div>
                    <div class="fg">
                      <label>Last Name *</label>
                      <input v-model="form.lastName" type="text" placeholder="Obi" required />
                    </div>
                  </div>
                  <div class="fg">
                    <label>Email *</label>
                    <input v-model="form.email" type="email" placeholder="you@email.com" required />
                  </div>
                  <div class="fg">
                    <label>Country you're based in *</label>
                    <select v-model="form.country" required>
                      <option value="" disabled>Select country...</option>
                      <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                    </select>
                  </div>
                  <div class="fg">
                    <label>Tell us about your project</label>
                    <textarea v-model="form.message" rows="2" placeholder="e.g. 3-bedroom in Lekki, budget of ₦35m…"></textarea>
                  </div>
                  <button type="submit" class="confirm-btn" :disabled="!canSubmit">
                    Confirm Booking
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                    </svg>
                  </button>
                </form>
              </div>

              <!-- Success state -->
              <div class="success-state" v-if="step === 'success'">
                <div class="success-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="var(--gold)" stroke-width="1.5"/>
                    <path d="M10 16L14 20L22 12" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h4>You're booked!</h4>
                <p>Your consultation is confirmed for</p>
                <strong>{{ selectedDateFull }}, {{ selectedDateMonth }}<br/>at {{ timeFormat === '12h' ? selectedTime.label12 : selectedTime.label24 }}</strong>
                <p class="success-sub">A calendar invite has been sent to <em>{{ form.email }}</em>. We look forward to speaking with you.</p>
                <button class="close-success-btn" @click="closeModal">Close</button>
              </div>
            </div>
          </Transition>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const isOpen  = ref(false)
const step    = ref('calendar')     // 'calendar' | 'confirm' | 'success'

// ── Calendar state ────────────────────────────
const now        = new Date()
const viewYear   = ref(now.getFullYear())
const viewMonth  = ref(now.getMonth())
const selectedDate = ref(null)
const selectedTime = ref(null)
const timeFormat  = ref('12h')

// ── Form state ────────────────────────────────
const form = ref({ firstName: '', lastName: '', email: '', country: '', message: '' })
const countries = ['United Kingdom','United States','Canada','Germany','Netherlands',
  'Ireland','Australia','France','Italy','Sweden','Norway','Finland','Other']

const features = ['100% free, no obligation','Speak with a senior advisor','Get a cost estimate','Understand the full process']

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// ── Open / close ──────────────────────────────
const openModal  = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  // reset after close animation
  setTimeout(() => {
    step.value = 'calendar'
    selectedDate.value = null
    selectedTime.value = null
    form.value = { firstName: '', lastName: '', email: '', country: '', message: '' }
  }, 300)
}

// ── Calendar logic ────────────────────────────
const atMinMonth = computed(() => viewYear.value === now.getFullYear() && viewMonth.value === now.getMonth())

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

const isPast     = (d) => { const t = new Date(); t.setHours(0,0,0,0); return d < t }
const isWeekend  = (d) => d.getDay() === 0 || d.getDay() === 6
const isAvailable = (d) => !isPast(d) && !isWeekend(d)
const isToday    = (d) => sameDay(d, new Date())
const sameDay    = (a, b) => a.toDateString() === b.toDateString()
const formatDate = (d) => d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })

const prevMonth = () => {
  if (atMinMonth.value) return
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}
const nextMonth = () => {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

const selectDate = (d) => {
  selectedDate.value = d
  selectedTime.value = null
  step.value = 'calendar'
}

// ── Selected date display ─────────────────────
const selectedDateDay   = computed(() => selectedDate.value?.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() ?? '')
const selectedDateFull  = computed(() => selectedDate.value?.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' }) ?? '')
const selectedDateMonth = computed(() => selectedDate.value?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) ?? '')

// ── Time slots ────────────────────────────────
const timeSlots = [
  { val: '09:00', label12: '9:00am',  label24: '09:00' },
  { val: '09:30', label12: '9:30am',  label24: '09:30' },
  { val: '10:00', label12: '10:00am', label24: '10:00' },
  { val: '10:30', label12: '10:30am', label24: '10:30' },
  { val: '11:00', label12: '11:00am', label24: '11:00' },
  { val: '11:30', label12: '11:30am', label24: '11:30' },
  { val: '14:00', label12: '2:00pm',  label24: '14:00' },
  { val: '14:30', label12: '2:30pm',  label24: '14:30' },
  { val: '15:00', label12: '3:00pm',  label24: '15:00' },
  { val: '15:30', label12: '3:30pm',  label24: '15:30' },
  { val: '16:00', label12: '4:00pm',  label24: '16:00' },
  { val: '16:30', label12: '4:30pm',  label24: '16:30' },
]

const pickTime = (slot) => {
  selectedTime.value = slot
  step.value = 'confirm'
}

// ── Submit ────────────────────────────────────
const canSubmit = computed(() =>
  form.value.firstName && form.value.email && form.value.country
)

const submitBooking = () => {
  if (!canSubmit.value) return
  step.value = 'success'
}

// Expose openModal so parent can trigger via ref
defineExpose({ openModal })
</script>

<style scoped>
/* ── Backdrop ──────────────────────────────────────── */
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(5, 14, 9, 0.82);
  backdrop-filter: blur(6px);
  z-index: 9000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}

/* ── Modal shell ───────────────────────────────────── */
.modal {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  background: #0c1a12;
  border: 1px solid rgba(201,168,76,0.18);
  box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.06);
  overflow: hidden;
  border-radius: 2px;
}

/* ── Close ─────────────────────────────────────────── */
.modal-close {
  position: absolute; top: 18px; right: 18px;
  width: 36px; height: 36px;
  background: rgba(247,242,232,0.05);
  border: 1px solid rgba(247,242,232,0.1);
  border-radius: 50%;
  color: rgba(247,242,232,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.modal-close:hover { background: rgba(201,168,76,0.1); color: var(--gold); border-color: rgba(201,168,76,0.3); }

/* ── Panels base ───────────────────────────────────── */
.panel {
  padding: 36px 30px;
  overflow-y: auto;
  flex-shrink: 0;
}

/* ── Panel 1: Info ─────────────────────────────────── */
.panel-info {
  width: 240px;
  border-right: 1px solid rgba(247,242,232,0.07);
  display: flex; flex-direction: column; gap: 0;
}
.panel-logo {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 28px;
}
.panel-logo span { font-family: var(--font-ui); font-size: 0.85rem; font-weight: 700; color: var(--cream); }
.panel-logo em { font-style: normal; color: var(--gold); }
.meeting-type {
  font-family: var(--font-ui); font-size: 0.65rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 8px;
}
.meeting-title {
  font-family: var(--font-display); font-size: 1.6rem; font-weight: 400;
  color: var(--cream); line-height: 1.2; margin-bottom: 24px;
}
.meeting-meta { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.meta-item {
  display: flex; align-items: center; gap: 9px;
  font-size: 0.82rem; color: rgba(247,242,232,0.55);
}
.meeting-desc { font-size: 0.8rem; line-height: 1.7; color: rgba(247,242,232,0.38); margin-bottom: 24px; }
.meeting-features { display: flex; flex-direction: column; gap: 8px; margin-top: auto; }
.mf { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: rgba(247,242,232,0.45); }

/* ── Panel 2: Calendar ─────────────────────────────── */
.panel-calendar {
  flex: 1;
  border-right: 1px solid rgba(247,242,232,0.07);
  min-width: 0;
}
.cal-top {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.cal-top h3 {
  font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--cream);
}
.cal-nav { display: flex; gap: 6px; }
.cal-nav button {
  width: 32px; height: 32px;
  background: rgba(247,242,232,0.05);
  border: 1px solid rgba(247,242,232,0.1);
  color: rgba(247,242,232,0.5);
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
}
.cal-nav button:hover:not(:disabled) { background: rgba(201,168,76,0.12); color: var(--gold); border-color: rgba(201,168,76,0.3); }
.cal-nav button:disabled { opacity: 0.25; }

.cal-weekdays {
  display: grid; grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}
.cal-weekdays span {
  text-align: center; font-family: var(--font-ui); font-size: 0.62rem;
  font-weight: 700; letter-spacing: 0.08em;
  color: rgba(247,242,232,0.25); padding: 4px 0;
}
.cal-grid {
  display: grid; grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.cal-cell {
  aspect-ratio: 1;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border-radius: 6px;
  font-family: var(--font-ui); font-size: 0.82rem;
  color: rgba(247,242,232,0.25);
  position: relative;
  transition: background 0.15s, color 0.15s;
}
.cal-cell.past, .cal-cell.weekend { color: rgba(247,242,232,0.15); }
.cal-cell.available {
  background: rgba(247,242,232,0.05);
  color: var(--cream);
  cursor: none;
}
.cal-cell.available:hover { background: rgba(201,168,76,0.12); color: var(--gold); }
.cal-cell.today { border: 1px solid rgba(201,168,76,0.4); color: var(--gold); }
.cal-cell.selected { background: var(--gold) !important; color: var(--forest-deep) !important; font-weight: 700; }
.today-dot {
  position: absolute; bottom: 3px;
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--gold);
}
.cal-cell.selected .today-dot { background: var(--forest-deep); }

.cal-footer { margin-top: 16px; padding-top: 14px; border-top: 1px solid rgba(247,242,232,0.06); }
.tz-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.72rem; color: rgba(247,242,232,0.3);
  font-family: var(--font-ui);
}

/* ── Panel 3: Times ────────────────────────────────── */
.panel-times { width: 220px; display: flex; flex-direction: column; gap: 0; }
.times-header { margin-bottom: 20px; }
.selected-date-display {
  display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
}
.sdd-day {
  font-family: var(--font-display); font-size: 2rem; font-weight: 400;
  color: var(--gold); line-height: 1;
}
.selected-date-display strong { display: block; font-family: var(--font-ui); font-size: 0.82rem; color: var(--cream); }
.selected-date-display span { font-size: 0.72rem; color: rgba(247,242,232,0.4); }

.time-format-toggle {
  display: flex; border: 1px solid rgba(247,242,232,0.1); border-radius: 4px; overflow: hidden; width: fit-content;
}
.time-format-toggle button {
  font-family: var(--font-ui); font-size: 0.7rem; font-weight: 600;
  padding: 5px 12px; background: transparent;
  color: rgba(247,242,232,0.35);
  border: none;
  transition: background 0.2s, color 0.2s;
}
.time-format-toggle button.active { background: var(--gold); color: var(--forest-deep); }

.slots-list { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; max-height: 420px; padding-right: 4px; }
.slot-btn {
  width: 100%; padding: 11px 14px;
  background: rgba(247,242,232,0.05);
  border: 1px solid rgba(247,242,232,0.1);
  color: var(--cream);
  font-family: var(--font-ui); font-size: 0.85rem; font-weight: 600;
  text-align: center; border-radius: 4px;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s var(--spring);
}
.slot-btn:hover { background: rgba(201,168,76,0.12); border-color: rgba(201,168,76,0.35); color: var(--gold); transform: translateX(2px); }

/* ── Confirm step ──────────────────────────────────── */
.confirm-step { display: flex; flex-direction: column; gap: 14px; flex: 1; }
.confirm-summary {
  background: rgba(201,168,76,0.06);
  border: 1px solid rgba(201,168,76,0.15);
  padding: 14px; border-radius: 4px;
  display: flex; flex-direction: column; gap: 8px;
}
.cs-row { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: rgba(247,242,232,0.65); font-family: var(--font-ui); }
.back-btn {
  background: none; border: none;
  font-family: var(--font-ui); font-size: 0.72rem;
  color: rgba(247,242,232,0.35); text-align: left;
  transition: color 0.2s;
  padding: 0;
}
.back-btn:hover { color: var(--gold); }

.confirm-form { display: flex; flex-direction: column; gap: 10px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.fg { display: flex; flex-direction: column; gap: 4px; }
.fg label { font-family: var(--font-ui); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(247,242,232,0.35); }
.fg input, .fg select, .fg textarea {
  background: rgba(247,242,232,0.04);
  border: 1px solid rgba(247,242,232,0.1);
  color: var(--cream); font-family: var(--font-body); font-size: 0.82rem;
  padding: 9px 10px; border-radius: 3px;
  outline: none; resize: none;
  transition: border-color 0.2s;
}
.fg input:focus, .fg select:focus, .fg textarea:focus { border-color: rgba(201,168,76,0.4); }
.fg select option { background: #0c1a12; color: var(--cream); }

.confirm-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 13px;
  background: var(--gold); color: var(--forest-deep);
  font-family: var(--font-ui); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em;
  border: none; border-radius: 3px;
  transition: background 0.2s, transform 0.2s var(--spring);
}
.confirm-btn:not(:disabled):hover { background: var(--gold-light); transform: translateY(-1px); }
.confirm-btn:disabled { opacity: 0.4; }

/* ── Success ───────────────────────────────────────── */
.success-state {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 10px; padding: 20px 0; flex: 1; justify-content: center;
}
.success-icon { margin-bottom: 8px; }
.success-state h4 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400; color: var(--gold); }
.success-state p { font-size: 0.78rem; color: rgba(247,242,232,0.45); line-height: 1.5; }
.success-state strong { font-family: var(--font-ui); font-size: 0.85rem; color: var(--cream); line-height: 1.6; }
.success-sub { font-size: 0.75rem !important; margin-top: 4px; }
.success-sub em { color: var(--gold); font-style: normal; }
.close-success-btn {
  margin-top: 12px; padding: 10px 24px;
  background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.25);
  color: var(--gold); font-family: var(--font-ui); font-size: 0.78rem; font-weight: 600;
  border-radius: 3px; transition: background 0.2s;
}
.close-success-btn:hover { background: rgba(201,168,76,0.18); }

/* ── Transitions ───────────────────────────────────── */
.modal-enter-active { transition: opacity 0.35s var(--ease-out-expo), transform 0.35s var(--ease-out-expo); }
.modal-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.modal-enter-from  { opacity: 0; transform: scale(0.96) translateY(16px); }
.modal-leave-to    { opacity: 0; transform: scale(0.97) translateY(8px); }

.slide-in-enter-active { transition: opacity 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo); }
.slide-in-enter-from   { opacity: 0; transform: translateX(20px); }

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 820px) {
  .modal { flex-direction: column; max-height: 95vh; max-width: 480px; }
  .panel-info { width: 100%; border-right: none; border-bottom: 1px solid rgba(247,242,232,0.07); padding: 24px; }
  .meeting-features { display: none; }
  .panel-calendar { border-right: none; border-bottom: 1px solid rgba(247,242,232,0.07); padding: 24px; }
  .panel-times { width: 100%; padding: 24px; }
  .slots-list { max-height: 220px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
}
@media (max-width: 480px) {
  .modal-backdrop { padding: 0; align-items: flex-end; }
  .modal { max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>
