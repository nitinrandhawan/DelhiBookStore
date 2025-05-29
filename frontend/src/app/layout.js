import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReduxProvider from "./redux/ReduxProvider";

export const metadata = {
  title: "DELHI BOOK STORE",
  description: "Create by Vishnu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Toaster position="top-center" reverseOrder={false} />

          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
