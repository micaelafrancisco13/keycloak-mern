import { useEffect } from "react"
import useAuth from "../hooks/useAuth.ts"
import { Navigate } from "react-router-dom"

function CallbackSignIn() {
	const { signInCallback, getCurrentUser } = useAuth()

	useEffect(() => {
		signInCallback()
	}, [signInCallback])

	if (getCurrentUser()) return <Navigate to="/" />

	return (
		<p>Processing authentication...</p>
	)
}

export default CallbackSignIn