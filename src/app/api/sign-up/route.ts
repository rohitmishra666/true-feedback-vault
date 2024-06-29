import { sendVerificationMail } from '@/helpers/sendVerificationMail';
import dbConnect from '@/lib/dbConnect';
import Usermodel from '@/model/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await Usermodel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username already exists"
                },
                {
                    status: 400
                }
            )
        }

        const existingUserByEmail = await Usermodel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "Email already exists"
                    },
                    {
                        status: 400
                    }
                )
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000) // 1 hour
                await existingUserByEmail.save()
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new Usermodel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })
            await newUser.save()
        }

        // Send verification email
        const emailResponse = await sendVerificationMail(email, username, verifyCode)
        console.log("Email response: ", emailResponse)
        if (!emailResponse.success) {
            return Response.json(
                {
                    success: true,
                    message: emailResponse.message
                },
                {
                    status: 500
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "User signed up successfully. Verification email sent. Please verify your email to login."
            },
            {
                status: 201
            }
        )

    } catch (error) {
        console.error("Error signing up: ", error)
        return Response.json(
            {
                success: false,
                message: "Error signing up"
            },
            {
                status: 500
            }
        )
    }
}
