import { Divider, Typography } from "@mui/material"

const InfoBox = ({ title, desc }: InfoPropTypes) => (
  <>
    <Typography sx={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0' }}>
      <span>{title}</span>
      <span>{desc}</span>
    </Typography>
    <Divider />
  </>
)

export default InfoBox