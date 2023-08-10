'use client';

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export default function TodoCard({
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps
}: Props) {

    const deleteTask = useBoardStore((state) => state.deleteTask);
    const [imageUrl, setImageUrl] =  useState<string | null>(null);

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url  =  await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString())
                }
            }

            fetchImage();
        }

    }, [todo])

  return (
    <div
    className='bg-white rounded-md space-y-2 drop-shadow-md'
        {...draggableProps} {...dragHandleProps} ref={innerRef}
    >
        <div className='flex justify-between items-center p-5 text-slate-600'>
            <p>{todo.title}</p>
            <button 
                onClick={() => deleteTask(index, todo, id)}
            className='text-slate-400 hover:text-slate-600'>
                <XMarkIcon className='ml-5 h-5 w-5'/>
            </button>
        </div>
        {imageUrl && (
            <div className='h-full w-full rounded-b-mb'>
                <Image 
                src={imageUrl}
                alt='task image'
                width={400}
                height={200}
                className='w-full object-contain rounded-b-md'
                />
            </div>
        ) }
    </div>
  )
}
