import { type NextRequest, NextResponse } from "next/server";
import { NUON_API_URL } from "@/common";

export const GET = async (req: NextRequest) => {
  const [installId] = req.url.split("/").slice(4, 5);
  const res = await fetch(`${NUON_API_URL}/v1/installs/${installId}`, {
    headers: {
      Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
      "X-Nuon-Org-ID": `${process?.env?.NUON_ORG_ID}`,
    },
  });

  if (!res?.ok) {
    throw new Error(`Can't find install ${installId}`);
  }

  return NextResponse.json(await res.json());
};
