import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandInput,
  CommandItem,
  CommandResposiveDialog,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children?: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value?: string;
  placeholder?: string;
  isSearchable?: string;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Search...",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
const handleOpenChange = (open: boolean) =>{
  onSearch?.("");
  setOpen(open);
}
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDown />
      </Button>

      <CommandResposiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={(val) => onSearch?.(val)}
        />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found.
            </span>
          </CommandEmpty>
          {options.map((opt) => (
            <CommandItem
              key={opt.id}
              onSelect={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResposiveDialog>
    </>
  );
};
