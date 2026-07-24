/* Invio lead condiviso via EmailJS (stesso account/template del form contatti
 * principale) + evento dataLayer per il mapping GTM. Usato da Contact.jsx,
 * Flappybee.jsx e Calcolatore.jsx così le tre landing puntano allo stesso posto. */
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_jjfdxbn'
const EMAILJS_TEMPLATE_ID = 'template_peotzqb'
const EMAILJS_PUBLIC_KEY = 'gHeKJYysSLwOsJUcT'

export function normalizePhone(raw) {
  const cleaned = String(raw || '').replace(/[\s\-().]/g, '')
  if (!cleaned) return null
  if (cleaned.startsWith('+')) return cleaned
  if (cleaned.startsWith('00')) return '+' + cleaned.slice(2)
  return '+39' + cleaned
}

export function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/)
  if (parts.length === 0) return { first: '', last: '' }
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

export function sendLeadEmail(form) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      nome: form.nome,
      azienda: form.azienda,
      email: form.email,
      telefono: form.telefono,
      messaggio: (form.messaggio || '').trim() || '(nessun messaggio)',
      reply_to: form.email,
    },
    { publicKey: EMAILJS_PUBLIC_KEY }
  )
}

export function pushLeadFormEvent({ form, formId, formLocation, sorgente, extraProps }) {
  if (typeof window === 'undefined') return
  const { first, last } = splitName(form.nome)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'form_submit',
    form_id: formId,
    form_location: formLocation,
    user_data: {
      email: form.email,
      first_name: first,
      last_name: last,
      phone_number: normalizePhone(form.telefono),
      organization: (form.azienda || '').trim() || null,
    },
    properties: {
      Sorgente: sorgente,
      Azienda: (form.azienda || '').trim() || null,
      Messaggio: (form.messaggio || '').trim() || null,
      'Data richiesta': new Date().toISOString(),
      ...extraProps,
    },
  })
}
