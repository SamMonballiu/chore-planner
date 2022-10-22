import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import React, { FC, useMemo } from "react";
import { Category, Chore } from "../../../common/models";
import "./category.scss";
import ChoreComponent from "./Chore";
import cx from "classnames";

interface Props {
  category: Category;
  chores: Chore[];
  isCollapsed?: boolean;
  onToggleCollapsed: (id: string) => void;
  onSelectChore: (id: string) => void;
  onActivateChore: (id: string) => void;
}

const CategoryComponent: FC<Props> = ({
  category,
  chores,
  isCollapsed,
  onToggleCollapsed,
  onSelectChore,
  onActivateChore,
}) => {
  const { inactive, active } = useMemo(() => {
    const isActive = (chore: Chore) => chore.lastActiveDate !== undefined;

    const active = chores.filter(isActive);
    const inactive = chores.filter((x) => !active.includes(x));

    return {
      inactive,
      active,
    };
  }, [chores]);

  return (
    <div className="category">
      <div className="header">
        <ArrowRightIcon
          className={cx("collapse-icon", { rotated: !isCollapsed })}
          onClick={() => onToggleCollapsed(category.id)}
        />
        <Typography variant="h5" onClick={() => onToggleCollapsed(category.id)}>
          {category.name}
        </Typography>
      </div>

      <Collapse in={!isCollapsed}>
        <div className="overview">
          <div className="inactive chores">
            {inactive.map((c) => (
              <ChoreComponent
                key={c.id}
                chore={c}
                onSelect={onSelectChore}
                onActivate={onActivateChore}
              />
            ))}
          </div>
          <div className="active chores">
            {active.map((c) => (
              <ChoreComponent key={c.id} chore={c} onSelect={onSelectChore} />
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default CategoryComponent;
