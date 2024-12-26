import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home.tsx"
import CallbackSignIn from "./components/CallbackSignIn.tsx"
import LandingPage from "./components/LandingPage.tsx"
import LoginPage from "./components/LoginPage.tsx"
import { useEffect } from "react"
import useAuth from "./hooks/useAuth.ts"
import PrivateRoutes from "./components/PrivateRoutes.tsx"
import UserProfile from "./components/UserProfile.tsx"

function App() {
	const { getCurrentUser } = useAuth()
	const user = getCurrentUser()

	useEffect(() => {
		console.log("User", user)
	}, [user])

	const router = createBrowserRouter([
		{
			path: "/",
			element: user ? <Home /> : <LandingPage />
		},
		{
			path: "/callback",
			element: <CallbackSignIn />
		},
		{
			path: "/login",
			element: <LoginPage />
		},
		{
			element: <PrivateRoutes />,
			children: [{
				path: "/user-profile",
				element: <UserProfile />
			}]
		}
	])
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
