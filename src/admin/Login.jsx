import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useApp } from '../context/AppContext'
export default function Login() {
  const { t, notify } = useApp(), nav = useNavigate()
  const [email, setEmail] = useState(''), [pw, setPw] = useState(''), [show, setShow] = useState(false), [busy, setBusy] = useState(false)
  const submit = async e => {
    e.preventDefault(); setBusy(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pw)
      if ((await user.getIdTokenResult(true)).claims.admin !== true) { await signOut(auth); notify(t('needAdmin'), 'err') }
      else nav('/admin/dashboard', { replace: true })
    } catch { notify(t('err'), 'err') } finally { setBusy(false) }
  }
  const reset = async () => { try { await sendPasswordResetEmail(auth, email); notify(t('resetSent')) } catch { notify(t('err'), 'err') } }
  return <div className="min-h-screen grid place-items-center p-4"><form onSubmit={submit} className="card p-6 w-full max-w-sm grid gap-3">
    <h1 className="text-xl font-bold text-teal-600">{t('brand')} · {t('login')}</h1>
    <label>{t('email')}<input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" /></label>
    <label>{t('password')}<div className="flex gap-2"><input className="input" type={show ? 'text' : 'password'} required value={pw} onChange={e => setPw(e.target.value)} autoComplete="current-password" />
      <button type="button" className="btn btn-ghost" onClick={() => setShow(!show)}>{show ? t('hide') : t('show')}</button></div></label>
    <button className="btn" disabled={busy}>{t('login')}</button>
    <button type="button" className="text-sm text-teal-600 underline" onClick={reset} disabled={!email}>{t('forgot')}</button></form></div>
}
