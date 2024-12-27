import { FC } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PackagePlus } from "lucide-react";

export const SwitchAccountType: FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-zinc-600 p-3 rounded-lg hover:bg-zinc-500 transition cursor-pointer">
      <Label htmlFor="pro-mode" className="text-sm text-white cursor-pointer">
        Switch to{" "}
        <span className="text-md uppercase font-bold text-orange-400">pro</span>
      </Label>
      <Link href={"dashboard/settings/billing"}>
        <PackagePlus className="text-white" id="pro-mode" />
      </Link>
    </div>
  );
};
