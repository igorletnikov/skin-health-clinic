import { render } from '@testing-library/react';
import ServiceComponent from './service-component';
describe('ServiceComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServiceComponent />);
    expect(baseElement).toBeTruthy();
  });
});
