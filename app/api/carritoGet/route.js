import Carrito from "@/models/Carrito";
import { DB } from "@/lib/db";
import { NextResponse } from "next/server";




export async function GET() {
   await DB();
   try {
      const carrito = await Carrito.find();
      return NextResponse.json({ message: 'sucess', carrito }, { status: 200 })

   } catch (error) {

   }


}

