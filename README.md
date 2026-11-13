# Read It Later PWA

`Read it later` Progressive WebApp. Share Web-Links to this PWA to read them later.

Needs to be packed as app to use the Android share dialog. See [generate-apk](#generate-apk)

## hosted on

[ril @ github](https://kryptografisch.github.io/read-it-later/)

## installable on (verified)

chrome for android

## generate apk

install on a device with chrome for android and extract the apk.

find your package

> `adb shell pm list packages | grep org.chromium`

locate package on file system

> `adb shell pm path org.chromium.webapk.<hash>`

pull apk to local file system

> `adb pull /data/app/<path>`
