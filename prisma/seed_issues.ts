import { db } from "@/lib/prisma";
import { Octokit } from "@octokit/rest";
import { Repo } from "@/app/generated/prisma";

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN,
});

async function seedIssues(){
    const repos = await db.repo.findMany(
        {
            include : {
                organization : true
            }
        }
    );
    await Promise.all(repos.map(async (repo:any)=> {
        try{
            const issues = await octokit.rest.issues.listForRepo(
                {
                    state : "open",
                    repo : repo.name,
                    owner : repo.organization.githubUrl!.replace("https://github.com/", "")
                }
            )
            await db.issue.createMany({
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