export default function Footer() {
    return (
        <footer className="w-full border-t border-foreground/10 mt-16">
            <div className="max-w-5xl mx-auto px-4 py-8 text-xs text-foreground/60 flex items-center justify-between">
                <p>© {new Date().getFullYear()} Ailika</p>
                <p>Güzel tırnaklarla mutlu günler ✨</p>
            </div>
        </footer>
    )
}
