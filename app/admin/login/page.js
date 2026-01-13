'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [isRecovery, setIsRecovery] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    // Auto-detect session (e.g. from Hash/Magic Link)
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                router.push('/admin/update-password')
            } else if (session) {
                router.push('/admin')
                router.refresh()
            }
        })
        return () => subscription.unsubscribe()
    }, [router, supabase])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        if (isRecovery) {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                // Ensure we use the Callback Route for PKCE Exchange
                redirectTo: `${window.location.origin}/auth/callback?next=/admin/update-password`,
            })
            if (error) {
                setError(error.message)
            } else {
                setMessage('Recovery link sent! Check your email.')
            }
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/admin')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="font-serif italic text-3xl">The Studio</h1>
                    <p className="font-mono text-xs text-gray-400 mt-2 uppercase tracking-widest">WECUT ADMIN</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-paper border-b border-line py-2 px-0 text-sm focus:outline-none focus:border-ink transition-colors rounded-none"
                            placeholder="admin@wecut.com"
                            required
                        />
                    </div>

                    {!isRecovery && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-paper border-b border-line py-2 px-0 text-sm focus:outline-none focus:border-ink transition-colors rounded-none"
                                required
                            />
                        </div>
                    )}

                    {error && (
                        <p className="text-red-500 text-xs font-mono">{error}</p>
                    )}

                    {message && (
                        <p className="text-green-600 text-xs font-mono">{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ink text-paper py-3 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : (isRecovery ? 'Send Recovery Link' : 'Enter Studio')}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsRecovery(!isRecovery)
                            setError(null)
                            setMessage(null)
                        }}
                        className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-ink transition-colors"
                    >
                        {isRecovery ? 'Back to Login' : 'Forgot Password?'}
                    </button>
                </form>
            </div>
        </div>
    )
}
