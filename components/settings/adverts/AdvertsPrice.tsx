import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCheck, Copy } from "lucide-react";

interface AdvertsPriceProps {
  voucherCode: string | null;
  setVoucherCode: (code: string | null) => void;
}

const AdvertsPrice: FC<AdvertsPriceProps> = ({
  voucherCode,
  setVoucherCode,
}) => {
  const { toast } = useToast();
  const { copyToClipboard, copiedField } = useCopyToClipboard();

  const handleGetVoucher = async () => {
    try {
      const response = await axios.post("/api/voucher");
      if (response.data.success) {
        setVoucherCode(response.data.voucherCode);
        toast({
          title: "Voucher activated",
          description: "Copy your code below!",
        });
      } else {
        throw new Error("Failed to update voucher status");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to activate voucher",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement>,
    text: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    copyToClipboard(text, "voucherCode");
    toast({
      title: "Copied!",
      description: "Voucher code copied to clipboard.",
    });
  };

  return (
    <div className="w-full mt-4">
      <Button
        type="button"
        variant="default"
        className="bg-orange-400 w-full"
        onClick={handleGetVoucher}
      >
        Get a voucher
      </Button>
      {voucherCode && (
        <div className="mt-4">
          <Label className="block text-sm font-medium text-gray-700">
            Your Code:
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={voucherCode}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="p-0"
                    onClick={(event) => handleCopy(event, voucherCode)}
                  >
                    {copiedField === "voucherCode" ? (
                      <CheckCheck size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertsPrice;
