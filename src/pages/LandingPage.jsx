

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Github,
    Rocket,
    GitBranch,
    Zap,
    Share2,
    Server,
    ShieldCheck,
    Globe,
    Lock,
    Check,
    Quote,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground scroll-smooth antialiased">
            <BackgroundDecor />

            <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <a href="#" className="flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="h-7 w-7 rounded-md shadow-md" />
                        <span className="text-sm font-semibold tracking-wide text-foreground">makethumb</span>
                    </a>
                    <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
                        <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
                        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                        <a href="#showcase" className="hover:text-foreground transition-colors">Showcase</a>
                        <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
                        {/* <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 hover:text-white transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            GitHub
                        </a> */}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:inline-flex">
                            <Button asChild variant="outline" size="sm">
                                <a href="/login">Log in</a>
                            </Button>
                        </div>
                        <Button
                            asChild
                            size="sm"
                            className=" text-primary-foreground shadow-lg"
                        >
                            <a href="/signup" className="inline-flex items-center gap-2">
                                Get Started
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </nav>
            </header>

            <main>
                <Hero />
                <HowItWorks />
                <Features />
                <Showcase />
                {/* <Testimonials /> */}
                <Pricing />
            </main>

            <Footer />
        </div>
    );
}

/* ---------- Sections ---------- */

function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 sm:pt-24 sm:pb-24">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                    <div>
                        <motion.div variants={fadeUp} className="mb-4 inline-flex">
                            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/10 px-3 py-1 text-xs text-muted-foreground">
                                <Zap className="h-3.5 w-3.5 text-primary" />
                                Deploy React apps in seconds
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground"
                        >
                            Deploy Your React App
                            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                in One Click
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground"
                        >
                            From code to live in seconds — no setup required. Connect your GitHub repository,
                            click deploy, and share your live link instantly.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Button
                                asChild
                                className="px-5 py-3 text-primary-foreground shadow-lg"
                            >
                                <a href="/signup" className="inline-flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="px-5 py-3">
                                <a href="#how-it-works" className="inline-flex items-center gap-2">
                                    Learn More
                                </a>
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="mt-8 grid grid-cols-3 gap-4 max-w-md text-center"
                        >
                            <Stat label="Deploy time" value="< 30s" />
                            <Stat label="Global regions" value="300+" />
                            <Stat label="Uptime" value="99.99%" />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={fade}
                        className="relative"
                    >
                        <HeroPreview />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function HowItWorks() {
    return (
        <section id="how-it-works" className="relative border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    className="text-center"
                >
                    <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-foreground">
                        How it Works
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-2 text-muted-foreground">
                        Three simple steps to get your React app live.
                    </motion.p>

                    <motion.div
                        variants={stagger}
                        className="mt-10 grid gap-5 sm:grid-cols-3"
                    >
                        <motion.div variants={fadeUp}>
                            <StepCard
                                icon={<GitBranch className="h-6 w-6 text-primary" />}
                                title="Connect your repo"
                                description="Sign in with GitHub and select the repository you want to deploy."
                            />
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <StepCard
                                icon={<Rocket className="h-6 w-6 text-primary" />}
                                title="Click deploy"
                                description="We detect your framework and build automatically. No config needed."
                            />
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <StepCard
                                icon={<Share2 className="h-6 w-6 text-primary" />}
                                title="Share instantly"
                                description="Get a live, globally distributed URL you can share in seconds."
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Features() {
    const items = [
        {
            icon: <Zap className="h-5 w-5 text-yellow-300" />,
            title: 'Lightning-fast deployment',
            desc: 'Build and ship in seconds with smart caching and parallel builds.',
        },
        {
            icon: <Server className="h-5 w-5 text-blue-300" />,
            title: 'Automatic builds & hosting',
            desc: 'Zero-config builds for React, Next.js, Vite, CRA, and more.',
        },
        {
            icon: <Globe className="h-5 w-5 text-cyan-300" />,
            title: 'Custom domains',
            desc: 'Bring your own domain with instant SSL and automatic redirects.',
        },
        {
            icon: <ShieldCheck className="h-5 w-5 text-emerald-300" />,
            title: 'Free SSL',
            desc: 'Security by default with managed certificates and HTTPS.',
        },
    ];

    return (
        <section id="features" className="relative border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-foreground text-center">
                        Powerful Features
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-2 text-center text-muted-foreground">
                        Everything you need to go from commit to production.
                    </motion.p>

                    <motion.div
                        variants={stagger}
                        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {items.map((f, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <FeatureCard icon={f.icon} title={f.title} description={f.desc} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Showcase() {
    return (
        <section id="showcase" className="relative border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    className="grid lg:grid-cols-2 gap-10 items-center"
                >
                    <motion.div variants={fadeUp}>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                            See it in action
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            A modern deployment experience designed for speed. The preview updates on every push,
                            so your team can collaborate with confidence.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-accent" />
                                Instant preview deployments on pull requests
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-accent" />
                                Global CDN edge caching
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-accent" />
                                Automatic rollbacks
                            </li>
                        </ul>

                        <div className="mt-6 flex items-center gap-3">
                            <Button
                                asChild
                                className="px-4 py-2 text-primary-foreground shadow-lg"
                            >
                                <a href="/new" className="inline-flex items-center gap-2">
                                    Deploy example
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="px-4 py-2">
                                <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                                    View on GitHub
                                    <Github className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <PreviewBrowser />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}


function Pricing() {
    const tiers = [
        {
            name: 'Free',
            price: '$0',
            period: '/mo',
            features: ['1 project', 'Auto builds', 'Free SSL', 'Community support'],
            cta: 'Start for free',
            highlight: false,
        },
        {
            name: 'Pro',
            price: '$5',
            period: '/mo',
            features: ['Unlimited projects', 'Custom domains', 'Preview deploys', 'Email support'],
            cta: 'Upgrade to Pro',
            highlight: true,
        },
        {
            name: 'Enterprise',
            price: 'Talk to us',
            period: '',
            features: ['SLA & SSO', 'Private networking', 'Audit logs', 'Dedicated support'],
            cta: 'Contact sales',
            highlight: false,
        },
    ];

    return (
        <section id="pricing" className="relative border-t border-border">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    className="text-center"
                >
                    <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-foreground">
                        Simple pricing
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-2 text-muted-foreground">
                        Start free. Scale when you’re ready.
                    </motion.p>

                    <motion.div variants={stagger} className="mt-10 grid gap-5 sm:grid-cols-3">
                        {tiers.map((t, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <PricingCard {...t} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}


/* ---------- UI Bits ---------- */

function BackgroundDecor() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,color-mix(in_oklab,var(--color-primary)_25%,transparent),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_80%_10%,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(to_right,transparent_49%,color-mix(in_oklab,var(--color-foreground)_7%,transparent)_50%,transparent_51%),linear-gradient(to_bottom,transparent_49%,color-mix(in_oklab,var(--color-foreground)_7%,transparent)_50%,transparent_51%)] bg-[size:24px_24px]" />
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <Card className="px-3 py-3 gap-1.5">
            <div className="text-lg font-semibold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </Card>
    );
}

function StepCard({ icon, title, description }) {
    return (
        <Card className="h-full shadow-[0_8px_30px_rgba(2,6,23,0.35)]">
            <CardContent className="p-5">
                <div className="mb-3 inline-flex items-center justify-center rounded-md border border-border bg-accent/10 p-2">
                    {icon}
                </div>
                <CardTitle className="text-foreground font-semibold">{title}</CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
            </CardContent>
        </Card>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <Card className="group h-full transition hover:translate-y-[-2px] hover:border-foreground/20">
            <CardContent className="p-5">
                <div className="mb-3 inline-flex items-center justify-center rounded-md border border-border bg-accent/10 p-2">
                    {icon}
                </div>
                <CardTitle className="text-foreground font-semibold">{title}</CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
            </CardContent>
        </Card>
    );
}

function TestimonialCard({ name, role, text }) {
    return (
        <Card>
            <CardContent className="p-5">
                <Quote className="h-5 w-5 text-muted-foreground" />
                <p className="mt-3 text-foreground">{text}</p>
                <div className="mt-4 flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-xs font-semibold text-white ring-1 ring-white/15">
                        {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <div className="text-sm text-foreground font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function PricingCard({ name, price, period, features, cta, highlight }) {
    return (
        <Card
            className={[
                'h-full text-left',
                highlight
                    ? 'border-ring/40 shadow-[0_8px_30px_rgba(30,58,138,0.35)]'
                    : '',
            ].join(' ')}
        >
            <CardHeader className="pb-0">
                <div className="flex items-baseline gap-2">
                    <CardTitle className="text-foreground font-semibold">{name}</CardTitle>
                    {highlight && (
                        <span className="rounded-full border border-ring/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            Popular
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="mt-3 flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-foreground">{price}</span>
                    {period && <span className="text-sm text-muted-foreground">{period}</span>}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-foreground">
                    {features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-accent" />
                            {f}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    asChild
                    className={highlight ? 'w-full text-primary-foreground shadow-lg' : 'w-full'}
                    variant={highlight ? 'default' : 'outline'}
                >
                    <a href={name === 'Enterprise' ? '/contact' : '/signup'} className="inline-flex items-center gap-2">
                        {cta}
                        {name !== 'Free' && <ArrowRight className="h-4 w-4" />}
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}

function HeroPreview() {
    return (
        <motion.div whileHover={{ y: -3 }} className="relative">
            {/* Soft Glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-blue-500/10 blur-2xl" />

            {/* Main Container */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg">
                {/* Browser Bar */}
                <div className="flex items-center gap-1 border-b border-white/10 bg-slate-800/50 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 truncate text-xs text-slate-400">preview.makethumb.app</span>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2">
                    {/* Left Side: Code + Info */}
                    <div className="p-4 sm:p-6">
                        {/* Command Preview */}
                        <div className="rounded-md border border-white/10 bg-slate-950 p-3 text-[11px] leading-5 text-slate-200 font-mono">
                            <CodeLine text="npm i" prompt />
                            <CodeLine text="npx makethumb init" />
                            <CodeLine text="makethumb deploy" />
                            <CodeLine text="Deploying… ✓" dim />
                            <CodeLine text="Live: https://preview.makethumb.app" dim />
                        </div>

                        {/* Info */}
                        <div className="mt-4 rounded-md border border-white/10 bg-slate-800/50 p-3 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-emerald-400" />
                                Free SSL enabled
                            </div>
                            <div className="mt-1 text-slate-400">
                                Automatic builds, smart caching & instant invalidation.
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Preview Image */}
                    <div className="relative hidden lg:flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(37,99,235,0.18),transparent)]" />

                        <img
                            src="/logo_dotted.png"
                            alt="Deployed app preview"
                            className="max-h-[220px] rounded-lg"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PreviewBrowser() {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="relative"
        >
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
                <div className="flex items-center gap-1 border-b border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 truncate text-xs text-slate-400">demo.makethumb.app</span>

                </div>

                <div className="p-4 sm:p-6">


                    <div className="grid grid-cols-3 gap-3">
                        <CardTile title="Build time" value="18s" />
                        <CardTile title="Regions" value="300+" />
                        <CardTile title="Cache hit" value="97%" />
                    </div>

                    <div className="mt-4 rounded-md border border-white/10 bg-slate-900 p-3 text-[11px] leading-5 text-slate-200 font-mono">
                        <CodeLine text="> Detecting framework: React" />
                        <CodeLine text="> Installing deps with pnpm…" />
                        <CodeLine text="> Building…" />
                        <CodeLine text="> Uploading artifacts…" />
                        <CodeLine text="> Deploy complete ✓" />
                    </div>
                </div>
            </div>

        </motion.div>
    );
}

function CardTile({ title, value }) {
    return (
        <Card className="p-3 gap-1.5">
            <div className="text-[11px] text-muted-foreground">{title}</div>
            <div className="text-sm font-semibold text-foreground">{value}</div>
        </Card>
    );
}

function CodeLine({ text, prompt = false, dim = false }) {
    return (
        <div className={['flex items-start gap-2', dim ? 'text-muted-foreground' : ''].join(' ')}>
            {prompt ? <span className="text-primary">$</span> : <span className="text-muted-foreground">·</span>}
            <span>{text}</span>
        </div>
    );
}