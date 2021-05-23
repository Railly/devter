import AppLayout from 'components/AppLayout'

export default function HomePage () {
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section></section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          border-bottom: 1px solid #ccc;
          height: 49px;
          position: fixed;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
        }

        section {
          padding-top: 100px;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </>
  )
}
