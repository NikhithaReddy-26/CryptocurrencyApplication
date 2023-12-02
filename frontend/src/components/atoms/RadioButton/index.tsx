import { Radio, RadioProps } from "@mui/material";

interface IRadioProps extends RadioProps {}

const RadioButton = (props: IRadioProps) => {
  return <Radio data-testid="radioButton" {...props} />;
};

export default RadioButton;