/** @format */

"use client";

import { useToast } from "@/hooks/use-toast";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInValidator } from "@/lib/validators/signin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Icons } from "@/components/Icons";

interface SignInProps {}

type FormData = yup.InferType<typeof SignInValidator>;

const Page: FC<SignInProps> = ({}) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignInValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "User not found. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container px-[16px] min-h-screen md:px-[2rem] md:max-w-lg lg:max-w-lg xl:max-w-xl absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        <div className="text-2xl sm:text-2xl font-semibold text-center">
          Sign In
        </div>
        <form className="pt-[10px] w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 ">
            <Input
              autoComplete="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Your email"
              type="text"
              label="Email Address"
              error={errors?.email?.message}
            />
          </div>
          <div className="grid grid-cols-1 mt-6">
            <Input
              id="password"
              autoComplete="password"
              {...register("password", { required: true })}
              placeholder="Your password"
              type="password"
              label="Password"
              error={errors?.password?.message}
            />
          </div>
          <div className="mt-6 flex ml-0 content-start justify-start mr-auto w-full">
            {/* <div className="text-sm">
              New to DynastyU?{" "}
              <Link
                href="/sign-up"
                className="text-sm underline underline-offset-4"
              >
                Sign Up
              </Link>
            </div> */}
          </div>
          <Button
            className="mt-3 w-full"
            size="lg"
            variant="default"
            disabled={isSubmitting || !isDirty}
            type="submit"
          >
            {isSubmitting ? (
              <div className="flex flex-row items-center justify-center">
                <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
