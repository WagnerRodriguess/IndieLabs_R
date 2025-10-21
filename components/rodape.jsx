import React from "react";

function Footer() {
  return (
    <footer className="bg-purple-950 text-white text-center py-4 text-sm border-t border-purple-800">
      <p>Copyright © 2023 Indie Labs | Todos os direitos reservados</p>
      <div className="flex justify-center gap-4 mt-2 text-purple-400">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>
      </div>
    </footer>
  );
}

export default Footer;
