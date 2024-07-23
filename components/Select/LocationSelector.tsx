// /src/components/LocationSelector.tsx

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, Container, Box, Button } from '@mui/material';
import data from '../../public/data.json';

interface FormValuesLocationSelector {
  country: string;
  state: string;
  city: string;
}

interface Country {
  name: string;
  iso2: string;
  states: State[];
}

interface State {
  name: string;
  iso2: string;
  cities: string[];
}

interface LocationSelectorProps {
  onSubmit: (data: FormValuesLocationSelector) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onSubmit }) => {
  const { control, handleSubmit, watch, setValue, reset } = useForm<FormValuesLocationSelector>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const selectedCountry = watch('country');
  const selectedState = watch('state');

  useEffect(() => {
    setCountries(data.countries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = countries.find(c => c.iso2 === selectedCountry);
      setStates(selectedCountryData ? selectedCountryData.states : []);
      setCities([]);
      setValue('state', '');
      setValue('city', '');
    }
  }, [selectedCountry, countries, setValue]);

  useEffect(() => {
    if (selectedState) {
      const selectedStateData = states.find(s => s.iso2 === selectedState);
      setCities(selectedStateData ? selectedStateData.cities : []);
      setValue('city', '');
    }
  }, [selectedState, states, setValue]);

  const handleFormSubmit = (data: FormValuesLocationSelector) => {
    onSubmit(data);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }} component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Pais</InputLabel>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="country-label"
                label="Country"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 225,
                    },
                  },
                }}
              >
                {countries.map(country => (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedCountry}>
          <InputLabel id="state-label">Estado</InputLabel>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="state-label"
                label="State"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 225,
                    },
                  },
                }}
              >
                {states.map(state => (
                  <MenuItem key={state.iso2} value={state.iso2}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedState}>
          <InputLabel id="city-label">Cidade</InputLabel>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="city-label"
                label="City"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 225,
                    },
                  },
                }}
              >
                {cities.map(city => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
