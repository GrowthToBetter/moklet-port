"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Body3 } from "@/app/components/ui/text";
import { Button } from "@/app/components/ui/button";
import { checkVerifiedStatus } from "@/lib/login";
import { useZodForm } from "@/utils/use-zod-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi!" })
    .email("Email tidak valid!"),
  password: z.string().min(1, "Password harus diisi!"),
});

export const LoginForm: FC = () => {
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: { email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (fields) => {
    setLoading(true);

    const loadingToast = toast.loading("Loading...");

    const verificationStatus = await checkVerifiedStatus(
      fields.email,
      fields.password,
    );

    if (verificationStatus.error) {
      setLoading(false);
      return toast.error(verificationStatus.error.message, {
        id: loadingToast,
      });
    }

    if (verificationStatus.data?.is_verified === false) {
      setLoading(false);
      return toast.error("Verifikasi email anda terlebih dahulu", {
        id: loadingToast,
      });
    }

    const loginResult = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: fields.email,
      password: fields.password,
    });

    if (loginResult?.error) {
      setLoading(false);
      return toast.error(
        loginResult.error === "CredentialsSignin"
          ? "Email/password anda salah!"
          : "Terjadi kesalahan",
        { id: loadingToast },
      );
    }

    toast.success("Berhasil Masuk!", { id: loadingToast });
    setLoading(false);
    return router.push("/");
  });

  return (
    <div className="flex flex-col">
      <Button
        variant={"outline"}
        className="mb-7 w-full"
        size={"lg"}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.8055 10.0415H21V10H12V14 H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
            fill="#FFC107"
          />
          <path
            d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
            fill="#FF3D00"
          />
          <path
            d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.572 17.5745 13.3038 18.0014 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
            fill="#4CAF50"
          />
          <path
            d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
            fill="#1976D2"
          />
        </svg>
        <Body3>Masuk dengan Google</Body3>
      </Button>
      <div className="mb-7 flex w-full items-center justify-between">
        <div className="h-[1px] w-[30%] bg-neutral-100"></div>
        <Body3>Atau dengan email</Body3>
        <div className="h-[1px] w-[30%] bg-neutral-100"></div>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="mb-[3.375rem] flex w-full flex-col gap-y-[1.375rem]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan alamat email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Masukkan kata sandi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            Masuk
          </Button>
        </form>
      </Form>
    </div>
  );
};