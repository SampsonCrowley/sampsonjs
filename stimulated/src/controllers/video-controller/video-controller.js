import { Controller } from "../../controller"

export class VideoController extends Controller {
  static keyName = "video"
  static targets = [ "video", "source", "fallback" ]

  connected() {
    this.addListener()
  }

  disconnected() {
    this.clearListener()
  }

  sourcesNotPlayable = () => {
    try {
      this.sourceTargets.forEach(source => {
        console.debug(source, this.videoTarget.canPlayType(source.type))
        if(this.videoTarget.canPlayType(source.type)) throw new Error("playable")
      })
      return true
    } catch(err) {
      if(err.message !== "playable") {
        console.error(err)
        return true
      }
    }
  }

  addListener = () => {
    if(this.sourcesNotPlayable()) this.onVideoError()
    else this.videoTarget.addEventListener("error", this.onVideoError)
  }

  clearListener = () => {
    try {
      this.videoTarget.removeEventListener("error", this.onVideoError)
    } catch(_) {}
  }

  onVideoError = (ev) => {
    this.clearListener()
    let replaceWith
    if(this.hasFallbackTarget && this.fallbackTarget.dataset.src) {
      const img = document.createElement("img")
      img.src = this.fallbackTarget.dataset.src
      img.innerHTML = this.videoTarget.innerHTML
      replaceWith = img
    } else if(this.hasFallbackTarget) {
      replaceWith = this.fallbackTarget
    } else {
      replaceWith = document.createElement("div")
    }
    this.videoTarget.classList.forEach(klass => replaceWith.classList.add(klass));
    this.videoTarget.parentElement.replaceChild(replaceWith, this.videoTarget)
  }
}
