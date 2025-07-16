import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

import { toast } from "sonner";
import { registerToArtist } from "~/actions/user.action";
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "./animate-ui/headless/dialog";

export function DialogConfirmArtist({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isAgree, setIsAgree] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: registerToArtist,
    onSuccess: () => {
      toast.success("Registered successfully");
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogBackdrop />
      <DialogPanel>
        <DialogHeader>
          <DialogTitle>Confirm to Be an Artist</DialogTitle>
          <DialogDescription>
            You are about to become an artist. Please confirm that you are ready
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isAgree}
            onCheckedChange={(value) => setIsAgree(!isAgree)}
            id="terms"
            defaultChecked={true}
          />
          <Label htmlFor="terms">I agree to the terms and conditions</Label>
        </div>
        <DialogFooter>
          <Button
            className="w-[100px] cursor-pointer"
            onClick={() => mutate({})}
            disabled={!isAgree}
          >
            {isPending && <Loader className="animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogPanel>
    </Dialog>
  );
}
