import { Fragment } from 'react';
import HeaderLayout from './layout/Header';
import MasterCategories from './MasterCategories';
import { useState } from 'react';
import Categories from './Categories';
import Services from './Services';

import ModalMine from './Modal';

function SkinHealthAll() {
  const [active, setActive] = useState('');

  const [masterID, setmasterID] = useState(1);
  const [categoryID, setcategoryID] = useState(1);

  return (
    <Fragment>
      <HeaderLayout>
        <MasterCategories
          active={active}
          setActive={setActive}
          setmasterID={setmasterID}
          masterID={masterID}
          setcategoryID={setcategoryID}
        />
        <Categories
          active={active}
          masterID={masterID}
          setcategoryID={setcategoryID}
        />
        <Services  
        categoryID={categoryID}
        setcategoryID={setcategoryID}
        />
        </HeaderLayout>
    </Fragment>
  );
}
export default SkinHealthAll;
