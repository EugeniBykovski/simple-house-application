import { cn } from "@/lib/utils";
import Link from "next/link";
import { Logo } from "../common/Logo/Logo";

interface Props {
  size?: number;
  className?: string;
  hasLink?: boolean;
}

export const AppTitle = ({ className, hasLink }: Props) => {
  return (
    <>
      {hasLink ? (
        <Link
          href={"/dashboard"}
          className={cn(
            "flex justify-center items-center gap-2 text-2xl bg-red-500 relative z-10",
            className
          )}
        >
          <h1>
            Simple <span className="text-primary font-semibold">House</span>
          </h1>
        </Link>
      ) : (
        <div
          className={cn(
            "flex justify-center items-center gap-2 text-3xl",
            className
          )}
        >
          <h1 className="flex items-center gap-2">
            <Logo />
            Simple <span className="text-primary font-semibold">House</span>
          </h1>
        </div>
      )}
    </>
  );
};
