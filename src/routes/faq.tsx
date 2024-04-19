import { A } from '@solidjs/router'

export default function FAQ() {
  return (
    <div class="flex flex-col gap-4 p-8">
      <h1 class="-mt-2 pb-2 text-4xl font-bold">FAQ</h1>
      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="faq" />
        <div class="collapse-title text-xl font-medium">What is Mocha?</div>
        <div class="collapse-content">
          <p>Mocha is a web proxy used to unblock websites at work or school. Your traffic is encrypted so no one can read it, not even us. </p>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="faq" />
        <div class="collapse-title text-xl font-medium">How do I use it?</div>
        <div class="collapse-content">
          <p>
            Navigate to the home page and type in a URL or search query. You can also launch a preset{' '}
            <A href="/shortcuts" class="underline underline-offset-2">
              shortcut
            </A>{' '}
            or{' '}
            <A href="/game" class="underline underline-offset-2">
              game
            </A>
            .
          </p>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="faq" />
        <div class="collapse-title text-xl font-medium">Why is the proxy slow?</div>
        <div class="collapse-content">
          <p>The proxy is hosted on a shared server that serves all users. If there is a significant amount of users at one time, it can cause network congestion and slow down requests. </p>
        </div>
      </div>

      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" name="faq" />
        <div class="collapse-title text-xl font-medium">Why is there an error saying "there are no bare clients"?</div>
        <div class="collapse-content">
          <p>This is due to how Mocha registers service workers for Ultraviolet, the internal proxy we use. Sometimes the service worker does not register properly, and cause other components of Mocha to fail. Reloading once or twice should fix the issue. We are actively working to fix this.</p>
        </div>
      </div>
    </div>
  )
}
