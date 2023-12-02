import { Box, Stack, Typography, styled } from '@mui/material';
import theme from '../../../utils/themes';

export interface TotalBalanceProps {
  title?: string;
  heading?: string;
  amount?: number | string;
  src: string | undefined;
}

const TotalBalanceWrapper = styled(Box)({
  width: '63vw',
  height: '11.8vh',
  minWidth: '710px',
  minHeight: '166px',
  padding: '1.6%',
  border: `0.0625rem solid #E8E8F7`,
  borderRadius: '0.25rem',
  boxSizing: 'border-box',
  flexGrow: '1',
  backgroundColor: `${theme.palette.gray.white}`,
});

const InnerBox = styled(Box)({
  width: '100%',
  height: '48%',
  minWidth: '662px',
  minHeight: '80px',
  padding: '2.2%',
  border: `0.0625rem solid #E8E8F7`,
  borderRadius: '0.25rem',
  boxSizing: 'border-box',
  marginTop: '16px',
});

const IconWrapper = styled(Stack)({
  flexDirection: 'row',
  gap:12,
  alignItems: 'center',
});

const IconImage = styled('img')({
  height: '32px',
  width: '32px',
});

const AmountText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

export const TotalBalance: React.FC<TotalBalanceProps> = ({
  title,
  heading,
  amount,
  src,
}) => {
  return (
    <TotalBalanceWrapper>
      <Typography variant="b1" color={theme.palette.text.highemp}>
        {title}
      </Typography>
      <InnerBox>
        <Stack direction="row" justifyContent="space-between">
          <IconWrapper>
            <IconImage src={src} alt="Icon" />
            <Stack direction="column">
              <Typography variant="c1" color={theme.palette.text.highemp}>
                {heading}
              </Typography>
            </Stack>
          </IconWrapper>
          <AmountText variant="subtitle1" color={theme.palette.text.highemp}>
            {amount}
          </AmountText>
        </Stack>
      </InnerBox>
    </TotalBalanceWrapper>
  );
};