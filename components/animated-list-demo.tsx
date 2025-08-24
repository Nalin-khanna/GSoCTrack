"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "./magicui/animated-list"

interface Item {
  title: string
  number: number
  author: string
  labels: string[]
  time: string
  type: "bug" | "feature" | "enhancement" | "question"
  comments: number
  pullRequests: number
}

let githubIssues = [
  {
    title: "Widget block gets disable after Restore",
    number: 4670,
    author: "Commanderk3",
    labels: ["Issue-Bug"],
    time: "May 1",
    type: "bug" as const,
    comments: 6,
    pullRequests: 1,
  },
  {
    title: "Update outdated dependencies",
    number: 4668,
    author: "Aditya-269",
    labels: ["Issue-Bug"],
    time: "May 1",
    type: "bug" as const,
    comments: 1,
    pullRequests: 0,
  },
  {
    title: "Dockerfile Optimization: Migrate to Node.js Base Image for Proper Application Deployment",
    number: 4661,
    author: "Aditya-269",
    labels: [],
    time: "Apr 29",
    type: "enhancement" as const,
    comments: 1,
    pullRequests: 1,
  },
  {
    title: "Add TypeScript support for better development experience",
    number: 4659,
    author: "typescript-dev",
    labels: ["enhancement", "typescript"],
    time: "Apr 28",
    type: "enhancement" as const,
    comments: 3,
    pullRequests: 0,
  },
  {
    title: "Memory leak in data processing pipeline",
    number: 4655,
    author: "performance-team",
    labels: ["Issue-Bug", "critical"],
    time: "Apr 27",
    type: "bug" as const,
    comments: 8,
    pullRequests: 2,
  },
]

githubIssues = Array.from({ length: 6 }, () => githubIssues).flat()

const GitHubIssue = ({ title, number, author, labels, time, comments, pullRequests }: Item) => {
  return (
    <figure className="relative mx-auto min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden p-3 bg-gray-900 border-b border-gray-800">
      <div className="flex flex-row items-start gap-3">
        <div className="flex items-center justify-center mt-1">
          <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white font-medium text-sm leading-tight mb-1 hover:text-blue-400 cursor-pointer">
                {title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span>#{number}</span>
                <span>•</span>
                <span>
                  {author} opened on {time}
                </span>
              </div>

              {labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {labels.map((label, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "px-2 py-0.5 text-xs rounded-full font-medium",
                        label === "Issue-Bug"
                          ? "bg-red-900 text-red-200 border border-red-700"
                          : label === "critical"
                            ? "bg-red-900 text-red-200 border border-red-700"
                            : label === "enhancement"
                              ? "bg-blue-900 text-blue-200 border border-blue-700"
                              : label === "typescript"
                                ? "bg-blue-900 text-blue-200 border border-blue-700"
                                : "bg-gray-800 text-gray-300 border border-gray-600",
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 ml-4">
              {pullRequests > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
                  </svg>
                  <span>{pullRequests}</span>
                </div>
              )}
              {comments > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25H5a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.25a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
                  </svg>
                  <span>{comments}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

export default function AnimatedListDemo({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn("relative flex h-[500px] w-full flex-col overflow-hidden bg-gray-900", className)}>
      <AnimatedList>
        {githubIssues.map((item, idx) => (
          <GitHubIssue {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900"></div>
    </div>
  )
}
