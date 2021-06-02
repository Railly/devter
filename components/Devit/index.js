import Avatar from 'components/Avatar'

export default function Devit ({ avatar, userName, content, createdAt, id }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }

        p {
          margin: 0;
        }

        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
