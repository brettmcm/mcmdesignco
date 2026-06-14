export const SCROLL_ANIMATION_DURATION = 1050

export function easeInOutQuint(progress) {
  return progress < 0.5
    ? 16 * progress ** 5
    : 1 - ((-2 * progress + 2) ** 5) / 2
}

export function animateScrollTo(targetY, { onComplete } = {}) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const startY = window.scrollY
  const distance = targetY - startY

  if (prefersReducedMotion || distance === 0) {
    window.scrollTo(0, targetY)
    onComplete?.()
    return
  }

  let startTime = null

  const step = (timestamp) => {
    if (startTime === null) startTime = timestamp

    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / SCROLL_ANIMATION_DURATION, 1)
    const easedProgress = easeInOutQuint(progress)

    window.scrollTo(0, startY + distance * easedProgress)

    if (progress < 1) {
      window.requestAnimationFrame(step)
    } else {
      onComplete?.()
    }
  }

  window.requestAnimationFrame(step)
}

export function animateScrollToElement(target, options) {
  animateScrollTo(window.scrollY + target.getBoundingClientRect().top, options)
}
