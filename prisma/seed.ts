import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function getOrgData(){
  try{
    const response = await fetch("https://api.gsocorganizations.dev/organizations.json");
    const data = await response.json();
    console.log(data[0]);

    await Promise.all(data.map(async (org:any)=> {
      try{
        await prisma.organization.create({
          data : {
            name : org.name,
            url : org.url,
            imageUrl : org.image_url,
            imageBg : org.image_background_color,
            description : org.description,
            category : org.category,
            topics : org.topics,
            technologies : org.technologies,
            years : Object.keys(org.years).map((year:any)=> parseInt(year))
          }
        })
      }
      catch(error){
        console.error(error);
      }
      
    }))
  }
  catch(error){
    console.error(error);
  }
}

getOrgData();

