/* global navigator, cordova */

let appVersion = navigator.appVersion;

export let isWindows = /Windows/i.test(appVersion);
export let isAndroid = /Android/i.test(appVersion);
export let isIPhone = /iPhone|iPod|iPad/i.test(appVersion);
export let isCordova = typeof cordova !== 'undefined';
export let isAndroidKitKat = isAndroid && /Android 4\.4/.test(appVersion);
