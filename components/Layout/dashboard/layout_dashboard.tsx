import { Button, Card, CardActions, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { getOrganizerByUser } from "../../../services/api.org";
import { OrganizerDTO, OrganizerView, UserOrganizations } from "../../../src/dto/organization.dto";

const LayoutDashboard = () => {

  const [organizers, setOrganizers] = useState<UserOrganizations[]>([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    //getOrganizers();
  }, []);

  async function getOrganizers() {
    await getOrganizerByUser(ctx.user).then(res => {
      console.log(res);
      // setOrganizers(res.data);
    });
    // await getOrganizerByUser(ctx.user).then(res => {
    //   setOrganizers(res.data);
    //   console.log(res.data);
    // });
  }

  const OrganizationsList = () => {
    return (
      <List sx={{
        maxHeight: '500px',
        overflow: 'auto',
      }}>
        {/* {organizers.map(org => {
          return (
            <ListItem key={org.id}>
              <ListItemText primary={`${org.organization?.name} ${org.role === 1 ? ' (Owner)' : ''}`} secondary={`${org.organization?.organizers?.length} organizers`} />
            </ListItem>
          )
        })} */}
      </List >
    )
  }

  return (
    <div>dashboard</div>
  )

}
export default LayoutDashboard;