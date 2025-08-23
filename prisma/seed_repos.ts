import { PrismaClient, Prisma } from "../app/generated/prisma";
import { Octokit } from "@octokit/rest";

const prisma = new PrismaClient();

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN,
  });

async function seedRepos() {
    const orgs = await prisma.organization.findMany({
        where : {
            AND: [
                { githubUrl: { not: "" } },
                { githubUrl: { not: null } }
            ]
        }
    })

    await Promise.all(orgs.map(async (organization) => {

        try{
            const orgName = organization.githubUrl!.replace("https://github.com/", "");
            const repos =  await octokit.rest.repos.listForOrg({
            org : orgName,
            })

            const filteredRepos = repos.data.filter((repo:any)=> repo.forks_count >= 30 && repo.open_issues_count >= 30 && !repo.achived && !repo.disabled);

            try{
                const repoData = filteredRepos.map((repo: any) => ({
                    name: repo.name,
                    url: repo.html_url,
                    description: repo.description || null,
                    forks_count : repo.forks_count,
                    organizationId: organization.id
                }));
    
                await prisma.repo.createMany({
                    data : repoData,
                    skipDuplicates : true
                })
            }
            catch(e){
                console.error(e);
            }
            
        }
        catch(error : any){
            if (error.response) {
                console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
              }
              console.error(error)
        }
    }))
}

// Call the function
seedRepos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });