import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/ThemeProvider.jsx'
import { Moon, Sun } from 'lucide-react'

export default function Footer() {
    const { theme, toggleTheme, mounted } = useTheme()
    return (
        <footer className="relative border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="h-6 w-6 rounded-md shadow-md" />
                        <span className="font-bold text-foreground">makethumb</span>
                    </div>
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <li><a href="/docs" className="hover:text-foreground transition">Docs</a></li>
                        <li><a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-foreground transition">GitHub</a></li>
                        <li><a href="/contact" className="hover:text-foreground transition">Contact</a></li>
                        <li><a href="/privacy" className="hover:text-foreground transition">Privacy</a></li>
                        <li><a href="/terms" className="hover:text-foreground transition">Terms</a></li>
                    </ul>
                    <div className="flex items-center gap-2">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Toggle theme"
                                onClick={toggleTheme}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </Button>
                        )}
                        <p className="text-xs text-muted-foreground">© 2025 makethumb.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}   