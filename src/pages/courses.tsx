import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { api } from '@/utils/api'
import { type Course } from "@prisma/client";

function Cards({course}: {course: Course}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
      {course.description}
      {course.price}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Link href={`/course/${course.id}`}>
        <Button>Deploy</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


export default function courses() {

  const listings = api.get.getAll.useQuery();

  return (
    <div>
      <div className='flex flex-col left-0 fixed p-3 w-1/5'>
      <div className='px-2 py-1 text-3xl font-bold'>
          <Link href="/">
           COURSERA
          </Link>
      </div>
      <div className='py-10 px-2'>
      <Sheet>
  <SheetTrigger asChild>
    <Button className='w-1/4 '> ☰</Button>  
    </SheetTrigger>
  <SheetContent side={'left'}>
    <SheetHeader>
      <SheetTitle className='text-2xl px-6'>Main Menu</SheetTitle>
      <SheetDescription asChild className='flex flex-col'>
      <div className='px-6'>
        <br/>
        <Link href={"/courses"}>
        Courses
        </Link>
        <br/>
        <Link href={"/purchases"}>
        My Courses
        </Link>
        <br/>
        <Link href={"/createCourses"}>
        Create Course
        </Link>
      </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>
</div>
      <div className='flex justify-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-2 text-slate-300'>
        COURSES
      </div>  
      <div>

      </div>
      <div className='flex justify-end mt-8'>
<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 w-4/5'>
{listings?.data?.map((course) => (
    <Cards key={course.id} course={course} />
  ))}
</div>
</div>
    </div>
  )
}