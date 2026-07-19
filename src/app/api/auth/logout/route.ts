import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "logged out successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
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
