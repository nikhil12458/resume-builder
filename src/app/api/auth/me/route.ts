import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getCurrentUser();

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User fetched",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}
