'use client'

import { useEffect } from 'react'
import { createClient } from '../../../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthRedirect() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Listen for auth state changes (which happen when the hash token is processed)
        // If we are "recovered", we are logged in.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                router.push('/admin/update-password')
            } else if (session) {
                // If we clearly have a session, assume success and check roles or redirect
                // But for recovery specifically, the event is safer. 
                // However, on page load with hash, Supabase client processes it automatically.
                // We'll give it a moment.
                router.push('/admin')
            }
        })

        return () => subscription.unsubscribe()
    }, [router, supabase])

    return (
        <div className="flex h-screen items-center justify-center bg-paper">
            <p className="font-mono text-xs animate-pulse">AUTHENTICATING...</p>
        </div>
    )
}
