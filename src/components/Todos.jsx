 
import React, { useState, useEffect } from 'react';
import { databases } from '../appwrite/appwriteConfig';

function Todos() {
    const [todos, setTodos] = useState([]);
    const [loader, setLoader] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const databaseId = "66f7e6810015f15e3964"; // Your database ID
    const collectionId = "66f7e688000ff0953c25"; // Replace with your actual collection ID

    useEffect(() => {
        const fetchTodos = async () => {
            setLoader(true);
            try {
                const response = await databases.listDocuments(databaseId, collectionId);
                setTodos(response.documents);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!newTodo) return;

        try {
            const response = await databases.createDocument(databaseId, collectionId, 'unique()', {
                todo: newTodo
            });
            setTodos([...todos, response]); // Update the state with the new todo
            setNewTodo(''); // Clear the input field
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await databases.deleteDocument(databaseId, collectionId, id);
            setTodos(todos.filter(todo => todo.$id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <p className="text-xl font-bold mb-2">Todo List</p>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className="border p-2 mb-2"
            />
            <button onClick={addTodo} className="bg-blue-500 text-white p-2 rounded">
                Add Todo
            </button>
            {loader ? (
                <p>Loading ...</p>
            ) : (
                <div>
                    {todos.map(item => (
                        <div key={item.$id}>
                            <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                                <div>
                                    <p>{item.todo}</p>
                                </div>
                                <div>
                                    <span
                                        className="text-red-400 cursor-pointer"
                                        onClick={() => deleteTodo(item.$id)}
                                    >
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Todos;
