import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), "waitlist.txt");

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }
    // E-Mail speichern (anhängen)
    fs.appendFileSync(WAITLIST_PATH, email + "\n");
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Serverfehler. Bitte später erneut versuchen." }, { status: 500 });
  }
}
