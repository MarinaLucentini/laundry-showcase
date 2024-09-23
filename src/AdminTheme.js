import { defaultTheme } from 'react-admin';

export const AdminTheme = {
  ...defaultTheme,
  typography: {
    ...defaultTheme.typography,
    fontSize: 16, 
  },
  components: {
    ...defaultTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem', 
          padding: '10px 20px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1rem', 
          padding: '16px', 
        },
      },
    },
  },
};