import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
  Waves,
} from "lucide-react";

import { Badge } from "@/app/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/card";

export function MetricCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <DollarSign className="size-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Total Revenue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-bold text-3xl tabular-nums leading-none tracking-tight">
              $1,250.00
            </div>
            <Badge>
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Visitors for the last 6 months
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <UserPlus className="size-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>New Customers</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-bold text-3xl tabular-nums leading-none tracking-tight">
              1,234
            </div>
            <Badge variant="destructive">
              <TrendingDown className="size-3" />
              -20%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Acquisition needs attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Users className="size-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Active Accounts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-bold text-3xl tabular-nums leading-none tracking-tight">
              45,678
            </div>
            <Badge>
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Engagement exceeds targets
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Waves className="size-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Growth Rate</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-bold text-3xl tabular-nums leading-none tracking-tight">
              4.5%
            </div>
            <Badge>
              <TrendingUp className="size-3" />
              +4.5%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Meets growth projections
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
