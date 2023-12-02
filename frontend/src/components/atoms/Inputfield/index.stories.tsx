import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InputAdornment } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { CustomTextField } from '.';
import search from '../../../../public/assets/icons/search.svg'
import close from '../../../../public/assets/icons/Property 1=icons, Property 2=close.svg'

const meta:Meta<typeof CustomTextField> = {
    title:"Atoms/TextField",
    component:CustomTextField
};
export default meta;

type story= StoryObj<typeof CustomTextField>;

export const FullName:story = {
    args: {
        name: "Full Name",
        type:'text',
        placeholder: 'Eg: Jhon Doe',
        variant:'outlined',
        size:'medium',
        style:{
            width: "512px",
            height: "48px",
            borderRadius: "8px",
            
        }
}
};

export const Email:story = {
    args: {
        type:'email',
      
        placeholder: 'you@company.com',
        variant:'outlined',
        size:'medium',
        style:{
            width: "512px",
            height: "48px",
            borderRadius: "8px"
        }
}
};
export const Password:story = {
    args: {
        type:'password',
        placeholder: 'Enter Password',
        variant:"outlined",
        size:'medium',
        style:{
            width: "512px",
            height: "48px",
            borderRadius: "8px"
        },
        inputProps: { endAdornment: (
            <InputAdornment position="end">
              <VisibilityOffOutlinedIcon />
            </InputAdornment>
          )},
  
}
};
export const CreatePassword:story = {
    args: {
        type:'password',
        placeholder: 'Create Password',
        variant:"outlined",
        size:'medium',
        style:{
            width: "512px",
            height: "48px",
            borderRadius: "8px"
        },
        inputProps: { endAdornment: (
            <InputAdornment position="end">
              <VisibilityOffOutlinedIcon />
            </InputAdornment>
          )},
  
}
};
export const ResetCode:story = {
    args: {
        type:'number',
        placeholder: '8 digits code',
        variant:"outlined",
        size:'medium',
        style:{
            width: "512px",
            height: "48px",
            borderRadius: "8px"
        },
        
  
}
};
export const SearchAssets:story = {
    args: {
        type:'text',
        placeholder: 'Search all assets',
        variant:"outlined",
        size:'small',
        style:{
            width: "230px",
            height: "40px",
            borderRadius: "4px"
        },
        inputProps: { endAdornment: (
            <InputAdornment position="end">
            <img src={search} alt="Search " />
            </InputAdornment>
          )},
}
};
export const ClearSearch:story = {
    args: {
        type:'text',
        placeholder: 'Clear Search',
        variant:"outlined",
        size:'small',
        style:{
            width: "230px",
            height: "40px",
            borderRadius: "4px"
        },
        inputProps: { endAdornment: (
            <InputAdornment position="end">
            <img src={close} alt="Clear Icon" />
            </InputAdornment>
          )},
  
}
};