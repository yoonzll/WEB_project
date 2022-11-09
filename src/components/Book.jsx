import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useReducer, useState } from 'react';
import { useData } from '../hooks/data-context';
import { Mark } from './Mark';

export const Book = ({ book }) => {
  const { saveBook, removeBook, addMark, searchStr } = useData();
  const [bookTitle, setBookTitle] = useState(book.title);
  const [isEditing, toggleEditing] = useReducer((pre) => !pre, false);

  const changeBookTitle = () => {
    book.title = bookTitle;
    saveBook(book);
    toggleEditing();
  };

  return (
    <div className='mr-3 w-64 flex-shrink-0 rounded border-2 bg-gray-100 p-1.5'>
      <div className='h-[74vh] overflow-y-auto xs:h-[65vh] sm:h-[68vh] md:h-[70vh] xl:h-[78vh]'>
        <div className='flex items-center justify-between text-xl font-bold text-slate-700'>
          <h3 className='truncate'>
            {book?.title}
            <button onClick={toggleEditing}>
              {isEditing ? (
                ''
              ) : (
                <PencilIcon className='float-left w-4 cursor-pointer hover:text-yellow-500' />
              )}
            </button>
          </h3>
          <button
            onClick={(evt) => {
              evt.stopPropagation();
              if (confirm('정말 삭제하시겠어요?')) removeBook(book.id);
            }}
          >
            <XMarkIcon className='w-4 cursor-pointer hover:text-yellow-500' />
          </button>
        </div>
        {book?.id === 0 || isEditing ? (
          <div className='p-1'>
            <input
              type='text'
              value={bookTitle}
              onChange={(evt) => setBookTitle(evt.target.value)}
              className='w-full'
              placeholder='타이틀...'
            />
            <button
              onClick={changeBookTitle}
              className='float-right  hover:text-yellow-500 '
            >
              Save
            </button>
          </div>
        ) : book?.marks?.length ? (
          book?.marks
            .filter((mark) =>
              RegExp(searchStr, 'i').exec(
                `${mark.url} ${mark.title} ${mark.description}`
              )
            )
            .map((mark) => <Mark key={mark.id} book={book} mark={mark} />)
        ) : (
          <hr className='border-3 mt-0 mb-3 border-white' />
        )}
      </div>
      <button
        onClick={() => addMark(book)}
        className='float-right mt-2 rounded-full bg-yellow-500 px-4 py-1 font-medium text-white hover:bg-yellow-600'
      >
        +
      </button>
    </div>
  );
};
