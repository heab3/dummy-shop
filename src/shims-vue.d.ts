// src/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  // @ts-ignore
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}