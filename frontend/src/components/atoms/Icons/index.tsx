import {Theme,SxProps} from "@mui/material";
interface PropsTypes {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  style?:React.CSSProperties;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

export default function Icon(props: PropsTypes) {
  return (
    <img data-testid="icon"
      {...props}
    />
  );
}
