import { DB } from "../../../../lib/db";
import Banner from "../../../../models/Banner";
import { NextResponse } from "next/server";
export async function GET() {
    try {

        await DB()
        const Banners = await Banner.find()
        return NextResponse.json(Banners, { status: 200 })

    } catch (error) {
        console.log('Error al cargar productos', error)
        return NextResponse.json({ error, status: 500 })
    }

}