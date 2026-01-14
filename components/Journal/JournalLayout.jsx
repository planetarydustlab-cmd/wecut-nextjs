export default function JournalLayout({ children, className = '' }) {
    // max-w-[720px] is the strict reading column.
    // We add 'relative' to allow absolute sidebar notes to anchor to this container.
    // We do NOT hide overflow, so the notes can sit in the "gutter".
    return (
        <article className={`max-w-[720px] mx-auto px-6 md:px-0 w-full relative ${className}`}>
            {children}
        </article>
    )
}
