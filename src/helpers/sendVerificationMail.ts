import { resend } from '../lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationMail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const response = await resend.emails.send({
            from: 'noreply@truefeedback.in.net',
            to: email,
            subject: 'Feedback Vault - Verify your email',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        console.log("Verification email sent: ", response)
        return {
            success: true,
            message: "Verification email sent"
        }
    } catch (error) {
        console.error("Error sending verification email: ", error)
        return {
            success: false,
            message: "Error sending verification email"
        }
    }
}

