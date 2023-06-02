import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Button from '../Button';

const AuthorCard = ({author, setModal, fetchCallback}) => {
  const handleUpdate = async (data) => {
    return await axios.put(`https://localhost:8000/authors/${data.id}`, data)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  const handleDelete = async () => {
    return await axios.delete(`https://localhost:8000/authors/${author.id}`)
      .then(() => true)
      .catch(() => false)
      .finally(fetchCallback);
  }
  
  return (
    <Card>
      <div className='flex justify-between'>
        <Link to={`/author/${author.id}`} className='underline underline-offset-2 hover:text-zinc-300'>{author.name}</Link>
        {author.deletedAt && 
          <span className='text-red-600'>(Supprimé)</span>
        }
      </div>
      <span>Livres: {author.booksCount ?? '0'}</span>
      <div className='flex gap-5 justify-end'>
        <Button className='bg-blue-700 border-none hover:bg-blue-900' onClick={() => setModal({type: 'UPDATE', opened: true, submit: handleUpdate, data: author})}>Modifier</Button>
        <Button className='bg-red-700 border-none hover:bg-red-900' onClick={() => handleDelete()}>Supprimer</Button>
      </div>
    </Card>
  );
};

export default AuthorCard;