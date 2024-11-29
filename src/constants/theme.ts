"use client";

import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

export const theme: Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
  },
});
