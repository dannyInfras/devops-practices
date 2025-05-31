"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include product listings, cart functionality, user authentication, and payment processing.",
      image: "/placeholder.svg?height=200&width=300",
      demoLink: "#",
      repoLink: "#",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A React-based task management application with drag-and-drop functionality. Users can create, organize, and track tasks across different stages of completion.",
      image: "/placeholder.svg?height=200&width=300",
      demoLink: "#",
      repoLink: "#",
      technologies: ["React", "Redux", "Firebase", "React DnD"],
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A weather dashboard that displays current and forecasted weather data. The app uses a weather API to fetch real-time data and presents it in an intuitive interface.",
      image: "/placeholder.svg?height=200&width=300",
      demoLink: "#",
      repoLink: "#",
      technologies: ["JavaScript", "OpenWeather API", "Chart.js", "CSS"],
    },
    {
      id: 4,
      title: "Personal Blog",
      description:
        "A blog platform built with Next.js and a headless CMS. Features include article categorization, search functionality, and responsive design.",
      image: "/placeholder.svg?height=200&width=300",
      demoLink: "#",
      repoLink: "#",
      technologies: ["Next.js", "Tailwind CSS", "Sanity.io", "Vercel"],
    },
  ]

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Featured Projects
        </h2>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredProject === index ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <a href="#" className="flex items-center gap-2">
                View All Projects
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

