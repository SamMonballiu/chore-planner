import React, { FC } from "react";
import "./actionbuttons.scss";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Fab from "@mui/material/Fab";

interface Props {
  onAdd: () => void;
  onRestartExpired: () => void;
}

const ActionButtons: FC<Props> = ({ onAdd, onRestartExpired }) => {
  return (
    <div className="actionButtons-container">
      <Fab size="medium" color="primary" onClick={onAdd}>
        <AddIcon />
      </Fab>
      <Fab size="medium" color="primary" onClick={onRestartExpired}>
        <RestartAltIcon />
      </Fab>
    </div>
  );
};

export default ActionButtons;
