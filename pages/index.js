import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import GitHub from 'components/Icons/Github'
import Logo from 'components/Icons/Logo'

import { colors } from 'styles/theme'

import { loginWithGithub } from 'firebase/client'
import useUser, { USER_STATES } from 'hooks/useUser'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGithub().catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <Head>
        <title>Devter 🐦</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width="100" fill={colors.primary} />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 👨‍💻👩‍💻
          </h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill="white" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-items: center;
          place-content: center;
        }

        h1 {
          color: ${colors.primary};
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
