import "./globals.css";
import EcommerceProvider from "../context/Contex";
import ClientLayout from "./componentes/ClientLayout"; // 👈 nuevo componente

export const metadata = {
  title: "MundoShop",
  description: "Productos en tus manos",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <EcommerceProvider>
          <ClientLayout>{children}</ClientLayout>
        </EcommerceProvider>
      </body>
    </html>
  );
}
