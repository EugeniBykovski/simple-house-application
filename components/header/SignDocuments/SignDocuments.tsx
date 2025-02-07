import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FileCheck, PencilLine } from "lucide-react";
import { FC } from "react";

export const SignDocuments: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 rounded-lg mr-2 cursor-pointer transition flex items-center gap-1 sm:gap-2 text-zinc-500 hover:text-zinc-400">
          <FileCheck className="w-5 h-5" />
          <p className="text-sm">Sign docs</p>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center w-[70vw] max-w-[70vw] h-[80vh]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-3xl text-zinc-700 font-bold flex items-center gap-2">
            Sign the document
            <PencilLine className="w-6 h-6" />
          </DialogTitle>
          <DialogDescription>
            Select the document you want to sign from the available ones:
          </DialogDescription>
        </DialogHeader>
        <Separator />
      </DialogContent>
    </Dialog>
  );
};
