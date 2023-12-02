import React from "react";
import { Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../../utils/themes";
import icon from "../../../../public/assets/icons/switch.svg";

export interface HeaderProps {
  name: string;
  price: string;
  change: string;
  marketCap: string;
}

const StyledStack = styled(Stack)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  marginRight: '7%',
  paddingLeft: '26px'
});

const StyledTypography = styled(Typography)({
  color: theme.palette.gray[500],
  height: "100%",
});

const ColumnHeader = ({ name, price, change, marketCap }: HeaderProps) => {
  return (
    <StyledStack>
      <StyledTypography variant="c1">{name}</StyledTypography>
      <StyledTypography variant="c1">{price}</StyledTypography>
      <StyledTypography variant="c1">{change}</StyledTypography>
      <Stack direction="row" alignItems="center">
        <StyledTypography variant="c1">{marketCap}</StyledTypography>
        <img src={icon} alt="Switch Icon" />
      </Stack>
      <StyledTypography variant="c1">Watch</StyledTypography>
    </StyledStack>
  );
};

export default ColumnHeader;
