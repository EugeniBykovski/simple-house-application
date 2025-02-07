import { CreditCard } from "lucide-react";
import Link from "next/link";

const Billing = () => {
  return (
    <div className="p-2 rounded-lg mr-2 cursor-pointer transition">
      <Link
        href={"/dashboard/settings/billing"}
        className="
    relative"
      >
        <span className="w-2 h-2 bg-green-500 absolute rounded-full -right-1 -top-[6px]"></span>
        <CreditCard className="text-zinc-500 hover:text-zinc-400 transition" />
      </Link>
    </div>
  );
};

export default Billing;
