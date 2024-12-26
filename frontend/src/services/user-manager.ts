import { UserManager } from "oidc-client-ts"

export default new UserManager({
	authority: "http://localhost:8080/realms/System",
	client_id: "keycloak-mern-frontend",
	redirect_uri: "http://localhost:5173/callback",
	post_logout_redirect_uri: "http://localhost:5173",
	response_type: "code",
	scope: "openid profile email",
	automaticSilentRenew: true,
	silent_redirect_uri: "http://localhost:5173/silent-renew",
	monitorSession: true, // Enable session monitoring
	checkSessionInterval: 5000 // Poll Keycloak every 5 seconds
})