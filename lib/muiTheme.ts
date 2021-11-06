import { ThemeOptions, createTheme } from '@mui/material/styles';

import { PaletteMode } from '@mui/material';

export const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode: mode,
        primary: {
            main: '#EBAA02',
        },
        secondary: {
            main: '#0243EB',
        },
        background: {
            default: '#050A2B',
            paper: '#0a1c41',
        },
    },
    typography: {
        fontFamily: 'Titillium Web, sans-serif',
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
    },
});

export const muiTheme = createTheme(getThemeOptions('dark'));
