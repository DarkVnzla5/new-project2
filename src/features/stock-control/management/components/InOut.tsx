import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

export default function InOut() {
  const form = useForm({
    defaultValues: {
      // Define your form defaults here
    },
    onSubmit: async ({ value }) => {
      // Handle form submission here
    },
  })

  return <section></section>
}
