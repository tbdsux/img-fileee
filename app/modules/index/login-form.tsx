import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { loginFn } from "~/auth/server-fn";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export default function MainLoginForm() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutateLogin = useMutation({
    mutationFn: loginFn,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (data: FormData) => {
    const process = toast.loading("Logging in...");
    setIsProcessing(true);

    await mutateLogin.mutateAsync(
      { data },
      {
        onError: (error) => {
          toast.error(error.message, { id: process });
          setIsProcessing(false);
        },
        onSuccess: () => {
          toast.success("Logged in successfully", { id: process });
          setIsProcessing(false);

          router.navigate({ to: "/d" });
        },
      }
    );
  };

  return (
    <div className="w-1/2 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Your email account"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button disabled={isProcessing} type="submit">
                Log In
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
