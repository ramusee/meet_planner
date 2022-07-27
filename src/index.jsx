import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material";

const store = setupStore();
const theme = createTheme({
	palette: {
		primary: {
			main: '#000000',
			contrastText: '#09CE69'
		},
		secondary: {
			main: '#09CE69',
		},
		text: {
			primary: '#09CE69'
		}
	},
})

const root = ReactDOM.createRoot(
	document.getElementById('root')
);

root.render(
	<Provider store={store}>
		<BrowserRouter>
		<ThemeProvider theme={theme}>
				<App/>
		</ThemeProvider>
		</BrowserRouter>
	</Provider>
);

