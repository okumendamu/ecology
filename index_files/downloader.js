let statuses = ["new", "yts", "upd", "err", "del", "bak", "stp"];
let divElement = getDivElement();
let tableElements = divElement.getElementsByTagName("table");
let currentLink = window.location.href;

for (let i = 0; i < tableElements.length; i++) {
    if (tableElements.item(i).border != "0" && tableElements.item(i).width != "" ||
        tableElements.item(i).border != "0") {
        let button = document.createElement('button');
        if (currentLink.search("rus") != -1) {
            button.innerHTML = 'Скачать';
        } else if (currentLink.search("kaz") != -1) {
            button.innerHTML = "Жүктеу";
        } else if (currentLink.search("eng") != -1) {
            button.innerHTML = "Download";
        }

        button.style = "position: absolute;box-shadow: 0px 10px 14px -7px #276873;\n" +
            "\tbackground:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);\n" +
            "\tbackground-color:#599bb3;\n" +
            "\tborder-radius:40px;\n" +
            "\tdisplay:inline-block;\n" +
            "\tcursor:pointer;\n" +
            "\tcolor:#ffffff;\n" +
            "\tfont-family:Arial;\n" +
            "\tfont-size:8px;\n" +
            "\tfont-weight:bold;\n" +
            "\tpadding:1px 8px;\n" +
            "\ttext-decoration:none;\n" +
            "\ttext-shadow:0px 1px 0px #3d768a;";
        tableElements.item(i).appendChild(button);
        button.onclick = function () {
            tableToExcel(button.parentElement, 'test', button.textContent)
        };
    }
}

function getDivElement() {
    for (let i = 0; i < statuses.length; i++) {
        let element = document.getElementsByClassName("container_gamma text text_" + statuses[i]).item(0);
        if (element) {
            return element;
        }
    }
}

let tableToExcel = (function () {
    let uri = 'data:application/vnd.ms-excel;base64,'
        ,
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        }
        , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        }
    return function (table, name, buttonText) {
        if (!table.nodeType) table = document.getElementById(table)
        let ctx = {
            worksheet: name || 'Worksheet', table: table.innerHTML.replace(new RegExp(buttonText, 'g'), '')
        }
        window.location.href = uri + base64(format(template, ctx))
    }
})()
