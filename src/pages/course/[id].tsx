import React, { useState } from 'react'
import { type Course } from "@prisma/client";
import { api } from '@/utils/api'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DevTool } from "@hookform/devtools"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.string().min(2, {
    message: "Price must be at least 2 characters.",
  }),
})


export default function ListingView ({course}: {course: Course})  {
    const router = useRouter();

    const getC = api.get.getById.useQuery(
        {
            listingId: router.query.id as string
        },
        {
            enabled: !!router.query.id,
        }
      );    
    
  const editC = api.editCourse.editCourse.useMutation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
   

    console.log(values)
    form.reset();
  }
 

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
        Created Courses
        </Link>
      </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
</div>
</div>

<div className='flex justify-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-2 text-slate-300'>
    CREATED COURSES
</div>
<div className='flex justify-center text-slate-300 py-8'>
<Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Edit your Course</CardTitle>
      </CardHeader>
      <CardContent>
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input defaultValue={getC.data?.title} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                         id="description"
                         defaultValue={getC.data?.description}
                         className="col-span-3"
                       />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input defaultValue={getC.data?.price} />
                    </FormControl>
                  </FormItem>
                )}
              />
        </form>
      </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Delete</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  </div>
</div>
  )
}
