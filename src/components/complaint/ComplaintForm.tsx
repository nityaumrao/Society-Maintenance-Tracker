'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ComplaintForm() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        priority: 'MEDIUM',
    });

    const [photo, setPhoto] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/complaints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                priority: formData.priority,
                imageUrl: null, // Photo upload will be added later
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Failed to submit complaint');
            return;
        }

        alert('Complaint submitted successfully!');

        setFormData({
            title: '',
            category: '',
            description: '',
            priority: 'MEDIUM',
        });

        setPhoto(null);
    } catch (error) {
        console.error(error);
        alert('Something went wrong');
    }
};

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border p-6 shadow-sm"
        >
            <h2 className="text-2xl font-bold">
                Raise a Complaint
            </h2>

            <Input
                name="title"
                placeholder="Complaint Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border bg-background px-3 py-2"
                required
            >
                <option value="">Select Category</option>
                <option value="PLUMBING">Plumbing</option>
                <option value="ELECTRICAL">Electrical</option>
                <option value="CLEANING">Cleaning</option>
                <option value="SECURITY">Security</option>
                <option value="WATER">Water Supply</option>
                <option value="OTHER">Other</option>
            </select>

            <textarea
                name="description"
                rows={5}
                placeholder="Describe your complaint..."
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border bg-background p-3"
                required
            />

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md border bg-background px-3 py-2"
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setPhoto(e.target.files?.[0] ?? null)
                }
            />

            <Button className="w-full" type="submit">
                Submit Complaint
            </Button>
        </form>
    );
}