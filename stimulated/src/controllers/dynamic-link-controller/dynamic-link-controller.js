import { Controller } from "../../controller"

export class DynamicLinkController extends Controller {
  static keyName = "dynamic-link"

  follow = (ev) => {
    console.log(ev, ev.target, ev.currentTarget)
    ev.preventDefault()

    console.debug(ev)

    const link = this.getLinkFromTarget(ev.target)
    console.log(link, link.href, ev.target, ev.currentTarget)
    if("replace" in ev.target.dataset) {
      const split = ev.target.dataset.replace.split("|")
      while(split.length > 0) {
        const repl = split.splice(0, 2)
        link.href = link.href.replace(repl[0], repl[1] || "")
      }
    }

    console.log(link, link.href)

    link.click()
  }

  getLinkFromTarget(target) {
    const [ link ] = [
                        target,
                        ...target.querySelectorAll("a[href]")
                      ].filter(el => el && el.matches("a")),
          el = document.createElement("a")

    el.href   = (link && link.href) || "#"
    el.target = (link && link.target) || ""
    el.rel    = (link && link.rel) || ""

    return el
  }
}
