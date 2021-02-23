import { Controller } from "../../controller"
import { isDebugOrEnv } from "@sampsonjs/helpers/is-env"

export class DynamicLinkController extends Controller {
  static keyName = "dynamic-link"

  isEnter(ev) {
    if(ev.code) return ev.code === "Enter"
    if(ev.key) return ev.key === "Enter"
    if("which" in ev) return ev.which === 13
    return ev.keyCode === 13
  }

  isSpace(ev) {
    if(ev.code) return ev.code === "Space"
    if(ev.key) return ev.key === " "
    if("which" in ev) return ev.which === 32
    return ev.keyCode === 32
  }

  followKeyboard = (ev) => {
    if(this.isEnter(ev) || this.isSpace(ev)) this.follow(ev)
  }

  followEnter = (ev) => {
    if(this.isEnter(ev)) this.follow(ev)
  }

  followSpace = (ev) => {
    if(this.isSpace(ev)) this.follow(ev)
  }

  follow = (ev) => {
    ev.preventDefault()

    isDebugOrEnv("development") && console.debug(ev)

    const link = this.getLinkFromTarget(ev.currentTarget)

    isDebugOrEnv("development") && console.debug(link, link.href, ev.target, ev.currentTarget)

    if("replace" in ev.target.dataset) {
      const split = ev.target.dataset.replace.split("|")
      while(split.length > 0) {
        const repl = split.splice(0, 2)
        link.href = link.href.replace(repl[0], repl[1] || "")
      }
    }

    isDebugOrEnv("development") && console.debug(link, link.href)

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
