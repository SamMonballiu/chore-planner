import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Breakpoint,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  show: boolean;
  message: string;
  width: Breakpoint;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<Props> = ({
  message,
  show,
  width,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog maxWidth={width} fullWidth open={show} onClose={onCancel}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          {t.cancel}
        </Button>
        <Button onClick={onConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
