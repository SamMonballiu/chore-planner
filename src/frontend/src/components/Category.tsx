import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import { Category, Chore } from "../../../common/models";
import "./category.scss";
import ChoreComponent from "./Chore";
import cx from "classnames";

interface Props {
  category: Category;
  chores: Chore[];
  isCollapsed?: boolean;
  onToggleCollapsed: (id: string) => void;
}

const CategoryComponent: FC<Props> = ({
  category,
  chores,
  isCollapsed,
  onToggleCollapsed,
}) => {
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
        {chores.map((c) => (
          <ChoreComponent key={c.id} chore={c} />
        ))}
      </Collapse>
    </div>
  );
};

export default CategoryComponent;
