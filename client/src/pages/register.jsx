import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from 'next/router';

//local imports
import { auth } from "../../lib/firebaseConfig";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: username });
            router.push('/');
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className='container'>

            <form onSubmit={handleRegister} className='authForms'>
                <h1>Register</h1>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <button>Register</button>
            </form>

            <a href="/signin" className='my-5'>Sign in here</a>
        </div>
    )
}

export default Register