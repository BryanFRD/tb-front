import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';

const Navbar = ({search, handleSearch}) => {
  return (
    <nav className='p-5 md:p-3 md:columns-3 shadow-xl align-middle'>
      <div className='flex gap-10 flex-col md:flex-row items-center'>
        <Link to='/' className='text-2xl font-semibold mb-5 block md:m-0'>Accueil</Link>
      </div>
      <div>
        <Input placeholder='Chercher' className='mx-auto block w-72' onChange={handleSearch} value={search}/>
      </div>
    </nav>
  );
};

export default Navbar;