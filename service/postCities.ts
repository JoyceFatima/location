import api from '@/config/api'

// Função para buscar as cidades de um estado
export const PostCities = async (
  country: string,
  state: string,
): Promise<string[]> => {
  try {
    const response = await api.post(
      'https://countriesnow.space/api/v0.1/countries/state/cities',
      {
        country,
        state,
      },
    )
    return response.data.data
  } catch (error) {
    console.error('Erro ao buscar cidades:', error)
    return []
  }
}
