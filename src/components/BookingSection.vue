<template>
  <section class="booking" id="booking">
    <div class="booking-inner">
      <div class="booking-info">
        <span class="section-label reveal">Schedule a Call</span>
        <h2 class="booking-title reveal reveal-delay-1">
          Let's start building<br/><em>your future.</em>
        </h2>
        <p class="booking-sub reveal reveal-delay-2">
          Book a free 30-minute consultation with a Cedar Home Builder advisor. We'll discuss your vision, answer every question, and map out a clear plan.
        </p>
        <div class="booking-features reveal reveal-delay-3">
          <div class="bf" v-for="f in features" :key="f">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="var(--gold)" stroke-width="1"/>
              <path d="M5 8L7 10L11 6" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            <span>{{ f }}</span>
          </div>
        </div>
        <div class="contact-alts reveal reveal-delay-4">
          <a href="mailto:hello@cedarhomebuilder.com" class="contact-link" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/>
              <path d="M2 5L9 10L16 5" stroke="currentColor" stroke-width="1.2"/>
            </svg>
            hello@cedarhomebuilder.com
          </a>
          <a href="https://wa.me/2348100000000" class="contact-link" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 10.35 1.86 11.61 2.49 12.72L1.5 16.5L5.37 15.51C6.45 16.1 7.68 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z" stroke="currentColor" stroke-width="1.2"/>
            </svg>
            WhatsApp us
          </a>
        </div>
      </div>

      <!-- Calendar Widget -->
      <div class="cal-widget reveal reveal-delay-2">
        <div class="cal-header">
          <h3>Select a Date & Time</h3>
          <p>All times in your local timezone ({{ userTimezone }})</p>
        </div>

        <!-- Month navigation -->
        <div class="cal-nav">
          <button class="cal-nav-btn" @click="prevMonth" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <span class="cal-month-label">{{ monthLabel }}</span>
          <button class="cal-nav-btn" @click="nextMonth" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Days of week -->
        <div class="cal-weekdays">
          <span v-for="d in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="d">{{ d }}</span>
        </div>

        <!-- Calendar grid -->
        <div class="cal-grid">
          <div
            v-for="(day, i) in calDays"
            :key="i"
            class="cal-cell"
            :class="{
              empty: !day,
              past: day && isPast(day),
              available: day && !isPast(day) && isAvailable(day),
              selected: day && selectedDate && sameDay(day, selectedDate),
              today: day && sameDay(day, new Date()),
            }"
            @click="day && !isPast(day) && isAvailable(day) && selectDate(day)"
            @mouseenter="day && !isPast(day) && $emit('hover')"
            @mouseleave="$emit('unhover')"
          >
            <span v-if="day">{{ day.getDate() }}</span>
          </div>
        </div>

        <!-- Time slots -->
        <div class="time-slots" v-if="selectedDate">
          <p class="time-label">Available times for <strong>{{ formatDate(selectedDate) }}</strong></p>
          <div class="slots-grid">
            <button
              v-for="slot in timeSlots"
              :key="slot"
              class="slot"
              :class="{ selected: selectedTime === slot }"
              @click="selectedTime = slot"
              @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')"
            >
              {{ slot }}
            </button>
          </div>
        </div>

        <!-- Booking form -->
        <div class="booking-form" v-if="selectedDate && selectedTime">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input v-model="form.firstName" type="text" placeholder="Adaeze" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input v-model="form.lastName" type="text" placeholder="Obi" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="you@email.com" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')" />
          </div>
          <div class="form-group">
            <label>Country you're based in</label>
            <select v-model="form.country" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
              <option value="">Select country...</option>
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tell us briefly about your project</label>
            <textarea v-model="form.message" rows="3" placeholder="e.g. I want to build a 3-bedroom in Lekki Phase 1 with a budget of..." @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')"></textarea>
          </div>

          <button class="book-btn" @click="submitBooking" :disabled="!canSubmit" @mouseenter="$emit('hover')" @mouseleave="$emit('unhover')">
            <span v-if="!submitted">Confirm Booking</span>
            <span v-else>✓ Booking Confirmed!</span>
          </button>
        </div>

        <!-- Confirmation -->
        <div class="confirmation" v-if="submitted">
          <div class="conf-icon">🎉</div>
          <h4>You're booked!</h4>
          <p>Your consultation is set for <strong>{{ formatDate(selectedDate) }} at {{ selectedTime }}</strong>. Check your email for the calendar invite.</p>
        </div>

        <!-- Booking summary chip -->
        <div class="booking-summary" v-if="selectedDate && selectedTime && !submitted">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="1" stroke="var(--gold)" stroke-width="1.2"/>
            <path d="M5 1V3M11 1V3M2 6H14" stroke="var(--gold)" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <span>{{ formatDate(selectedDate) }} · {{ selectedTime }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
defineEmits(['hover', 'unhover'])

const features = [
  '100% free, no obligation',
  'Speak with a senior advisor',
  'Get a project cost estimate',
  'Understand the full process',
]

const countries = ['United Kingdom', 'United States', 'Canada', 'Germany', 'Netherlands', 'Ireland', 'Australia', 'France', 'Italy', 'Sweden', 'Norway', 'Finland', 'Other']

const now = new Date()
const viewYear = ref(now.getFullYear())
const viewMonth = ref(now.getMonth())
const selectedDate = ref(null)
const selectedTime = ref(null)
const submitted = ref(false)

const form = ref({ firstName: '', lastName: '', email: '', country: '', message: '' })

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const monthLabel = computed(() => {
  return new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calDays = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const last = new Date(viewYear.value, viewMonth.value + 1, 0)
  const days = []
  for (let i = 0; i < first.getDay(); i++) days.push(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(viewYear.value, viewMonth.value, d))
  return days
})

const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM']

const isPast = (d) => {
  const today = new Date(); today.setHours(0,0,0,0)
  return d < today
}
const isAvailable = (d) => d.getDay() !== 0 && d.getDay() !== 6
const sameDay = (a, b) => a.toDateString() === b.toDateString()
const selectDate = (d) => { selectedDate.value = d; selectedTime.value = null; submitted.value = false }
const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })

const prevMonth = () => {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- } else viewMonth.value--
}
const nextMonth = () => {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ } else viewMonth.value++
}

const canSubmit = computed(() => form.value.firstName && form.value.email && form.value.country && !submitted.value)

const submitBooking = () => {
  if (!canSubmit.value) return
  submitted.value = true
}

useReveal('.booking .reveal')
</script>

<style scoped>
.booking {
  padding: 120px 80px;
  background: var(--cream);
  position: relative;
}
.booking::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.booking-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: start;
}
.section-label { display: block; margin-bottom: 20px; }
.booking-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3.5rem);
  font-weight: 300;
  color: var(--forest);
  line-height: 1.15;
  margin-bottom: 24px;
}
.booking-title em { font-style: italic; color: var(--gold); }
.booking-sub {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--muted);
  margin-bottom: 36px;
}
.booking-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.bf { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; color: var(--forest); }
.contact-alts { display: flex; flex-direction: column; gap: 12px; }
.contact-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--muted);
  font-size: 0.88rem;
  transition: color 0.3s;
}
.contact-link:hover { color: var(--gold); }

/* Calendar widget */
.cal-widget {
  background: var(--white);
  border: 1px solid rgba(28,58,43,0.08);
  padding: 36px;
  box-shadow: 0 20px 60px rgba(28,58,43,0.06);
}
.cal-header { margin-bottom: 28px; }
.cal-header h3 { font-family: var(--font-ui); font-size: 1rem; font-weight: 700; color: var(--forest); margin-bottom: 4px; }
.cal-header p { font-size: 0.78rem; color: var(--muted); }
.cal-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.cal-nav-btn {
  width: 36px; height: 36px;
  background: transparent;
  border: 1px solid rgba(28,58,43,0.1);
  color: var(--forest);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}
.cal-nav-btn:hover { background: var(--forest); color: var(--cream); border-color: var(--forest); }
.cal-month-label { font-family: var(--font-ui); font-size: 0.9rem; font-weight: 700; color: var(--forest); }
.cal-weekdays {
  display: grid; grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}
.cal-weekdays span { text-align: center; font-family: var(--font-ui); font-size: 0.7rem; font-weight: 600; color: var(--muted); letter-spacing: 0.05em; padding: 6px 0; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 24px; }
.cal-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--charcoal);
  transition: background 0.2s, color 0.2s;
}
.cal-cell.empty { }
.cal-cell.past { color: rgba(107,123,110,0.35); }
.cal-cell.available { cursor: pointer; }
.cal-cell.available:hover { background: rgba(28,58,43,0.08); color: var(--forest); }
.cal-cell.today { border: 1px solid var(--gold); color: var(--gold); font-weight: 600; }
.cal-cell.selected { background: var(--forest); color: var(--white) !important; font-weight: 600; }

.time-label { font-family: var(--font-ui); font-size: 0.78rem; font-weight: 600; color: var(--forest); margin-bottom: 12px; letter-spacing: 0.04em; }
.time-label strong { color: var(--gold); }
.slots-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.slot {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 8px 14px;
  border: 1px solid rgba(28,58,43,0.15);
  background: transparent;
  color: var(--forest);
  transition: all 0.2s;
  letter-spacing: 0.04em;
}
.slot:hover { background: var(--forest); color: var(--white); border-color: var(--forest); }
.slot.selected { background: var(--gold); color: var(--forest-deep); border-color: var(--gold); }

.booking-form { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-family: var(--font-ui); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
.form-group input, .form-group select, .form-group textarea {
  font-family: var(--font-body);
  font-size: 0.88rem;
  padding: 12px 14px;
  border: 1px solid rgba(28,58,43,0.15);
  background: var(--cream);
  color: var(--charcoal);
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  border-color: var(--gold);
}

.book-btn {
  font-family: var(--font-ui);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--white);
  background: var(--forest);
  border: none;
  padding: 16px;
  transition: background 0.3s, transform 0.3s var(--spring);
  width: 100%;
}
.book-btn:not(:disabled):hover { background: var(--gold); color: var(--forest-deep); transform: translateY(-2px); }
.book-btn:disabled { opacity: 0.4; }

.booking-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 12px 16px;
  margin-top: 16px;
}
.booking-summary span { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 600; color: var(--forest); }

.confirmation {
  text-align: center;
  padding: 32px 20px;
  background: rgba(28,58,43,0.04);
  border: 1px solid rgba(28,58,43,0.1);
  margin-top: 20px;
}
.conf-icon { font-size: 2.5rem; margin-bottom: 12px; }
.confirmation h4 { font-family: var(--font-ui); font-size: 1.1rem; color: var(--forest); margin-bottom: 10px; }
.confirmation p { font-size: 0.88rem; line-height: 1.65; color: var(--muted); }

@media (max-width: 1000px) {
  .booking { padding: 80px 40px; }
  .booking-inner { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 600px) {
  .booking { padding: 60px 20px; }
  .cal-widget { padding: 24px 16px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
