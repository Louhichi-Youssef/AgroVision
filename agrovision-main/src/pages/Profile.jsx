import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Profile = () => {
  const { user } = useAuth()
  const { cartCount, favorites } = useCart()
  const navigate = useNavigate()

  const [sellerStatus, setSellerStatus] = useState('none')

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    if (!user) {
      navigate('/signin', { state: { from: '/profile' } })
    }
  }, [navigate, user])

  useEffect(() => {
    const fetchSellerState = async () => {
      if (!user?.id) return
      try {
        const response = await fetch(`${API_BASE_URL}/api/seller/requests`)
        if (!response.ok) return

        const requests = await response.json()
        const myRequest = requests.find((req) => {
          const reqUserId = req?.user?._id || req?.user
          return String(reqUserId) === String(user.id)
        })

        if (myRequest) {
          setSellerStatus(myRequest.status || 'pending')
        }
      } catch (_) {
        // Keep default status when API is unavailable.
      }
    }

    fetchSellerState()
  }, [API_BASE_URL, user?.id])

  const scanCount = useMemo(() => {
    if (!user) return 0
    const scanOwner = user.id || user.email || 'guest'
    const key = `agrovision_scan_count_${scanOwner}`
    return Number(localStorage.getItem(key) || 0)
  }, [user])

  if (!user) return null

  const displayName = user.fullName || user.name || 'Utilisateur'
  const email = user.email || 'Email non disponible'
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const purchaseState = cartCount > 0 ? 'Actif' : 'Aucun achat en cours'
  const hasSaleActivity = user.role === 'admin' || user.role === 'seller' || sellerStatus !== 'none'
  const saleState = hasSaleActivity ? 'Actif' : 'Aucune vente'

  return (
    <main className="min-h-[calc(100vh-6rem)] px-4 md:px-8 py-8 md:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
              {initials}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">{displayName}</h1>
              <p className="text-slate-500 mt-1">{email}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium">
                Role: {user.role || 'user'}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <article className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Achat marketplace</p>
            <p className="text-xl font-semibold text-slate-900 mt-2">{purchaseState}</p>
            <p className="text-sm text-slate-500 mt-1">{cartCount} article(s) dans le panier</p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Vente marketplace</p>
            <p className="text-xl font-semibold text-slate-900 mt-2">{saleState}</p>
            <p className="text-sm text-slate-500 mt-1">
              Statut vendeur: {sellerStatus === 'none' ? 'non demandé' : sellerStatus}
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Scans plantes</p>
            <p className="text-xl font-semibold text-slate-900 mt-2">{scanCount}</p>
            <p className="text-sm text-slate-500 mt-1">Nombre total de scans réalisés</p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Favoris</p>
            <p className="text-xl font-semibold text-slate-900 mt-2">{favorites.length}</p>
            <p className="text-sm text-slate-500 mt-1">Produits sauvegardés</p>
          </article>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Informations simples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-slate-400 mb-1">Nom complet</p>
              <p className="text-slate-800 font-medium">{displayName}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-slate-400 mb-1">Email</p>
              <p className="text-slate-800 font-medium break-all">{email}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-slate-400 mb-1">Role</p>
              <p className="text-slate-800 font-medium">{user.role || 'user'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-slate-400 mb-1">ID utilisateur</p>
              <p className="text-slate-800 font-medium break-all">{user.id || 'N/A'}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Profile

