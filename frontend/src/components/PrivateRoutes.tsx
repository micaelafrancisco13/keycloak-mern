import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth.ts"

function PrivateRoutes() {
	const { getCurrentUser } = useAuth()
	const user = getCurrentUser()

	if (!user)
		return <Navigate to="/login" />

	return <Outlet />
}

export default PrivateRoutes