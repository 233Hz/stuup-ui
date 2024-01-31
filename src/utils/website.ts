const logos: Record<string, string> = import.meta.glob('/public/logo-*.png', {
  eager: true,
  import: 'default',
})

const getWebInfo = () => {
  const logo = logos[`/public/logo-${import.meta.env.VITE_LOGO_SUFFIX}.png`]
  const webTitle = import.meta.env.VITE_APP_TITLE
  const copyright = import.meta.env.VITE_COPYRIGHT
  return {
    logo,
    webTitle,
    copyright,
  }
}

export default getWebInfo
