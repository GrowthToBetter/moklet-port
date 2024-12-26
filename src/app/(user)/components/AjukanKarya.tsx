"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { DropDown } from "@/app/components/utils/Form";
import { updateUploadFileByLink } from "@/utils/server-action/userGetServerSession";
import { useZodForm } from "@/utils/use-zod-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { userFullPayload } from "@/utils/relationsip";

const uploadSchema = z.object({
  name: z.string().min(1, "Nama Product wajib diisi"),
  type: z.string().min(1, "Tipe Product wajib diisi"),
  url: z.string().url("Link Product harus berupa URL valid"),
  genre: z.string().min(1, "Genre wajib dipilih"),
  classes: z.string().min(1, "Kelas wajib dipilih"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

export default function UploadForm({
  userData,
  genre,
  classess,
}: {
  userData: userFullPayload;
  genre: { Genre: string }[];
  classess: { name: string }[];
}) {
  const router = useRouter();

  const form = useZodForm({
    defaultValues: {
      name: "",
      type: "",
      url: "",
      genre: "",
      classes: "",
      description:""
    },
    schema: uploadSchema,
  });

  const handleSubmit = async (values: UploadFormValues) => {
    const toastId = toast.loading("Uploading...");
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("userId", userData.id);
      formData.append("role", userData.role);

      const response = await updateUploadFileByLink(formData);

      if (!response) {
        toast.error("Gagal mengunggah Data", { id: toastId });
      } else {
        toast.success("Data berhasil diunggah", { id: toastId });
        router.refresh();
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`, { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md mt-12">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Product</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan nama Product" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Product</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan tipe Product" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Product</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan link Product" />
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
              <FormLabel>Description Product</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan description Product" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <DropDown
                label="Genre"
                options={genre.map((g) => ({
                  label: g.Genre,
                  value: g.Genre,
                }))}
                value={field.value}
                handleChange={(value) => field.onChange(value)}
                name="genre"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>classes</FormLabel>
              <DropDown
                label="classes"
                options={classess.map((c) => ({
                  label: c.name,
                  value: c.name,
                }))}
                value={field.value}
                handleChange={(value) => field.onChange(value)}
                name="classes"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Unggah
        </Button>
      </form>
    </Form>
  );
}
