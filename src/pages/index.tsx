import { GetStaticProps } from "next";
import Link from 'next/link'

export default function Home({dados}) {
  return (
    <>
    {dados.map((arg) => (
      <div key={arg.ID}>
        <h2>
          {arg.ID}-{arg.nome}
        </h2>
        <img src={arg.imagem} width="50" />
        <Link href='/members/[login]' as={`/members/${arg.ID}`}>
            <a>{arg.nome}</a>
          </Link>
      </div>
    ))}
  </>
  )}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3001');
  const data = await response.json();

  return {
    props: {
      dados: data,
    },
    revalidate: 10
  }
};