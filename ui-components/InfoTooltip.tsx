import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useState } from 'react';

export const InfoTooltip = ({ content }: { content: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild onClick={() => setShow(!show)}>
        <Info size="16" />
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className=" bg-foreground px-2 py-1 text-xs text-background rounded-md opacity-80 mt-1"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
