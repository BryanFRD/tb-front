import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Button from '../component/Button';
import AuthorTabPanel from '../component/panel/AuthorTabPanel';
import BookTabPanel from '../component/panel/BookTabPanel';

const HomeScreen = () => {
  const [datas, setDatas] = useState([]);
  
  return (
    <Tab.Group as='div' className='flex flex-col md:flex-row h-full max-h-full'>
      <Tab.List as='div' className='flex md:flex-col md:h-full'>
        <Tab as='div' className='outline-none'>
          {({selected}) =>
            <Button className={`w-full px-10 py-5 hover:bg-zinc-700 border-none rounded-none ${selected && 'bg-zinc-700'}`}>Autheurs</Button>
          }
        </Tab>
        <Tab as='div' className='outline-none'>
          {({selected}) =>
            <Button className={`w-full px-10 py-5 hover:bg-zinc-700 border-none rounded-none ${selected && 'bg-zinc-700'}`}>Livres</Button>
          }
        </Tab>
      </Tab.List>
      <Tab.Panels className='grow h-full bg-zinc-700 p-5'>
        <AuthorTabPanel {...{datas, setDatas}}/>
        <BookTabPanel {...{datas, setDatas}}/>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default HomeScreen;