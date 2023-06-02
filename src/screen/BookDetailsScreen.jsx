import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../component/svg/LoadingSpinner';
import { config } from '../config/config';

const BookDetailsScreen = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState();
  console.log('book:', book);
  
  const fetchBook = () => {
    axios.get(`${config.API.URL}/books/${id}`)
      .then(({data}) => setBook(data))
      .catch((err) => {
        console.log('err:', err);
        navigate('/')
      });
  }
  
  useEffect(() => {
    fetchBook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  return (
    <div className='flex flex-col gap-5 p-5 h-full max-h-full bg-zinc-700'>
      {book ?
        <>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col items-center gap-10 text-xl'>
              <h1 className='text-3xl'>Titre: {book.title}</h1>
              <div>
                <span>Autheur: </span>
                <Link 
                  to={`/author/${book.authorId}`}
                  className='underline underline-offset-2 hover:text-zinc-300'>
                    {book.authorName}
                </Link>
              </div>
            </div>
          </div>
        </>
        :
        <div className='flex justify-center items-center gap-10'>
          <div className='status'><LoadingSpinner /></div>
        </div>
      }
    </div>
  );
};

export default BookDetailsScreen;