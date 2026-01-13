
import { createClient } from '../../../lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import LogoutButton from './LogoutButton' // Creating this component inline or separately? I'll create it separately for Client Component interactivity

export default async function ProtectedLayout({ children }) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/admin/login')
    }

    return (
        <div className="flex min-h-screen bg-paper">
            {/* SIDEBAR */}
            <aside className="w-64 border-r border-line hidden md:flex flex-col fixed h-full bg-paper z-10">
                <div className="p-8 border-b border-line">
                    <h1 className="font-serif italic text-2xl">Studio</h1>
                    <p className="font-mono text-[10px] text-gray-400 mt-1 uppercase tracking-widest">WECUT INTERNAL</p>
                </div>

                <nav className="flex-1 overflow-y-auto py-8">
                    <ul className="space-y-1">
                        <li>
                            <Link href="/admin" className="block px-8 py-3 text-xs font-mono uppercase tracking-[0.1em] hover:bg-gray-100 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/products" className="block px-8 py-3 text-xs font-mono uppercase tracking-[0.1em] hover:bg-gray-100 transition-colors">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/journal" className="block px-8 py-3 text-xs font-mono uppercase tracking-[0.1em] hover:bg-gray-100 transition-colors">
                                Journal
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-8 border-t border-line">
                    <div className="mb-4">
                        <p className="font-mono text-[10px] text-gray-400">LOGGED IN AS</p>
                        <p className="font-sans text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 md:ml-64 p-8 md:p-12">
                {children}
            </main>
        </div>
    )
}
