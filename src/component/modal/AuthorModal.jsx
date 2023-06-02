import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import Modal from '../Modal';

const AuthorModal = ({modal, setModal}) => {
  const [error, setError] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    
    const author = Object.fromEntries(new FormData(event.currentTarget));
    author.id = modal?.data?.id;
    
    const succeed = await modal?.submit(author);
    setError(!succeed)
    
    if(succeed)
      setModal({opened: false});
  }
  
  return (
    <Modal open={modal?.opened ?? false} setModal={setModal}>
      <div className='bg-zinc-900 text-zinc-200 p-5 rounded-md flex flex-col gap-5 text-center'>
        <h2 className='text-xl'>{modal?.type === 'CREATE' ? 'Création' : 'Mise à jour'} d'un autheur</h2>
        {error && 
          <span className='text-red-500'>Erreur lors de l'envoie des données !</span>
        }
        <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
          <div className='flex gap-3 justify-between items-center'>
            <label className='text-lg'>Nom: </label>
            <Input name='name' placeholder='Nom...' defaultValue={modal?.data?.name ?? ''} className='w-48'/>
          </div>
          <div className='flex gap-5 justify-end'>
            <Button type="button" className='bg-red-700 border-none hover:bg-red-900' onClick={() => setModal(false)}>Annuler</Button>
            <Button type="submit" className='bg-green-700 border-none hover:bg-green-900'>{modal?.type === 'CREATE' ? 'Créer' : 'Valider'}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AuthorModal;