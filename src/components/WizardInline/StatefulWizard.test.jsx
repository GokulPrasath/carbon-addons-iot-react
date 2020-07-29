import { mount } from 'enzyme';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { itemsAndComponents } from './WizardInline.story';
import StatefulWizardInline from './StatefulWizardInline';

const commonWizardProps = {
  title: 'My Wizard',
  items: itemsAndComponents,
  currentItemId: itemsAndComponents[0].id,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
};

describe('StatefulWizardInline', () => {
  it('onNext', () => {
    const mockNext = jest.fn();
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} onNext={mockNext} />);
    const cancelAndNextButtons = wrapper.find('.bx--btn');
    expect(cancelAndNextButtons).toHaveLength(3);
    cancelAndNextButtons.at(2).simulate('click');
    expect(mockNext).toHaveBeenCalled();
  });
  it('setItem', () => {
    const mocks = {
      isClickable: true,
      setItem: jest.fn(),
    };
    render(<StatefulWizardInline {...commonWizardProps} {...mocks} />);
    fireEvent.click(screen.getByText('Long step'));
    expect(mocks.setItem).toHaveBeenCalledTimes(1);
  });
  it('error', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} error="I'm in error" />);
    const progressIndicatorButtons = wrapper.find('InlineNotification');
    expect(progressIndicatorButtons).toHaveLength(1);
  });
  it('error clear error', () => {
    const mockClearError = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        error="I'm in error"
        onClearError={mockClearError}
      />
    );
    const clearErrorButton = wrapper.find('.bx--inline-notification__close-button');
    expect(clearErrorButton).toHaveLength(1);
    clearErrorButton.simulate('click');
    expect(mockClearError).toHaveBeenCalled();
  });
  it('setItem not triggered if invalid', () => {
    const mockSetItem = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId="item1"
        items={[
          { id: 'item1', name: 'Item1', component: <div>Item 1</div>, onValidate: () => false },
          { id: 'item2', name: 'Item2', component: <div>Item 2</div>, onValidate: () => false },
        ]}
        setItem={mockSetItem}
      />
    );
    const progressIndicatorButtons = wrapper.find('.iot--progress-step-button');
    expect(progressIndicatorButtons).toHaveLength(2);
    progressIndicatorButtons.at(1).simulate('click');
    expect(mockSetItem).not.toHaveBeenCalled();
  });
  it('onNext not triggered if invalid', () => {
    const mockNext = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId="item1"
        items={[
          { id: 'item1', name: 'Item1', component: <div>Item 1</div>, onValidate: () => false },
          { id: 'item2', name: 'Item2', component: <div>Item 2</div>, onValidate: () => false },
        ]}
        onNext={mockNext}
      />
    );
    const cancelAndNextButtons = wrapper.find('.bx--btn');
    expect(cancelAndNextButtons).toHaveLength(3);
    cancelAndNextButtons.at(1).simulate('click');
    expect(mockNext).not.toHaveBeenCalled();
  });
  it('onClose', () => {
    const mockClose = jest.fn();
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} onClose={mockClose} />);
    const cancelAndNextButtons = wrapper.find('.bx--btn');
    expect(cancelAndNextButtons).toHaveLength(3);
    cancelAndNextButtons.at(1).simulate('click');
    expect(mockClose).toHaveBeenCalled();
  });
  it('onBack', () => {
    const mockBack = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId={itemsAndComponents[1].id}
        onBack={mockBack}
      />
    );
    const backAndNextButtons = wrapper.find('.bx--btn');
    expect(backAndNextButtons).toHaveLength(3);
    backAndNextButtons.at(1).simulate('click');
    expect(mockBack).toHaveBeenCalled();
  });
  it('renders with inference of current item when currentItemId is not set', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} currentItemId={null} />);
    expect(wrapper.find('StatefulWizardInline')).toHaveLength(1);
  });
  it('renders with no next item when currentItem is the last item', () => {
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId={itemsAndComponents[itemsAndComponents.length - 1].id}
      />
    );
    expect(wrapper.find('StatefulWizardInline')).toHaveLength(1);
  });
  it('handleNext advances to next with no onNext callback', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} />);
    const nextButton = wrapper.find('.bx--btn').at(2);
    nextButton.simulate('click');
    expect(wrapper.find('WizardInline').props().currentItemId).toBe(itemsAndComponents[1].id);
  });
  it('handleBack goes to previous with no onBack callback', () => {
    const wrapper = mount(
      <StatefulWizardInline {...commonWizardProps} currentItemId={itemsAndComponents[2].id} />
    );
    const backButton = wrapper.find('.bx--btn').at(1);
    backButton.simulate('click');
    expect(wrapper.find('WizardInline').props().currentItemId).toBe(itemsAndComponents[1].id);
  });
});
