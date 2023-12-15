/** @format */

"use client";

import { useToast } from "@/hooks/use-toast";
import { ElementRef, FC, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInValidator } from "@/lib/validators/signin";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import * as yup from "yup";

interface SignInProps {}

type FormData = yup.InferType<typeof SignInValidator>;

const Page: FC<SignInProps> = ({}) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignInValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      router.push("/");
      // const payload = await ContactValidator.validate(data);
      // await addDoc(collection(db, "clients"), {
      //   ...payload,
      // });
      // const res = await handleFormSpree(payload);
      // if (res.data.ok) {
      //   return toast({
      //     title: "Message sent successfully.",
      //     description:
      //       "Your enquiry has been recieved. I'll get back to you as soon as possible!",
      //     variant: "default",
      //   });
      // }
    } catch (error) {
      // toast({
      //   title: "Something went wrong.",
      //   description: "Could not send message. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      // reset();
      setLoading(false);
      // setSelectedFile(null);
      // setFileName("");
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
            disabled={isSubmitting || !isValid}
            type="submit"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
