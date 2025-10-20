"use client"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaGithub } from 'react-icons/fa'
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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { authClient } from "@/lib/auth-client"
import { LoginSchema } from "@/zod/auth"

type LoginFormType = z.infer<typeof LoginSchema>

export function LoginForm() {
    const { register, handleSubmit, formState: { isSubmitting, errors}} = useForm<LoginFormType>({
        resolver: zodResolver(LoginSchema)
    })
    const router = useRouter()

    const handleLogin: SubmitHandler<LoginFormType> = async (data: LoginFormType) => {
        await authClient.signIn.email(data,{
            onError: (ctx) => {
                toast.error(`Login failed. ${ctx.error.message}`)
            },
            onSuccess: () => {
                toast.success('Login Successful.')
                router.push('/base')
            }
        })
    }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" onClick={() => authClient.signIn.social({ provider: 'github'})}>
                  <FaGithub />
                  Login with Gihtub
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
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
                    <LoadingSwap isLoading={isSubmitting}> Login</LoadingSwap></Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
