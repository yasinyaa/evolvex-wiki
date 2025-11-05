"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icons } from "@/constants";
import { useEditTagMutation } from "@/store/services/tags-api";
import { tagSchema } from "@/zod/tag";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { LoadingSwap } from "../loading-swap";

type TagFormType = z.infer<typeof tagSchema>;

type EditTagFormProps = {
    initialData?: TagFormType;
    id: string;
};

export function EditTagForm({ initialData, id }: EditTagFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TagFormType>({
    resolver: zodResolver(tagSchema),
    defaultValues: initialData || {
      name: "",
      icon: "",
    },
  });
  const [editTag] = useEditTagMutation();
  const router = useRouter();

  const handleTagCreate = (data: TagFormType) => {
    editTag({data, id})
      .unwrap()
      .then(() => {
        toast.success("Successfully Edited Tag");
        router.push("/base");
      })
      .catch(() => {
        toast.error("Failed to edit tag.");
      });
  };

  return (
    <div className="size-full h-full flex flex-col items-center lg:items-start justify-center lg:justify-start gap-6">
      <Card className="w-full lg:w-2/5">
        <CardContent>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(handleTagCreate)}
          >
            <div className="w-full flex flex-col gap-4 justify-start items-start">
              <Label>Tag Icon</Label>
              <Select
                defaultValue={initialData?.icon || ""}
                onValueChange={(value) => {
                  setValue("icon", value);
                  setValue("name", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {icons.map(({ name, icon: Icon }) => (
                      <SelectItem key={name} value={name}>
                        <div className="flex flex-row items-center gap-2">
                          <Icon />
                          <span>{name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-900 text-sm">{errors.icon?.message}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <Label>Tag Name</Label>
              <Input {...register("name")} />
              <p className="text-red-900 text-sm">{errors.name?.message}</p>
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
