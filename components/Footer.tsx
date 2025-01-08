import useTranslations from '@/hooks/useTranslations'

export default function Footer() {
  const { t }: { t: any } =  useTranslations()

  return (
    <footer className="h-[50px] border-t flex items-center justify-center">
      <p className="text-sm text-center">
        {t?.footer?.poweredBy || 'Được cung cấp bởi XmaxMedia'}
      </p>
    </footer>
  )
}

