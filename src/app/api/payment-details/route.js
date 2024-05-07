import { NextResponse } from "next/server";

export async function POST(req) {
    const { userId, } = await req.json();
    try {
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}