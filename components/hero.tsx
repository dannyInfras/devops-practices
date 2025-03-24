"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center">
      <div
        className={`container grid items-center gap-6 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex max-w-[980px] flex-col items-start gap-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Hi, I'm John Doe <br className="hidden sm:inline" />
            <span className="text-primary">Full Stack Developer</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            I build accessible, responsive, and performant web applications with modern technologies.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="h-8 w-8 text-primary" />
        </a>
      </div>
    </section>
  )
}

