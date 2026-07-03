import { Suspense } from 'react'
import VerifyEmailContent from './VerifyEmailContent'

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4 dark:from-neutral-900 dark:to-neutral-950">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-black">
                        <div className="text-center">
                            <h1 className="mb-4 text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                Email Verification
                            </h1>
                            <div className="my-8 flex justify-center">
                                <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-600 dark:border-neutral-800 dark:border-t-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <VerifyEmailContent />
        </Suspense>
    )
}
