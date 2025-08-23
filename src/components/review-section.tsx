import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useOptimistic, useState } from "react";
import { toast } from "sonner";
import { createReview, getReviewByAssetId } from "~/actions/review.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";

import {
  ChevronDown,
  ChevronUp,
  Flag,
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
} from "lucide-react";

interface ReviewSectionProps {
  jewelryAssetId: string;
  averageRating?: number;
  totalReviews?: number;
}

type Review = {
  id: string;
  user: string;
  userImage: string | null;
  reviewDate: Date | string;
  rating: number;
  description: string;
};

export function ReviewSection({ jewelryAssetId }: ReviewSectionProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const queryClient = useQueryClient();

  const { data: reviewsData, refetch: refetchReviews } = useQuery({
    queryKey: ["jewelry_reviews", jewelryAssetId],
    queryFn: () =>
      getReviewByAssetId({
        data: {
          id: jewelryAssetId,
        },
      }),
  });

  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviewsData?.data.reviews ?? [],
    (
      state: Review[],
      newReview: { description: string; rating: number },
    ): Review[] => [
      ...state,
      {
        ...newReview,
        id: `optimistic-${Date.now()}`,
        user: "You",
        reviewDate: new Date(),
        userImage: "/placeholder-img.jpg",
      },
    ],
  );

  const { mutate } = useMutation({
    mutationFn: createReview,
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: ["jewelry_reviews", jewelryAssetId],
      });
      const previousReviews = queryClient.getQueryData([
        "jewelry_reviews",
        jewelryAssetId,
      ]);
      addOptimisticReview(data);
      setIsWritingReview(false);
      setNewReview({ rating: 0, comment: "" });
      return { previousReviews };
    },
    onError: (err, newReview, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(
          ["jewelry_reviews", jewelryAssetId],
          context.previousReviews,
        );
      }
      toast.error("Failed to submit review. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["jewelry_reviews", jewelryAssetId],
      });
    },
  });

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void,
  ) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= (interactive ? hoveredRating || rating : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer transition-transform hover:scale-110" : ""}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="p-0 text-lg">Reviews & Comments</CardTitle>
            <div className="flex items-center space-x-2">
              {renderStars(5)}
              <span className="text-sm font-medium">{5}</span>
              <span className="text-muted-foreground text-sm">
                ({optimisticReviews.length || 0} reviews)
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              refetchReviews();
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{isExpanded ? "Hide" : "See"} reviews & comments</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Share your experience</h3>
              {!isWritingReview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (reviewsData?.data.isUserOwnedProduct) {
                      setIsWritingReview(true);
                    } else {
                      toast.error("You don't own this product");
                    }
                  }}
                >
                  Write a Review
                </Button>
              )}
            </div>

            {isWritingReview && (
              <Card className="border-dashed">
                <CardContent className="space-y-4 p-4">
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    {renderStars(newReview.rating, true, (rating) =>
                      setNewReview({ ...newReview, rating }),
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-comment">Your Review</Label>
                    <Textarea
                      id="review-comment"
                      placeholder="Share your thoughts about this jewelry piece..."
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      className="cursor-pointer"
                      onClick={() =>
                        mutate({
                          data: {
                            title: "Review",
                            description: newReview.comment,
                            rating: newReview.rating,
                            productId: jewelryAssetId,
                          },
                        })
                      }
                      disabled={newReview.rating === 0 || !newReview.comment.trim()}
                    >
                      <Send className="h-4 w-4" />
                      Submit Review
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsWritingReview(false);
                        setNewReview({ rating: 0, comment: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <Separator />
          <div className="space-y-6">
            <h3 className="text-base font-medium">
              Customer Reviews ({optimisticReviews.length || 0})
            </h3>

            {optimisticReviews.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {optimisticReviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={review.userImage || "/placeholder-img.jpg"}
                          alt="user"
                        />
                        <AvatarFallback>
                          {review.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-sm font-medium">{review.user}</h4>
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {formatDate(review.reviewDate)}
                          </span>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {review.description}
                        </p>

                        <div className="flex items-center pt-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                            <Flag className="mr-1 h-3 w-3" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}