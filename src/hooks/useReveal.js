import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to every [data-reveal] element
 * inside the component. When an element enters the viewport it gains
 * [data-visible], which triggers the CSS fade-up transition defined
 * in global.css and page-level CSS Modules.
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not([data-visible])')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-visible', '')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
