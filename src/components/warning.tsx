import { createEffect, createSignal } from 'solid-js'

export const [showWarning, setShowWarning] = createSignal(false)

export default function SwWarning() {
  var warningModal: HTMLDialogElement

  createEffect(() => {
    if (showWarning() && warningModal) {
      warningModal.showModal()
    }
  })

  return (
    <dialog id="discordmodal" class="modal" ref={warningModal!}>
      <div class="modal-box">
        <h3 class="text-lg font-bold">Warning</h3>
        <p class="py-4">
          The Ultraviolet service worker failed to register. Reloading once or twice may fix the issue.
        </p>
        <div class="modal-action">
          <button
            class="btn btn-primary"
            onClick={() => {
              window.location.reload()
            }}
          >
            Reload
          </button>
          <form method="dialog">
            <button class="btn btn-neutral">Close</button>
          </form>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button class="cursor-default" />
      </form>
    </dialog>
  )
}
