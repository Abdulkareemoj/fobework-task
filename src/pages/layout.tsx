import Header from "~/components/shared/Header";
import Footer from "~/components/shared/Footer";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="flex-grow mx-auto px-4 py-2 md:px-8 lg:px-16">
        <div className="bg-background shadow-sm rounded-lg p-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
