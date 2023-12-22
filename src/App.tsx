import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

export const AuthContext = createContext({} as any)

export function App() {
	const [user, setUser] = useState()

	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path='/' Component={Home} />
					<Route path='/new-room' Component={NewRoom} />
				</Routes>
			</AuthContext.Provider>
		</BrowserRouter>
	);
}