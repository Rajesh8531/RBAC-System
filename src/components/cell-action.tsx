import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useState } from "react";
import DeleteModal from "./modals/delete-modal";

interface CellActionProps {
  onUpdate: () => void;
  onDelete: () => void;
}

const CellAction = ({ onUpdate, onDelete }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="h-4 w-4 text-primary_red" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-primary_red">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onUpdate}
            className="focus:bg-primary_red focus:cursor-pointer focus:text-white"
          >
            <Edit className="h-4 w-4 mr-2" />
            <p>Update</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="focus:bg-primary_red focus:cursor-pointer focus:text-white"
          >
            <Trash className="h-4 w-4 mr-2" />
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
