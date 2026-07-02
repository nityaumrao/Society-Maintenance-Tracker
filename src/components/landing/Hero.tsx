import BlurText from '@/components/landing/ui/hero-text'
import { HeroVideoDialog } from '@/components/landing/ui/hero-video-dialog'
import ShinyText from '@/components/landing/ui/hero-subtext'
import { Button } from '@/components/ui/button'

export const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center pt-30">
            <div className="container mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-24 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="flex max-w-2xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                    <BlurText
                        text="Smart Society Maintenance Tracker"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-4xl font-bold md:text-6xl"
                    />
                    <ShinyText
                        text="Track complaints, follow updates, and keep every maintenance request organized from one clean dashboard."
                        disabled={false}
                        speed={3}
                        className="max-w-xl text-sm sm:text-base"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg" className="rounded-full px-6">
                            <a href="#contact">Raise Complaint</a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="rounded-full px-6 bg-transparent"
                        >
                            <a href="#features">View Features</a>
                        </Button>
                    </div>
                </div>
                <div className="relative w-full max-w-2xl pb-10">
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="top-in-bottom-out"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                        thumbnailAlt="Hero Video"
                    />
                    <HeroVideoDialog
                        className="hidden dark:block"
                        animationStyle="top-in-bottom-out"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                        thumbnailAlt="Hero Video"
                    />
                </div>
            </div>
        </section>
    )
}
