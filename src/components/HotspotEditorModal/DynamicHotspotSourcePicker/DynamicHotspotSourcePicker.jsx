import React from 'react';
import PropTypes from 'prop-types';
import { Erase32 } from '@carbon/icons-react';
import classnames from 'classnames';

import { settings } from '../../../constants/Settings';
import { Dropdown } from '../../Dropdown';
import Button from '../../Button/Button';

const { iotPrefix } = settings;

const propTypes = {
  dataSourceItems: PropTypes.arrayOf(
    PropTypes.shape({
      dataSourceId: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  id: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  onXValueChange: PropTypes.func.isRequired,
  onYValueChange: PropTypes.func.isRequired,
  selectedSourceIdX: PropTypes.string,
  selectedSourceIdY: PropTypes.string,
  testID: PropTypes.string,
  i18n: PropTypes.shape({
    clearIconDescription: PropTypes.string,
    xCoordinateDropdownTitleText: PropTypes.string,
    xCoordinateDropdownLabelText: PropTypes.string,
    yCoordinateDropdownTitleText: PropTypes.string,
    yCoordinateDropdownLabelText: PropTypes.string,
  }),
  translateWithId: PropTypes.func.isRequired,
};

const defaultProps = {
  id: 'dynamic-hotspot-source-picker',
  selectedSourceIdX: undefined,
  selectedSourceIdY: undefined,
  testID: 'dynamic-hotspot-source-picker',
  i18n: {
    clearIconDescription: 'Clear coordinate sources',
    xCoordinateDropdownTitleText: 'X coordinate',
    xCoordinateDropdownLabelText: 'Select data item',
    yCoordinateDropdownTitleText: 'Y coordinate',
    yCoordinateDropdownLabelText: 'Select data item',
  },
};

const DynamicHotspotSourcePicker = ({
  dataSourceItems,
  id,
  onClear,
  onXValueChange,
  onYValueChange,
  selectedSourceIdX,
  selectedSourceIdY,
  testID,
  i18n: {
    clearIconDescription,
    xCoordinateDropdownTitleText,
    xCoordinateDropdownLabelText,
    yCoordinateDropdownTitleText,
    yCoordinateDropdownLabelText,
  },
  translateWithId,
}) => {
  const classname = `${iotPrefix}--dynamic-hotspot-source-picker`;
  return (
    <div data-testid={testID} className={classname}>
      <Dropdown
        key={`${id}-x-coordinate-dropdown-${selectedSourceIdX}`}
        data-testid={`${testID}-x-coordinate-dropdown`}
        selectedItem={dataSourceItems.find(
          (item) => item.dataSourceId === selectedSourceIdX
        )}
        id={`${id}-x-coordinate-dropdown`}
        titleText={xCoordinateDropdownTitleText}
        label={xCoordinateDropdownLabelText}
        items={dataSourceItems}
        itemToString={(item) => item.label}
        translateWithId={translateWithId}
        onChange={(change) => {
          onXValueChange(change.selectedItem.dataSourceId);
        }}
      />
      <Dropdown
        key={`${id}-y-coordinate-dropdown-${selectedSourceIdY}`}
        data-testid={`${testID}-y-coordinate-dropdown`}
        selectedItem={dataSourceItems.find(
          (item) => item.dataSourceId === selectedSourceIdY
        )}
        id={`${id}-y-coordinate-dropdown`}
        titleText={yCoordinateDropdownTitleText}
        label={yCoordinateDropdownLabelText}
        items={dataSourceItems}
        translateWithId={translateWithId}
        itemToString={(item) => item.label}
        onChange={(change) => {
          onYValueChange(change.selectedItem.dataSourceId);
        }}
      />
      {
        <Button
          data-testid={`${testID}-clear-dropdown`}
          className={classnames(`${classname}__clear-button`, {
            [`${classname}__clear-button--invisible`]:
              !selectedSourceIdX || !selectedSourceIdY,
          })}
          kind="ghost"
          size="small"
          renderIcon={Erase32}
          iconDescription={clearIconDescription}
          tooltipPosition="top"
          tooltipAlignment="end"
          onClick={onClear}
          hasIconOnly
        />
      }
    </div>
  );
};

DynamicHotspotSourcePicker.propTypes = propTypes;
DynamicHotspotSourcePicker.defaultProps = defaultProps;
export default DynamicHotspotSourcePicker;
