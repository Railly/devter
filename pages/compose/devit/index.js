import { useState } from 'react'
import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'

import { addDevit } from 'firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeDevit () {
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState('')
  const user = useUser()
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const buttonIsDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="¿Qué está pasando"
            value={message}
          ></textarea>
          <div>
            <Button disabled={buttonIsDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
