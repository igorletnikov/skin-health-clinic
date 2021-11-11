import classes from './service-component.module.css';
import {
  QuestionCircleOutlined,
  ClockCircleOutlined,
  StarTwoTone,
} from '@ant-design/icons';

export function ServiceComponent(props) {
  return (
    <div className={classes.item}>
      <div className={classes.first}>
        <div>
          {props.name} <QuestionCircleOutlined />
        </div>
        <div>{props.price}</div>
      </div>
      
      <div className={classes.second}>
        <div>
          {props.time} min <ClockCircleOutlined />
        </div>
      </div>
      <div className={classes.third}>
        <div>
          <StarTwoTone />
          <StarTwoTone />
          <StarTwoTone />
          <StarTwoTone />
          <StarTwoTone />
        </div>
        <div>{props.review} reviews</div>
      </div>
    </div>
  );
}
export default ServiceComponent;
