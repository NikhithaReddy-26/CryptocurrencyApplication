import { Box, Divider, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import theme from '../../../utils/themes'
import Icon from '../../atoms/Icons'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import Truck from '../../../../public/assets/icons/delivery.svg'
import CustomButton from '../../atoms/Button'
import { OrderSummaryConstants } from '../../../utils/constants'

interface OrderSummaryProps {
  OrderType: string
  OrderValue: string
  CoinValue: string
  PaymentMethodIcon: string
  PaymentMethod: string
  PaymentMethodType: string
  DeliveryFee: string
  DepositTypeIcon: string
  DepositTo: string
  CoinOrderValue: string
  CostOrderValue: string
  TransactionFee: string
  Total: string
  ButtonChildren:string;
  onClick?: () => void
}

const StyledBox = styled(Box)({
  maxWidth:"527px",
  border: `1px solid ${theme.palette.gray[100]}`,
  radius: '0.25rem',
  backgroundColor:`${theme.palette.gray.white}`,
})

const StyledStackDivider = styled(Divider)({
  marginTop: '10px',
  bsckgroundColor: `${theme.palette.gray[100]}`,
})

const StyledTimelineDot = styled(TimelineDot)({
  backgroundColor: `${theme.palette.gray[50]}`,
})

const StyledTimelineDivider = styled(Divider)({
  height: '2rem',
  borderLeft: `1px dashed ${theme.palette.gray[300]}`,
})

const StyledDivider = styled(Divider)({
  width: 'auto',
  height: '1px',
  flexGrow: 1,
  borderBottom: `1px dashed ${theme.palette.gray[300]}`,
})

const BuyNowButton = styled(CustomButton)({
  width: 'auto',
  height: '2.625rem',
  borderRadius: '0.25rem',
  backgroundColor: `${theme.palette.primary[500]}`,
})

const SellNowButton = styled(CustomButton)({
  width: 'auto',
  height: '2.625rem',
  borderRadius: '0.25rem',
  backgroundColor: `${theme.palette.semantic.warning[300]}`,
  '&:focus' :{
    backgroundColor: `${theme.palette.semantic.warning[300]}`,

  }
})

const OrderSummary = ({
  OrderType,
  OrderValue,
  CoinValue,
  PaymentMethodIcon,
  PaymentMethod,
  PaymentMethodType,
  DeliveryFee,
  DepositTypeIcon,
  DepositTo,
  CoinOrderValue,
  CostOrderValue,
  TransactionFee,
  Total,
  ButtonChildren,
  onClick,
}: OrderSummaryProps) => {
  return (
    <StyledBox>
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        padding="24px 24px 8px 24px"
      >
        <Typography variant="c1" color={theme.palette.text.medemp}>
          {OrderType}
        </Typography>
        <Typography variant="h6" color={theme.palette.text.highemp}>
          {OrderValue}
        </Typography>
        <Typography variant="c1" color={theme.palette.text.medemp}>
          {CoinValue}
        </Typography>
      </Stack>
      <StyledStackDivider />
      <Stack marginLeft="-80%">
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <StyledTimelineDot>
                <Icon src={PaymentMethodIcon} />
              </StyledTimelineDot>
              <StyledTimelineDivider />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="c2" color={theme.palette.text.medemp}>
                {PaymentMethod}
              </Typography>
              <br />
              <Typography variant="b1" color={theme.palette.text.highemp}>
                {PaymentMethodType}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <StyledTimelineDot>
                <Icon src={Truck} />
              </StyledTimelineDot>
              <StyledTimelineDivider />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="c2" color={theme.palette.text.medemp}>
                {OrderSummaryConstants.DeliveryFee}
              </Typography>
              <br />
              <Typography variant="b1" color={theme.palette.text.highemp}>
                {DeliveryFee}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <StyledTimelineDot>
                <Icon src={DepositTypeIcon} />
              </StyledTimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="c2" color={theme.palette.text.medemp}>
                {OrderSummaryConstants.DepositTo}
              </Typography>
              <br />
              <Typography variant="b1" color={theme.palette.text.highemp}>
                {DepositTo}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Stack>
      <StyledStackDivider />
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        padding="1.5rem"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="overline"
            color={`${theme.palette.text.highemp}`}
          >
            {CoinOrderValue}
          </Typography>
          <StyledDivider />
          <Typography
            variant="overline"
            color={`${theme.palette.text.highemp}`}
          >
            {CostOrderValue}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography
            variant="overline"
            color={`${theme.palette.text.highemp}`}
            textTransform="none"
          >
            {OrderSummaryConstants.TransactionFee}
          </Typography>
          <StyledDivider />
          <Typography
            variant="overline"
            color={`${theme.palette.text.highemp}`}
          >
            {TransactionFee}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography variant="b1" color={`${theme.palette.text.highemp}`}>
            {OrderSummaryConstants.Total}
          </Typography>
          <StyledDivider />
          <Typography variant="b1" color={`${theme.palette.text.highemp}`}>
            {Total}
          </Typography>
        </Stack>
        
        {ButtonChildren === 'BUY NOW' && (
        <BuyNowButton variant="contained" typoVariant="button" children={ButtonChildren} onClick={onClick}/>
        )}
        {ButtonChildren === 'SELL NOW' && (
          <SellNowButton variant="contained" typoVariant="button" children={ButtonChildren} onClick={onClick}/>
        )}
      </Stack>
    </StyledBox>
  )
}

export default OrderSummary
