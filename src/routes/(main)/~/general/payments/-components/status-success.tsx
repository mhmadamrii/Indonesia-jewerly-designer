import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Download, Mail, Receipt } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function StatusSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Header */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="text-gray-600">Your 3D assets are ready for download</p>
          </div>
        </div>

        {/* Order Details Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Order #AS-2024-001234
                </CardTitle>
                <CardDescription>
                  Completed on January 27, 2025 at 9:02 PM
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Purchased Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your 3D Assets</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-3">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Sci-Fi Spaceship"
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">Sci-Fi Spaceship Collection</h4>
                    <p className="text-sm text-gray-600">
                      High-poly 3D models with textures
                    </p>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        GLB
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        FBX
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        OBJ
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$49.99</p>
                    <Button size="sm" className="mt-2">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-3">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Medieval Castle"
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">Medieval Castle Pack</h4>
                    <p className="text-sm text-gray-600">
                      Detailed architecture with PBR materials
                    </p>
                    <div className="mt-1 flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        BLEND
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        FBX
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$29.99</p>
                    <Button size="sm" className="mt-2">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$79.98</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$6.40</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>$86.38</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Download Instructions */}
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-medium text-blue-900">Download Instructions</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Your assets are available for download immediately</li>
                <li>• Downloads are valid for 30 days from purchase date</li>
                <li>• All files include textures and materials</li>
                <li>• Check your email for download links and license details</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <Link to="/~/general/explore">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link to="/~/general/explore">View All Orders</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link to="/~/general/cart">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-600">
          <p>A confirmation email has been sent to your registered email address.</p>
        </div>
      </div>
    </div>
  );
}
