import { Button, Heading, MultiStep, Text } from '@donecode-ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnecItem, AuthError } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Register() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnecItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled css={{ fontWeight: '$bold' }}>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              css={{ fontWeight: '$bold' }}
              onClick={handleConnectCalendar}
            >
              Conectar
            </Button>
          )}
        </ConnecItem>

        {hasAuthError && (
          <AuthError>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button
          type="submit"
          css={{ fontWeight: '$bold' }}
          disabled={!isSignedIn}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
