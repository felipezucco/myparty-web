import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { FC } from "react";
import { HouseType } from "../../../../models/LocalType";

interface Props {
  house: HouseType,
  handleDeleteHouse: (id: number) => void,
  handleSelectHouse: (id: number) => void,
  handleShowHouse: (show: boolean) => void
}

const HouseCard: FC<Props> = ({ house, handleDeleteHouse, handleSelectHouse, handleShowHouse }) => {

  return (
    <Card sx={{ maxWidth: 345, minWidth: 200 }}>
      <CardMedia
        component="img"
        height="140"
        image="/favicon.ico"
        alt={house.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {house.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {house.local?.city} - {house.local?.state} <br />
          {house.local?.block}, {house.local?.aisle} <br />
          {house.local?.number}, {house.local?.complement}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {
          handleSelectHouse(house?.id);
          handleShowHouse(true);
        }}>Visualizar</Button>
        <Button size="small" onClick={() => handleDeleteHouse(house?.id)}>Remover</Button>
      </CardActions>
    </Card >
  )

}

export default HouseCard;