import { Delete, Edit } from "@mui/icons-material";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { Zone } from "../../../../../models/Zone.type";

interface Props {
  zone: Zone,
  removeZone: (id: number | undefined) => void,
}

const ZoneCard: FC<Props> = ({ zone, removeZone }) => {

  return (
    <ListItem disablePadding
      secondaryAction={
        <IconButton onClick={() => removeZone(zone.id)}>
          <Delete />
        </IconButton>
      }>
      <ListItemText
        primary={zone.name}
        secondary={zone.size}
      />
    </ListItem>
  )

}

export default ZoneCard;