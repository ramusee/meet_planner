import React from 'react';
// import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";
import {Timing} from "./pages/timing/Timing";
import {Home} from "./pages/home/Home";
import {Container} from "@mui/material";
import {DatePicker} from "./pages/datePicker/DatePicker";

function App() {
	return (
		<Container maxWidth="sm" sx={{px: 0}}>
			<Routes>
				<Route path="meet_planner" element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path="date" element={<DatePicker/>}/>
					<Route path="timing" element={<Timing/>}/>
				</Route>
			</Routes>
		</Container>
	);
}

export default App;
