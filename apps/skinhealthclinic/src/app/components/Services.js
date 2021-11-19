import './SkinHealth.css';
import { useState } from 'react';
import { MedicineBoxOutlined, LaptopOutlined } from '@ant-design/icons';
import { ServiceComponent } from '@skin-health-clinic/sharedui';
function Services({servicesData}) {
  const [statusOnline, setStatusOnline] = useState(true);
  const rightHandler = (x) => {
    console.log('rightFilter:' + x.name);
    setStatusOnline(x.online);
  };
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

        {servicesData && servicesData.map((x) => (
          <div onClick={() => rightHandler(x)} key={x.id}>
            <ServiceComponent
              name={x.name}
              price={x.price}
              time={x.time}
              review={x.review}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
