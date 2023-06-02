import React, { useState } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const BookModal = ({modal, setModal}) => {
  const [error, setError] = useState(false);
  
  const promiseOptions = async (value) => {
    return axios.get('https://localhost:8000/authors', {params: {search: value, limit: 20}})
      .then(({data}) => data?.data?.map(({id, name}) => ({value: id, label: name})));
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    
    const book = Object.fromEntries(new FormData(event.currentTarget));
    book.id = modal?.data?.id;
    
    const succeed = await modal?.submit(book);
    setError(!succeed)
    
    if(succeed)
      setModal({opened: false});
  }
  
  return (
    <Modal open={modal?.opened ?? false} setModal={setModal}>
      <div className='bg-zinc-900 text-zinc-200 p-5 rounded-md flex flex-col gap-5 text-center'>
        <h2 className='text-xl'>{modal?.type === 'CREATE' ? 'Création' : 'Mise à jour'} d'un livre</h2>
        {error && 
          <span className='text-red-500'>Erreur lors de l'envoie des données !</span>
        }
        <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Titre: </label>
            <Input name='title' placeholder='Titre...' defaultValue={modal?.data?.title ?? ''} className='w-48'/>
          </div>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Autheur: </label>
            <AsyncSelect
              name='authorId'
              placeholder='Autheur...'
              className='w-48 text-left'
              classNames={{
                control: () => 'bg-zinc-700',
                input: () => 'text-zinc-100',
                singleValue: () => 'text-zinc-400',
                menu: () => 'bg-zinc-700 text-zinc-200',
                option: ({isFocused, isSelected}) => (isFocused || isSelected) && 'bg-zinc-600'
              }}
              defaultValue={{value: modal?.data?.authorId, label: modal?.data?.authorName}}
              isClearable
              defaultOptions
              loadOptions={promiseOptions}
            />
          </div>
          <div className='flex gap-5 justify-end'>
            <Button type="button" className='bg-red-700 border-none hover:bg-red-900' onClick={() => setModal({opened: false})}>Annuler</Button>
            <Button type="submit" className='bg-green-700 border-none hover:bg-green-900'>{modal?.type === 'CREATE' ? 'Créer' : 'Valider'}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookModal;