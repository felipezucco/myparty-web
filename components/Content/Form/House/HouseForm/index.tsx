import { FC, useState } from 'react';
import Head from 'next/head';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Alert, Dialog, IconButton, MobileStepper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Snackbar } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styles from './HouseForm.module.css';
import Close from '@mui/icons-material/Close';
import { DialogInterface } from '../../../../../src/interface/DialogInterface';
import { Zone } from '../../../../../models/Zone.type';
import { persistHouse } from '../../../../../services/api.house';
import AddressForm from './AddressForm/AddressForm';
import NameForm from './NameForm/NameForm';
import ZonesForm from './ZonesForm/ZonesForm';
import { HouseType } from '../../../../../models/LocalType';

interface Props extends DialogInterface { }

const HouseForm: FC<Props> = ({ onClose, setStatus, status }) => {

  const { register, handleSubmit, setValue } = useForm<HouseType | { zones: Zone[] }>();
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmitForm = (data: any) => {
    console.log(data)
    // let UF = UFList.find(uf => uf.id === UFSelected);
    // let city = CitiesList.find(city => city.id === CitySelected);
    if (activeStep < 3) {
      handleNext();
      return;
    }

    let newHouse: HouseType = data;
    console.log('newHouse', newHouse);

    setSending(true);
    return persistHouse(newHouse)
      .then(() => {
        setShowToastMessage(true);
        setSending(false);
        onClose();
        setStatus(false);
      })
      .catch(err => console.error(err))
      .finally(() => setSending(false))
  }

  function ToastMessage() {
    return (
      <Snackbar open={showToastMessage} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Local cadastrado com sucesso!
        </Alert>
      </Snackbar>
    )
  }

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function Steps() {
    return (
      <MobileStepper
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={
          activeStep === 2 ?
            <LoadingButton
              type="submit"
              loading={sending}
              variant={"contained"}
              disableElevation>
              Salvar
            </LoadingButton>
            :
            <Button type='submit' size="large" disabled={activeStep === 2}>
              <KeyboardArrowRight fontSize='large' />
            </Button>
        }
        backButton={
          < Button size="large" onClick={handleBack} disabled={activeStep === 0
          }>
            <KeyboardArrowLeft fontSize='large' />
          </Button >
        }
      />
    )
  }

  function DialogHeader() {
    return (
      <>
        <IconButton onClick={() => {
          setStatus(false)
        }}>
          <Close />
        </IconButton>
      </>
    )
  }

  return (
    <Dialog open={status} fullWidth>
      <Head>
        <title>Tendel FC Web | Locais</title>
      </Head>
      <ToastMessage />
      <DialogTitle dir='rtl'>
        <DialogHeader />
      </DialogTitle>
      <DialogContent className={styles.dialog_container_effects} style={{ height: '500px', width: '100%' }}>
        <Grid container xs={12} display={activeStep === 0 ? 'block' : 'none'}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid item xs={12}>
              <NameForm register={register} />
            </Grid>
            <DialogActions>
              <Steps />
            </DialogActions>
          </form>
        </Grid>
        <Grid container display={activeStep === 1 ? 'block' : 'none'}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid item xs={12}>
              <AddressForm register={register} />
            </Grid>
            <DialogActions>
              <Steps />
            </DialogActions>
          </form>
        </Grid>
        <Grid container display={activeStep === 2 ? 'block' : 'none'}>
          <form onSubmit={handleSubmit(handleSubmitForm)} >
            <Grid item xs={12} >
              <ZonesForm setValues={setValue} />
            </Grid>
            <DialogActions>
              <Steps />
            </DialogActions>
          </form>
        </Grid>
        <Grid container display={activeStep === 3 ? 'block' : 'none'}>
          <form onSubmit={handleSubmit(handleSubmitForm)} >
            <Grid item xs={12} >
              enviado
            </Grid>
            <DialogActions>
              <Steps />
            </DialogActions>
          </form>

        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default HouseForm;