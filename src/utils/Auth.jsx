import { Button } from '@tremor/react';
import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'

function Auth() {
    const cookies = new Cookies();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            window.location.reload()
        } catch(err) {
            console.error(err);
        }
        
    }
    return (
        <div>
            <Button onClick={signInWithGoogle}>
                <i class="fa-brands fa-google me-2"></i>
                Sign in with Google
            </Button>
        </div>
    );
}

export default Auth;