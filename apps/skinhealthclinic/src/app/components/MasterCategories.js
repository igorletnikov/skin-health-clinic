import './SkinHealth.css';
import { CreditCardOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useEffect, Fragment, useState } from 'react';
import {
  GET_MASTER,
  GET_CATEGORIES_DATA,
  GET_ALL_CATEGORIES_DATA,
  GET_SERVICES_DATA,
} from '../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import Categories from './Categories';

function MasterCategories({
  active,
  setActive,
  setFilterActive,
  setRightFilter,
}) {
  const [getMaster, { data: master_categories, error: mError }] =
    useLazyQuery(GET_MASTER);
  const [getCategories, { data: categories, error: cError }] =
    useLazyQuery(GET_CATEGORIES_DATA);
  const [getAllCategories, { data: categories_all, error: caError }] =
    useLazyQuery(GET_ALL_CATEGORIES_DATA);
  const [getServices, { data: services, error: sError }] =
    useLazyQuery(GET_SERVICES_DATA);

  useEffect(() => {
    getMaster();
    getAllCategories();
    showAll();
  }, [categories_all]);

  useEffect(() => {
    setFilterActive(categories);
    if (categories)
      getServices({ variables: { category_id: categories.categories[0].id } });
  }, [categories]);

  useEffect(() => {
    setRightFilter(services);
  }, [services]);

  function showAll() {
    if (categories_all)
      getServices({
        variables: { category_id: categories_all.categories[0].id },
      });
    setFilterActive(categories_all);
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
                  getCategories({ variables: { master_category_id: x.id } });
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
