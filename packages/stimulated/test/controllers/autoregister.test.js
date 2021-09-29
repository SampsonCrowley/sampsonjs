import { AppDrawerController   } from "@sampsonjs/stimulated/controllers/app-drawer-controller"
import { CheckboxController    } from "@sampsonjs/stimulated/controllers/checkbox-controller"
import { ClipboardController   } from "@sampsonjs/stimulated/controllers/clipboard-controller"
import { DropzoneController    } from "@sampsonjs/stimulated/controllers/dropzone-controller"
import { DynamicLinkController } from "@sampsonjs/stimulated/controllers/dynamic-link-controller"
import { ListController        } from "@sampsonjs/stimulated/controllers/list-controller"
import { TextFieldController   } from "@sampsonjs/stimulated/controllers/text-field-controller"
import { TimeSyncController    } from "@sampsonjs/stimulated/controllers/time-sync-controller"
import { TopBarController      } from "@sampsonjs/stimulated/controllers/top-bar-controller"
import { YoutubeController     } from "@sampsonjs/stimulated/controllers/youtube-controller"


jest.mock(
  "@sampsonjs/stimulated/controllers/app-drawer-controller",
  () => ({ AppDrawerController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/checkbox-controller",
  () => ({ CheckboxController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/clipboard-controller",
  () => ({ ClipboardController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/dropzone-controller",
  () => ({ DropzoneController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/dynamic-link-controller",
  () => ({ DynamicLinkController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/list-controller",
  () => ({ ListController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/text-field-controller",
  () => ({ TextFieldController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/time-sync-controller",
  () => ({ TimeSyncController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/top-bar-controller",
  () => ({ TopBarController: { load: jest.fn() } })
)

jest.mock(
  "@sampsonjs/stimulated/controllers/youtube-controller",
  () => ({ YoutubeController: { load: jest.fn() } })
)

describe("Stimulated", () => {
  describe("Controllers", () => {
    describe("autoregister", () => {
      it("loads default controllers on first eval", async () => {
        expect(AppDrawerController.load).not.toHaveBeenCalled()
        expect(CheckboxController.load).not.toHaveBeenCalled()
        expect(ClipboardController.load).not.toHaveBeenCalled()
        expect(DropzoneController.load).not.toHaveBeenCalled()
        expect(DynamicLinkController.load).not.toHaveBeenCalled()
        expect(ListController.load).not.toHaveBeenCalled()
        expect(TextFieldController.load).not.toHaveBeenCalled()
        expect(TimeSyncController.load).not.toHaveBeenCalled()
        expect(TopBarController.load).not.toHaveBeenCalled()
        expect(YoutubeController.load).not.toHaveBeenCalled()

        await import("@sampsonjs/stimulated/controllers/autoregister")

        expect(AppDrawerController.load).toHaveBeenCalledTimes(1)
        expect(CheckboxController.load).toHaveBeenCalledTimes(1)
        expect(ClipboardController.load).toHaveBeenCalledTimes(1)
        expect(DropzoneController.load).toHaveBeenCalledTimes(1)
        expect(DynamicLinkController.load).toHaveBeenCalledTimes(1)
        expect(ListController.load).toHaveBeenCalledTimes(1)
        expect(TextFieldController.load).toHaveBeenCalledTimes(1)
        expect(TimeSyncController.load).toHaveBeenCalledTimes(1)
        expect(TopBarController.load).toHaveBeenCalledTimes(1)
        expect(YoutubeController.load).toHaveBeenCalledTimes(1)

        await import("@sampsonjs/stimulated/controllers/autoregister")

        expect(AppDrawerController.load).toHaveBeenCalledTimes(1)
        expect(CheckboxController.load).toHaveBeenCalledTimes(1)
        expect(ClipboardController.load).toHaveBeenCalledTimes(1)
        expect(DropzoneController.load).toHaveBeenCalledTimes(1)
        expect(DynamicLinkController.load).toHaveBeenCalledTimes(1)
        expect(ListController.load).toHaveBeenCalledTimes(1)
        expect(TextFieldController.load).toHaveBeenCalledTimes(1)
        expect(TimeSyncController.load).toHaveBeenCalledTimes(1)
        expect(TopBarController.load).toHaveBeenCalledTimes(1)
        expect(YoutubeController.load).toHaveBeenCalledTimes(1)
      })
    })
  })
})
