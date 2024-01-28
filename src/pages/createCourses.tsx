import React from 'react'
import { type Course } from "@prisma/client";
import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
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
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

function Cards({course}: {course: Course}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
      {course.description}
      <br />
      ₹{course.price}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Delete</Button>
        <Link href={`/course/${course.id}`}>
        <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


export default function creatorCourses ()  {

  const createPost = api.post.createCourse.useMutation();
  const listings = api.getByCreatorId.GetByCreatorId.useQuery();
  
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
    createPost.mutateAsync({
      ...values,
    })

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
 <Dialog>
  <DialogTrigger asChild>
    <Button className="border-slate-500 border-2" variant="outline">ADD COURSE</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w[425px]">
  <DialogHeader>
      <DialogTitle className='flex justify-center'>Add new Course</DialogTitle>
  </DialogHeader> 
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Name your title" {...field} />
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
                         placeholder="Add description"
                         className="col-span-3"
                         {...field}
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
                      <Input placeholder="Price" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>  
        </DialogFooter>
        </form>
      </Form>
  </DialogContent>
 </Dialog>
</div>
<div className='flex justify-end'>
<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 w-4/5'>
{listings?.data?.map((course) => (
    <Cards key={course.id} course={course} />
  ))}
</div>
</div>
    </div>
  )
}