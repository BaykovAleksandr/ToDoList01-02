import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

type Props = {
  onCreateItem: (title: string) => void;
  disabled?: boolean;
};

export const CreateItemForm = ({ onCreateItem, disabled }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createItemHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setError(null);
  };

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler();
    }
  };

  return (
    <div>
      <TextField
        label={"Enter a title"}
        variant={"outlined"}
        className={error ? "error" : ""}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        disabled={disabled}
      />
      <IconButton onClick={createItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
};
