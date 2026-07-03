import React from 'react'

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="min-h-screen w-full flex items-center justify-center bg-neutral-950"
        >
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
                    How It Works
                </h2>
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                            1
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">
                                Login or Register
                            </h3>
                            <p className="text-neutral-400">
                                Create your account or securely sign in to
                                access your society maintenance portal.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                            2
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">
                                Raise a Complaint
                            </h3>
                            <p className="text-neutral-400">
                                Submit maintenance issues by selecting a
                                category, adding a description, and optionally
                                uploading a photo.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                            3
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">
                                Track Complaint Status
                            </h3>
                            <p className="text-neutral-400">
                                Monitor complaint progress with live status
                                updates, priority changes, and a complete
                                history.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                            4
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">
                                Issue Resolved
                            </h3>
                            <p className="text-neutral-400">
                                Receive email notifications when your complaint
                                is resolved and stay informed through important
                                society notices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
