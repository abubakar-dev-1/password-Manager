import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-400 group-[.toaster]:text-white group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-slate-400 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-slate-800",
          description: "group-[.toast]:text-white dark:group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-slate-900 group-[.toast]:text-white dark:group-[.toast]:bg-white dark:group-[.toast]:text-slate-900",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500 dark:group-[.toast]:bg-slate-800 dark:group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
