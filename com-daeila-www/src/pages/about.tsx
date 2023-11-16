import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '../components/Layout';

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <Layout>
      <h1>IDK I&apos;M A STUDENT OR SOMETHING</h1>
      <h2>Please hire me</h2>
    </Layout>
  );
}

export default Home;
