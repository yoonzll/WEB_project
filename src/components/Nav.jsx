import { useData } from '../hooks/data-context';
import { StarIcon } from '@heroicons/react/24/outline';

export const Nav = () => {
  const { searchStr, setSearchStr } = useData();
  return (
    <nav className='flex items-center justify-between px-2 shadow shadow-gray-300'>
      <div>
        <h1 className='flex h-10 text-2xl font-bold'>
          <StarIcon className='mr-1 mb-1 w-7 fill-yellow-400 text-yellow-400 ' />
          My Index
        </h1>
      </div>
      <div className='w-30 h-8 border-2 border-yellow-400 shadow '>
        <input
          type='text'
          value={searchStr}
          placeholder='seach...'
          onChange={(evt) => setSearchStr(evt.target.value)}
        />
      </div>
    </nav>
  );
};
