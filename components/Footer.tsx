import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { href: '#', src: '/assets/botao_face.png', alt: 'Facebook' },
  { href: '#', src: '/assets/botao_twitter.png', alt: 'Twitter' },
  { href: '#', src: '/assets/botao_insta.png', alt: 'Instagram' },
  { href: '#', src: '/assets/botao_linkedin.png', alt: 'LinkedIn' },
  { href: '#', src: '/assets/botao_youtube.png', alt: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 mt-20 py-8 ">
      <div className="max-w-[1106px] mx-auto flex justify-between items-center h-[100px]">
        <div className="flex items-center gap-4">
          <Image src="/assets/logo.png" alt="IndieLabs Logo" width={120} height={40} />
          <p className="text-sm text-gray-400">
          | Todos os direitos reservados
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} className="hover:opacity-80">
              <Image src={link.src} alt={link.alt} width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;