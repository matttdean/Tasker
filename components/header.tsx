'use client';

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore';
import fetchSuggestion from '@/lib/fetchSuggestion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const [board, searchString,setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString, 
        state.setSearchString
    ])

    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState('');

    const suggestionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (board.columns.size === 0) return;
        setLoading(true);

        const fetchSuggestionFunc = async () => {
            const suggestion  = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setLoading(false);
        }
        fetchSuggestionFunc();
    }, [board])

    const formatSuggestion = (suggestion: string) => {

        let  htmlToBeInserted = suggestion.replace(/\d+/g, '<span class="text-slate-200 py-[0.15rem] px-2 rounded-lg bg-slate-600 font-semibold">$&</span>');

        htmlToBeInserted = htmlToBeInserted.replace(/(Todos|TODO|TO DO|todos|to do|Todo|To do|inprogress|in progress|In progress|In Progress|Done|done)/g, '<span class="text-slate-700 font-medium">$1</span>');

        htmlToBeInserted = htmlToBeInserted.replaceAll(',', '');

        return <div dangerouslySetInnerHTML={{__html: htmlToBeInserted}}></div>
    }

  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-2 bg-slate-900/80 rounded-b-2xl md:h-20 mb-5'>
            {/* <div 
                className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-blue-700 rounded-md filter blur-3xl opacity-50 -z-50'
            /> */}
            <div className='w-full flex justify-center items-center mt-5 mb-10 md:my-0 md:justify-normal'>
                <CheckCircleIcon className='h-10 w-10 text-slate-200 -ml-5 md:ml-5' />
                <h1 className='text-4xl font-semibold ml-2 -mt-1 text-slate-300'>Task<span className='font-light'>er</span></h1>
            </div>
            <div className='flex items-center space-x-5 flex-1 justify-end w-full mb-6 md:mb-0 md:mr-2'>
                <form className='flex items-center space-x-5 bg-slate-600 rounded-md p-2 flex-1 md:flex-initial'>
                    <MagnifyingGlassIcon className='h-5 text-slate-400' />
                    <input 
                        type="text" 
                        placeholder='Search' 
                        className='flex-1 outline-none bg-slate-600 text-slate-300'
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <button type="submit" hidden>Search</button>
                </form>

                    <Avatar githubHandle="matttdean" name="Matthew Dean" round size='40' color='#0055D1' />

            </div>
        </div>

        <div className='flex items-center justify-center px-5 py-2 md:py-5 mb-5'>
            <div className='flex flex-col text-center sm:flex-row sm:text-left items-center pr-5 shadow-xl rounded-lg w-fit bg-slate-100 max-w-3xl text-slate-600 p-5 font-regular'>
                {!loading && <div className='w-10 h-10 shrink-0 mb-2 sm:mb-0 sm:mr-4 flex items-center justify-center text-center text-3xl'>👋</div> }
                { suggestion && !loading
                    ? formatSuggestion(suggestion)
                    :  <div className='w-10 flex justify-center items-start'><div className='bg-slate-400 w-3 h-3 rounded-full shrink-0 loading'></div><div className='bg-slate-400 w-3 h-3 rounded-full mx-1 shrink-0 loading'></div><div className='bg-slate-400 w-3 h-3 rounded-full shrink-0 loading'></div></div>
                }
            </div>
        </div>
    </header>
  )
}
