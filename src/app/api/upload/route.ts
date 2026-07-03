import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
])

export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME
        const apiKey = process.env.CLOUDINARY_API_KEY
        const apiSecret = process.env.CLOUDINARY_API_SECRET

        if (!cloudName || !apiKey || !apiSecret) {
            return NextResponse.json(
                { message: 'Image upload is not configured' },
                { status: 503 }
            )
        }

        const formData = await request.formData()
        const file = formData.get('file')

        if (!(file instanceof File)) {
            return NextResponse.json(
                { message: 'No image file provided' },
                { status: 400 }
            )
        }

        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json(
                { message: 'Only JPEG, PNG, WebP, and GIF images are allowed' },
                { status: 400 }
            )
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { message: 'Image must be 5MB or smaller' },
                { status: 400 }
            )
        }

        const timestamp = Math.round(Date.now() / 1000)
        const folder = 'complaint-photos'
        const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
        const signature = crypto
            .createHash('sha1')
            .update(paramsToSign)
            .digest('hex')

        const uploadData = new FormData()
        uploadData.append('file', file)
        uploadData.append('api_key', apiKey)
        uploadData.append('timestamp', String(timestamp))
        uploadData.append('signature', signature)
        uploadData.append('folder', folder)

        const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: 'POST', body: uploadData }
        )

        const cloudinaryData = await cloudinaryRes.json()

        if (!cloudinaryRes.ok) {
            console.error('Cloudinary upload error:', cloudinaryData)
            return NextResponse.json(
                { message: 'Failed to upload image' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            url: cloudinaryData.secure_url as string,
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { message: 'Failed to upload image' },
            { status: 500 }
        )
    }
}
