import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyBearerToken } from "@/app/helpers/helpers";
import { ServiceType } from "@/app/types/types";

var services: ServiceType[] = require("../../../config/services.json"); // Using var and require since we are importing JSON https://stackoverflow.com/questions/32950966/typescript-compiler-error-when-importing-json-file

export async function GET(request: Request) {
  const token = cookies().get("auth")?.value as string;
  if (!verifyBearerToken(token))
    return NextResponse.json(
      { hasErrors: true, pingOk: true, message: "Authentication required" },
      { status: 401 }
    );

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") as string;

  if (!url)
    return NextResponse.json(
      { hasErrors: true, pingOk: true, message: "Service URL is required" },
      { status: 422 }
    );

  const index = services.findIndex((service) => service.url === url);

  if (index < 0)
    return NextResponse.json(
      {
        hasErrors: true,
        pingOk: true,
        message: "Unsupported service requested",
        availableServices: services.map((service) => service.url)
      },
      { status: 422 }
    );

  try {
    setTimeout(() => {}, 11 * 1000);
    const pingRes = await fetch(url);

    const pingResult = await pingRes.json();

    return NextResponse.json({
      hasErrors: false,
      pingOk: true,
      message: "Ping successful",
      ping: {
        statusCode: pingRes.status,
        status: pingRes.statusText,
        body: pingResult
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        hasErrors: false,
        pingOk: false,
        message: "Ping unsuccessful",
        ping: error
      },
      { status: 503 }
    );
  }
}
