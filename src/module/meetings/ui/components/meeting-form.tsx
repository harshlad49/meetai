
import {MeetingGetOne} from "../../types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommandSelect } from "@/module/agents/ui/components/command-select";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { useTRPC } from "@/trpc/client";
import {z} from "zod";
import { meetingsInsertSchema } from "../../server/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { NewAgentDialog } from "@/module/agents/ui/components/new-agent-dialog";
interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
   onCancel?: () => void;
   initailValues?: MeetingGetOne;
}

export const MeetingForm = ({
   onSuccess, onCancel, initailValues }: MeetingFormProps) => {
 const trpc = useTRPC();
const [agentSearch, setAgentSearch] = useState("");
 const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
const agents = useQuery(
  trpc.agents.getMany.queryOptions({
    pageSize: 100,
    search: agentSearch
  }),
);

 const queryClient = useQueryClient();
 const createMeeting  = useMutation(
  trpc.meetings.create.mutationOptions({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(
        trpc.meetings.getMany.queryOptions({}),
      );
     
      onSuccess?.(data.id);
      //TODO: check if error code is "FOBIDDEN", redirect to /upgrade
    },
    onError: (error
    ) => {toast.error(error.message);},
  }),
);
 const updateMeeting  = useMutation(
  trpc.meetings.update.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        trpc.meetings.getMany.queryOptions({}),
      );
      if(initailValues?.id) {
       await queryClient.invalidateQueries(
          trpc.meetings.getOne.queryOptions({id: initailValues.id}),
        )
      }
      onSuccess?.();
      //TODO: check if error code is "FOBIDDEN", redirect to /upgrade
    },
    onError: (error
    ) => {toast.error(error.message);},
  }),
);
 const form = useForm<z.infer<typeof meetingsInsertSchema>>({
   resolver: zodResolver(meetingsInsertSchema),
   defaultValues:{
     name: initailValues?.name?? "",
     agentId: initailValues?.agentId?? "",
   },
 });
  const isEdit = !!initailValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if(isEdit) {
      updateMeeting.mutate({...values, id: initailValues.id });
    } else {
      createMeeting.mutate(values);
    }
  }
  return (
    <>
    <NewAgentDialog
      open={openNewAgentDialog}
      onOpenChange={setOpenNewAgentDialog}/>
    <Form  {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="name" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="eg. Math Consultations" />
            </FormControl>
           
            <FormMessage />
          </FormItem>
          
        )} />
          <FormField name="agentId" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Agent</FormLabel>
            <FormControl>
             <CommandSelect
              options={(agents.data?.items ??  []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                  <div className="flex items-center gap-x-2">
                    <GeneratedAvatar
                      seed={agent.name}
                       variant="botttsNeutral" 
                       className="border size-6"/>
                       <span>{agent.name}</span>
                 </div>
                ),
              }))}
             onSelect={field.onChange}
             onSearch={setAgentSearch}
             value={field.value}
             placeholder="Select an agent"
              />

            </FormControl>
             <FormDescription>
              Not found what you&apos;re looking for?{" "}
              <button 
                 type="button"
                 className="text-primary hover:underline"
                 onClick={() => setOpenNewAgentDialog(true)}
              >Create a new agent</button>
            </FormDescription>
            <FormMessage />
          </FormItem>
           )} />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
            variant="ghost"
            disabled={isPending}
            type="button"
            onClick={()=> onCancel()}
            >Cancel</Button>)}
            <Button
            type="submit"
            disabled={isPending}
            >{isEdit? "Update" : "Create"}</Button>
        </div>
      </form>
    </Form>
    </>
)}