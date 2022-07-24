import Backdrop from '@mui/material/Backdrop';
import { FC } from "react";
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  loading: boolean
}

const LoadingState: FC<Props> = ({ loading }) => {

  return (
    <Backdrop open={loading}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress />
    </Backdrop>
  )
}
export default LoadingState;