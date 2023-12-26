import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useSession } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const{user} = useUser();
  const userId = user?.id;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-47">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <Image
            alt="artistic images of laptop,books,beaker,rocket"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-bottom sm:w-full lg:order-last shadow-2xl dark:shadow-none"
            priority={false}
            height="310"
            src="/images/course1.png"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-br from-black dark:from-white to-white dark:to-black">
                Welcome to t3-Coursera
              </h1>
              <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
               Learn without limits
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto">
              <div className="flex space-x-2 justify-center">
                {!userId && (
                  <>
                  <Button asChild>
                  <Link href="/sign-up">SIGN UP</Link>
                  </Button>
                  <Button asChild>
                  <Link href="/sign-in">LOGIN</Link>
                  </Button>
                  </>
                )}
                {!!userId && (
                  <>
                  <Button asChild>
                    <Link href="/courses">Courses</Link>
                  </Button>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 p-1">
                Created by Jatin Singh.
                <Link className="underline underline-offset-2 px-1" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
