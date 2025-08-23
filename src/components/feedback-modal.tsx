import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  isCreatingFeedback: boolean;
  onClose: () => void;
  onSubmit?: (feedback: { emote: string; message: string }) => void;
}

const emotes = [
  {
    emoji: "😍",
    label: "Love it!",
    value: "love",
  },
  {
    emoji: "😊",
    label: "Happy",
    value: "happy",
  },
  {
    emoji: "👍",
    label: "Good",
    value: "good",
  },
  {
    emoji: "😐",
    label: "Okay",
    value: "okay",
  },
  {
    emoji: "😕",
    label: "Could be better",
    value: "meh",
  },
];

export function FeedbackModal({
  isOpen,
  isCreatingFeedback,
  onClose,
  onSubmit,
}: FeedbackModalProps) {
  const [selectedEmote, setSelectedEmote] = useState<string>("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ emote: selectedEmote, message: feedback });
    }
    // Reset form
    setSelectedEmote("");
    setFeedback("");
    onClose();
  };

  const handleAskLater = () => {
    // Reset form
    setSelectedEmote("");
    setFeedback("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-border sm:max-w-md">
        <DialogHeader className="space-y-4 text-center">
          <div className="bg-accent/10 mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full">
            <div className="text-3xl">🎉</div>
          </div>
          <DialogTitle className="text-foreground text-2xl font-bold">
            Congratulations!
          </DialogTitle>
          <p className="text-muted-foreground text-base">
            Your product has been created successfully!
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Emote Selection */}
          <div className="space-y-3">
            <h3 className="text-foreground text-sm font-medium">
              How do you feel about this experience?
            </h3>
            <div className="flex justify-center gap-3">
              {emotes.map((emote) => (
                <button
                  key={emote.value}
                  onClick={() => setSelectedEmote(emote.value)}
                  className={cn(
                    "h-16 w-16 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg",
                    "flex items-center justify-center text-3xl",
                    selectedEmote === emote.value
                      ? "border-accent bg-accent/10 scale-105 shadow-md"
                      : "border-border hover:border-accent/50 bg-card",
                  )}
                  title={emote.label}
                >
                  {emote.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Input */}
          <div className="space-y-3">
            <label htmlFor="feedback" className="text-foreground text-sm font-medium">
              Help us improve your experience
            </label>
            <Textarea
              disabled={isCreatingFeedback}
              id="feedback"
              placeholder="Tell us what you think... (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="bg-input border-border focus:border-accent focus:ring-accent/20 min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleAskLater}
              className="border-border hover:bg-muted flex-1 bg-transparent"
            >
              Ask me later
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedEmote || isCreatingFeedback}
              className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1 disabled:opacity-50"
            >
              {isCreatingFeedback ? (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
