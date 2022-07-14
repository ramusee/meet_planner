import React from 'react';
import './App.css';
import {TimetableList} from "./components/timetableList/TimetableList";

const hoursAM = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM',
	'5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM']
const hoursPM = ['Noon', '1 PM', '2 PM', '3 PM', '4 PM',
	'5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
]
function App() {
	
	return (
		<div className="app">
			<header>
				<h1 className="header__title">MEET PLANNER</h1>
			</header>
			<main>
				<section className="settings-panel">
					<span className="settings-panel__item">All day</span>
					<span className="settings-panel__item">Timezone: PBT</span>
				</section>
				<h2 className="date"> Sunday, July 12, 2022 </h2>
				<section className="timetable">
					<TimetableList hours={hoursAM}/>
					<TimetableList hours={hoursPM}/>
				</section>
			</main>
		</div>
	);
}

export default App;
