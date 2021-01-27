import { Controller } from "../../controller"
import { MDCSwitch } from "@material/switch";

export class SwitchController extends Controller {
  static keyName = "switch"
  static targets = [ "wrapper", "switch", "input", "label" ]

  async connected() {
    this.switch = this.switchTarget
  }

  async disconnected() {
    this.switch && await this.switch.destroy()
  }

  toggle = () => this.checked = !this.checked

  get checked() {
    return this.switch.checked
  }

  set checked(state) {
    this.switch.checked = !!state
    return this.checked
  }

  get disabled() {
    return this.switch.disabled
  }

  set disabled(state) {
    this.switch.disabled = !!state
    return this.disabled
  }

  get value() {
    return this.inputTarget.value
  }

  set value(value) {
    this.inputTarget.value = value
    return this.value
  }

  get switch() {
    return this._switch
  }

  set switch(element) {
    this._switch = new MDCSwitch(element)
  }
}
