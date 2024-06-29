import dbConnect from '@/lib/dbConnect'
import { z } from "zod"
import UserModel from '@/model/User'
import { usernameValidation } from '@/schemas/signUpSchema'

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(req: Request) {

    await dbConnect()

    try {
        const { searchParams } = new URL(req.url)
        const queryParam = {
            username: searchParams.get("username")
        }
        // Validate query params using zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        // console.log("Result", result) // TODO remove this

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            // console.log("Username errors", usernameErrors) // TODO remove this
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(", ") : "Invalid username"
                },
                {
                    status: 400
                }
            )
        }
  
        const { username } = result.data
        console.log("Username", username) // TODO remove this
        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                {
                    status: 401
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Username available"
            },
            {
                status: 200
            }
        )


    } catch (error) {
        console.log("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
}