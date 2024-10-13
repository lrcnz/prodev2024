import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/ui-components/AlertDialog';

export function ErrorAlert({
  open,
  onClose,
  message,
  title,
}: {
  open: boolean;
  onClose?: () => void;
  message?: React.ReactNode;
  title?: string;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? 'Something went wrong'}</AlertDialogTitle>
          <AlertDialogDescription>{message || 'Unknown error'}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
