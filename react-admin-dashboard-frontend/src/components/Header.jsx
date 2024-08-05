import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Header = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        Title
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        Sub title
      </Typography>
    </Box>
  );
};

export default Header;
