import './SkinHealth.css';
import { CreditCardOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useEffect, Fragment, useState } from 'react';
import { GET_MASTER, GET_CATEGORIES_DATA,GET_ALL_CATEGORIES_DATA } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function MasterCategories({
  active,
  setActive,
  masterID,
  setmasterID,
  setcategoryID,
}) {
  const { data: master_categories } = useQuery(GET_MASTER);
 // const { data: categories_all } = useQuery(GET_ALL_CATEGORIES_DATA);
  const { data: categories } = useQuery(GET_CATEGORIES_DATA, {
    variables: { master_category_id: masterID },
  });

  useEffect(() => {
    if (categories) {
      setcategoryID(categories.categories[0].id);
    }
  }, [categories]);
  useEffect(() => {
     showAll();
  }, [])
  function showAll() {
    setActive('all');
  }
  return (
    <Fragment>
      <div className="site-layout-content-top">
        <div className="content-items">
          <div
            onClick={function () {
              setActive('all');
              showAll();
            }}
            className={active === 'all' ? 'item activeItem' : 'item'}
          >
            <AppstoreOutlined
              style={{ fontSize: '40px', color: '#54B2D3' }}
              theme="outlined"
            />
            <span>All</span>
          </div>
          {master_categories &&
            master_categories.master_categories.map((x) => (
              <div
                key={x.id}
                onClick={() => {
                  setActive(x.name);
                  setmasterID(x.id);
                }}
                className={active === `${x.name}` ? 'item activeItem' : 'item'}
              >
                <img
                  src={require(`../../assets/${x.image}.svg`).default}
                  alt="image"
                />
                <span>{x.name}</span>
              </div>
            ))}
          <div className="item">
            <CreditCardOutlined
              style={{
                fontSize: '40px',
                color: 'rgba(255, 166, 0, 0.501)',
              }}
              theme="outlined"
            />
            <span>Voucher</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MasterCategories;
