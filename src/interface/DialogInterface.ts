export interface DialogInterface {
  status: boolean,
  setStatus?: (b: boolean) => void
  onClose?: () => void
}