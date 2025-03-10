import { Button } from "@/components/ui/button";
import LootCard from "@/components/LootCard";
import { BoxSelectIcon, PersonStandingIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold">Welcome to BookSphere</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Discover, review, and recommend your favorite books with a community
          of passionate readers.
        </p>
        <Button onClick={() => navigate("/store")} className="mt-6">
          Start Exploring
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <LootCard
          icon={BoxSelectIcon}
          title="Vast Collection"
          description="Explore thousands of books across various genres and categories."
          color="text-blue-500"
        />
        <LootCard
          icon={PersonStandingIcon}
          title="Personalized Recommendations"
          description="Get book suggestions based on your reading history and preferences."
          color="text-yellow-500"
        />
        <LootCard
          icon={User}
          title="Community Driven"
          description="Engage with fellow book lovers, share reviews, and create lists."
          color="text-green-500"
        />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold">Join BookSphere Today</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Start your journey to discovering amazing books and meeting fellow
          readers.
        </p>
        <Button onClick={() => navigate("/signup")} className="mt-4">
          Sign Up Now
        </Button>
      </div>
    </div>
  );
}
