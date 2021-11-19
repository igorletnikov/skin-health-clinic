import './SkinHealth.css';
import { CreditCardOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useEffect, Fragment } from 'react';

function MasterCategories({ dataMaster,active,setActive,filterActive,setFilterActive,setRightFilter }) {

  useEffect(() => {
    showAll();
  }, [dataMaster]);
  function showAll() {
    if (dataMaster) {
      const array = [];
      dataMaster.map((x) => {
        x.categories.map((y) =>
          array.push({
            id: y.id,
            name: y.name,
            services: y.services,
          })
        );
      });
      const firstCategoryService = array.map((x) => x);
      setFilterActive(array);
      const [arrayServices] = array;
      setRightFilter(arrayServices && arrayServices.services);
    }
  }
  const topHandler = (x) => {
    console.log(x);
    setActive(x.name);
    console.log('active:' + active, ' momentalno kliknatiot', x.name);
    setFilterActive(x.categories);
    console.log('filterActive(levite kategorii):' + filterActive);
    setRightFilter(x.categories[0].services);
    console.log('services', x.categories[0].services);
  };
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
            //value={dataMaster.value}
          >
            <AppstoreOutlined
              style={{ fontSize: '40px', color: '#54B2D3' }}
              theme="outlined"
            />
            <span>All</span>
          </div>
          {dataMaster &&
            dataMaster.map((x) => (
              <div
                key={x.id}
                onClick={() => {
                  setActive(x.name);
                  topHandler(x);
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
