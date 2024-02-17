import skelly from './index.js'

const site = 'google.com'
const response = await fetch(`https://${site}`)
const html = await response.text()
const flare = true

console.log(skelly(site, html, { flare }))
