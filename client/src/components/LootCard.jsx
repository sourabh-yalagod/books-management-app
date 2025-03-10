import { Card, CardContent } from "@/components/ui/card";

export default function LootCard({ icon: Icon, title, description, color }) {
  return (
    <Card className="p-6 text-center shadow-md border border-gray-200 dark:border-gray-700">
      <CardContent className="flex flex-col items-center">
        <Icon className={`text-5xl ${color}`} />
        <h3 className="text-xl font-semibold mt-4">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
