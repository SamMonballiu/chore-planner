import { useTranslation } from "@/hooks/useTranslation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Chore } from "@shared/models";
import React, { FC, useState } from "react";
import CategoryPicker from "./CategoryPicker";
import "./ModifyChore.scss";
import { ChorePostmodel } from "@shared/postmodels/chore";

interface Props {
  chore?: Chore;
  onSave: (data: ChorePostmodel) => void;
  onCancel: () => void;
}

const ModifyChore: FC<Props> = ({ chore, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>(chore?.name ?? "");
  const [category, setCategory] = useState<string | undefined>(
    chore?.categoryId
  );
  const [repeatInterval, setRepeatInterval] = useState<number>(
    chore?.repeatInterval ?? 0
  );

  const isEdit = chore !== undefined;
  const title = isEdit ? t.editChore : t.newChore;

  const marks = [0, 7, 14, 30, 60, 90].map((n) => ({
    value: n,
    label: n.toFixed(0),
  }));

  const handleSave = () => {
    const postmodel: ChorePostmodel = {
      name,
      categoryId: category!,
      repeatInterval,
      owner: "",
    };

    onSave(postmodel);
  };

  return (
    <div className="modifyChore">
      <Typography variant="h4">{title}</Typography>
      <TextField
        fullWidth
        label={t.name}
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CategoryPicker
        onSelect={(id) => setCategory(id)}
        defaultValue={category}
      />
      <div className="repeatInterval">
        <Typography variant="body2">Interval</Typography>
        <Slider
          size="small"
          defaultValue={repeatInterval ?? 0}
          valueLabelDisplay="on"
          max={90}
          marks={marks}
          onChange={(e) => setRepeatInterval(parseInt(e.target.value))}
        />
      </div>
      <div className="buttonRow">
        <Button variant="outlined" onClick={onCancel}>
          {t.cancel}
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {t.save}
        </Button>
      </div>
    </div>
  );
};

export default ModifyChore;
