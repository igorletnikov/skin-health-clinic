import { Fragment } from 'react';
import HeaderLayout from './layout/Header';
import MasterCategories from './MasterCategories';
import { GET_MASTER_DATA,GET_MASTER } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Categories from './Categories';
import Services from './Services';

function SkinHealthAll() {
  //   const [active, setActive] = useState('all');
  const { loading, error, data } = useQuery(GET_MASTER_DATA);
  //const [ getMaster, { data: masterCategories, error: mError }] = useLazyQuery(GET_MASTER);
  //const { loading, error, data: categories } = useQuery(GET_CATEGORIES);

  
  const [masterCategories, setMasterCategories] = useState([]);
  const [active, setActive] = useState();
  const [filterActive, setFilterActive] = useState([]);
  const [rightFilter, setRightFilter] = useState([]);

  useEffect(() => {
    if (data) {
      setMasterCategories(data.master_categories);
    }
  }, [data]);

  //console.log(masterCategories);
  return (
    <Fragment>
      <HeaderLayout>
        <MasterCategories
          active={active}
          setActive={setActive}
          dataMaster={masterCategories}
          filterActive={filterActive}
          setFilterActive={setFilterActive}
          setRightFilter={setRightFilter}
        />
        <Categories 
         active={active}
         categoriesData={filterActive}
         setRightFilter={setRightFilter}
         rightFilter={rightFilter}
        />
        <Services servicesData={rightFilter}/>
      </HeaderLayout>
    </Fragment>
  );
}

export default SkinHealthAll;
