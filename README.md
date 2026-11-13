# Read It Later PWA

`Read it later` Progressive WebApp. Share linkst and websites to this PWA to read them later.

Needs to be packed as an app to use the Android share dialog. See [generate-apk](#generate-apk)

## Hosted on

[kryptografisch.github.io/read-it-later](https://kryptografisch.github.io/read-it-later/)

## Installation

### use Chrome for Android (verified)

Installing as an app (with share dialog support) from the browser only works with Chrome for Android: Chrome generates a real Android app (APK) for the PWA.

> Other browsers like Firefox, Brave or Vanadium only add a home screen shortcut, which does not show up in the share dialog.
>
> For those, build an APK with [PWABuilder](#option-a-pwabuilder).

### use PWABuilder to generate APK

The APK is only a thin shell that opens the hosted site. Updates to the app are deployed to GitHub Pages and picked up automatically.

1. Open [pwabuilder.com](https://www.pwabuilder.com) and enter `https://kryptografisch.github.io/read-it-later/`
2. Choose **Package for stores → Android**
3. In the Android options, set **Fallback behavior** to **WebView**, so the app also runs on devices without a Chromium-based browser
4. Download the zip and install the contained `.apk` on your device

> Keep the signing key from the zip if you want to install a newer build over the existing app later. Otherwise uninstall the old app first.

## Advanced: Extract from Chrome

Install the app with Chrome for Android, then extract the generated APK with `adb`. The extracted APK still needs Chrome installed on the device to run.

- find your package
  `adb shell pm list packages | grep org.chromium`

- loccate package on file system
  `adb shell pm path org.chromium.webapk.<hash>`

- pull apk to local file system
  `adb pull /data/app/<path>`

## Data Safety

Your links are stored only on your device, in the browser's `localStorage`, under key `kryptografisch.github.io`. Nothing is sent to a server.

- They stay as long as the underlying browser is installed and you do not clear its site data.
- When the app runs in Chrome (or another Chromium-based browser), uninstalling and reinstalling the app keeps the links, because they belong to the browser, not the app.
- When the app runs in the PWABuilder **WebView** fallback, the links belong to the app and are deleted when you uninstall it.
