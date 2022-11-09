import {
  TrashIcon,
  PencilSquareIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import ky from 'ky';
import { useEffect, useReducer, useRef } from 'react';
import { useData } from '../hooks/data-context';

export const Mark = ({ book, mark }) => {
  const { saveMark, removeMark } = useData();
  const [isEditing, toggleEditing] = useReducer((pre) => !pre, !mark.id);
  const urlRef = useRef();

  const scrapOg = async (url) => {
    return await ky(`https://sz.topician.com/sz/proxy?url=${url}`).json();
  };

  const save = (evt) => {
    evt.stopPropagation();

    if (isEditing) {
      const url = urlRef.current.value;
      mark.image = null;
      mark.title = 'Fetching...';
      mark.description = '';
      mark.url = url;
      scrapOg(url).then((ogRet) => {
        console.log('ogRet>>>', ogRet);
        mark.title = ogRet.title || 'No Title';
        mark.image = ogRet.image;
        mark.description = ogRet.description;
        saveMark(book, mark);
      });
    }
    toggleEditing();
  };

  const remove = (evt) => {
    evt.stopPropagation();
    if (confirm('정말 삭제하시겠어요?')) removeMark(book, mark.id);
  };

  const openSite = () => {
    if (!isEditing) window.open(mark.url, '_blank');
  };

  useEffect(() => {
    if (urlRef.current) urlRef.current.value = mark.url || 'https://';
  }, [isEditing]);

  return (
    <div
      onClick={openSite}
      aria-hidden='true'
      className='group mt-3 box-border cursor-pointer rounded border-2 border-yellow-600 bg-slate-100 p-1'
    >
      {isEditing ? (
        <>
          <input
            type='text'
            ref={urlRef}
            className='w-full'
            placeholder='https://...'
          />
        </>
      ) : (
        <div>
          <div className='flex justify-center'>
            {mark.image && (
              <img
                src={mark.image}
                alt={mark.title}
                className='max-h-[100px] w-full'
              />
            )}
          </div>
          <h3 className='m-1 font-medium text-slate-700'>{mark.title}</h3>
          <p className='m-1 text-sm text-gray-500'>{mark.description}</p>
        </div>
      )}
      <div className='item-center flex justify-end'>
        <button onClick={save} className='mr-1 hover:text-yellow-700'>
          <PencilSquareIcon className='h-5' />
        </button>
        <button onClick={remove} className='mr-1 hover:text-yellow-700'>
          <TrashIcon className='h-5 ' />
        </button>
        {isEditing && (
          <button
            onClick={(evt) => {
              evt.stopPropagation();
              toggleEditing();
            }}
            className='hover:text-yellow-700'
          >
            <ArrowUturnLeftIcon className='h-5' />
          </button>
        )}
      </div>
    </div>
  );
};
