import { ref, watch } from 'vue'

const isDark = ref(true) // default: dark (forest green)

export function useTheme() {
  const toggle = () => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    localStorage.setItem('chb-theme', isDark.value ? 'dark' : 'light')
  }

  const init = () => {
    const saved = localStorage.getItem('chb-theme')
    isDark.value = saved ? saved === 'dark' : true
    applyTheme(isDark.value)
  }

  return { isDark, toggle, init }
}

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}
