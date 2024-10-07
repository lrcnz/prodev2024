import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui-components/AlertDialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import LoadingIcon from "@/assets/loading.svg";

export const Loading = ({ open }: { open: boolean }) => {
  return (
    <AlertDialog open={open}>
      <VisuallyHidden.Root>
        <AlertDialogHeader>
          <AlertDialogTitle>Loading</AlertDialogTitle>
        </AlertDialogHeader>
      </VisuallyHidden.Root>
      <AlertDialogContent className="bg-transparent border-none">
        <VisuallyHidden.Root>
          <AlertDialogDescription>Loading</AlertDialogDescription>
        </VisuallyHidden.Root>
        <div className="text-white/80 flex flex-col items-center justify-center">
          <div className="text-white">
            <LoadingIcon className="text-4xl" />
          </div>
          <div className="mt-2">Loading...</div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
