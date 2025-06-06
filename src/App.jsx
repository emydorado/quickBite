import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './routes/router';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.jsx';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router />
			</Provider>
		</ThemeProvider>
	);
}

export default App;
