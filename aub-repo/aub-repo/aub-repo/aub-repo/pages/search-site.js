import MenuNav from '../components/legacy/menunav';
import Search from '../components/legacy/Search';
import Steps from '../components/legacy/steps';
import Instagram from '../components/legacy/instagram';
import FooterNav from '../components/legacy/footernav';

export default function SearchPage() {
  return (
    <>
      <MenuNav />
      <Search />
      <Steps />
      <Instagram />
      <FooterNav />
    </>
  );
}


// Replace getServerSideProps with getStaticProps
export const getStaticProps = async () => {
  return {
    props: {}
  };
};
