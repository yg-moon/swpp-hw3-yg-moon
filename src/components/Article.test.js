import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';


describe('<Article />', () => {
    it('should render without errors', () => {
      const component = shallow(<Article />);
      const wrapper = component.find('.Article');
      expect(wrapper.length).toBe(1);
    });
    it('should handle clicks', () => {
      const mockClicked = jest.fn();
      const component = shallow(<Article clicked={mockClicked} />);
      const wrapper = component.find('#article-title');
      wrapper.simulate('click');
      expect(mockClicked).toHaveBeenCalledTimes(1);
    });
  });
  