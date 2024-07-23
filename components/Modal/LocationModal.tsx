import { Modal, Box, Typography, Button } from '@mui/material'

interface LocationModalProps {
  open: boolean
  handleClose: () => void
  locationData: {
    country: string
    state: string
    city: string
  }
}

export const LocationModal = ({
  open,
  handleClose,
  locationData,
}: LocationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center"
    >
      <Box className="bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6 w-96">
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          className="text-2xl font-bold text-gray-700 mb-4"
        >
          Detalhes da Localização
        </Typography>
        <Typography
          id="modal-description"
          className="text-lg text-gray-600 mb-2"
        >
          <span className="font-semibold">País:</span> {locationData.country}
        </Typography>
        <Typography
          id="modal-description"
          className="text-lg text-gray-600 mb-2"
        >
          <span className="font-semibold">Estado:</span> {locationData.state}
        </Typography>
        <Typography
          id="modal-description"
          className="text-lg text-gray-600 mb-4"
        >
          <span className="font-semibold">Cidade:</span> {locationData.city}
        </Typography>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          className="w-full"
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  )
}
