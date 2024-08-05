import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firabaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin', {replace: true});
            })
            .catch(()=>{
                console.log('Error when registering');
            })
        }else{
            
        }
    }

    return(
        <div className="home-container">
            <h1>Sign Up</h1>
            <span>Let's create your account!</span>

            <form className="form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Type your e-mail..."
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>

            <Link className="button-link" to="/">
                Already have an account? Log in
            </Link>
        </div>
    )
}