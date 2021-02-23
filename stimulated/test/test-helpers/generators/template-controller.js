import { mockScope } from "./mock-scope"

export const TemplateController = (klass, template, query = "#wrapper") => {
  return () => {
    document.body.innerHTML = template
    const controller = new klass()
    mockScope(controller, document.querySelector(query))
    return controller
  }
}
