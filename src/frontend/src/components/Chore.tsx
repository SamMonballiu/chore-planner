import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { FC, useMemo } from "react";
import { Chore } from "../../../common/models";
import "./chore.scss";
import ForwardIcon from "@mui/icons-material/Forward";
import cx from "classnames";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  chore: Chore;
  onSelect: (id: string) => void;
  onActivate?: (id: string) => void;
  onRestart?: (id: string) => void;
}

const ChoreComponent: FC<Props> = ({
  chore,
  onSelect,
  onActivate,
  onRestart,
}) => {
  const isActive = chore.lastActiveDate !== undefined;

  const intervalProgress = useMemo((): number | undefined => {
    if (chore.lastActiveDate === undefined) {
      return undefined;
    }

    if (chore.repeatInterval === undefined) {
      return 0;
    }

    const bleh = new Date(chore.lastActiveDate);
    const choreStart = bleh.getTime();
    bleh.setDate(bleh.getDate() + chore.repeatInterval);
    const choreEnd = bleh.getTime();

    const today = new Date().getTime();
    const currentPointInInterval = today - choreStart;
    const totalInterval = choreEnd - choreStart;

    return (currentPointInInterval / totalInterval) * 100;
  }, []);

  return (
    <Card className="chore-card">
      <CardContent onClick={() => onSelect(chore.id)}>
        <Typography variant="body1">{chore.name}</Typography>
      </CardContent>
      <CardActions
        className={cx("actions", { active: isActive, inactive: !isActive })}
      >
        {isActive ? (
          <>
            <ForwardIcon
              className="mirror icon"
              onClick={() => onRestart?.(chore.id)}
            />
            <LinearProgress
              variant="determinate"
              className="prg"
              value={Math.min(intervalProgress!, 100)}
            />
          </>
        ) : (
          <ForwardIcon
            className="icon"
            onClick={() => onActivate?.(chore.id)}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default ChoreComponent;
