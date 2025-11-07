import Image from 'next/image';

const Footer = () => {
  return (
    <footer id="main-footer">
      <div id="footer-content">
        <div id="footer-logo-group">
          <Image src="/assets/logo.png" alt="IndieLabs Logo" width={120} height={40} />
          <p>| Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
