"use client"

import { Button } from "@workspace/ui/components/button";
import { handleGoogleSignIn } from "@/lib/auth/googleSignIn";
import { FcGoogle } from "react-icons/fc";

// TODO: create this page UI similar to neondb ui - https://console.neon.tech/realms/prod-realm/protocol/openid-connect/registrations?client_id=neon-console&redirect_uri=https%3A%2F%2Fconsole.neon.tech%2Fauth%2Fkeycloak%2Fcallback&response_type=code&scope=openid+profile+email&state=empvF0nmtxKsGx_Rshc_1Q%3D%3D%2C%2C%2C

const SignInPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-20 items-center p-10">
            <div className="text-6xl">Sign in Page</div>
            <Button onClick={() => handleGoogleSignIn()}>
                <FcGoogle size={5} />
                Sign in with google
            </Button>
        </div>
    )
}

export default SignInPage;