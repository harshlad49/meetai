
import { StreamTheme , useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLoddy } from "./call-loddy";
import { CallActive } from "./call-action";
import { CallEnded } from "./call-ended";
interface Props {
  meetingName: string;
}
export const CallUI = ({ meetingName }: Props) => {
const call = useCall();
const [show , setShow] = useState<"lobby" | "call" | "ended">("lobby");
const handleJoin = async () => {
   if(!call) return
   await call.join();
   setShow("call");
   };
  const handleLeave =  () => {
    if(!call) return;
    call.endCall();
    setShow("ended")
}
return (
  <StreamTheme className="h-full">
    {show === "lobby" && <CallLoddy OnJoin={handleJoin}/>}
    {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName}/>}
    {show === "ended" && <CallEnded/>}

  </StreamTheme>
)
}