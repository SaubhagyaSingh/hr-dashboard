import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import { EmployeeProvider } from "@/context/EmployeeContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
    <ThemeProvider>
        <EmployeeProvider>
        <ClientProviders>{children}</ClientProviders>
        </EmployeeProvider>
    </ThemeProvider>
      </body>
    </html>
  );
}
