import { Controller } from "../../controller"
import { MDCSelect } from "@material/select";
import { MDCRipple } from "@material/ripple";

export class SelectMenuController extends Controller {
  static keyName = "select-menu"
  static targets = [
    "select",
    "anchor",
    "menu",
    "item",
    "input",
    "text"
  ]

  async connected() {
    this.selectMenu = this.selectTarget
  }

  async disconnected(selectMenu, ripples) {
    if(!selectMenu) {
      selectMenu = this.selectMenu
      ripples = this.ripples
    }

    if(selectMenu) {
      for(let r = ripples.length; r > 0; r--) {
        await this.destroyRipple(ripples[r - 1])
      }
      await selectMenu.destroy()
    }
  }

  createRipple = (el) => {
    const ripple = new MDCRipple(el)
    this.ripples.push(ripple)
    return ripple
  }

  destroyRipple = async (ripple) => {
    await ripple.destroy()
    let idx
    while((idx = this.ripples.indexOf(ripple)) !== -1) {
      this.ripples.splice(idx, 1)
    }
  }

  // onSelectChange = () => {
    // console.debug(`Selected option at index ${this.selectMenu.selectedIndex} with value "${this.selectMenu.value}"`)
    // if(this.hasInputTarget) this.inputTarget.value = this.selectMenu.value
    // if(this.hasTextTarget) this.textTarget.innerText = this.selectMenu.value
  // }

  get selectedIndex() {
    return this.selectMenu.selectedIndex
  }

  set selectedIndex(selectedIndex) {
    this.selectMenu.selectedIndex = selectedIndex
    return this.selectedIndex
  }

  get value() {
    return this.selectMenu.value || ""
  }

  set value(value) {
    if(!value) {
      this.selectMenu.selectedIndex = -1
    } else {
      value = this.itemTargets.find((item, i) => {
        if(value === item.dataset.value) {
          this.selectMenu.selectedIndex = i
          return true
        }
      })

      if(!value) this.selectMenu.selectedIndex = -1
    }
    return this.value
  }

  get ripples () {
    return this._ripples || (this._ripples = [])
  }

  get selectMenu() {
    return this._selectMenu
  }

  set selectMenu(element) {
    if(this._selectMenu) this.disconnected(this._selectMenu, [...this.ripples])
    this._selectMenu = new MDCSelect(element)
    // this.selectMenu.listen("MDCSelect:change", this.onSelectChange)
    this.itemTargets.forEach(this.createRipple)
    this.selectMenu.singleSelection = true
  }
}
