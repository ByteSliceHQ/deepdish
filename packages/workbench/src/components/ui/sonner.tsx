import { useShadowRoot } from '@/lib/context'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { createPortal } from 'react-dom'

function Toaster(props: ToasterProps) {
  const { theme = 'system' } = useTheme()
  const shadowRoot = useShadowRoot()

  const sonnerContent = (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
        },
      }}
      {...props}
    />
  )

  const portal = createPortal(sonnerContent, shadowRoot || document.body)

  // NB: Sonner has poor support for the Shadow DOM, so this hack is needed:
  // https://github.com/emilkowalski/sonner/issues/361
  if (shadowRoot) {
    const sonnerStyle = document.head
      .querySelectorAll('style')
      .values()
      .find((style) => style.textContent?.includes('[data-sonner-toaster]'))

    if (sonnerStyle) {
      shadowRoot.append(sonnerStyle)
    }
  }

  return portal
}

export { Toaster }
