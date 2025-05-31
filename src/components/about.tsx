import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">About Me</h2>

        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
          <div className="flex justify-center lg:order-last">
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-primary shadow-xl">
              <Image src="/IMG_6397_jpg.jpg" alt="Profile" fill className="object-cover" priority />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-lg">
                  I'm a passionate developer with 5+ years of experience building web applications. I specialize in
                  JavaScript, React, and Node.js, and I'm always eager to learn new technologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">My Journey</h3>
                <p>
                  I started my career as a front-end developer and gradually expanded my skills to become a full-stack
                  developer. I've worked with startups and established companies, helping them build scalable and
                  user-friendly applications.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">When I'm Not Coding</h3>
                <p>
                  When I'm not in front of a computer, you can find me hiking, reading, or experimenting with new
                  recipes in the kitchen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

