import './SkinHealth.css';
import { useEffect, useState, Fragment } from 'react';
import { GET_CATEGORIES_DATA,GET_ALL_CATEGORIES_DATA } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function Categories({ active, masterID, setcategoryID }) {
  const { data: categories } = useQuery(GET_CATEGORIES_DATA, {
    variables: { master_category_id: masterID },
  });
  
  const { data: categories_all } = useQuery(GET_ALL_CATEGORIES_DATA);
  
  return (
    <Fragment>
      <div className="site-layout-content-left">
        <div>
          {active === 'all' ? 
            categories_all &&
            categories_all.categories?.map((x) => (
              <div
                onClick={() => {
                  setcategoryID(x.id);
                }}
                key={x.id}
                className={
                  active === `${x.name}` ? 'item activeItem' : 'categoryItem'
                }
                style={{
                  width: '420px',
                  height: '40px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ float: 'left' }}>{x.name}</span>
                </div>
                <div>
                  <span style={{ float: 'right' }}>{x.value}</span>
                </div>
              </div>
            ))
            :
            categories &&
            categories.categories?.map((x) => (
              <div
                onClick={() => {
                  setcategoryID(x.id);
                }}
                key={x.id}
                className={
                  active === `${x.name}` ? 'item activeItem' : 'categoryItem'
                }
                style={{
                  width: '420px',
                  height: '40px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ float: 'left' }}>{x.name}</span>
                </div>
                <div>
                  <span style={{ float: 'right' }}>{x.value}</span>
                </div>
              </div>
            ))  } 
        </div>
      </div>
    </Fragment>
  );
}

export default Categories;
