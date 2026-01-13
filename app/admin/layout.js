export const metadata = {
    title: 'Studio | WECUT',
    description: 'Admin Dashboard',
}

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-paper text-ink font-sans selection:bg-gray-200">
            {children}
        </div>
    )
}
