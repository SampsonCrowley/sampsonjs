import { AppDrawerController   } from "controllers/app-drawer-controller"
import { CheckboxController    } from "controllers/checkbox-controller"
import { ClipboardController   } from "controllers/clipboard-controller"
import { DropzoneController    } from "controllers/dropzone-controller"
import { DynamicLinkController } from "controllers/dynamic-link-controller"
import { ListController        } from "controllers/list-controller"
import { SelectMenuController  } from "controllers/select-menu-controller"
import { TextFieldController   } from "controllers/text-field-controller"
import { TimeSyncController    } from "controllers/time-sync-controller"
import { TopBarController      } from "controllers/top-bar-controller"
import { YoutubeController     } from "controllers/youtube-controller"

import * as IndexModule from "controllers"
import { Controller } from "controller"
import { readdirSync } from "fs"
import { srcRoot } from "../test-helpers/file-roots"
import path from "path"

const controllerPath = path.resolve(srcRoot, "controllers"),
      constantize = v => v.replace(/^([a-z])|-([a-z])/gi, v => v.toUpperCase().replace("-", ""))

describe("Stimulated", () => {
  describe("Controllers", () => {
    describe("index", () => {
      it("exports all Stimuli Controllers", () => {
        const controllerFolders = readdirSync(controllerPath, { withFileTypes: true }).filter(v => v.isDirectory())

        let i = 0
        for(const { name } of controllerFolders) {
          i++
          const controller = constantize(name)
          expect(IndexModule[controller].prototype).toBeInstanceOf(Controller)
        }

        expect(i).not.toBe(0)
      })

      it("exports AppDrawerController", () => {
        expect(IndexModule.AppDrawerController).toBe(AppDrawerController)
      })
      it("exports CheckboxController", () => {
        expect(IndexModule.CheckboxController).toBe(CheckboxController)
      })
      it("exports ClipboardController", () => {
        expect(IndexModule.ClipboardController).toBe(ClipboardController)
      })
      it("exports DropzoneController", () => {
        expect(IndexModule.DropzoneController).toBe(DropzoneController)
      })
      it("exports DynamicLinkController", () => {
        expect(IndexModule.DynamicLinkController).toBe(DynamicLinkController)
      })
      it("exports ListController", () => {
        expect(IndexModule.ListController).toBe(ListController)
      })
      it("exports SelectMenuController", () => {
        expect(IndexModule.SelectMenuController).toBe(SelectMenuController)
      })
      it("exports TextFieldController", () => {
        expect(IndexModule.TextFieldController).toBe(TextFieldController)
      })
      it("exports TimeSyncController", () => {
        expect(IndexModule.TimeSyncController).toBe(TimeSyncController)
      })
      it("exports TopBarController", () => {
        expect(IndexModule.TopBarController).toBe(TopBarController)
      })
      it("exports YoutubeController", () => {
        expect(IndexModule.YoutubeController).toBe(YoutubeController)
      })
    })
  })
})
