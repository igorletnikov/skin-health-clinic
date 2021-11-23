import './SkinHealth.css';
import { useEffect, Fragment } from 'react';
import { GET_SERVICES_DATA } from '../graphql/queries';
import { useLazyQuery } from '@apollo/client';

function Categories({
  filterActive,
  active,
  setRightFilter,
}) {
  const [getServices, { data: services, error: sError }] =
    useLazyQuery(GET_SERVICES_DATA);

  useEffect(() => {
    setRightFilter(services);
  }, [services]);
  return (
    <Fragment>
      <div className="site-layout-content-left">
        <div>
          {filterActive &&
            filterActive.categories?.map((x) => (
              <div
                onClick={() => {
                  getServices({ variables: { category_id: x.id } });
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
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Categories;
