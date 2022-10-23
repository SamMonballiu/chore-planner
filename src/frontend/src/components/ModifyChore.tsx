import { useTranslation } from "@/hooks/useTranslation";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Chore } from "@shared/models";
import React, { FC, useState } from "react";
import CategoryPicker from "./CategoryPicker";
import "./ModifyChore.scss";
import { ChorePostmodel } from "@shared/postmodels/chore";
import SubjectIcon from "@mui/icons-material/Subject";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface Props {
  chore?: Chore;
  onSave?: (data: ChorePostmodel) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const ModifyChore: FC<Props> = ({ chore, onSave, onCancel, onDelete }) => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>(chore?.name ?? "");
  const [category, setCategory] = useState<string | undefined>(
    chore?.categoryId
  );
  const [repeatInterval, setRepeatInterval] = useState<number>(
    chore?.repeatInterval ?? 1
  );

  const isEdit = chore !== undefined;
  const title = isEdit ? t.editChore : t.newChore;

  const marks = [1, 7, 14, 30, 60, 90].map((n) => ({
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

    onSave?.(postmodel);
  };

  return (
    <div className="modifyChore">
      <Typography variant="h4">{title}</Typography>
      <div className="fields">
        <div className="field">
          <SubjectIcon className="icon" />
          <TextField
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <LocalOfferIcon className="icon" />
          <CategoryPicker
            onSelect={(id) => setCategory(id)}
            defaultValue={category}
          />
        </div>
        <div className="field">
          <HourglassEmptyIcon className="icon" />
          <Slider
            size="small"
            defaultValue={repeatInterval}
            value={repeatInterval}
            valueLabelDisplay="on"
            min={1}
            max={90}
            marks={marks}
            onChange={(e) => setRepeatInterval(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="buttonRow">
        <Button variant="outlined" onClick={onCancel}>
          {t.cancel}
        </Button>
        {onDelete ? (
          <Button variant="contained" color="error" onClick={onDelete}>
            {t.delete}
          </Button>
        ) : null}
        <Button variant="contained" onClick={handleSave}>
          {t.save}
        </Button>
      </div>
    </div>
  );
};

export default ModifyChore;
