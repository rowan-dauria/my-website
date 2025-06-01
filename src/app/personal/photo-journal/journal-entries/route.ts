import supabase from "@/utils/supabase";
import { NextResponse } from "next/server";


export async function GET() {
    const { data, error } = await supabase
        .from("journal_entries")
        .select("*");
    if (error) {
        return new Response(error.message, { status: 500 });
    }
    return NextResponse.json(data, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });

}