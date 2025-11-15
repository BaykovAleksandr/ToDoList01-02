import { SxProps } from '@mui/material/styles';

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 0,
  justifyContent: "space-between",
  opacity: isDone ? 0.5 : 1,
});
