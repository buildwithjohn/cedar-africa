import { onMounted, onUnmounted } from 'vue'

export function useReveal(selector) {
  let observer = null
  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll(selector).forEach(el => observer.observe(el))
  })
  onUnmounted(() => { if (observer) { observer.disconnect(); observer = null } })
}
