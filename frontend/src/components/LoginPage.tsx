import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.ts"


function LoginPage() {
	const { getCurrentUser, signIn } = useAuth()
	const user = getCurrentUser()

	useEffect(() => {
		if (!user) signIn()
	}, [user, signIn])

	if (user) return <Navigate to="/homepage" />

	return <p>Redirecting to keycloak...</p>
}

export default LoginPage