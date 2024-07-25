'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Button, Typography } from '@mui/material'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { LocationSelect } from '@/components/Select/LocationSelector'
import { PostCities } from '@/service/postCities'
import { GetCountries } from '@/service/getContries'
import { LocationModal } from '@/components/Modal/LocationModal'

interface State {
  name: string
  state_code: string
}

interface Country {
  name: string
  iso3: string
  states: State[]
}

interface FormValuesLocationSelector {
  country: string
  state: string
  city: string
}

interface LocationDetail {
  label: string
  value: string
}

export default function Home() {
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<FormValuesLocationSelector>()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [locationData, setLocationData] = useState<LocationDetail[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false)
  const [loadingStates, setLoadingStates] = useState<boolean>(false)
  const [loadingCities, setLoadingCities] = useState<boolean>(false)

  const selectedCountry = watch('country')
  const selectedState = watch('state')

  useEffect(() => {
    const loadCountries = async () => {
      setLoadingCountries(true)
      try {
        const countriesData = await GetCountries()
        if (countriesData.length === 0) {
          enqueueSnackbar('Nenhum país encontrado', { variant: 'warning' })
        }
        setCountries(countriesData)
      } catch (error) {
        enqueueSnackbar('Erro ao carregar os países', { variant: 'error' })
      } finally {
        setLoadingCountries(false)
      }
    }

    loadCountries()
  }, [enqueueSnackbar])

  useEffect(() => {
    if (selectedCountry) {
      setLoadingStates(true)
      const selectedCountryData = countries.find(
        (c) => c.name === selectedCountry,
      )
      if (!selectedCountryData || selectedCountryData.states.length === 0) {
        enqueueSnackbar('Nenhum estado encontrado para o país selecionado', {
          variant: 'warning',
        })
      }
      setStates(selectedCountryData ? selectedCountryData.states : [])
      setCities([])
      setValue('state', '')
      setValue('city', '')
      setLoadingStates(false)
    }
  }, [selectedCountry, countries, setValue, enqueueSnackbar])

  useEffect(() => {
    if (selectedState && selectedCountry) {
      setLoadingCities(true)
      const selectedStateData = states.find(
        (s) => s.state_code === selectedState,
      )
      if (selectedStateData) {
        PostCities(selectedCountry, selectedStateData.name)
          .then((citiesData) => {
            if (citiesData.length === 0) {
              enqueueSnackbar(
                'Nenhuma cidade encontrada para o estado selecionado',
                {
                  variant: 'warning',
                },
              )
            }
            setCities(citiesData)
          })
          .catch(() => {
            enqueueSnackbar('Erro ao carregar as cidades', { variant: 'error' })
          })
          .finally(() => {
            setLoadingCities(false)
          })
      } else {
        enqueueSnackbar('Nenhum estado encontrado com o código fornecido', {
          variant: 'error',
        })
        setLoadingCities(false)
      }
      setValue('city', '')
    }
  }, [selectedState, selectedCountry, states, setValue, enqueueSnackbar])

  const handleFormSubmit = (data: FormValuesLocationSelector) => {
    const transformLocationData = [
      { label: 'País', value: data.country },
      { label: 'Estado', value: data.state },
      { label: 'Cidade', value: data.city },
    ]
    setLocationData(transformLocationData)
    setIsModalOpen(true)
    reset()
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <Container maxWidth="lg">
        <main className="flex flex-col items-center justify-center min-h-screen p-6">
          <Typography
            variant="h4"
            component="h1"
            className="text-gray-900 mb-6 font-semibold"
          >
            Selecione a sua localização:
          </Typography>
          <Box
            className="w-full max-w-xl p-8 rounded-lg shadow-lg bg-zinc-100"
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <LocationSelect
              name="country"
              control={control}
              label="País"
              options={countries.map((country) => ({
                value: country.name,
                label: country.name,
              }))}
              loading={loadingCountries}
            />
            <LocationSelect
              name="state"
              control={control}
              label="Estado"
              options={states.map((state) => ({
                value: state.state_code,
                label: state.name,
              }))}
              loading={loadingStates}
              disabled={!selectedCountry}
            />
            <LocationSelect
              name="city"
              control={control}
              label="Cidade"
              options={cities.map((city) => ({
                value: city,
                label: city,
              }))}
              loading={loadingCities}
              disabled={!selectedState}
            />
            <Box className="mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!watch('city')}
              >
                Enviar
              </Button>
            </Box>
          </Box>
          <LocationModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            title="Detalhes da Localização"
            details={locationData}
          />
        </main>
      </Container>
    </SnackbarProvider>
  )
}
