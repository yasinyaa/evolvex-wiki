"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { useCreateTagMutation } from "@/store/services/tags-api";
import { tagSchema } from "@/zod/tag";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { LoadingSwap } from "../loading-swap";

type TagFormType = z.infer<typeof tagSchema>;

type CreateTagFormProps = {
  isInline?: boolean;
};

export function CreateTagForm({ isInline= false }: CreateTagFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<TagFormType>({
    resolver: zodResolver(tagSchema),
  });
  const [createTag, { isSuccess, isError }] = useCreateTagMutation();
  const router = useRouter();

  const handleTagCreate = (data: TagFormType) => {
    createTag(data);
    console.log(isSuccess)


    if (isError) {
      toast.error("Failed to create tag.");
    }

    if (isSuccess) {
      toast.success("Successfully Created Tag");
      if (!isInline) router.push("/base");
    }
  };

  return (
    <div className="size-full flex flex-col items-start justify-start gap-6">
      <Card className="w-2/5">
        <CardContent>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleTagCreate)}
          >
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <Label>Tag Name</Label>
              <Input {...register("name")} />
              <p className="text-red-900 text-sm">
                {errors.name?.message}
              </p>
            </div>
            <div className="w-full">
              <Button type="submit">
                <LoadingSwap isLoading={isSubmitting}>Save</LoadingSwap>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
