/** @format */

"use client";

import { useToast } from "@/hooks/use-toast";
import { ElementRef, FC, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignUpValidator } from "@/lib/validators/signup";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SignUpProps {}

const Page: FC<SignUpProps> = ({}) => {
  const { toast } = useToast();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignUpValidator),
    defaultValues: {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      position: "",
    },
  });

  return (
    <div className="container px-[16px] min-h-screen md:px-[2rem] md:max-w-lg lg:max-w-lg xl:max-w-xl absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        <div className="text-2xl sm:text-2xl font-semibold text-center">
          Sign Up
        </div>
        <form className="pt-[10px] w-full">
          <div className="grid grid-cols-1 ">
            <Input
              id="firstname"
              {...register("firstname", { required: true })}
              placeholder="Your first name"
              type="text"
              label="First Name"
              error={errors?.firstname?.message}
            />
          </div>
          <div className="grid grid-cols-1 mt-6">
            <Input
              id="surname"
              {...register("surname", { required: true })}
              placeholder="Your last name"
              type="text"
              label="Last Name"
              error={errors?.surname?.message}
            />
          </div>
          <div className="grid grid-cols-1 mt-6">
            <Input
              id="username"
              {...register("username", { required: true })}
              placeholder="Your username"
              type="text"
              label="Username"
              error={errors?.username?.message}
            />
          </div>
          <div className="grid grid-cols-1 mt-6">
            <Input
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
              {...register("password", { required: true })}
              placeholder="Your password"
              type="password"
              label="Password"
              error={errors?.password?.message}
            />
          </div>
          <div className="grid grid-cols-1 mt-6">
            <Input
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              placeholder="Your confirmPassword"
              type="password"
              label="ConfirmPassword"
              error={errors?.confirmPassword?.message}
            />
          </div>
        </form>
        <div className="mt-6 flex ml-0 content-start justify-start mr-auto w-full">
          <div className="text-sm">
            Already a DynastyU member?{" "}
            <Link
              href="/sign-in"
              className="text-sm underline underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <Button
          className="mt-6 w-full"
          size="lg"
          variant="default"
          type="button"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Page;
