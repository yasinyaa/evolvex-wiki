import { LoginForm } from "@/components/ui/forms/login";
import { RegisterForm } from "@/components/ui/forms/register";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="font-sans w-full flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Tabs defaultValue="login" className="w-2/6">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
