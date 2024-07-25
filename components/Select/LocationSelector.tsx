'use client'

import { Controller, Control } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material'

interface FormValuesLocationSelector {
  country: string
  state: string
  city: string
}

interface LocationSelectProps {
  name: 'country' | 'state' | 'city'
  control: Control<FormValuesLocationSelector>
  label: string
  options: { value: string; label: string }[]
  loading: boolean
  disabled?: boolean
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  name,
  control,
  label,
  options,
  loading,
  disabled = false,
}) => (
  <FormControl fullWidth margin="normal" disabled={disabled}>
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Select
          {...field}
          labelId={`${name}-label`}
          label={label}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 225,
              },
            },
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </Select>
      )}
    />
  </FormControl>
)
