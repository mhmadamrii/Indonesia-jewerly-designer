import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { registerToArtist } from "~/actions/user.action";
import { useRoleStore } from "~/lib/store/role.store";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
  const navigate = useNavigate();
  const router = useRouter();

  const [isAgree, setIsAgree] = useState(false);
  const { setRole } = useRoleStore();
  const { mutate, isPending } = useMutation({
    mutationFn: registerToArtist,
    onSuccess: async () => {
      window.location.reload();
      navigate({ to: "/~/artist/dashboard" });
      toast.success("Registered successfully");
      setRole("artist");
      onClose();
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
            onCheckedChange={() => setIsAgree(!isAgree)}
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
