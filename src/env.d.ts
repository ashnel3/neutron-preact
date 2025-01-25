declare module '*.css' {
  export default undefined
}

declare module '*.svg' {
  import * as Preact from 'preact'

  // typing stolen from vite-plugin-svgr https://github.com/pd4d10/vite-plugin-svgr

  const SvgComponent: Preact.FunctionComponent<
    Preact.ComponentProps<'svg'> & {
      title?: string
      titleId?: string
      desc?: string
      descId?: string
    }
  >

  export default SvgComponent
}
