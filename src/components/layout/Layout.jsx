import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../header/Header";
import {Container} from "@mui/material";

const Layout = () => {
	return (
		<>
			
			<Header/>
			<Container maxWidth="xs" sx={{
				height: '100%',
				// maxWidth: '500px',
				px: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}>
				<Outlet/>
			</Container>
		</>
	);
};

export default Layout;