type ComplaintImageProps = {
    imageUrl: string | null | undefined
    alt?: string
}

export default function ComplaintImage({
    imageUrl,
    alt = 'Complaint photo',
}: ComplaintImageProps) {
    if (!imageUrl) {
        return null
    }

    return (
        <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Attached Photo</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageUrl}
                alt={alt}
                className="max-h-96 w-full rounded-lg border object-contain"
            />
        </div>
    )
}
