import Vue from 'vue'
import fileDownload from 'js-file-download'

const tailwindHTML = (html) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.4.6/tailwind.min.css">
    <title>Generated html template</title>
  </head>
  <body>${html}</body>
</html>`

const bootstrapHTML = (html) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
      crossorigin="anonymous"
    />
    <title>HTML generated page</title>
  </head>
  <body>
  ${html}
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
      crossorigin="anonymous"
    ></script>
  </body>
</html>`

Vue.use({
  install(vueInstance, options) {
    vueInstance.prototype.$download = function (cssFilter, list) {
      Promise.all(
        list.map((template) =>
          fetch(`templates/${template}.html`).then((response) =>
            response.text()
          )
        )
      ).then((templateString) => {
        const html = templateString.join('')
        switch (cssFilter) {
          case 'css-tailwind':
            fileDownload(tailwindHTML(html), 'html-template.html')
            break
          case 'css-bootstrap':
            fileDownload(bootstrapHTML(html), 'html-template.html')
            break
          default:
            fileDownload(tailwindHTML(html), 'html-template.html')
        }
      })
    }
  },
})
