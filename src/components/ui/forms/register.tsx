"use client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { authClient } from "@/lib/auth-client"
import { RegisterSchema } from "@/zod/auth"

type RegisterFormType = z.infer<typeof RegisterSchema>

export function RegisterForm() {
    const { register, handleSubmit, formState: { isSubmitting, errors}} = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterSchema)
    })
    const router = useRouter()

     const handleRegister: SubmitHandler<RegisterFormType> = async (data: RegisterFormType) => {
        await authClient.signUp.email(data,{
            onError: (ctx) => {
                toast.error(`Registration failed. ${ctx.error.message}`)
            },
            onSuccess: () => {
                toast.success('Registration Successful.')
                router.push('/base')
            }
        })
    }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...register('name')}
                  placeholder="John Doe"
                />
                <FieldDescription className="text-center">
                  {errors.email?.message}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register('email')}
                  placeholder="m@example.com"
                />
                <FieldDescription className="text-center">
                  {errors.email?.message}
                </FieldDescription>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input {...register('password')} type="password" />
                <FieldDescription className="text-center">
                  {errors.password?.message}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">
                    <LoadingSwap isLoading={isSubmitting}>
                        Register
                    </LoadingSwap>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
