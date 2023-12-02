import { SxProps, Theme } from "@mui/material";

interface ImgProps{
    src?: string,
    width?: string | number,
    height?: string | number,
    onClick?: () => void,
    style?:React.CSSProperties,
    alt?:string,
    sx?: SxProps<Theme>;

}

export default function Images(props:ImgProps) {
    return(
        <img src={props.src} alt={props.alt} width={props.width} height={props.height}/>
    )

}