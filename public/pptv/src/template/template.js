module.exports = function (template) {
    let title = '咪咕视频';
    let commons = template.htmlWebpackPlugin.options.common;
    let scripts = '';
    for (var chunk in commons) {
        scripts += `<script type="text/javascript" src="${commons[chunk]}"></script>`;
    }
    return (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <title>${title}</title>
        ${scripts}
    </head>
    <body>
        <div id=${template.htmlWebpackPlugin.options.root}></div>
        <!--
        This HTML file is a template.
        If you open it directly in the browser, you will see an empty page.

        You can add webfonts, meta tags, or analytics to this file.
        The build step will place the bundled scripts into the <body> tag.

        To begin the development, run "npm run test" or "npm run watch" in this folder.
        To create a production bundle, use "npm run mgbuild".
        -->
    </body>
    </html>`
    )
}
