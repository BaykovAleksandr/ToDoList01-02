import { Box, Button } from '@mui/material';
import styles from "./PageNotFound.module.css";
import { Link } from 'react-router';

export const PageNotFound = () => (
  <Box style={{ textAlign: "center" }}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button className={styles.link} component={Link} to="/" variant="contained">
      На главную страницу
    </Button>
  </Box>
);
