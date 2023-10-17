import { Button, Text, TextArea, TextInput } from '@donecode-ignite-ui/react'
import { ConfirmForm, FormHeader, FormActions, FormError } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa no minimo 3 caracteres.' }),
  email: z.string().email({ message: 'Digite um e-mail valido.' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  redirectPageToCalendar: () => void
}

export function ConfirmStep({
  schedulingDate,
  redirectPageToCalendar,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    try {
      const { name, email, observations } = data

      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      })

      redirectPageToCalendar()
    } catch (err) {
      console.log(err)
    }
  }

  const dateWithDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {dateWithDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          css={{ fontWeight: '$bold' }}
          onClick={redirectPageToCalendar}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          css={{ fontWeight: '$bold' }}
        >
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
