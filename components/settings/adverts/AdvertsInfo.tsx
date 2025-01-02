import { Label } from "@/components/ui/label";
import { TriangleAlert } from "lucide-react";
import { FC } from "react";

const AdvertsInfo: FC = () => {
  return (
    <div className="mb-4 max-w-md">
      <p className="text-sm text-zinc-400 mt-2">
        Follow these tips to make your advert stand out:
      </p>
      <ul className="text-left list-disc list-inside mt-4 text-sm text-zinc-500 space-y-2">
        <li>
          <strong>Be concise:</strong> Keep your message short and clear.
        </li>
        <li>
          <strong>Highlight key details:</strong> Mention what makes your offer
          unique.
        </li>
        <li>
          <strong>Call to action:</strong> Add a phrase like "Contact now!" or
          "Limited offer!" to encourage engagement.
        </li>
      </ul>
      <div className="mt-6 bg-zinc-100 p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold text-zinc-600 text-sm">Example advert:</h4>
        <p className="text-sm text-zinc-500 mt-2">
          Username: "Fresh organic apples directly from the farm! Only $5 per
          kg. Call now to order: (123) 456-7890."
        </p>
      </div>
      <Label className="flex justify-start items-center my-4 text-red-500">
        <TriangleAlert className="w-4 h-4 text-red-500 mr-2 text-left" />
        Once you receive your voucher, it will be available for 8 hours
      </Label>
    </div>
  );
};

export default AdvertsInfo;
