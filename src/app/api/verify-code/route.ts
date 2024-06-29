import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(req: Request) {
    await dbConnect();

    try {
        const { username, code } = await req.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 500
                }
            )
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                },
                {
                    status: 200
                }
            )
        } else if (!isCodeExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code expired please signup again"
                },
                {
                    status: 401
                }
            )

        } else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code"
                },
                {
                    status: 401
                }
            )
        }

    } catch (error) {
        console.log("Error verifying user", error);
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            },
            {
                status: 500
            }
        )
    }

}