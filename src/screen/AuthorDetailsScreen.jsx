import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';
import ReactPaginate from 'react-paginate';
import BookCard from '../component/card/BookCard';
import BookModal from '../component/modal/BookModal';
import { config } from '../config/config';

const AuthorDetailsScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState();
  const [books, setBooks] = useState();
  const [modal, setModal] = useState();
  const {search} = useOutletContext();
  const [offset, setOffset] = useState(0);
  
  const fetchAuthor = () => {
    axios.get(`${config.API.URL}/authors/${id}`)
      .then(({data}) => setAuthor(data))
      .catch(() => navigate('/'));
  }
  
  const fetchBooks = (abortController) => {
    axios.get(`${config.API.URL}/authors/${id}/books?includeDeleted=1`, {params: {search, offset, limit: 20}, signal: abortController?.signal})
      .then(({data}) => setBooks(data))
      .catch(console.log);
  }
  
  const fetchCallback = () => {
    fetchAuthor();
    fetchBooks();
  }
  
  useEffect(() => {
    fetchAuthor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    fetchBooks(abortController);
    
    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search, offset]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full max-h-full bg-zinc-700'>
      {author ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Nom: {author.name}</h1>
              <h2>Livres: {author.booksCount}</h2>
              {/* <div>
                <span>Organisation: </span>
                <Link 
                  to={author.organization_id ? `/organization/${building.organization_id}` : ''}
                  className={building.organization_id ? 'underline underline-offset-2 hover:text-zinc-300' : 'pointer-events-none'}>
                    {building.organization_name ?? 'Aucune'}
                </Link>
              </div> */}
            </div>
          </div>
          <div className='flex flex-col gap-5 justify-between overflow-auto'>
            {books &&
              <>
                <div className='flex flex-wrap gap-10'>
                  {books.data?.map(book => <BookCard key={book.id} {...{book, setModal}} fetchCallback={fetchCallback}/>)}
                </div>
                {(books.count / 20) > 1 &&
                <ReactPaginate
                  breakLabel='...' 
                  nextLabel='suivant >'
                  onPageChange={(event) => setOffset(event.selected * 20)}
                  pageCount={books.count / 20}
                  initialPage={0}
                  previousLabel='< précédent'
                  className='flex gap-2 self-center mb-2'
                  pageLinkClassName='hover:bg-zinc-600 px-3 py-1 rounded-md select-none'
                  activeLinkClassName='bg-zinc-600'
                  nextLinkClassName='hover:bg-zinc-600 px-3 py-1 rounded-md cursor-pointer select-none'
                  previousLinkClassName='hover:bg-zinc-600 px-3 py-1 rounded-md cursor-pointer select-none'/>
                }
              </>
            }
          </div>
          <BookModal {...{modal, setModal}}/>
        </>
        :
        <div className='flex justify-center items-center gap-10'>
          <div className='status'><LoadingSpinner /></div>
        </div>
      }
    </div>
  );
};

export default AuthorDetailsScreen;