import { CarFront, GalleryHorizontal, Ticket, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardsProps {
  cars: number;
  tickets: number;
  volunteers: number;
  gallery: number;
}

export function MetricCards({ cars, tickets, volunteers, gallery }: MetricCardsProps) {
  const metrics = [
    { label: "Car Registrations", value: cars, icon: CarFront },
    { label: "Ticket Sales", value: tickets, icon: Ticket },
    { label: "Volunteers", value: volunteers, icon: Users },
    { label: "Gallery Assets", value: gallery, icon: GalleryHorizontal }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{metric.label}</CardTitle>
            <metric.icon className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl font-bold text-accent">{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
