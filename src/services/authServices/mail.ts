import { Resend } from 'resend'
import {
    VerificationEmailTemplate,
    VerificationEmailText,
} from '@/lib/mail/verification-email'
import { ResetEmailTemplate, ResetEmailText } from '@/lib/mail/reset-email'
import {
    TwoFactorEmailTemplate,
    TwoFactorEmailText,
} from '@/lib/mail/two-factor-email'
import {
    ComplaintStatusEmailTemplate,
    ComplaintStatusEmailText,
} from '@/lib/mail/complaint-status-email'
import {
    ImportantNoticeEmailTemplate,
    ImportantNoticeEmailText,
} from '@/lib/mail/important-notice-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
    userName?: string
) => {
    const resetLink = `${DOMAIN}/new-password?token=${token}`

    try {
        const { data, error } = await resend.emails.send({
            from: 'LetsKraack <onboarding@resend.dev>',
            to: email,
            subject: 'Reset Your Password - LetsKraack',
            html: ResetEmailTemplate({
                userName: userName || email.split('@')[0],
                resetLink,
            }),
            text: ResetEmailText(userName || email.split('@')[0], resetLink),
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, error }
        }

        console.log('Password reset email sent successfully:', data)
        return { success: true, data }
    } catch (error) {
        console.error('Failed to send password reset email:', error)
        return { success: false, error }
    }
}

export const sendVerificationEmail = async (
    email: string,
    token: string,
    userName?: string
) => {
    const confirmLink = `${DOMAIN}/verify-email?token=${token}`

    try {
        const { data, error } = await resend.emails.send({
            from: 'LetsKraack <onboarding@resend.dev>',
            to: email,
            subject: 'Verify Your Email Address - LetsKraack',
            html: VerificationEmailTemplate({
                userName: userName || email.split('@')[0],
                verificationLink: confirmLink,
            }),
            text: VerificationEmailText(
                userName || email.split('@')[0],
                confirmLink
            ),
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, error }
        }

        console.log('Verification email sent successfully:', data)
        return { success: true, data }
    } catch (error) {
        console.error('Failed to send verification email:', error)
        return { success: false, error }
    }
}
export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
    userName?: string
) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'LetsKraack <onboarding@resend.dev>',
            to: email,
            subject: 'Your Two-Factor Authentication Code - LetsKraack',
            html: TwoFactorEmailTemplate({
                userName: userName || email.split('@')[0],
                token,
            }),
            text: TwoFactorEmailText(userName || email.split('@')[0], token),
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, error }
        }

        console.log('Two-factor email sent successfully:', data)
        return { success: true, data }
    } catch (error) {
        console.error('Failed to send two-factor email:', error)
        return { success: false, error }
    }
}

export const sendComplaintStatusUpdatedEmail = async (
    email: string,
    complaintTitle: string,
    oldStatus: string,
    newStatus: string,
    complaintId: string,
    userName?: string
) => {
    const complaintLink = `${DOMAIN}/resident/complaints/${complaintId}`
    const displayName = userName || email.split('@')[0]

    try {
        const { data, error } = await resend.emails.send({
            from: 'LetsKraack <onboarding@resend.dev>',
            to: email,
            subject: `Complaint Status Updated: ${complaintTitle}`,
            html: ComplaintStatusEmailTemplate({
                userName: displayName,
                complaintTitle,
                oldStatus,
                newStatus,
                complaintLink,
            }),
            text: ComplaintStatusEmailText(
                displayName,
                complaintTitle,
                oldStatus,
                newStatus,
                complaintLink
            ),
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, error }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Failed to send complaint status email:', error)
        return { success: false, error }
    }
}

export const sendImportantNoticeEmail = async (
    email: string,
    noticeTitle: string,
    noticeContent: string,
    userName?: string
) => {
    const noticeLink = `${DOMAIN}/resident/notice-board`
    const displayName = userName || email.split('@')[0]

    try {
        const { data, error } = await resend.emails.send({
            from: 'LetsKraack <onboarding@resend.dev>',
            to: email,
            subject: `Important Notice: ${noticeTitle}`,
            html: ImportantNoticeEmailTemplate({
                userName: displayName,
                noticeTitle,
                noticeContent,
                noticeLink,
            }),
            text: ImportantNoticeEmailText(
                displayName,
                noticeTitle,
                noticeContent,
                noticeLink
            ),
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, error }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Failed to send important notice email:', error)
        return { success: false, error }
    }
}
