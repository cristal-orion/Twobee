import { createContext, useContext } from 'react'

const LanguageContext = createContext('it')

export function LanguageProvider({ lang, children }) {
  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

// Adds/strips the /en prefix on an internal path, preserving the rest
// (including hash/query). Used for nav links and the language switcher.
export function localePath(path, lang) {
  const bare = path.startsWith('/en') ? path.slice(3) || '/' : path
  if (lang !== 'en') return bare
  if (bare === '/') return '/en/'
  return `/en${bare}`
}
