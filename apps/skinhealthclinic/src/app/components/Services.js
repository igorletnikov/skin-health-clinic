import './SkinHealth.css';
import { useState, useEffect, Fragment } from 'react';
import { MedicineBoxOutlined, LaptopOutlined } from '@ant-design/icons';
import { ServiceComponent } from '@skin-health-clinic/sharedui';
import { GET_SERVICES_DATA } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import ModalMine from './Modal';

function Services({ categoryID, setcategoryID }) {
  const { data: services } = useQuery(GET_SERVICES_DATA, {
    variables: { category_id: categoryID },
  });

  console.log('services od services:', services);
  console.log('categoryID od services', categoryID);
  const [statusOnline, setStatusOnline] = useState('OFFLINE');
  return (
    <Fragment>
      <div className="site-layout-content-right">
        <div>
            <div
            onClick={function () {
              //IF status = false
              setStatusOnline('OFFLINE');
            }}
            className="categorySwitch"
          >
            <MedicineBoxOutlined />
            <span> In Clinic</span>
          </div>

          <div
            onClick={function () {
              //IF status = true
              setStatusOnline('ONLINE');
            }}
            className="categorySwitch"
          >
            <LaptopOutlined />
            <span> Virtual Consultation</span>
          </div>

          {services && statusOnline === 'ONLINE' &&
            services.services?.map((x) => x.in_clinic === true && (
              <div
                onClick={() => {
                  console.log('OK');
                }}
                key={x.id}
              >
                <ServiceComponent
                  name={x.name}
                  price={x.price}
                  time={x.duration}
                  review={x.review}
                />
              </div>
            ))}
             {services && statusOnline === 'OFFLINE' &&
            services.services?.map((x) => x.in_clinic === false && (
              <div
                onClick={() => {
                  console.log('OK');
                }}
                key={x.id}
              >
                <ServiceComponent
                  name={x.name}
                  price={x.price}
                  time={x.duration}
                  review={x.review}
                />
              </div>
            ))}
          <ModalMine/>
        </div>
      </div>
    </Fragment>
  );
}

export default Services;
