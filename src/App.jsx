import { Book } from './components/Book';
import { Nav } from './components/Nav';
import { useData } from './hooks/data-context';

function App() {
  const { data, addBook } = useData();

  return (
    <div className='h-screen w-full overflow-y-hidden overflow-x-scroll'>
      <header>
        <Nav />
      </header>

      <main>
        <div className='flex items-start p-8'>
          {data.books
            .sort((a, b) =>
              a.id === 0 ? Number.MAX_SAFE_INTEGER : a.id - b.id
            )
            .map((book) => (
              <Book key={book.id} book={book} />
            ))}
          {data.books.find((book) => !book.id) ? (
            ''
          ) : (
            <button
              onClick={addBook}
              className='mr-2 w-64 rounded-sm bg-yellow-500 px-4 py-1 font-medium text-white hover:bg-yellow-600'
            >
              +Add
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
