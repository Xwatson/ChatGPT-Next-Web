import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import { getServerSideConfig } from "@/app/config/server";
import { GEMINI_BASE_URL, Google, ModelProvider } from "@/app/constant";

async function handle(req: NextRequest) {
  // 从请求体中获取用户名和密码
  const body = await req.text();
  const { username, password } = JSON.parse(body);
  if (username === process.env.USER_NAME && password === process.env.CODE) {
    return NextResponse.json(
      {
        error: false,
        data: process.env.CODE,
        message: ``,
      },
      {
        status: 200,
      },
    );
  }
  return NextResponse.json(
    {
      error: true,
      message: `无效的用户名或密码`,
    },
    {
      status: 401,
    },
  );
}

export const POST = handle;

export const runtime = "edge";
