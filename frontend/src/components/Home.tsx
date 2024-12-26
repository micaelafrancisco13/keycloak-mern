import useAuth from "../hooks/useAuth.ts"

function Home() {
	const { getCurrentUser } = useAuth()
	const user = getCurrentUser()

	return (
		<div>Welcome, {user?.profile?.name || "User"}!</div>
	)
}

export default Home