import React from 'react'

const features = [
    {
        title: 'Complaint Management',
        description:
            'Submit maintenance complaints with detailed descriptions and optional photos.',
    },
    {
        title: 'Complaint Tracking',
        description: 'Monitor complaint progress with complete status history.',
    },
    {
        title: 'Priority Management',
        description: 'Admins prioritize complaints based on urgency.',
    },
    {
        title: 'Photo Attachments',
        description:
            'Upload images to provide better context for maintenance issues.',
    },
    {
        title: 'Notice Board',
        description: 'View important announcements and community updates.',
    },
    {
        title: 'Email Notifications',
        description:
            'Receive instant updates whenever complaint status changes.',
    },
]

const Features = () => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="p-6 rounded-lg bg-neutral-900/50 backdrop-blur-sm border border-neutral-800"
                    >
                        <h3 className="text-2xl font-semibold mb-4">
                            {feature.title}
                        </h3>

                        <p className="text-neutral-400">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
