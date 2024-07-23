'use client'

import { LocationModal } from '@/components/Modal/LocationModal'
import { LocationSelector } from '@/components/Select/LocationSelector'
import { useState } from 'react'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [locationData, setLocationData] = useState({
    country: '',
    state: '',
    city: '',
  })

  const handleOpenModal = (data: {
    country: string
    state: string
    city: string
  }) => {
    setLocationData(data)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl text-gray-950 font-semibold">
        Selecione a sua localização:{' '}
      </h1>
      <LocationSelector onSubmit={handleOpenModal} />
      <LocationModal
        open={modalOpen}
        handleClose={handleCloseModal}
        locationData={locationData}
      />
    </main>
  )
}
