import React from 'react'
import { Typography, Stack, styled } from '@mui/material'
import theme from '../../../utils/themes'
import GreenTick from "../../../../public/assets/images/GreenTick.svg"

export interface CardProps {
  icon: string
  title: string
  price: string
  isSelected: boolean
}

const CardContainer = styled(Stack)<{isSelected:boolean}>`
  width: 10vw;
  maxWidth:"159px";
  height: 16vh;
  maxHeight:"156px";
  position: relative;
  padding: 2.4%;
  border-radius: 2%;
  border: 2px solid
    ${(props) =>
      props.isSelected ? theme.palette.primary[500] : theme.palette.gray.white};
`

const Icon = styled('img')`
  width: 100%;
  height: 3.87rem;
  position: relative;
  top: -0.6rem;
`

const CardContent = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 0.7rem;
`

const TextContainer = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const TitleTypography = styled(Typography)`
  color: ${theme.palette.gray[500]};
`

const PriceTypography = styled(Typography)`
  color: ${theme.palette.text.medemp};
`

const TickImage = styled('img')`
  width: 15%;
  position: absolute;
  top: 0.2%;
  right: 0.8%;
  padding: 2.5%;
`

const CryptoCard = ({ icon, title, price, isSelected =false}: CardProps) => {
  return (
    <CardContainer isSelected={isSelected} >
      {isSelected && (
        <TickImage
          src={GreenTick}
          alt="Tick"
        />
      )}
      <Icon
        src={`${icon}`}
        alt="Icon"
      />
      <CardContent>
        <TextContainer>
          <TitleTypography variant="b1">{title}</TitleTypography>
          <PriceTypography variant="c1">{price}</PriceTypography>
        </TextContainer>
      </CardContent>
    </CardContainer>
  )
}

export default CryptoCard
