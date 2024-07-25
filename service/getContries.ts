import api from '@/config/api'

interface State {
  name: string
  state_code: string
}

interface Country {
  name: string
  iso3: string
  states: State[]
}

// Função para buscar os dados dos países e estados
export const GetCountries = async (): Promise<Country[]> => {
  try {
    const response = await api.get(
      'https://countriesnow.space/api/v0.1/countries/states',
    )
    const data = response.data.data

    return data.map((country: Country) => ({
      name: country.name,
      iso3: country.iso3,
      states: country.states.map((state: State) => ({
        name: state.name,
        state_code: state.state_code,
      })),
    }))
  } catch (error) {
    console.error('Erro ao buscar dados dos países:', error)
    return []
  }
}
