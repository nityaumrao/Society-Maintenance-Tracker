import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

// Define background variants for premium look
const cardVariants = cva(
    'border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] p-4 flex flex-col h-full',
    {
        variants: {
            bg: {
                blue: 'bg-blue-500/10 border-blue-500/30',
                yellow: 'bg-yellow-500/10 border-yellow-500/30',
                green: 'bg-green-500/10 border-green-500/30',
                red: 'bg-red-500/10 border-red-500/30',
                amber: 'bg-amber-500/10 border-amber-500/30',
                gray: 'bg-gray-500/10 border-gray-500/30',
            },
        },
        defaultVariants: { bg: 'gray' },
    }
)

type StatsCardProps = {
    title: string
    value: number | string
    description?: string
    icon: LucideIcon
    bg?: VariantProps<typeof cardVariants>['bg']
}

export default function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    bg,
}: StatsCardProps) {
    return (
        <Card className={cn(cardVariants({ bg }))}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground/80">
                    {title}
                </CardTitle>
                <Icon className="h-5 w-5 text-foreground/60" />
            </CardHeader>
            <CardContent className="flex-1">
                <div className="text-3xl font-bold text-foreground">
                    {value}
                </div>
                {description && (
                    <p className="text-xs text-foreground/60 mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
