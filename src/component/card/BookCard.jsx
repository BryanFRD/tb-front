import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Button from '../Button';

const BookCard = ({book, setModal, fetchCallback}) => {
  const handleUpdate = async (data) => {
    return await axios.put(`https://localhost:8000/books/${data.id}`, data)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  const handleDelete = async () => {
    return await axios.delete(`https://localhost:8000/books/${book.id}`)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  return (
    <Card>
      <div className='flex justify-between'>
        <Link to={`/book/${book.id}`} className='underline underline-offset-2 hover:text-zinc-300'>{book.title}</Link>
        {book.deletedAt && 
          <span className='text-red-600'>(Supprimé)</span>
        }
      </div>
      <span>Autheur: {book.authorName ?? '0'}</span>
      <div className='flex gap-5 justify-end'>
        <Button className='bg-blue-700 border-none hover:bg-blue-900' onClick={() => setModal({type: 'UPDATE', opened: true, submit: handleUpdate, data: book})}>Modifier</Button>
        <Button className='bg-red-700 border-none hover:bg-red-900' onClick={() => handleDelete()}>Supprimer</Button>
      </div>
    </Card>
  );
};

export default BookCard;