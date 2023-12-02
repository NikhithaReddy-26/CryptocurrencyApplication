import { InputAdornment, styled } from '@mui/material';
import search from '../../../../public/assets/icons/search.svg';
import filter from '../../../../public/assets/icons/filter.svg';
import clear from '../../../../public/assets/icons/Property 1=icons, Property 2=close.svg';
import Icon from '../../atoms/Icons';
import { CustomTextField, TextFieldProps } from '../../atoms/Inputfield';
import { useState } from 'react';

export interface SearchFilterProps {
  filterEnabled: boolean;
  onChange?: (value: string) => void;
}

const CustomDivider = styled('div')`
  width: 0.0625rem;
  height: 1.75rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin: 0 0.5rem;
`;

export const SearchFilter = ({ filterEnabled, onChange }: SearchFilterProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleClearSearch = () => {
    setSearchValue('');
    if (onChange) {
      onChange('');
    }
  };

  const handleChange: TextFieldProps['onChange'] = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <CustomTextField
      value={searchValue}
      onChange={handleChange}
      placeholder="Search all assets"
      size="small"
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Icon
              src={searchValue ? clear : search}
              alt="Search Icon"
              onClick={handleClearSearch}
              style={{ cursor: 'pointer' }}
            />
            {filterEnabled && <CustomDivider />}
            {filterEnabled && <Icon src={filter} alt="Filter Icon" />}
          </InputAdornment>
        ),
      }}
      style={{
        minWidth: filterEnabled ? '25%' : '17%',
        backgroundColor: 'white',
      }}
    />
  );
};
