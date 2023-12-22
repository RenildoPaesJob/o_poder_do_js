import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

export const UserVerify = createContext({} as any)

export function App() {
	const [valueUser, setValueUser] = useState('User Data')

	return (
		<BrowserRouter>
			<UserVerify.Provider value={{ valueUser, setValueUser }}>
				<Routes>
					<Route path='/' Component={Home} />
					<Route path='/new-room' Component={NewRoom} />
				</Routes>
			</UserVerify.Provider>
		</BrowserRouter>
	);
}