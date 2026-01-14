import React from 'react'

export default function JournalLayout({ children, className = '' }) {
    return (
        <article className={`max-w-[720px] mx-auto px-6 md:px-0 w-full ${className}`}>
            {children}
        </article>
    )
}
