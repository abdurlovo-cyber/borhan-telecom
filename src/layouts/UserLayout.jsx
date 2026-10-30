import { useState } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
const links = [['/', 'home'], ['/offers', 'all'], ['/internet', 'internet'], ['/minutes', 'minute'], ['/combo', 'combo'], ['/sms', 'sms'], ['/latest', 'latest']]
export default function UserLayout() {
  const { t, lang, setLang, dark, setDark } = useApp(), [open, setOpen] = useState(false), nav = useNavigate()
  const cls = ({ isActive }) => `px-2 py-1 rounded ${isActive ? 'text-teal-600 font-bold' : 'hover:text-teal-600'}`
  return <div className="min-h-screen flex flex-col">
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        <Link to="/" className="font-bold text-teal-600 text-lg">{t('brand')}</Link>
        <nav className="hidden lg:flex gap-1 ml-4 text-sm">{links.map(([to, k]) => <NavLink key={to} to={to} end className={cls}>{t(k)}</NavLink>)}</nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn btn-ghost" aria-label={t('search')} onClick={() => nav('/search')}>🔍</button>
          <button className="btn btn-ghost" onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}>{lang === 'bn' ? 'EN' : 'বাং'}</button>
          <button className="btn btn-ghost" aria-label="theme" onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</button>
          <button className="btn btn-ghost lg:hidden" aria-label="menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
        </div></div>
      {open && <nav className="lg:hidden flex flex-col px-4 pb-3" onClick={() => setOpen(false)}>{links.map(([to, k]) => <NavLink key={to} to={to} end className={cls}>{t(k)}</NavLink>)}</nav>}
    </header>
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6"><Outlet /></main>
    <footer className="text-center text-sm text-slate-500 py-6">© BORHAN TELECOM · {t('footer')}</footer>
  </div>
}
