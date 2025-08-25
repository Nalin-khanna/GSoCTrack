import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Organization } from "../generated/prisma"


export default async function OrgsPage(){
  const response = await fetch('http://localhost:3000/api/orgs' ,
    {
        next : {
            revalidate : 60
        }
    }
  )
  const orgs: Organization[] = await response.json()
  return (
        <div>
            <h1>Organizations</h1>
            <div>
                {orgs.map((org) => (
                    <div key={org.id}>{org.name}</div>
                ))}
            </div>
        </div>
    )
}
