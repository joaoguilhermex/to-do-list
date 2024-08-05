import { useEffect, useState } from 'react'
import './index.css'
import { auth, db } from '../../firabaseConnection'
import { signOut } from 'firebase/auth';
import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    onSnapshot, 
    orderBy, 
    query, 
    updateDoc, 
    where
} from 'firebase/firestore';

export default function Admin(){
    const [inputTask, setInputTask] = useState('');
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState({});

    async function handleRegister(e) {
        e.preventDefault();

        if(inputTask === ''){
            alert("Enter your task...");
            return;
        }

        if(edit?.id){
            handleUpdateTask();
            return;
        }

        await addDoc(collection(db, "tasks"), {
            task: inputTask,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log('Task registered successfully');
            setInputTask('');
        })
        .catch((error)=>{
            console.log('Error when registering '+error);
        })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTask(id) {
        const refDoc = doc(db, "tasks", id);
        await deleteDoc(refDoc);
    }

    function editTask(item) {
        setInputTask(item.task);
        setEdit(item);
    }

    async function handleUpdateTask() {
       const docRef = doc(db, "tasks", edit?.id);
       await updateDoc(docRef, {
        task: inputTask
       })
       .then(()=>{
        console.log("Task updated");
        setInputTask('');
        setEdit({});
       })
       .catch(()=>{
        console.log("Error when updating");
        setInputTask('');
        setEdit({});
       })
    }

    useEffect(()=>{
        async function loadTasks() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))  
            
            if(userDetail){

                const data = JSON.parse(userDetail);

                const refTask = collection(db, "tasks")

                const q = query(refTask, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot)=>{
                    let lista = [];

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid,
                        })
                    })
                    
                    setTasks(lista);

                })

            }
            
        }

        loadTasks();
    }, [])

    return(
        <div className='admin-container'>
            <h1>My Tasks</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Enter your task...'
                    value={inputTask}
                    onChange={(e) => setInputTask(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{ backgroundColor: '#6add39'}} type='submit'>Update Task</button>
                ) : (
                    <button className='btn-register' type='submit'>Register Task</button>
                )}

                
            </form>

            {tasks.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.task}</p>

                    <div>
                        <button onClick={()=>editTask(item)}>Edit</button>
                        <button onClick={()=> deleteTask(item.id)}className='btn-delete'>Conclude</button>
                    </div>
                </article>
            ))}
            
            <button className='btn-logout' onClick={handleLogout}>Exit</button>
        </div>
    )
}