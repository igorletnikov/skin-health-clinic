import './SkinHealth.css';
import { useState } from 'react';
import { MedicineBoxOutlined, LaptopOutlined } from '@ant-design/icons';
import { ServiceComponent } from '@skin-health-clinic/sharedui';

function Services({ rightFilter }) {
  const [statusOnline, setStatusOnline] = useState(true);
  return (
    <div className="site-layout-content-right">
      <div>
        <div
          onClick={function () {
            //IF status = false
            if (statusOnline === false) {
              console.log(statusOnline);
            }
          }}
          className="categorySwitch"
        >
          <MedicineBoxOutlined />
          <span> In Clinic</span>
        </div>

        <div
          onClick={function () {
            //IF status = true
            if (statusOnline === true) {
              console.log(statusOnline);
            }
          }}
          className="categorySwitch"
        >
          <LaptopOutlined />
          <span> Virtual Consultation</span>
        </div>

        {rightFilter &&
          rightFilter.services?.map((x) => (
            <div onClick={() => {
                console.log('OK');
            }} key={x.id}>
              <ServiceComponent
                name={x.name}
                price={x.price}
                time={x.duration}
                review={x.review}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Services;
