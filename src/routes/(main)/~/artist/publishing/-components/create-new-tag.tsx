import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNewTag } from "~/actions/jewelry.action";

export function CreateNewTag({ tagName }: { tagName: string }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNewTag,
    onSuccess: () => {
      toast.success("Tag created successfully");
      queryClient.invalidateQueries({ queryKey: ["tags_and_categories"] });
    },
  });

  return (
    <div className="w-full">
      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
        no results found,{" "}
        <span
          onClick={() => mutate({ data: { name: tagName } })}
          className="cursor-pointer text-black hover:underline dark:text-white"
        >
          create
        </span>{" "}
        <span className="italic">"{tagName}"</span> instead?
      </p>
    </div>
  );
}
