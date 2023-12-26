import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from '@/components/ModeToggle/modeToggle'
import { ClerkProvider } from "@clerk/nextjs"
import { UserButton } from '@clerk/nextjs'
import { api } from "../utils/api";
import { type AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return(
    <ClerkProvider {...pageProps}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex flex-row justify-end fixed p-4 right-0 w-1/4">
          <div className='px-4 py-1'><UserButton  afterSignOutUrl='/' /></div>
          <ModeToggle />
          </div>
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp);

