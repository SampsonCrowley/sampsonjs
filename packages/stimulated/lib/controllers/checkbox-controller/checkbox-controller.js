import { Controller } from "../../controller"
import { MDCFormField } from "@material/form-field";
import { MDCCheckbox } from "@material/checkbox";

export class CheckboxController extends Controller {
  static keyName = "checkbox"
  static targets = [ "form-field", "checkbox", "input", "title" ]

  async connected() {
    this.checkbox = this.checkboxTarget
    if(this.hasFormFieldTarget) this.formField = this.formFieldTarget
  }

  async disconnected() {
    this.checkbox && await this.checkbox.destroy()
    this.formField && this.formField.destroy()
  }

  toggle = () => this.checked = !this.checked

  get checked() {
    return this.checkbox.checked
  }

  set checked(state) {
    this.checkbox.checked = !!state
    return this.checked
  }

  get disabled() {
    return this.checkbox.disabled
  }

  set disabled(state) {
    this.checkbox.disabled = !!state
    return this.disabled
  }

  get indeterminate() {
    return this.checkbox.indeterminate
  }

  set indeterminate(state) {
    this.checkbox.indeterminate = !!state
    return this.indeterminate
  }

  get value() {
    return this.checkbox.value
  }

  set value(value) {
    this.checkbox.value = value
    return this.value
  }

  get formField() {
    return this._formField
  }

  set formField(element) {
    if(this._formField) this.formField.destroy()
    this._formField = new MDCFormField(element)
    this._formField.input = this.checkbox
  }

  get checkbox() {
    return this._checkbox
  }

  set checkbox(element) {
    this._checkbox = new MDCCheckbox(element)
  }
}
