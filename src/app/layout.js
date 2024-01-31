import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700"] });
const poppins = Poppins ({ subsets: ['latin'],   weight: ["400", "500", "600", "700", "800", "900"],
})

import { ThemeProvider } from "./_components/ThemeProvider";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning  lang="en">
      <body className={roboto.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <ToastContainer />
      {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
