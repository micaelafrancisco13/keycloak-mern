import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import userManager from "../services/user-manager.ts"
import { User } from "oidc-client-ts"

function useAuth() {
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const [error, setError] = useState<AxiosError>()
	const [user, setUser] = useState<User | null>(null)
	const TOKEN_KEY = "keycloak_token"

	useEffect(() => {
		userManager.getUser()
			.then((user) => setUser(user))
			.catch((exception) => console.log(exception))

		userManager.events.addUserLoaded((user) => setUser(user))

		userManager.events.addUserSessionChanged(() => {
			console.log("Session changed. Checking user status...")
			userManager
				.getUser()
				.then((user) => {
					if (!user) {
						console.log("Session ended. Logging out.")
					}
				})
				.catch((err) => {
					console.error("Error while checking session:", err)
				})
		})

		return () => {
			userManager.events.removeUserLoaded(() => {
			})
			userManager.events.removeUserSessionChanged(() => {
			})
		}
	}, [])

	const signIn = () => {
		userManager.signinRedirect()
			.then((response) => console.log(response))
			.catch((exception) => console.log(exception))
	}

	const signInCallback = () => {
		setIsLoggingIn(true)
		userManager
			.signinRedirectCallback()
			.then((response) => {
				localStorage.setItem(TOKEN_KEY, `${response.token_type} ${response.access_token}`)
				setIsLoggingIn(false)
			})
			.catch((err) => {
				setError(err)
				setIsLoggingIn(false)
			})
	}

	const signOut = () => {
		localStorage.removeItem(TOKEN_KEY)
		userManager.signoutRedirect()
			.then((response) => console.log(response))
			.catch((exception) => console.log(exception))
	}

	const signOutCallback = () => {
		setIsLoggingOut(true)
		userManager
			.signoutRedirectCallback()
			.then((response) => {
				console.log(response)
				setIsLoggingOut(false)
				window.location.assign("/")
			})
			.catch((err) => {
				setError(err)
				setIsLoggingOut(false)
			})
	}

	const getCurrentUser = () => {
		return user
	}

	// userManager.events.addUserLoaded((user) => console.log("User loaded", user))
	// userManager.events.addAccessTokenExpired(() => console.log("Access token expired"))
	//
	// userManager.events.addAccessTokenExpiring(() => {
	// 	userManager.signinSilent()
	// 		.then(user => {
	// 			console.log("Silent renew successful", user)
	// 		})
	// 		.catch((exception) => console.log(exception))
	// })
	//
	// userManager.events.addUserSignedOut(() => console.log("Signed out"))

	const authStatusCode = error?.response?.status

	return {
		signIn,
		signInCallback,
		signOut,
		signOutCallback,
		getCurrentUser,
		isLoggingIn,
		isLoggingOut,
		error,
		authStatusCode
	}
}

export default useAuth