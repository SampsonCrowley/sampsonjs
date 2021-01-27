// stimuli/controllers/select-menu-controller/select-menu-controller.js
import { MDCSelect } from "@material/select";
import { SelectMenuController } from "stimuli/controllers/select-menu-controller"
import { sleepAsync } from "@sampsonjs/helpers/sleep-async"
import {
          createTemplateController,
          getElements,
          mockScope,
          registerController,
          template,
          unregisterController
                                      } from "./_constants"

describe("Stimuli", () => {
  describe("Controllers", () => {
    describe("SelectMenuController", () => {

      it("has keyName 'select-menu'", () => {
        expect(SelectMenuController.keyName).toEqual("select-menu")
      })

      it("has targets for select, label, and icon", () => {
        expect(SelectMenuController.targets)
          .toEqual([ "select", "item", "input", "text" ])
      })

      describe("lifecycles", () => {
        beforeEach(registerController)
        afterEach(unregisterController)

        describe("on connect", () => {
          it("sets [select-menu] to be the controller instance", () => {
            const { select } = getElements()

            expect(select["controllers"]["select-menu"])
              .toBeInstanceOf(SelectMenuController)
          })

          it("sets [selectMenu] to an MDCSelect of element", () => {
            const { select, input, label, text } = getElements(),
                  controller = select["controllers"]["select-menu"]

            expect(controller.selectMenu).toBeInstanceOf(MDCSelect)
            expect(controller.selectMenu.root).toBe(select)
            expect(controller.selectMenu.hiddenInput).toBe(input)
            expect(controller.selectMenu.selectedText).toBe(text)
            expect(controller.selectMenu.label.root).toBe(label)
          })
        })

        describe("on disconnect", () => {
          it("removes [select-menu] from the element", async () => {
            const { select } = getElements(),
                  controller = select["controllers"]["select-menu"]

            expect(select["controllers"]["select-menu"]).toBeInstanceOf(SelectMenuController)

            await controller.disconnect()

            expect(select["controllers"]["select-menu"]).toBe(undefined)

            await controller.connect()
          })

          it("calls #destroy on .selectMenu", async () => {
            const { select } = getElements(),
                  controller = select["controllers"]["select-menu"],
                  selectMenu = controller.selectMenu,
                  destroy = selectMenu.destroy,
                  mock = jest.fn()
                    .mockImplementation(destroy)
                    .mockName("destroy")

            Object.defineProperty(selectMenu, "destroy", {
              value: mock,
              configurable: true
            })

            await controller.disconnect()

            expect(mock).toHaveBeenCalledTimes(1)
            expect(mock).toHaveBeenLastCalledWith()

            if(selectMenu.hasOwnProperty("destroy")) delete selectMenu.destroy

            await controller.connect()
          })
        })
      })

      describe("getters/setters", () => {
        describe("[value]", () => {
          it("is [selectMenu][value] || ''", () => {
            let value
            const controller = new SelectMenuController(),
                  selectMenu = {},
                  getSelectMenu = jest.fn().mockImplementation(() => selectMenu),
                  setSelectMenu = jest.fn().mockImplementation(() => selectMenu),
                  getValue = jest.fn().mockImplementation(() => value),
                  setValue = jest.fn().mockImplementation(v => value = v)

            Object.defineProperty(controller, "selectMenu", {
              get: getSelectMenu,
              set: setSelectMenu,
              configurable: true
            })

            Object.defineProperty(selectMenu, "value", {
              get: getValue,
              set: setValue,
              configurable: true
            })

            const values = [
              "abcd",
              "1234",
              1234,
              [],
              {}
            ]

            let i = 0
            for(const v of values) {
              i++
              value = v

              expect(controller.value).toBe(v)
              expect(getSelectMenu).toHaveBeenCalledTimes(i)
              expect(setSelectMenu).not.toHaveBeenCalled()
              expect(getValue).toHaveBeenCalledTimes(i)
              expect(setValue).not.toHaveBeenCalled()
            }

            const falsy = [
              undefined,
              "",
              false,
              0
            ]

            for(const v of falsy) {
              i++
              value = v

              expect(controller.value).toBe("")
              expect(getSelectMenu).toHaveBeenCalledTimes(i)
              expect(setSelectMenu).not.toHaveBeenCalled()
              expect(getValue).toHaveBeenCalledTimes(i)
              expect(setValue).not.toHaveBeenCalled()
            }
          })

          it("is equal to the selectMenu value", () => {
            const controller = createTemplateController(),
                  { select } = getElements()

            controller.selectMenu = select
            controller.selectMenu.selectedIndex = 1

            expect(controller.value).toBe(controller.selectMenu.value)
            expect(controller.value).toEqual("John")
          })

          it("sets [selectMenu][value] if a valid option value", () => {
            const controller = createTemplateController(),
                  { select } = getElements()

            controller.selectMenu = select

            const validValues = [
              "John",
              "Jacob",
              "Jingleheimer",
            ]

            let i = 0
            for(let i = 0; i < validValues.length; i++) {
              controller.value = validValues[i]
              expect(controller.value).toEqual(validValues[i])
              expect(controller.value).toBe(controller.selectMenu.value)
            }
          })

          it("unsets [selectMenu][value] if not a valid option value", () => {
            const controller = createTemplateController(),
                  { select } = getElements()

            controller.selectMenu = select

            let i = 0
            while(i < 20) {
              i++
              controller.selectMenu.selectedIndex = 1
              expect(controller.value).toEqual("John")
              expect(controller.selectMenu.selectedIndex).toEqual(1)
              controller.value = `test-input-${i}`
              expect(controller.value).toEqual("")
              expect(controller.selectMenu.selectedIndex).toEqual(-1)
            }
          })
        })

        describe("[selectedIndex]", () => {
          it("is [selectMenu][selectedIndex]", () => {
            let value
            const controller = new SelectMenuController(),
                  selectMenu = {},
                  getSelectMenu = jest.fn().mockImplementation(() => selectMenu),
                  setSelectMenu = jest.fn().mockImplementation(() => selectMenu),
                  getValue = jest.fn().mockImplementation(() => value),
                  setValue = jest.fn().mockImplementation(v => value = v)

            Object.defineProperty(controller, "selectMenu", {
              get: getSelectMenu,
              set: setSelectMenu,
              configurable: true
            })

            Object.defineProperty(selectMenu, "selectedIndex", {
              get: getValue,
              set: setValue,
              configurable: true
            })

            const values = [
              "abcd",
              "1234",
              1234,
              [],
              {},
              undefined,
              "",
              false,
              0
            ]

            let i = 0
            for(const v of values) {
              i++
              value = v

              expect(controller.selectedIndex).toBe(v)
              expect(getSelectMenu).toHaveBeenCalledTimes(i)
              expect(setSelectMenu).not.toHaveBeenCalled()
              expect(getValue).toHaveBeenCalledTimes(i)
              expect(setValue).not.toHaveBeenCalled()
            }
          })

          it("is equal to the selectTarget selectedIndex", () => {
            const controller = createTemplateController(),
                  { select } = getElements()

            controller.selectMenu = select
            controller.selectMenu.selectedIndex = 1

            expect(controller.selectedIndex).toBe(controller.selectMenu.selectedIndex)
            expect(controller.selectedIndex).toEqual(1)
          })

          it("sets [selectMenu][selectedIndex]", () => {
            const controller = createTemplateController(),
                  { select } = getElements()

            controller.selectMenu = select

            for(let i = 0; i < 3; i++) {
              controller.selectedIndex = i
              expect(controller.selectedIndex).toEqual(i)
              expect(controller.selectedIndex).toBe(controller.selectMenu.selectedIndex)
            }
          })

          it("does nothing if not a valid index", () => {
            const controller = createTemplateController(),
                  { select } = getElements()

            controller.selectMenu = select
            const invalid = controller.itemTargets.length

            console.debug(`itemTargets: ${invalid}`)

            controller.selectMenu.selectedIndex = 1
            expect(controller.selectedIndex).toEqual(1)
            controller.selectMenu.selectedIndex = invalid
            expect(controller.selectedIndex).not.toEqual(invalid)
            expect(controller.selectMenu.selectedIndex).toEqual(1)
            controller.selectMenu.selectedIndex = 3
            expect(controller.selectMenu.selectedIndex).toEqual(3)
          })
        })

        describe("[selectMenu]", () => {
          it("has no default", () => {
            const controller = new SelectMenuController()

            expect(controller.selectMenu).toBe(undefined)
          })

          it("requires an label child with the proper class", () => {
            const controller = new SelectMenuController(),
                  div = document.createElement("div"),
                  { input, items, label, text } = getElements()

            expect(() => controller.selectMenu = null).toThrow(TypeError)
            expect(() => controller.selectMenu = null).toThrow(new TypeError("Cannot read property 'querySelector' of null"))

            expect(() => controller.selectMenu = div).toThrow(Error)
            expect(() => controller.selectMenu = div).toThrow(new Error("MDCSelect: Missing required element: The following selector must be present: '.mdc-select__selected-text'"))

            div.appendChild(text)

            expect(() => controller.selectMenu = div).toThrow(TypeError)
            expect(() => controller.selectMenu = div).toThrow(new TypeError("Cannot read property 'hasAttribute' of null"))

            items.forEach(i => div.appendChild(i))

            expect(() => controller.selectMenu = div).not.toThrow()
          })

          it("creates an MDCSelect of the given element", async () =>{
            const controller = createTemplateController(),
                  { select, input, label, text } = getElements()

            controller.selectMenu = select
            expect(controller.selectMenu).toBeInstanceOf(MDCSelect)
            expect(controller.selectMenu.root).toBe(select)
            expect(controller.selectMenu.hiddenInput).toBe(input)
            expect(controller.selectMenu.selectedText).toBe(text)
            expect(controller.selectMenu.label.root).toBe(label)

            await controller.disconnect()
          })
        })
      })
    })
  })
})
