import { type NextRequest, NextResponse } from "next/server";
import { NUON_API_URL } from "@/common";

export const GET = async (req: NextRequest) => {
  const [slug, installId] = req.url.split("/").slice(5, 7);
  const res = await fetch(
    `${NUON_API_URL}/v1/installer/${slug}/install/${installId}/render`,
    {
      headers: {
        Authorization: `Bearer ${process?.env?.NUON_API_TOKEN}`,
        "X-Nuon-Org-ID": `${process?.env?.NUON_ORG_ID}`,
      },
    },
  );

  if (!res?.ok) {
    throw new Error(`Can't find install ${installId}`);
  }

  return NextResponse.json(await res.json());
};
