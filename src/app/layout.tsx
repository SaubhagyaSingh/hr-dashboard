  import "./globals.css";
  import { ClientProviders } from "@/components/ClientProviders";
  import { EmployeeProvider } from "@/context/EmployeeContext";
  import { ThemeProvider } from "next-themes";

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const theme = localStorage.getItem('theme');
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    }
                  } catch (_) {}
                })();
              `,
            }}
          />
        </head>
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
