import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './todo-card'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'

type Props = { 
    id: TypedColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    "todo": "To Do",
    "inprogress": "In Progress",
    "done": "Done",
}

export default function Column({id, todos, index}: Props) {
    const [searchString, setNewTaskType] = useBoardStore((state) => [
        state.searchString,
        state.setNewTaskType,
    ]);
    const openModal = useModalStore((state) => state.openModal)

    const handleAddTodo = () => {
        setNewTaskType(id);
        openModal();
    }
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <Droppable droppableId={index.toString()} type='card'>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? 'bg-slate-100' : 'bg-white/50'}`}
                        >
                            <h2 className='flex justify-between font-bold text-xl p-2 text-slate-700'>{idToColumnText[id]}
                            <span className='text-slate-200 bg-slate-600 rounded-full px-2 py-2 text-sm'>
                                {!searchString 
                                    ? todos.length 
                                    : todos.filter(todo => 
                                        todo.title
                                        .toLowerCase()
                                        .includes(searchString.toLowerCase())
                                        ).length }
                            </span>
                            </h2>
                            <div className='space-y-2'>
                                {todos.map((todo, index) => {

                                    if(searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase()))  return null;
                                    return (
                                    <Draggable
                                        key={todo.$id}
                                        draggableId={todo.$id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <TodoCard 
                                            todo={todo}
                                            index={index}
                                            id={id}
                                            innerRef={provided.innerRef}
                                            draggableProps={provided.draggableProps}
                                            dragHandleProps={provided.dragHandleProps}
                                            />
                                        )}
                                    </Draggable>
                                )})}
                                {provided.placeholder}
                                <div className='flex items-center justify-end p-2'>
                                    
                                    <button 
                                        onClick={handleAddTodo}
                                        className='text-slate-500 hover:text-slate-600 flex items-center w-full hover:bg-slate-300 rounded-lg p-2'>
                                        <PlusIcon 
                                            className='h-5 w-5 mr-1'
                                        />
                                        Add a task
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        )}
    </Draggable>
  )
}
