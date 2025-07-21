'use client';
import { Button } from "@/components/ui/button"
import {  PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFiler } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {DEFAULT_PAGE} from "@/constants"
// import { useState } from "react";
// import { useAgentFilters } from "../../hooks/use-agents-filters";
// import { AgentsSearchFilter } from "./agents-search-filter";
// import {DEFAULT_PAGE} from "@/constants"
export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
    const  [isDialogOpen, setIsDialogOpen] = useState(false);
    const isAnyFilterModified = 
        !!filters.status || !!filters.search || !!filters.agentId;
    const  onClearFilter = ()  =>{
      setFilters({
        status: null,
        agentId: "",
        search:"",
        page: DEFAULT_PAGE,
      })
    }
  return (
    <>
    
    <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 ">
      <div className="flex justify-between items-center">
      <h5 className="font-medium text-xl">My Meetings</h5>
      <Button onClick={() => setIsDialogOpen(true)} >
        <PlusIcon/>
         New Meetings
      </Button>
      </div>
      <ScrollArea className="w-full overflow-x-auto">
       <div className="flex items-center gap-x-2 p-1  min-w-max">
        <MeetingsSearchFilter/>
        <StatusFiler />
        <AgentIdFilter/>
        {isAnyFilterModified && (
          <Button variant="outline" onClick={onClearFilter}>
            <XCircleIcon className="size-4"/>
          </Button>
        )}
       </div>
       <ScrollBar orientation="horizontal"/>
       </ScrollArea>
    </div>
    </>
  )
}