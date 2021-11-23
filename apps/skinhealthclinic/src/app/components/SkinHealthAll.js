import { Fragment } from 'react';
import HeaderLayout from './layout/Header';
import MasterCategories from './MasterCategories';
import { useState } from 'react';
import Categories from './Categories';
import Services from './Services';

import ModalMine from './Modal';

function SkinHealthAll() {
  const [active, setActive] = useState('');
  const [filterActive, setFilterActive] = useState([]);
  const [rightFilter, setRightFilter] = useState([]);

  return (
    <Fragment>
      <HeaderLayout>
        <MasterCategories
          active={active}
          setActive={setActive}
          setFilterActive={setFilterActive}
          setRightFilter={setRightFilter}
        />
        <Categories
          active={active}
          filterActive={filterActive}
          setRightFilter={setRightFilter}
        />
        <Services rightFilter={rightFilter} />
        
      </HeaderLayout>
      <ModalMine/>
    </Fragment>
  );
}
export default SkinHealthAll;
