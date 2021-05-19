import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Member({ dados }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }
  return (
  <>
            <Link href='/'>
            <a><h1>Home</h1></a>
          </Link>
      {dados.map((arg) => (
        <div key={arg.ID}>
          <h2>
            {arg.ID}-{arg.nome}
          </h2>
          <img src={arg.imagem} width="50" />
        </div>
      ))}
    </>
  )}

export const getStaticPaths: GetStaticPaths = async () => {
  /*const response = await fetch(`http://localhost:3001`);
  const data = await response.json();
  const paths = data.map(member => {
    return { params: { login: member.ID.slice(0,5) } }
  });*/

  return {
    paths: [ { params: { login: '1' } }, { params: { login: '2' } } ],
    fallback: true, 
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { login } = context.params;

  const response = await fetch(`http://localhost:3001/user/${login}`);
  const data = await response.json();
  
  return {
    props: {
      dados: data,
    },
    revalidate: 10,
  }
}