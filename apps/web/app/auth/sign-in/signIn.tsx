import { Button } from "@workspace/ui/components/button";
import { FC } from "react"

// TODO: create this page UI similar to neondb ui - https://console.neon.tech/realms/prod-realm/protocol/openid-connect/registrations?client_id=neon-console&redirect_uri=https%3A%2F%2Fconsole.neon.tech%2Fauth%2Fkeycloak%2Fcallback&response_type=code&scope=openid+profile+email&state=empvF0nmtxKsGx_Rshc_1Q%3D%3D%2C%2C%2C
const SignInPage: FC = async () => {
    return (
        <div>
            Sign in Page
            <Button>
                Sign in with google
            </Button>
        </div>
    )
}

export default SignInPage;