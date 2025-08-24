import { PrismaClient, Prisma } from "../app/generated/prisma";
import { Octokit } from "@octokit/rest";

const prisma = new PrismaClient();

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN,
});

async function seedIssues(){
    const repos = await prisma.repo.findMany(
        {
            include : {
                organization : true
            }
        }
    );
    await Promise.all(repos.map(async (repo)=> {
        try{
            const issues = await octokit.rest.issues.listForRepo(
                {
                    state : "open",
                    repo : repo.name,
                    owner : repo.organization.githubUrl!.replace("https://github.com/", "")
                }
            )
            await prisma.issue.createMany({
                data : issues.data.map((issue:any)=> ({
                    title : issue.title,
                    number : issue.number,
                    createdAt : issue.created_at,
                    updatedAt : issue.updated_at,
                    url : issue.html_url,
                    repoId : repo.id,
                    assigned : issue.assignee ? true : false,
                    authorLogin : issue.user.login
                })),
                skipDuplicates : true
            })
        }
        catch(e){
            console.error(e);
        }
    }))
}

seedIssues();