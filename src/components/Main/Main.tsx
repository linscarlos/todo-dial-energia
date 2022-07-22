import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Clipboard from '../../images/clipboard.png';
import Plus from '../../images/plus.svg'
import styles from './Main.module.scss'
import { Trash } from 'phosphor-react'
import { db } from '../../firebase';
import { collection, getDocs, Timestamp, addDoc, doc, deleteDoc } from "firebase/firestore";
import { format } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR'

interface Props {
    id: string;
    name: string;
    description: string;
    attr: string;
    date: Timestamp;
    duration: number;
  }



export function Main(){

    const [newTaskName, setNewTaskName] = useState('');

    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskAttr, setNewTaskAttr] = useState("Compras");
    const [newDateAndHour, setNewDateAndHour] = useState<Timestamp>();
    const [newDuration, setNewDuration] = useState(0);

    const [orderMonth, setOrderMonth] = useState(0);

    const [tasks, setTasks] = useState<Props[]>([]);
    const tasksCollectionRef = collection(db, "tasks");

    const createTask = async (event: FormEvent) => {
        event.preventDefault();
    
        await addDoc(tasksCollectionRef, {
          name: newTaskName,
          description: newTaskDescription,
          attr: newTaskAttr,
          date: newDateAndHour,
          duration: newDuration
        })

        setNewTaskName('')
        setNewTaskDescription('')
        setNewTaskAttr('Compras')
        setNewDuration(0)
      }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewTaskName(event.target.value);
    }

    function handleNewDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewTaskDescription(event.target.value);
    }

    function handleNewTaskAttr(event: ChangeEvent<HTMLSelectElement>){
        setNewTaskAttr(event.target.value);
    }

    function handleDateAndHour(event: String){

        const timesTampFormatted = Timestamp.fromDate(new Date(event.toString()));
    
        setNewDateAndHour(timesTampFormatted)
        
    }

    function handleDurationTask(event: string){
        setNewDuration(Number(event))
    }

    const deleteTask = async (id: string) => {
        const taskDoc = doc(db, "tasks", id);
        await deleteDoc(taskDoc)
    }

    function handleOrderList(event: ChangeEvent<HTMLSelectElement>){
        setNewTaskAttr(event.target.value);

        switch (event.target.value.toString()){
            case 'Janeiro':
                setOrderMonth(1)
                break;
            case 'Fevereiro':
                setOrderMonth(2)
                break;
            case 'Março':
                setOrderMonth(3)
                break;
            case 'Abril':
                setOrderMonth(4)
                break;
            case 'Maio':
                setOrderMonth(5)
                break;
            case 'Junho':
                setOrderMonth(6)
                break;
            case 'Julho':
                setOrderMonth(7)
                break;
            case 'Agosto':
                setOrderMonth(8)
                break;
            case 'Setembro':
                setOrderMonth(9)
                break;
            case 'Outubro':
                setOrderMonth(10)
                break;
            case 'Novembro':
                setOrderMonth(11)
                break;
            case 'Dezembro':
                setOrderMonth(12)
                break;
        }
    }

    useEffect(() => {
        const getTasks = async () => {
          const data = await getDocs(tasksCollectionRef);
    
          setTasks(data.docs.map((doc: any) => ({...doc.data(), id: doc.id})))
        }
    
        getTasks();
      }, [deleteTask, createTask])

    return (
        <main className={styles.mainContainer}>
            <div className={styles.mainContent}>
                <form onSubmit={createTask} className={styles.newToDo}>
                    <textarea 
                        name='newTask'
                        placeholder="Nome da tarefa" 
                        value={newTaskName}
                        onChange={handleNewTaskChange}
                        required
                    />

                    <textarea 
                        name='newDescription'
                        placeholder='Descrição da tarefa'
                        value={newTaskDescription}
                        onChange={handleNewDescriptionChange}
                        required
                    />

                    <div className={styles.containerDateAndSelect}>
                    <select 
                        name='AttrTask'
                        onChange={handleNewTaskAttr}
                        value={newTaskAttr}
                        required
                    >
                        <option>Compras</option>
                        <option>Estudos</option>
                        <option>Lazer</option>
                        <option>Pagamentos</option>
                        <option>Saúde</option>
                        <option>Outros</option>
                    </select>

                    <input 
                        type="number" 
                        placeholder='Duração' 
                        onChange={(event) => {handleDurationTask(event.target.value)}}
                        required
                    />

                    <input 
                        className={styles.dateAndHour}
                        type="datetime-local" 
                        placeholder='Data' 
                        onChange={(event) => handleDateAndHour(event.target.value)}
                        required
                    />
                    </div>
                    <button type="submit">Adicionar tarefa<img src={Plus} /></button>
                </form>

                <div className={styles.toDoContent}>
                    <div className={styles.controlTask}>
                        <p>Tarefas criadas<span className={styles.taskCount}>{tasks.length}</span></p>
                        <div className={styles.orderList}><p>Ordernar por mês</p>
                            
                        <select 
                            onChange={handleOrderList}
                            className={styles.listOrderMonth}
                        >
                            <option>Selecione...</option>
                            <option>Janeiro</option>
                            <option>Fevereiro</option>
                            <option>Março</option>
                            <option>Abril</option>
                            <option>Maio</option>
                            <option>Junho</option>
                            <option>Julho</option>
                            <option>Agosto</option>
                            <option>Setembro</option>
                            <option>Outubro</option>
                            <option>Novembro</option>
                            <option>Dezembro</option>
                        </select>
                        </div>
                    </div>

                    {tasks.length  === 0 ? (

                        <section className={styles.listToDo}>
                            <img src={Clipboard} alt="Lista de taredas vazias" />
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </section>
                    ) : (
                        <section className={styles.listToDoFill}>

                        {orderMonth === 0 ? (
                            tasks.map((task: Props) => {
                                return (
                                    <div key={task.id} className={styles.taskInput}>
                                        <div className={styles.nameAndDeleteTask}>
                                            <span><b>Nome:</b> {task.name}</span>
                                            <span><b>Categoria: </b>{task.attr}</span>
                                            {task.date && (
                                            <span><b>Data: </b>{format(task.date.toDate(), "d'/'LLL 'às' HH:mm'h'", { locale: ptBR })}</span>
                                            )}
                                            <span><b>Duração: </b>{task.duration} min</span>
                                            <button onClick={() => deleteTask(task.id)} title="Deletar tarefa">
                                                <Trash size={20} />
                                            </button>
                                        </div>
                                        <span className={styles.separatorList}></span>
                                        <div className={styles.descriptionTask}>
                                            <span>&#11177; {task.description}</span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : 
                        (
                            tasks.map((task: Props) => {

                                const monthFinal = Number(new Date(task.date.toDate()).getMonth()) + 1;     


                                return (
                                    monthFinal === orderMonth && (
                                        <div key={task.id} className={styles.taskInput}>
                                        <div className={styles.nameAndDeleteTask}>
                                            <span><b>Nome:</b> {task.name}</span>
                                            <span><b>Categoria: </b>{task.attr}</span>
                                            {task.date && (
                                                <span><b>Data: </b>{format(task.date.toDate(), "d'/'LLL 'às' HH:mm'h'", { locale: ptBR })}</span>
                                            )}
                                            <span><b>Duração: </b>{task.duration} min</span>
                                            <button onClick={() => deleteTask(task.id)} title="Deletar tarefa">
                                                <Trash size={20} />
                                            </button>
                                        </div>
                                        <span className={styles.separatorList}></span>
                                        <div className={styles.descriptionTask}>
                                            <span>&#11177; {task.description}</span>
                                        </div>
                                    </div>
                                    )
                                )
                            })
                        )
                        }
                        
                    </section>
                    )}

                </div>
            </div>
        </main>
    )
}