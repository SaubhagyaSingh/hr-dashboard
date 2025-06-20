import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import { EmployeeProvider } from "@/context/EmployeeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <EmployeeProvider>
        <ClientProviders>{children}</ClientProviders>
        </EmployeeProvider>
      </body>
    </html>
  );
}
