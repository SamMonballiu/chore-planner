import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import { Breakpoint, DialogContent } from "@mui/material";

interface Props {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  width: Breakpoint;
}

const Modal: FC<Props> = ({ children, show, onClose, width }) => {
  return (
    <Dialog maxWidth={width} fullWidth open={show} onClose={onClose}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
