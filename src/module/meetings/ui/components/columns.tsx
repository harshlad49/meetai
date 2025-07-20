"use client"
import {format} from "date-fns";
import humanizeDuration from "humanize-duration";
import { ColumnDef } from "@tanstack/react-table"
import { MeetingGetMany } from "../../types"
import { GeneratedAvatar } from "@/components/ui/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { 
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  CornerDownRightIcon,
  LoaderIcon,
  ClockFadingIcon
 } from "lucide-react"
 import { cn } from "@/lib/utils";


 function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}
const statusIconsMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  cancelled: CircleXIcon,
  processing: LoaderIcon,
};
const statusColorsMap = {
  upcoming: "bg-yellow-500/20 text-yellow-500 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray-500/20 text-gray-800 border-gray-800/5",
};  
export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold">{row.original.name}</span>
        <div
          className="flex items-center gap-x-2"
          title={row.original.name}
        >
          <div className="flex items-center gap-x-1">
          <CornerDownRightIcon className="size-3 text-muted-foreground max-w-[200px] truncate" />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
            {row.original.agent.name}
          </span>
        </div>
        <GeneratedAvatar
            variant="botttsNeutral"
            className="size-4"
            seed={row.original.agent.name}
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt ? format(row.original.startedAt, "MMMM d") : ""}
          </span>
        </div> 
      </div>
    )
  },
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const Icon = statusIconsMap[row.original.status as keyof typeof statusIconsMap];
    return (
      <Badge
        variant="outline"
        className={cn(
          "capitalize [&>svg]:size-4",
          statusColorsMap[row.original.status as keyof typeof statusColorsMap]
        )}
      >
        <Icon className={cn(
          row.original.status === "processing" && "animate-spin"
        )
        } />
        {row.original.status}
      </Badge>
    );
  } },

  {
    accessorKey: "duration",
    header:"duration",
    cell: ({row}) => (
      <Badge
       variant="outline"
       className="captilize [&>svg]:size-4 flex items-center gap-x-2">
        <ClockFadingIcon className="text-blue-700"/>
        {row.original.duration ? formatDuration(row.original.duration): "No duration"}
      </Badge>
    )
  }

]
