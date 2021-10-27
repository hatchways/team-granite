import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const itemsFromBackend = [
    {
        boardKey: 3, tag: 'red', id: '1',
        content: {
            title: "Ronaldo Transfer To Man U", description: 'Complete This First',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Here We Go', user: 'Fabrizio Romano' }
            ]
        }
    },
    {
        boardKey: 1, tag: 'green', id: '2',
        content: {
            title: "Second task", description: 'Do This Last',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Here We Go', user: 'Fabrizio Romano' }
            ]
        }
    },
    {
        boardKey: 2, tag: 'green', id: '3',
        content: {
            title: "Do the Dishes", description: 'Complete This Second',
            deadline: new Date().toLocaleString(),
            comments: [
                { id: 1, text: 'Wash The Plates', user: 'Fabrizio Romano' }
            ]
        }
    },
];

//TO DISSOLVE BOARDS INTO ARRAYS
const boardItems = [{
    title: 'LAUNDRY BOARD',
    boards: [
        {
            key: 1,
            name: 'Not Started',
            items: [...itemsFromBackend.filter(a => a.boardKey === 1)]
        },
        {
            key: 2,
            name: 'In Progress',
            items: [...itemsFromBackend.filter(a => a.boardKey === 2)]
        },
        {
            key: 3,
            name: 'Done',
            items: [...itemsFromBackend.filter(a => a.boardKey === 3)]
        }], created: new Date().toLocaleString()
},

{
    title: 'SHOPPING BOARD',
    boards: [
        {
            key: 1,
            name: 'Not Started',
            items: [...itemsFromBackend.filter(a => a.boardKey === 1)]
        },
        {
            key: 2,
            name: 'In Progress',
            items: [...itemsFromBackend.filter(a => a.boardKey === 2)]
        },
        {
            key: 3,
            name: 'Done',
            items: [...itemsFromBackend.filter(a => a.boardKey === 3)]
        }], created: new Date().toLocaleString()
},
];
// const res = boards.reduce((board, val) => (board[val] = { name: val, items: [] }, board), {});
//To DISSOLVE A BOARD OBJECT ARRAY INTO OBJECTS
const columnsFromBackend = boardItems[0].boards.reduce((obj, board) => Object.assign(obj, { [board.key]: { name: board.name, items: board.items } }), {});

const DragAndDrop = () =>{
    return (<div>
        <h1>Drag And Drop Component</h1>        
    </div>)
}
