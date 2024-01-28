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
import { type Course } from "@prisma/client";
import { api } from '@/utils/api'
import { type Purchase } from '@prisma/client'

function Cards({purchase}: {purchase: Purchase}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{purchase.title}</CardTitle>
        {/* <CardDescription>{course.description}</CardDescription> */}
      </CardHeader>
      <CardContent>
      {purchase.description}
      <br />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/viewCourse/${purchase.id}`}>
        <Button>view</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function purchases() {
  
  const boughtCourse = api.get.getPurchase.useQuery();
  
  return (
    <div>
      <div className='flex flex-col left-0 fixed p-3 w-1/4'>
      <div className='px-2 py-1 text-3xl font-bold'>
          <Link href="/">
           COURSERA
          </Link>
      </div>
      <div className='py-10'>
      <Sheet>
  <SheetTrigger asChild>
    <Button className='w-1/4'> ☰</Button>  
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
        MY COURSES
      </div>
      <div className='flex justify-end mt-8'>
       <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 w-4/5'>
        {boughtCourse?.data?.map((purchase) => (
    <Cards key={purchase.id} purchase={purchase} />
  ))}
       </div>
      </div>
    </div>
  )
}