import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";



const Layout = ({ children }) => {
  return (
    <div className="bg-game-back container-game">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
