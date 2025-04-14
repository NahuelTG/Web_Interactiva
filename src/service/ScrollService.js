// src/services/ScrollService.js
class ScrollService {
  constructor() {
    this.scrollElement = null
    this.callbacks = []
  }

  setScrollElement(element) {
    this.scrollElement = element
    // Notificar a todos los suscriptores que el elemento está disponible
    this.callbacks.forEach((callback) => callback(element))
  }

  onScrollElementAvailable(callback) {
    if (this.scrollElement) {
      // Si ya está disponible, llamar inmediatamente
      callback(this.scrollElement)
    } else {
      // Si no, guardar el callback para llamarlo cuando esté disponible
      this.callbacks.push(callback)
    }
  }

  scrollToPosition(pageNumber, totalPages = 30) {
    if (!this.scrollElement) {
      console.error('Elemento de scroll no disponible')
      return false
    }

    const scrollTarget = (pageNumber / totalPages) * (this.scrollElement.scrollHeight - this.scrollElement.clientHeight)

    console.log(`Navegando a página ${pageNumber}, posición: ${scrollTarget}`)

    this.scrollElement.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    })

    return true
  }
}

// Singleton instance
const scrollService = new ScrollService()
export default scrollService
