import Header from './delete/Header';
import Footer from './delete/Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}