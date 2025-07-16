
import {AgentGetOne} from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import {z} from "zod";
import { agentsInsertSchema } from "@/app/(dashboard)/agents/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface AgentFormProps {
  onSuccess?: () => void;
   onCancel?: () => void;
   initailValues?: AgentGetOne;
}

export const AgentForm = ({ onSuccess, onCancel, initailValues }: AgentFormProps) => {
 const trpc = useTRPC();

 const queryClient = useQueryClient();
 const createAgent  = useMutation(
  trpc.agents.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        trpc.agents.getMany.queryOptions({}),
      );
     
      onSuccess?.();
      //TODO: check if error code is "FOBIDDEN", redirect to /upgrade
    },
    onError: (error
    ) => {toast.error(error.message);},
  }),
);
 const updateAgent  = useMutation(
  trpc.agents.update.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        trpc.agents.getMany.queryOptions({}),
      );
      if(initailValues?.id) {
       await queryClient.invalidateQueries(
          trpc.agents.getOne.queryOptions({id: initailValues.id}),
        )
      }
      onSuccess?.();
      //TODO: check if error code is "FOBIDDEN", redirect to /upgrade
    },
    onError: (error
    ) => {toast.error(error.message);},
  }),
);
 const form = useForm<z.infer<typeof agentsInsertSchema>>({
   resolver: zodResolver(agentsInsertSchema),
   defaultValues:{
     name: initailValues?.name?? "",
     instructions: initailValues?.instructions?? "",
   },
 });
  const isEdit = !!initailValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if(isEdit) {
      updateAgent.mutate({...values, id: initailValues.id });
    } else {
      createAgent.mutate(values);
    }
  }
  return (
    <Form  {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
         seed={form.watch("name")}
         variant="botttsNeutral"
         className="border size-16"
        />
        <FormField name="name" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="eg. John" />
            </FormControl>
            <FormMessage />
          </FormItem>
          
        )} />
        <FormField name="instructions" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>Instruction</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="You are a helpful math assistant that can assistant that can answer that can answer questions and help with assignments." />
            </FormControl>
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
)}