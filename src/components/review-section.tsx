import { useState } from "react";
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

interface Review {
  id: string;
  userId: string;
  jewelryAssetId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    image?: string;
  };
}

interface ReviewSectionProps {
  jewelryAssetId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export function ReviewSection({
  jewelryAssetId,
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
}: ReviewSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const mockReviews: Review[] = [
    {
      id: "rev_1",
      userId: "user_456",
      jewelryAssetId: jewelryAssetId,
      rating: 5,
      comment:
        "Absolutely stunning piece! The craftsmanship is incredible and it arrived exactly as described. The packaging was beautiful too. Highly recommend this artist!",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      user: {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "rev_2",
      userId: "user_789",
      jewelryAssetId: jewelryAssetId,
      rating: 4,
      comment:
        "Beautiful jewelry, very well made. Shipping was fast and the item was well protected. Only minor issue was that it was slightly smaller than I expected, but still gorgeous!",
      createdAt: new Date("2024-01-08"),
      updatedAt: new Date("2024-01-08"),
      user: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "rev_3",
      userId: "user_321",
      jewelryAssetId: jewelryAssetId,
      rating: 5,
      comment:
        "Perfect for my anniversary gift! My wife absolutely loves it. The quality exceeded my expectations and the customer service was excellent.",
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
      user: {
        name: "David Rodriguez",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "rev_4",
      userId: "user_654",
      jewelryAssetId: jewelryAssetId,
      rating: 5,
      comment:
        "This is my third purchase from this artist and I'm never disappointed. The attention to detail is amazing!",
      createdAt: new Date("2024-01-03"),
      updatedAt: new Date("2024-01-03"),
      user: {
        name: "Emma Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : mockReviews;
  const displayAverageRating = averageRating > 0 ? averageRating : 4.8;
  const displayTotalReviews = totalReviews > 0 ? totalReviews : mockReviews.length;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmitReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim()) {
      // Here you would typically submit to your API
      console.log("Submitting review:", {
        jewelryAssetId,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      // Reset form
      setNewReview({ rating: 0, comment: "" });
      setIsWritingReview(false);
      // You might want to refresh the reviews list here
    }
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
              {renderStars(displayAverageRating)}
              <span className="text-sm font-medium">{displayAverageRating}</span>
              <span className="text-muted-foreground text-sm">
                ({displayTotalReviews} reviews)
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
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
          {/* Write Review Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Share your experience</h3>
              {!isWritingReview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsWritingReview(true)}
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
                      onClick={handleSubmitReview}
                      disabled={newReview.rating === 0 || !newReview.comment.trim()}
                      className="gap-2"
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
              Customer Reviews ({displayTotalReviews})
            </h3>

            {displayReviews.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {displayReviews.map((review) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={review.user.image || "/placeholder.svg"}
                          alt={review.user.name}
                        />
                        <AvatarFallback>
                          {review.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-sm font-medium">{review.user.name}</h4>
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {review.comment}
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

                    {review.id !== displayReviews[displayReviews.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
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
