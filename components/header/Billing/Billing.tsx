import { CreditCard } from "lucide-react";
import Link from "next/link";

const Billing = () => {
  return (
    <div className="p-2 rounded-lg mr-2 cursor-pointer transition">
      <Link
        href={"/dashboard/settings/billing"}
        className="flex items-center gap-1 text-zinc-500 hover:text-zinc-400 transition"
      >
        <CreditCard className="w-5 h-5" />
        <p className="text-sm relative">
          Purchases
          <div className="w-4 h-4 flex justify-center items-center bg-orange-500 absolute rounded-full -right-2 -top-3">
            <span className="text-[9px] text-white">1</span>
          </div>
        </p>
      </Link>
    </div>
  );
};

export default Billing;
