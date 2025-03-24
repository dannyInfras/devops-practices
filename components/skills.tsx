"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend")

  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Redux", "Framer Motion"],
    backend: ["Node.js", "Express", "NestJS", "Python", "Django", "RESTful APIs", "GraphQL", "WebSockets"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Mongoose", "SQL", "NoSQL"],
    tools: ["Git", "GitHub", "VS Code", "Docker", "AWS", "Vercel", "Netlify", "CI/CD", "Jest", "Testing Library"],
  }

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Skills & Technologies
        </h2>

        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="frontend" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(skills).map(([category, skillList]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills[activeTab as keyof typeof skills].slice(0, 4).map((skill) => (
              <div key={skill} className="flex flex-col items-center section-transition">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center shadow-sm mb-4">
                  <span className="text-3xl font-bold text-primary">{skill.charAt(0)}</span>
                </div>
                <span className="font-medium text-center">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

