import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import { Chore } from "../../../common/models";
import "./chore.scss";

interface Props {
  chore: Chore;
  onSelect: (id: string) => void;
}

const ChoreComponent: FC<Props> = ({ chore, onSelect }) => {
  return (
    <Card className="chore-card" onClick={() => onSelect(chore.id)}>
      <CardContent>
        <Typography variant="body1">{chore.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ChoreComponent;
