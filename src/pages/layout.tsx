import type { ReactNode } from "react";
import { Squares } from "../components/shared/squares-background";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Squares
        className="fixed inset-0 z-[-1]"
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#333"
        hoverFillColor="#222"
      />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
