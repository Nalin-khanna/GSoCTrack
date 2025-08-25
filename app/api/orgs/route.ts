import { NextResponse } from "next/server";

import { db } from "@/lib/prisma"


export async function GET(req: Request) {
    try{
        const orgs = await db.organization.findMany(
            {
                where : {
                    githubUrl : {
                        not : null
                    }
                }
            }
        )
        return NextResponse.json(orgs, {status: 200});
    }
    catch(e){
        return NextResponse.json({error: "Failed to fetch orgs"}, {status: 500})
    }
    
}