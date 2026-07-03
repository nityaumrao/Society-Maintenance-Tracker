interface ComplaintStatusEmailTemplateProps {
    userName: string
    complaintTitle: string
    oldStatus: string
    newStatus: string
    complaintLink: string
}

export function ComplaintStatusEmailTemplate({
    userName,
    complaintTitle,
    oldStatus,
    newStatus,
    complaintLink,
}: ComplaintStatusEmailTemplateProps) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complaint Status Updated</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                LetsKraack
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">
                                Complaint Status Updated
                            </h2>
                            <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                Hi ${userName},
                            </p>
                            <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                The status of your complaint <strong>${complaintTitle}</strong> has been updated.
                            </p>
                            <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                <strong>${oldStatus.replace('_', ' ')}</strong> → <strong>${newStatus.replace('_', ' ')}</strong>
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 0 0 30px 0;">
                                        <a href="${complaintLink}"
                                           style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
                                            View Complaint
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px 30px; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                                © ${new Date().getFullYear()} LetsKraack. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim()
}

export const ComplaintStatusEmailText = (
    userName: string,
    complaintTitle: string,
    oldStatus: string,
    newStatus: string,
    complaintLink: string
) => {
    return `
Hi ${userName},

The status of your complaint "${complaintTitle}" has been updated.

${oldStatus.replace('_', ' ')} → ${newStatus.replace('_', ' ')}

View your complaint: ${complaintLink}

© ${new Date().getFullYear()} LetsKraack. All rights reserved.
    `.trim()
}
