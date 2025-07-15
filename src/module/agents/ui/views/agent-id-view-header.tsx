import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { ChevronRightIcon, MoreVerticalIcon, TrashIcon, PencilIcon } from "lucide-react";
interface Props {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
export const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onRemove
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl" >
              <Link href="/agents">
                My Agents
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4" >
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl text-foreground" >
              <Link href={`/agents/${agentId}`}>
                {agentName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* WithOut modal={false}, the dialog that this dropdown opens cause the wedsite to get unclickable */}
      <DropdownMenu modal={false} >
        <DropdownMenuTrigger asChild >
          <Button variant="ghost" >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white p-2  rounded-lg border shadow-md">
          <DropdownMenuItem onClick={onEdit} className="flex items-center gap-x-2 hover:bg-gray-100">
            <PencilIcon className="size-4 text-black" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove} className="flex items-center gap-x-2 hover:bg-gray-100">
            <TrashIcon className="size-4 text-black" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}