import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-6">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="my-4 text-gray-600">
            Oops! It looks like the page you're looking for doesn't exist.
          </p>
          
          <Link href="/">
            <Button className="mt-2 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Jay-XO Game
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
