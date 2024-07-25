'use client'

import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { motion } from 'framer-motion'

interface LocationDetail {
  label: string
  value: string
}

interface LocationModalProps {
  open: boolean
  handleClose: () => void
  title: string
  details: LocationDetail[]
}

export const LocationModal = ({
  open,
  handleClose,
  title,
  details,
}: LocationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center h-full w-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6 w-full max-w-2xl"
      >
        <Box className="relative">
          <div className="flex justify-between items-center">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              className="text-2xl font-bold text-gray-700 mb-4"
            >
              {title}
            </Typography>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          {details.map((detail, index) => (
            <Typography
              key={index}
              id="modal-description"
              className="text-lg text-gray-600 mb-2"
            >
              <span className="font-semibold">{detail.label}:</span>{' '}
              {detail.value}
            </Typography>
          ))}
        </Box>
      </motion.div>
    </Modal>
  )
}
