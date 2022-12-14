import React, { createContext, useState } from 'react'

const AuthContext = createContext<any>({})

export const AuthProvider = ({ children }: any) => {
	const [auth, setAuth] = useState<any>(null)

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext