import { useNavigate } from "react-router-dom"

function LandingPage() {
	const navigate = useNavigate()

	return (
		<>
			<button onClick={() => navigate("/login")}>Go to Target</button>
		</>
	)
}

export default LandingPage