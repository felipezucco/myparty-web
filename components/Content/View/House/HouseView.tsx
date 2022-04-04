import { DialogTitle } from "@material-ui/core";
import { Close, Edit } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { HouseType } from "../../../../models/LocalType"
import { getHouseById } from "../../../../services/api.house";

interface Props {
  show: boolean,
  handleShowDialog: (show: boolean) => void,
  houseId: number | undefined,
}

const HouseView: FC<Props> = ({ houseId, handleShowDialog, show }) => {

  const [house, setHouse] = useState<HouseType>();

  useEffect(() => {
    if (show) // need to verify because it'll call this function again on close dialog
      loadHouse();
  }, []);

  const loadHouse = () => {
    getHouseById([houseId as number])
      .then(res => {
        let house: HouseType = res.data[0];
        setHouse(house);
      })
      .catch((err: AxiosError) => console.log(err))
  }

  return (
    <Dialog open={show}>
      <DialogTitle>
        {house?.name}
        <IconButton >
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleShowDialog(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>{house?.id}</div>
        <div>{house?.name}</div>
        <ul>
          {house?.zones?.map(zone => {
            return <li key={zone.id}>{zone.name} : ({zone.size} m²)</li>
          })}
        </ul>
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  )
}
export default HouseView;