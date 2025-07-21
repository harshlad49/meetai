"use client"
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { columns } from "@/module/meetings/ui/components/columns";
import { DataTable } from "../components/data-table";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pageination";
export const MeetingsView = () => {
  const router = useRouter();
  const [filters, setFilters] =  useMeetingsFilters();
   const trpc = useTRPC();
   const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
   }));
  return (
    <div className="flex-1 pb-4 md:px-8 flex-col gap-y-4">
    <DataTable data={data.items} columns={columns}
    onRowClick={(row)=> router.push(`/meetings/${row.id}`)}/>
    <DataPagination
     page={filters.page}
     totalPages={data.totalPages}
     onPageChange={(page) => setFilters({page})}
      />
     {data.items.length === 0 && (
            <EmptyState
            title="Create Your first meeting"
            description="Schedule a meeting to meeting to connect with others. Each meeting lets you collabrate, share ideas, and interact with participants in real time."
            />
            )}
      </div>
  );
}
export const MeetingsViewLoading = () =>{
  return( <LoadingState title="Loading Meetings" description="This may take a few seconds" />)
}

export const MeetingsViewError = () => {
  return( <ErrorState title="Error Loading Meetings" description="Someting went wrong"/>)
}
