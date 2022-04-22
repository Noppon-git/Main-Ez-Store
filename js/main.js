const editor = grapesjs.init({
  container: "#editor",
  fromElement: true,
  width: "auto",
  storageManager: false,
  plugins: ["grapesjs-preset-webpage"],
  pluginsOpts: {
    "grapesjs-preset-webpage": {},
  },
  blockManager: {
    appendTo: "#blocks",
  },
  /*     layerManager:{
        appendTo: "#layer-container",
    },  */
  /*     styleManager:{
        appendTo: "#style-container",
    }, */
  /*     panels:{
        defaults:[
        {
            id:"basic+actions",
            el:".panel__basic-action",
            buttons:[
                {
                    id:"visibility",
                    active:true,
                    className: "btn-toggle-borders",
                    label: "<i class ='bi bi=border'></i>",
                    command: "sw-visibility"
                },

            ]
        },
        {
            id: "panel-devices",
            el: ".panel__devices",
            buttons:[
                {
                    id:"device-desktop",
                    label:"<i class ='bi bi-laptop'></i>",
                    command: "set-device-desktop",
                    active : true,
                    togglable:false,
                },
                {
                    id:"device-moblie",
                    label:"<i class ='bi bi-phone'></i>",
                    command: "set-device-mobile",
                },
            ],
        },
      ],
    }, */
  /*     deviceManager:{
       devices:[
        {
           name:"Desktop",
           width:"",
        },
        {
            name:"Mobile",
            width:"320px",
            widthMedia:"480px",
        },
      ], 
    }, */
});

function getHtmlCss() {
  var head      =   '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>';

  var html      =   editor.getHtml();
  var endHtml   =   '</body><style>';

  var css       =   editor.getCss();
  var endCss    =   '</style><html>'
  
  var textPage  =   head+html+endHtml+css+endCss;

  console.log("textPage =" + textPage);
  saveStaticDataToFile(textPage);
}

function saveStaticDataToFile(textPage) {
    var blob = [new Blob([textPage], { type: "text/html;charset=utf-8" })];
    //var link = window.URL.createObjectURL(blob);
    var file = new File(blob, "page.html", {
        type: "text/html;charset=utf-8",
      });

      const fr = new FileReader();
      console.log(file);
      console.log(fr.readAsText(file));
      //saveAs(file, "pa.html");
      restApi(file) 
    //window.location=link;

    /* saveAs(blob, "savefile.html");
    console.log(URL.createObjectURL(blob)); */

    //var url = URL.revokeObjectURL(blob);  = delete url
}
function restApi(file) {
    console.log("Bearer " + document.cookie);
    var details = {
        'store_id': '62625ff5a987ef3d04f795e5',
        'page_id': '6262bff962c5dd352ca4b9be',
        'fire': file
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('https://easystore-services.herokuapp.com/page/save', {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + document.cookie
        },
        body:formBody,
    }).then((response) => response.json())
        .then((responseData) => {
            if( responseData["status"] == "200"){
                    console.log("complete");
                    //document.cookie = responseData["token"];                 
            }
        }).catch(
            err => {
                console.log("128>" + err)
            }
        )
}