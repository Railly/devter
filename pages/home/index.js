import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { useEffect, useState } from 'react'
import useUser from 'hooks/useUser'
import { fetchLatestDevits } from 'firebase/client'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                avatar={devit.avatar}
                createdAt={devit.createdAt}
                id={devit.id}
                key={devit.id}
                content={devit.content}
                userName={devit.userName}
                userId={devit.userId}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          backdrop-filter: blur(5px);
          background: #ffffffaa;
          border-bottom: 1px solid #ccc;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
