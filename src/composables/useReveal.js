import { onMounted, onUnmounted } from 'vue'

export function useReveal(selector) {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    // Small delay so DOM is fully painted before observing
    setTimeout(() => {
      document.querySelectorAll(selector).forEach((el) => observer.observe(el))
    }, 50)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
}
