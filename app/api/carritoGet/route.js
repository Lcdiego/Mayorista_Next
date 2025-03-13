import Carrito from "@/models/Carrito";
import { DB } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req) {
 await DB ();
 try {
    const{usuario}=req.json()
    const carrito= await Carrito.findById(usuario);
    return NextResponse.json({message:'sucess', carrito},{status:200})

 } catch (error) {
    
 }

    
}

