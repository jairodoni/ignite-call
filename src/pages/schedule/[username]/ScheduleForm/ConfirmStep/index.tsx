import { Button, Text, TextArea, TextInput } from '@donecode-ignite-ui/react'
import { ConfirmForm, FormHeader, FormActions } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export function ConfirmStep() {
  function handleConfirmScheduling() {
    console.log('submit')
  }

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          20 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" />
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="johndoe@example.com" />
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="secondary" css={{ fontWeight: '$bold' }}>
          Cancelar
        </Button>
        <Button type="submit" css={{ fontWeight: '$bold' }}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
