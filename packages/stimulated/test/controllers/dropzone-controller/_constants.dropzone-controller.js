import { DropzoneController } from "@sampsonjs/stimulated/controllers/dropzone-controller"
import { UploadManager } from "@sampsonjs/stimulated/controllers/dropzone-controller/upload-manager"

import { getMetaValue } from "@sampsonjs/helpers/get-meta-value"
import { findElement } from "@sampsonjs/helpers/find-element"
import { removeElement } from "@sampsonjs/helpers/remove-element"
import { default as Dropzone } from "dropzone"

import { controllerRegistration } from "../../test-helpers/generators/controller-registration"
import { TemplateController } from "../../test-helpers/generators/template-controller"
import { sleepAsync } from "@sampsonjs/helpers/sleep-async"

DropzoneController.bless()

const { findElement: findElementImplementation } = jest.requireActual("@sampsonjs/helpers/find-element")
const { removeElement: removeElementImplementation } = jest.requireActual("@sampsonjs/helpers/remove-element")

const getMetaValueImplementation = v => `Meta Value: ${v}`

const getElements = () => {
  const wrapper = document.getElementById("dropzone-wrapper"),
        label = document.querySelector("label.label"),
        input = document.getElementById("image"),
        messageWrapper = document.getElementById("dropzone-message")

  return { wrapper, label, input, messageWrapper }
}

if(!Dropzone.originalOn) {
  Dropzone.originalOn = Dropzone.prototype.on,
  Dropzone.originalOff = Dropzone.prototype.off
}

const dropzoneOn = Dropzone.originalOn,
      dropzoneOff = Dropzone.originalOff,
      dropzoneMockOff = jest.fn().mockImplementation(dropzoneOff),
      dropzoneMockOn = jest.fn().mockImplementation(dropzoneOn)

Dropzone.prototype.on = dropzoneMockOn
Dropzone.prototype.off = dropzoneMockOff

const template = `
<label
  for="image"
  class="label"
>
  Image
</label>
<div
  id="dropzone-wrapper"
  data-controller="dropzone"
  data-dropzone-max-file-size="2"
  data-dropzone-max-files="1"
  data-target="dropzone.dropzone"
>
  <input
    type="file"
    id="image"
    name="image"
    data-target="dropzone.input"
    data-direct-upload-url="/upload-file"
  />
  <div
    id="dropzone-message"
    class="dropzone-msg dz-message"
  >
    <h3 class="dropzone-msg-title">
      Drag here to upload or click here to browse
    </h3>
    <span class="dropzone-msg-desc">
      2 MB file size maximum. Allowed file types png, jpg.
    </span>
  </div>
</div>
`

const createTemplateController = TemplateController(DropzoneController, template, "#dropzone-wrapper")

const { registerController, unregisterController } = controllerRegistration(DropzoneController, template)

export {
  createTemplateController,
  Dropzone,
  DropzoneController,
  dropzoneMockOff,
  dropzoneMockOn,
  findElement,
  findElementImplementation,
  getElements,
  getMetaValue,
  getMetaValueImplementation,
  registerController,
  removeElement,
  removeElementImplementation,
  sleepAsync,
  template,
  unregisterController,
  UploadManager
}
