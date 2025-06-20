import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "employee-data.json");
    console.log("Reading from:", filePath);
    const fileContents = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error); 
    return NextResponse.json(
      { error: "Failed to load employee data." },
      { status: 500 }
    );
  }
}
