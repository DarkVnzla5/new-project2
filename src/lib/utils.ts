import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Definimos la interfaz de lo que devuelve la API
interface DolarResponse {
  promedio: number
  // añade otros campos si los necesitas
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
    // Consejito: el dólar no cambia cada segundo,
    // puedes poner un staleTime de 1 hora para ahorrar peticiones.
    staleTime: 1000 * 60 * 60,
  })
}
