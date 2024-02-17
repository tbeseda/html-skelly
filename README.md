<h1 align="center"><code>html-skelly</code> 🩻</h1>

<p align="center">
  Create a plain text representation of an HTML document's skeleton. Great for logging.<br>
  <a href="https://www.npmjs.com/package/html-skelly"><strong><code>html-skelly</code> on npmjs.org »</strong></a>
</p>

## Usage

```
npm i html-skelly
```

Get some HTML and create a skelly. Tags will be represented by their name + id + class. Kinda like a CSS selector.

`<img id="logo" class="bigger" src="/logo.jpeg">` becomes `<img#logo.bigger>`

```javascript
import skelly from 'html-skelly'

const response = await fetch(`https://google.com`)
const html = await response.text()

console.log(skelly('💀 Google Skelly', html))
console.log(skelly('Google Skelly', html, { flare: false })) // without ANSI/emoji
```

Output (it looks better in a terminal with color support):

```txt
┌─ 💀 Google Skelly 🩻 ─○
│ <html>
│   <head>
│     <meta>
│     <meta>
│     <meta>
│     <meta>
│     <title>
│     <script>
│       <f>
│         <style>
│         <style>
│         <script>
│           <g>
│         <body>
│           <script>
│           <div#mngb>
│             <div>
│               <nobr>
│                 <b>
│                 <a>
│                 <a>
│                 <a>
│                 <a>
│                 <a>
│                 <a>
│                 <a>
│                 <a>
│                   <u>
│             <div>
│               <nobr>
│                 <span>
│                 <span>
│                 <span>
│                 <a>
│                 <a>
│                 <a>
│             <div>
│             <div>
│           <center>
│             <br#lgpd>
│             <div#lga>
│               <img#hplogo>
│               <br>
│               <br>
│             <form>
│               <table>
│                 <tr>
│                   <td>
│                   <td>
│                     <input>
│                     <input>
│                     <input>
│                     <input>
│                     <input>
│                     <div.ds>
│                       <input.lst>
│                     <br>
│                     <span.ds>
│                       <span.lsbb>
│                         <input.lsb>
│                     <span.ds>
│                       <span.lsbb>
│                         <input#tsuid_1.lsb>
│                         <script>
│                         <input>
│                   <td.fl.sblc>
│                     <a>
│               <input#gbv>
│               <script>
│             <div#gac_scont>
│             <div>
│               <br>
│             <span#footer>
│               <div>
│                 <div#WqQANb>
│                   <a>
│                   <a>
│                   <a>
│               <p>
│                 <a>
│                 <a>
│           <script>
│             <k>
│               <script>
│               <script>
│                 <amd>
└────────────────────────────────────────────────────────────────────────────────●
```
