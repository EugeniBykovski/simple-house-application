import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import { CheckCheck, Copy } from "lucide-react";

export const UsernameField = ({
  control,
  username,
}: {
  control: any;
  username: string;
}) => {
  const { copyToClipboard, copiedField } = useCopyToClipboard();
  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement>,
    text: string,
    field: "username"
  ) => {
    event.preventDefault();
    event.stopPropagation();
    copyToClipboard(text, field);
  };

  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username:</FormLabel>
          <div className="flex justify-between items-center gap-4">
            <FormControl>
              <Input
                {...field}
                placeholder="Username"
                value={username}
                readOnly
                className="bg-muted"
              />
            </FormControl>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size={"sm"}
                    variant={"link"}
                    className="hover:text-green-400 p-0"
                    onClick={(event) => handleCopy(event, username, "username")}
                  >
                    {copiedField === "username" ? (
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const MessageField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="message"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Your message:</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder="Enter your message..."
            className="bg-muted"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const PhoneField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="phone"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Your phone (optional):</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder="Enter your phone..."
            className="bg-muted"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
