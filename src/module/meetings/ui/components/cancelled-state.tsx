import { EmptyState } from "@/components/empty-state";



export const CancelledState = () => {
  return (
   <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center">
    <EmptyState
      image="/cancelled.svg"
      title="Meeting is Cancell"

      description="Meeting will end once all participants have left"/>
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
      </div>
   </div>
  );
};
