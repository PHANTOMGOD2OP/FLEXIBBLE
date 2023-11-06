import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req, secret, raw: true });
  return NextResponse.json({ token }, { status: 200 });
};
