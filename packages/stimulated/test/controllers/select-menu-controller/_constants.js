import { SelectMenuController } from "controllers/select-menu-controller"
import { controllerRegistration } from "../../test-helpers/generators/controller-registration"
import { TemplateController } from "../../test-helpers/generators/template-controller"

SelectMenuController.bless()

let dupCount = 0

export const getDupedElements = () => {
  const ogSelect = document.getElementById("test-select-menu"),
        html = ogSelect.outerHTML,
        count = ++dupCount

  const div = document.createElement("DIV")
  document.body.appendChild(div)

  div.innerHTML = html.replace(/id\=\"test/g, `id="test-${count}`)

  const select = document.getElementById(`test-${count}-select-menu`),
        anchor = document.getElementById(`test-${count}-anchor`),
        menu = document.getElementById(`test-${count}-menu`),
        input = document.getElementById(`test-${count}-input`),
        items = select.querySelectorAll(".mdc-select__menu .mdc-list"),
        label = document.getElementById(`test-${count}-label`),
        text = document.getElementById(`test-${count}-text`)

  return { select, anchor, menu, input, items, label, text, count }
}

export const getElements = () => {
  const select = document.getElementById("test-select-menu"),
        anchor = document.getElementById("test-anchor"),
        menu = document.getElementById("test-menu"),
        input = document.getElementById("test-input"),
        items = select.querySelectorAll(".mdc-slect__menu .mdc-list"),
        label = document.getElementById("test-label"),
        text = document.getElementById("test-text")

  return { select, anchor, menu, input, items, label, text }
}

export const template = `
<div id="test-select-menu" class="mdc-select" data-controller="select-menu" data-target="select-menu.select">
  <input type="hidden" name="test" id="test-input" data-target="select-menu.input">
  <div id="test-anchor" class="mdc-select__anchor" role="button" aria-haspopup="listbox" aria-labelledby="test-label test-text" aria-required="true" tabindex="0" aria-disabled="false" data-target="select-menu.anchor">
    <span class="mdc-select__ripple"></span>
    <span id="test-label" class="mdc-floating-label" data-target="select-menu.label">
      Test Label
    </span>
    <span class="mdc-select__selected-text-container">
      <span id="test-text" class="mdc-select__selected-text" data-target="select-menu.text"></span>
    </span>
    <span class="mdc-select__dropdown-icon">
      <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
        <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10">
        </polygon>
        <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15">
        </polygon>
      </svg>
    </span><span class="mdc-line-ripple"></span>
  </div>
  <div id="test-menu" class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--full-width" data-target="select-menu.menu">
    <ul class="mdc-list" role="listbox" aria-label="Estimated Credit Score listbox">
      <li class="mdc-list-item mdc-list-item--selected mdc-ripple-upgraded" role="option" data-value="" data-target="select-menu.item" aria-selected="true" tabindex="-1">
        <span class="mdc-list-item__ripple"></span>
      </li>
      <li class="mdc-list-item mdc-ripple-upgraded" role="option" data-value="John" data-target="select-menu.item" aria-selected="false" tabindex="-1">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">John</span>
      </li>
      <li class="mdc-list-item mdc-ripple-upgraded" role="option" data-value="Jacob" data-target="select-menu.item" aria-selected="false" tabindex="-1">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Jacob</span>
      </li>
      <li class="mdc-list-item mdc-ripple-upgraded" role="option" data-value="Jingleheimer" data-target="select-menu.item" aria-selected="false" tabindex="-1">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">Jingleheimer</span>
      </li>
    </ul>
  </div>
</div>
`

export const createTemplateController = TemplateController(SelectMenuController, template, "#test-select-menu")

export const { registerController, unregisterController } = controllerRegistration(SelectMenuController, template)
