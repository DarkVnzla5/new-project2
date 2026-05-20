import axios from "axios"
import { useQuery } from "@tanstack/react-query"

// Definimos la interfaz de lo que devuelve la API
interface DolarResponse {
  promedio: number
}

export function useDolar() {
  return useQuery({
    queryKey: ["dolar-oficial"],
    queryFn: async () => {
      const { data } = await axios.get<DolarResponse>(
        "https://ve.dolarapi.com/v1/dolares/oficial",
      )
      return data.promedio
    },
    // El dólar no cambia cada segundo,
    // staleTime de 1 hora para ahorrar peticiones.
    staleTime: 1000 * 60 * 60,
  })
}
