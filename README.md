# A11Y Color Blindness Empathy Test -- Browser extensions

Empathy test for color blindness and visual impairment. This add-on emulates 8 types of color blindness, plus grayscale to check the contrast of your website.

- [Chrome](https://chrome.google.com/webstore/detail/a11y-color-blindness-empa/idphhflanmeibmjgaciaadkmjebljhcc)
- [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/a11y-color-blindness-test/)

This repository is the browser extensions of this application. You can find the web version one on [vinceumo/A11Y-Color-Blindness-Empathy-Test](https://github.com/vinceumo/A11Y-Color-Blindness-Empathy-Test)

- [Web version](https://vinceumo.github.io/A11Y-Color-Blindness-Empathy-Test/)

![screenshot](https://raw.githubusercontent.com/vinceumo/A11Y-Color-Blindness-Empathy-Test-browser-extensions/master/dist/img/C-screenshot.jpg)
![screenshot2](https://raw.githubusercontent.com/vinceumo/A11Y-Color-Blindness-Empathy-Test-browser-extensions/master/dist/img/C-screenshot2.jpg)

# Project

## Project setup

```
npm install
```

### Compile CSS

```
npm run gulp scssBuild
```

### Watch CSS

```
npm run gulp scssWatch
```

## Install extension locally

### Firefox

- Navigate to `about:debugging#addons`
- Check **Enable add-on debugging**
- Click on **Load Temporary Add-on**
- Select the _manifest.json_ file

### Chrome

- Navigate to `chrome://extensions/`
- Click on **Load unpacked**
- Select the extension folder (with polyfill)

# Changelog

## [1.0.1] - 2019-10-15

### Fixed

- Fix breaking elements with `position: fixed` when applying filter to body tag [[Github](https://github.com/vinceumo/A11Y-Color-Blindness-Empathy-Test/issues/2)]
