import { FormEvent, useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, Timestamp, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { Firestore } from '@firebase/firestore'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import './global.css'

interface Props {
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  time: number;
}

function App() {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDate, setNewDate] = useState<Timestamp>();
  const [newDuration, setNewDuration] = useState(0);

  const [tasks, setTasks] = useState<any>([]);
  const tasksCollectionRef = collection(db, "tasks");


  const createTask = async (event: FormEvent) => {
    event.preventDefault();

    await addDoc(tasksCollectionRef, {
      name: newName,
      description: newDescription,
      date: newDate,
      time: newDuration
    })
  }

  const updateTask = async (id: string, time: number) => {
    const taskDoc = doc(db, "tasks", id);
    const newFields = { time: time + 1 }
    await updateDoc(taskDoc, newFields)
  }

  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc)
  }


  function DateTimesTamp(event: String){

    const timesTampFormatted = Timestamp.fromDate(new Date(event.toString()));

    setNewDate(timesTampFormatted)
    
  }


  function durationTask(event: string){
    setNewDuration(Number(event))
  }

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);

      setTasks(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getTasks();
  }, [])

  return (
    <>
      <Header />
      <Main />

      {/* <div className='Fire'>
        <form onSubmit={createTask}>
        <input placeholder='Titulo...' onChange={(event) => {setNewName(event.target.value)}} />
        <input placeholder='Descrição...' onChange={(event) => {setNewDescription(event.target.value)}} />
        <input type="datetime-local" placeholder='Data' onChange={(event) => DateTimesTamp(event.target.value)} />
        <input type="number" placeholder='Duração' onChange={(event) => {durationTask(event.target.value)}} />


        <button type='submit' onClick={createTask}>Criar Task</button>
        </form>

        {tasks.map((task: Props) => {
          return (
            <div>
                {" "}
                <h1>Nome: {task.title}</h1>
                <h1>Descrição: {task.description}</h1>
                <h1>Data: {new Date(task.date.toDate()).getMonth()}</h1>
                <h1>Duração: {task.time}</h1>
                <button onClick={() => {
                  updateTask(task.id, task.time)
                }}>Adicionar +1</button>

                <button onClick={() => {
                  deleteTask(task.id)
                }}>Adicionar +1</button>
            </div>
          )
        })}
      </div> */}
    </>
  )
}

export default App
