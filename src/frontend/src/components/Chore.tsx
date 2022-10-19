import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import { Chore } from "../../../common/models";
import "./chore.scss";

interface Props {
  chore: Chore;
}

const ChoreComponent: FC<Props> = ({ chore }) => {
  return (
    <Card className="chore-card">
      <CardContent>
        <Typography variant="body1">{chore.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ChoreComponent;
