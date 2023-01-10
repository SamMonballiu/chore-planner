import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { FC, useMemo } from "react";
import {
  Chore,
  formatDate,
  getIntervalProgressPercentage,
} from "../../../common/models";
import "./chore.scss";
import ForwardIcon from "@mui/icons-material/Forward";
import cx from "classnames";
import LinearProgress from "@mui/material/LinearProgress";
import { Settings } from "@/models/settings";

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
  const showInterval = Settings.showRepeatIntervalOnInactiveChores;

  const intervalProgress = useMemo(
    (): number | undefined => getIntervalProgressPercentage(chore),
    []
  );

  return (
    <Card className="chore-card">
      <CardContent onClick={() => onSelect(chore.id)}>
        <Typography variant="body1">{chore.name}</Typography>
        {isActive ? (
          <Typography className="date">
            {formatDate(chore.lastActiveDate)}
          </Typography>
        ) : null}
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
            {intervalProgress ? (
              <LinearProgress
                variant="determinate"
                color={intervalProgress < 100 ? "primary" : "warning"}
                className="prg"
                value={intervalProgress}
              />
            ) : null}
          </>
        ) : (
          <>
            <Typography variant="body2" className="repeatInterval">
              {showInterval ? chore.repeatInterval : null}
            </Typography>
            <ForwardIcon
              className="icon"
              onClick={() => onActivate?.(chore.id)}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ChoreComponent;
