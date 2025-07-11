import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
 } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export const DashboardUserButton = () =>{
   const router = useRouter(); 
  const {data, isPending} = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }
  const onLogout =  () => { 
     authClient.signOut({
      fetchOptions:{
        onSuccess: () => {
          router.push("/sing-in");
        },
      }
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5   hover:bg-white/10 overflow-hidden">
      {data.user.image ?(
        <Avatar>
          <AvatarImage  src={data.user.image} />
        </Avatar>
      ): (
        <GeneratedAvatar
          seed={data.user.name}
          variant="initials"
          className="size-9 mr-3"
        />
      )}
      <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-hidden flex-1 min-w-0">
        <p className="text-sm truncate w-full">{data.user.name}</p>
        <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72" >
        <DropdownMenuLabel>
         <div className="flex flex-col gap-1">
          <span className="fout-medium truncate">{data.user.name}</span>
          <span className="text-sm fout-normal text-muted-foreground truncate">{data.user.email}</span>
          </div>
          </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <a href="#" className="block px-4 py-2 bg-black text-sm text-left hover:bg-gray-100">
            Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="#" className="block px-4 py-2 text-sm text-left hover:bg-gray-100">
            Sign out
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="#" className="block px-4 py-2 text-sm text-left hover:bg-gray-100">
            Help
          </a>
        </DropdownMenuItem> */}
         <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4"/>
          </DropdownMenuItem>
           <DropdownMenuItem 
           onClick={onLogout}
           className="cursor-pointer flex items-center justify-between">
          Logout
          <LogOutIcon className="size-4"/>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}