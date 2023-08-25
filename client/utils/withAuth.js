import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

//local imports
import { auth } from "../lib/firebaseConfig"
export default function withAuth(Component) {
    return function AuthenticatedComponent(props){
        const router = useRouter();
        useEffect(() => {  
            onAuthStateChanged(auth, (user) => {
                if(!user){
                    router.push('/signin');
                }
            });
        }, []);
        return <Component {...props} />
    }
}