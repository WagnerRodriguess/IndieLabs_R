import Image from 'next/image';

const socialLinks = [
  { href: '#', src: '/assets/botao_face.png', alt: 'Facebook' },
  { href: '#', src: '/assets/botao_twitter.png', alt: 'Twitter' },
  { href: '#', src: '/assets/botao_insta.png', alt: 'Instagram' },
  { href: '#', src: '/assets/botao_linkedin.png', alt: 'LinkedIn' },
  { href: '#', src: '/assets/botao_youtube.png', alt: 'YouTube' },
];

const Footer = () => {
  return (
    <footer id="main-footer">
      <div id="footer-content">
        <div id="footer-logo-group">
          <Image src="/assets/logo.png" alt="IndieLabs Logo" width={120} height={40} />
          <p>| Todos os direitos reservados</p>
        </div>
        <div id="footer-social-group">
          {socialLinks.map((link) => (
            <Image key={link.src} src={link.src} alt={link.alt} width={24} height={24} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
