import { serve } from "inngest/next";
import { inngest } from "@/inngest/clien";
import { meetingsProcessing } from "./functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   meetingsProcessing
  ],
});