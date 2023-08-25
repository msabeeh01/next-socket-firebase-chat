//
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

//local imports
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from 'next/router';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');

        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className='container'>

            <form onSubmit={handleSignin} className='authForms'>
                <h1>Signin</h1>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button>Signin</button>
            </form>
            <a href="/register" className='my-5'> Sign up here</a>
        </div>
    );
}

export default Signin;