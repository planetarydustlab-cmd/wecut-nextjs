'use client'

import { createClient } from '../../../lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="w-full text-left text-[10px] font-mono uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
        >
            Log Out
        </button>
    )
}
