# Read It Later PWA

## installed on

ril.kryptografische.biz
read-it-later-pwa.herokuapp.com

## generate apk

install on a device with chrome for android and extract the apk.

find your package

> `adb shell pm list packages | grep org.chromium`

locate package on file system

> `adb shell pm path org.chromium.webapk.<hash>`

pull apk to local file system

> `adb pull /data/app/<path>`
