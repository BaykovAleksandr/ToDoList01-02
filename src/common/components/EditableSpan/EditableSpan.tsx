import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  value: string;
  onChange: (title: string) => void;
  disabled: boolean;
};

export const EditableSpan = ({ value, onChange, disabled }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const turnOnEditMode = () => {
    if (!disabled) {
      setIsEditMode(true);
    }
  };

  const turnOffEditMode = () => {
    setIsEditMode(false);
    onChange(title);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <>
          {isEditMode ? (
            <TextField
              variant={"outlined"}
              value={title}
              size={"small"}
              onChange={changeTitle}
              onBlur={turnOffEditMode}
              autoFocus
              disabled={disabled}
            />
          ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
          )}
        </>
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  );
};
