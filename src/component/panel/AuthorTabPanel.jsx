import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../config/config';
import { useOutletContext } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Button from '../Button';
import ReactPaginate from 'react-paginate';
import AuthorCard from '../card/AuthorCard';
import AuthorModal from '../modal/AuthorModal';

const AuthorTabPanel = ({datas: {authors}, setDatas}) => {
  const [offset, setOffset] = useState(0);
  const {search} = useOutletContext();
  const [modal, setModal] = useState({type: 'CREATE', opened: false, data: {}})
  
  const fetchAuthors = () => {
    axios.get(`${config.API.URL}/authors`, {params: {offset, search, limit: 20}})
      .then(resp => {
        setDatas(prevValue => ({...prevValue, authors: resp.data}));
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
  
  useEffect(() => {
    fetchAuthors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, offset]);
  
  
  const handleCreate = async (author) => {
    return await axios.post(`${config.API.URL}/authors`, author)
      .then(() => true)
      .catch(() => false)
      .finally(fetchAuthors);
  }
  
  return (
    <Tab.Panel className='flex flex-col h-full max-h-full'>
      <div className='flex justify-end mb-5'>
        <Button className='bg-green-700 border-none hover:bg-green-900' onClick={() => setModal({type: 'CREATE', submit: handleCreate, opened: true})}>Créer</Button>
      </div>
      <div className='flex flex-col gap-5 justify-between h-full max-h-full overflow-auto'>
        {authors && 
          <>
            <div className='flex flex-wrap gap-10'>
              {authors.data?.map(author => <AuthorCard key={author.id} {...{author, setModal}} fetchCallback={fetchAuthors}/>)}
            </div>
            {(authors.count / 20) > 1 &&
              <ReactPaginate 
                breakLabel='...' 
                nextLabel='suivant >'
                onPageChange={(event) => setOffset(event.selected * 20)}
                pageCount={authors.count / 20}
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
      <AuthorModal {...{modal, setModal}}/>
    </Tab.Panel>
  );
};

export default AuthorTabPanel;