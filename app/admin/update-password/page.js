'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Handle Implicit Flow (Hash Recovery)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setMessage({ type: 'success', text: 'Identity verified. Please set your new password.' })
            }
        })
        return () => subscription.unsubscribe()
    }, [supabase])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            setMessage({ type: 'error', text: error.message })
            setLoading(false)
        } else {
            setMessage({ type: 'success', text: 'Password updated successfully!' })
            // Redirect to admin dashboard after short delay
            setTimeout(() => {
                router.push('/admin')
            }, 1000)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-paper p-4">
            <div className="w-full max-w-md bg-white p-8 border border-line">
                <div className="mb-8 text-center">
                    <h1 className="font-serif italic text-3xl mb-2">Set New Password</h1>
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Secure Your Studio Access</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink"
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    {message && (
                        <div className={`p-4 text-xs font-mono border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ink text-paper py-3 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
