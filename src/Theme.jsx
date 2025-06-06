import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#8BC652',
		},
		secondary: {
			main: '#003324',
		},
		tertiary: {
			main: '#F76711',
		},
		background: {
			default: '#fffdfc',
		},
	},
	typography: {
		fontFamily: 'DM Sans, sans-serif',
	},

	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 821,
			lg: 1200,
			xl: 1536,
		},
	},
});

export default theme;
