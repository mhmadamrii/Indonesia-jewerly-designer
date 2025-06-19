import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { IKImage } from "imagekitio-react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { createJewerlyAsset } from "~/actions/jewerly.action";
import { useFormStorage } from "~/lib/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function JewerlyPublishForm() {
  const navigate = useNavigate();
  const { jewerlyForm, resetJewerlyForm } = useFormStorage();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createJewerlyAsset,
    onSuccess: () => {
      toast.success("Data saved successfully");
      resetJewerlyForm();
      navigate({
        to: "/dashboard",
      });
    },
  });

  const handlePublish = async () => {
    try {
      const res = await mutateAsync({
        data: {
          name: jewerlyForm.title,
          description: jewerlyForm.desc,
          price: jewerlyForm.price,
          imageUrl: jewerlyForm.image_url as string,
          categoryId: jewerlyForm.category,
        },
      });
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-4 px-10">
      <div className="flex flex-col gap-2">
        <Label>Title</Label>
        <Input readOnly value={jewerlyForm.title} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Price</Label>
        <Input readOnly value={jewerlyForm.price} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Currency</Label>
        <Input readOnly value={jewerlyForm.currency} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea readOnly value={jewerlyForm.desc} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Asset Attachment</h1>
        <IKImage
          src={jewerlyForm.image_url ?? ""}
          className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
          alt="Asset Image"
        />
      </div>
      <div className="flex w-full items-center justify-end">
        <Button
          disabled={isPending}
          onClick={handlePublish}
          className="w-full cursor-pointer bg-[#FF3B30] hover:bg-[#FF3B30]/80 sm:w-1/4"
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : "Publish"}
        </Button>
      </div>
    </section>
  );
}
