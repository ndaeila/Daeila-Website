import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import Article3Panel from '@/components/Article/Article';

// const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <Layout>
      <Article3Panel>
        <h1>Lets see. What could be causing issues?</h1>
        <h2>Lets see. What could be causing issues?</h2>
        <h3>Lets see. What could be causing issues?</h3>
        <p></p>
        <p></p>
        <p></p>
        <p>
          
          I'm not sure. I think it's because I'm using a different font. I'm
          using Inter instead of Encode Sans. I'm not sure why that would cause
          issues. I'm using the same font in the header and footer. I'm not
          sure why it would cause issues in the article component.
          
        </p>
      </Article3Panel>
    </Layout>
  );
};

export default Home;
