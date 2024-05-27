import { ref } from 'vue'

export const useWhatsApp = () => {
  const seeWp = () => {
    const phoneNumbers = [
      '573159274144',
      '573159275144',
      '573205855531'
    ]
    const randomIndex = Math.floor(Math.random() * phoneNumbers.length)
    const number = phoneNumbers[randomIndex]
    const message = 'Hola, vengo de la página web y me gustaría saber más sobre sus productos.'
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`
    window.open ? window.open(url, '_blank') : window.location.assign(url)
  }
  
  const showTooltip = ref(false)
  
  return {
    seeWp,
    showTooltip
  }
}
