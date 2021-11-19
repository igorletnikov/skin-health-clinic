import './SkinHealth.css';
import {Fragment } from 'react';

function Categories({ categoriesData, active,setRightFilter,rightFilter }) {
   const leftHandler = (x) => {
    setRightFilter(x.services);
    console.log('rightFilter:' + rightFilter);
    console.log(x);
  };

  return (
    <Fragment>
      <div className="site-layout-content-left">
        <div>
          {categoriesData &&
            categoriesData.map((x) => (
              <div
                onClick={() => {
                  leftHandler(x);
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
