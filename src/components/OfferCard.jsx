import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { opById, effectiveStatus, calcDiscount } from '../utils/offers'
export default function OfferCard({ o }) {
  const { t } = useApp(), op = opById(o.operatorId), st = effectiveStatus(o), d = calcDiscount(o.regularPrice, o.offerPrice)
  const badge = { active: 'bg-green-100 text-green-800', expired: 'bg-red-100 text-red-800', inactive: 'bg-slate-200 text-slate-700' }[st]
  return <article className="card overflow-hidden flex flex-col" style={{ borderTop: `4px solid ${op?.color || '#0d9488'}` }}>
    {o.imageUrl && <img src={o.imageUrl} alt="" loading="lazy" className="h-32 w-full object-cover" />}
    <div className="p-4 flex flex-col gap-2 flex-1">
      <div className="flex items-center gap-2 text-sm"><span className="w-7 h-7 rounded-full grid place-items-center text-white text-xs font-bold" style={{ background: op?.color }}>{op?.short?.[0]}</span>{o.operatorName}
        <span className={`ml-auto rounded px-2 py-0.5 text-xs ${badge}`}>{t(st)}</span></div>
      <h3 className="font-bold">{o.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{o.internetData && `${o.internetData} · `}{o.minutes && `${o.minutes} ${t('minutes')} · `}{o.sms && `${o.sms} ${t('smsL')}`}</p>
      <p className="text-sm line-clamp-2">{o.description}</p>
      <div className="flex items-baseline gap-2 mt-auto"><span className="text-2xl font-bold text-teal-600">৳{o.offerPrice}</span>
        {Number(o.regularPrice) > Number(o.offerPrice) && <s className="text-slate-500">৳{o.regularPrice}</s>}
        {d > 0 && <span className="ml-auto bg-amber-400 text-slate-900 rounded-full px-2 text-sm font-bold">-{d}%</span>}</div>
      <p className="text-xs text-slate-500">{o.validity} {t('days')} · {o.startDate} → {o.expiryDate}</p>
      <Link to={`/offer/${o.id}`} className="btn">{t('details')}</Link></div></article>
}
