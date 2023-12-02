import { InputProps, SxProps, TextField,TextFieldVariants } from "@mui/material";
import { ChangeEvent } from "react";


export interface TextFieldProps  {
label?:string,
value?:string,
required?:boolean,
onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
error?:boolean,
errorMessage?:string,
type?:string,
onBlur?:()=>void,
variant?:TextFieldVariants,
placeholder?:string,
inputProps?:InputProps,
style?:SxProps,
size?:any,
id?:string,
name?: string,
color?: any,

}

export const CustomTextField = (props:TextFieldProps)=>{

    const {label,value,required,onChange,error,errorMessage,type,onBlur,variant,placeholder,inputProps,size,style,id} = props;

    return (
        
            <TextField
                defaultValue={value}
                required={required}
                onChange={onChange}
                error={error}
                helperText={errorMessage}
                type={type}
                onBlur={onBlur}
                variant={variant}
                placeholder={placeholder}
                InputProps={inputProps}
                sx={style}
                size={size}
                id={id}
                label={label} />
    );
    
}