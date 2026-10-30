import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { usePublicOffers } from '../hooks'
import { OPERATORS, effectiveStatus } from '../utils/offers'
export default function Home() {
  const { t } = useApp(), nav = useNavigate(), { offers } = usePublicOffers()
  const clicks = useRef(0), timer = useRef(null)
  // Hidden navigation only (NOT security): 10 consecutive clicks, each within 2s of the last
  const secret = () => {
    clearTimeout(timer.current); clicks.current += 1
    if (clicks.current >= 10) { clicks.current = 0; nav('/admin/login'); return }
    timer.current = setTimeout(() => { clicks.current = 0 }, 2000)
  }
  const live = offers.filter(o => effectiveStatus(o) === 'active')
  return <>
    <section className="rounded-2xl p-8 md:p-14 text-white bg-gradient-to-br from-teal-700 via-slate-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-teal-400/20 animate-pulse" aria-hidden />
      <h1 className="text-3xl md:text-5xl font-bold relative">{t('welcome')}</h1>
      <p className="mt-3 text-lg relative">{t('tagline')}</p>
      <div className="mt-6 flex flex-wrap gap-3 relative">
        <Link to="/search" className="btn !bg-white !text-teal-800">{t('searchOffers')}</Link>
        <button type="button" onClick={secret} className="btn btn-ghost !text-white !border-white/40">{t('customer')}</button></div>
    </section>
    <h2 className="text-xl font-bold mt-8 mb-3">{t('operators')}</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{OPERATORS.map(op => {
      const n = live.filter(o => o.operatorId === op.id).length
      return <div key={op.id} className="card p-4" style={{ borderLeft: `6px solid ${op.color}` }}>
        <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full grid place-items-center text-white font-bold" style={{ background: op.color }}>{op.short[0]}</span>
          <div><div className="font-bold">{op.name}</div><div className="text-sm text-slate-500">{n} {t('offersCount')}</div></div></div>
        <Link to={`/operator/${op.id}`} className="btn mt-3 w-full">{t('viewAll')}</Link></div> })}</div>
  </>
}
