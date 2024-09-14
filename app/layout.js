import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import Providers from "./_components/providers/providers";
import Footer from "./_components/Footer/Footer";
// const inter = Inter({ subsets: ["latin"] });
const noto_serif = Noto_Serif({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
export const metadata = {
  title: "Euphoria",
  description: "For brand's clothes",
}
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${noto_serif.className} `}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
