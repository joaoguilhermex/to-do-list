import { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firabaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin', {replace: true});
            })
            .catch(()=>{
                console.log('Error when logging in');
            })
        }else{

        }
    }

    return(
        <div className="home-container">
            <h1>To-Do List</h1>
            <span>Manage your schedule easily</span>

            <form className="form" onSubmit={handleLogin}>
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

                <button type="submit">Access</button>
            </form>

            <Link className="button-link" to="/register">
                Don't have an account? Sign up
            </Link>
        </div>
    )
}