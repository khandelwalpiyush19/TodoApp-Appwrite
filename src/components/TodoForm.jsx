import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { databases } from '../appwrite/appwriteConfig';

function TodoForm() {
    const [todo, setTodo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure you are passing the correct IDs
        const promise = databases.createDocument(
            "66f7e6810015f15e3964", // Database ID
            "66f7e688000ff0953c25",    // Replace with your actual collection ID
            uuidv4(),                // Document ID
            { todo }                 // Data object
        );

        promise.then(
            function(response) {
                console.log(response);
            },
            function(error) {
                console.log(error);
            }
        );

        e.target.reset(); // Reset the form
    }

    return (
        <div className="max-w-7xl mx-auto mt-10">
             
        </div>
    );
}

export default TodoForm;
