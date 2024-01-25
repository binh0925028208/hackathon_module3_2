
import Todo from "./todo.model";


const createTable = () => {
    Todo.sync().then(()=>{
        console.log('Todo created');
    })
}

export default createTable