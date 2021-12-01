(this["webpackJsonpquality-lac-data-beta"]=this["webpackJsonpquality-lac-data-beta"]||[]).push([[0],{185:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),i=n(38),a=n.n(i),o=n(6),s=n(12),l=n(63),d=n(33),u=n(21),j=n(95),b=n(11),h=n.n(b),f=n(22),O=n(8),p=n(17),x="\n-----BEGIN RSA PUBLIC KEY-----\nMIICCgKCAgEAtIIMSI/vwErk16clFAE5BC6FrKeR3ihH8Hgjy6wATMrxXiOU1u9+\nYPCI1M17bECMey0XpnEtt0SJR8zhsqNlR4XT5NahhiKPLdrj35t0+/2hgyQ9C4Gm\njx/Y9hEdgD6yRbFhPIK22zE0Sadfxl3KxSy33Meh3UO6n47cGG4jhHmH5HF3+aI/\n7VFYaxTF2B4yrfX0PAwzI9nEsezX1H/P4SgwCicHtqt2EbhQ5OWNNpsboUVhF+sa\ninAWjN3cn4VLY9mQGdeISeVQrFFTS6kNrHZkeNxI846BGxeHV7OiPie4SiQby4h9\n1FOvQyjq37FbeX1eehiSbFYvuZ00Fh3wDNlKWDMYUV+U2nJQQX10c1pWRw3vfqgw\nOhGoYeXVe2/uM40nM333b5zErpCGy/gfTu4rhwUQx1ujiUdCkZiwy6UqduV1JOvD\n0JDpce+rXKw69JSxfof5x4DFEG2qk3bcD4SwiVyQBOiGmCYELXjGQamezm3xqnlg\nCBDwdIITa4Xxax3gIxG1nir86Idiy1OA4jXFPN5LESB1Ydvbd26roHrSdy027vAh\nfp17wHu2FOeGCoWN7fkHD8ncWZkYA61WOgwj9Q3K5VeBHJAS9puLda9TzS8NRR1B\na0Jal2jsQ7ISFw/eo//fdF9xnxTxuRCbj2+6QGvBpi2N8Z6O4yikBdECAwEAAQ==\n-----END RSA PUBLIC KEY-----\n",v=n(194),g=n(19),y=function(e,t){try{g.a(e,t)}catch(n){}};function m(e,t,n){return E.apply(this,arguments)}function E(){return(E=Object(f.a)(h.a.mark((function e(t,n,r){var c,i,a,o,s,l,d,u,j,b;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=window.pyodide,console.log("Passing uploaded data to Pyodide..."),o.globals.set("uploaded_files",t),o.globals.set("error_codes",n.filter((function(e){return e.selected})).map((function(e){return e.code}))),o.globals.set("metadata",r),s=[],e.prev=6,e.next=9,o.runPythonAsync('\n        from validator903.validator import Validator\n        from validator903.report import Report\n        from validator903.config import errors as configured_errors\n        from dataclasses import asdict\n        \n        validator = Validator(metadata.to_py(), uploaded_files.to_py())\n        result = validator.validate(error_codes.to_py())\n        print("Finished Validating")\n        \n        report = Report(result)\n        print("Created report")\n        \n        cr = report.child_report\n        print("Child report generated")\n        \n        js_files = {k: [t._asdict() for t in df.itertuples(index=True)] for k, df in validator.dfs.items()}\n        \n        error_definitions = {code: asdict(definition[0]) for code, definition in configured_errors.items()}\n\n        errors = {}\n        for row in report.child_report.itertuples():\n            errors.setdefault(row.Table, {}).setdefault(row.RowID, []).append(row.Code)\n                \n      ');case 9:e.next=18;break;case 11:e.prev=11,e.t0=e.catch(6),console.error("Caught Error!",e.t0),l=e.t0.toString(),y(e.t0,{pythonError:l}),d=l.split("\n"),s.push(d[d.length-2]);case 18:return u=null===(c=o.globals.get("js_files"))||void 0===c?void 0:c.toJs(),j=null===(i=o.globals.get("errors"))||void 0===i?void 0:i.toJs(),b=null===(a=o.globals.get("error_definitions"))||void 0===a?void 0:a.toJs(),console.log("Python calculation complete."),e.abrupt("return",[{data:u,errors:j,errorDefinitions:b},s]);case 23:case"end":return e.stop()}}),e,null,[[6,11]])})))).apply(this,arguments)}function C(){return S.apply(this,arguments)}function S(){return(S=Object(f.a)(h.a.mark((function e(){var t,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(t=window.pyodide)||void 0===t?void 0:t.runPython){e.next=16;break}return e.next=3,window.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.18.0/full/"});case 3:return window.pyodide=e.sent,e.next=6,window.pyodide.loadPackage(["micropip"]);case 6:return console.log("Loaded pyodide, now loading custom library..."),window.pyodide.globals.set("pc_pubkey",x),e.next=10,window.pyodide.runPythonAsync('\n      import os\n      os.environ["QLACREF_PC_KEY"] = pc_pubkey\n    ');case 10:return Object({NODE_ENV:"production",PUBLIC_URL:"/quality-lac-data-beta",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GA_MEASUREMENT_ID:"G-S8FK1TK7L9",REACT_APP_SENTRY_DSN:"https://befe29a929f64c6a96b3f7e8e0bb82ab@o108858.ingest.sentry.io/6075367",REACT_APP_VALIDATOR_RELEASE:"quality-lac-data-validator==0.2.0a2"}).REACT_APP_MICROPIP_MODULES&&(n=Object({NODE_ENV:"production",PUBLIC_URL:"/quality-lac-data-beta",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GA_MEASUREMENT_ID:"G-S8FK1TK7L9",REACT_APP_SENTRY_DSN:"https://befe29a929f64c6a96b3f7e8e0bb82ab@o108858.ingest.sentry.io/6075367",REACT_APP_VALIDATOR_RELEASE:"quality-lac-data-validator==0.2.0a2"}).REACT_APP_MICROPIP_MODULES.split(" "),window.pyodide.globals.set("micropip_extra_modules",n)),e.next=13,window.pyodide.runPythonAsync("\n      import micropip\n      import logging\n      logging.basicConfig(level=logging.INFO)\n     \n      await micropip.install('".concat("quality-lac-data-validator==0.2.0a2",'\')\n\n      try:\n        for mod in micropip_extra_modules:\n          print(f"Loading extra module from: {mod}")\n          await micropip.install(mod)\n      except NameError:\n        pass\n    '));case 13:console.log("Loaded custom libary."),e.next=17;break;case 16:console.log("Pyodide already loaded.");case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return _.apply(this,arguments)}function _(){return(_=Object(f.a)(h.a.mark((function e(){var t,n,r,c,i,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.pyodide,e.next=3,t.runPythonAsync("\n    from validator903.config import errors as configured_errors\n    all_error_definitions = [definition[0] for definition in configured_errors.values()]\n  ");case 3:n=window.pyodide.globals.get("all_error_definitions"),r=[],c=Object(u.a)(n);try{for(c.s();!(i=c.n()).done;)a=i.value,r.push({code:a.code,description:a.description,affectedFields:a.affected_fields,selected:!0})}catch(o){c.e(o)}finally{c.f()}return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D=n(1);function A(e){var t,n=e.childIds,r=e.selected,c=e.setSelected,i=[],a=Object(u.a)(n.sort((function(e,t){return e[0].toString().localeCompare(t[0].toString())})).entries());try{var s=function(){var e=Object(O.a)(t.value,2),n=e[0],a=Object(O.a)(e[1],2),s=a[0],l=a[1],d=s,u=null;s===r&&(d=null,u={backgroundColor:"#ccc"}),i.push(Object(D.jsx)(o.s.Row,{children:Object(D.jsxs)(o.s.Cell,{onClick:function(){return c(d)},style:u,children:[Object(D.jsx)("div",{style:{float:"left",paddingLeft:"10px"},children:s}),Object(D.jsx)("div",{style:{float:"right",fontSize:"0.8em",paddingRight:"10px"},children:l>0?"".concat(l," errors"):"OK"})]},n)},n))};for(a.s();!(t=a.n()).done;)s()}catch(l){a.e(l)}finally{a.f()}return Object(D.jsx)("div",{style:{overflowY:"scroll",height:"100vh"},children:Object(D.jsx)(o.s,{style:{fontSize:"1em"},children:i})})}var T,R="Header",k="CHILD",I=n(31),P=n(2),L=P.b.div(T||(T=Object(I.a)(["\ntable {\n  font-size: 14px;\n}\n\ntd {\n  padding: 5px;\n}\n\n.error {\n  color: #D8000C;\n  background-color: #FFD2D2;\n}\n"])));function F(e){var t=e.rowData,n=e.highlight,r=[],c=[];if(t&&t.length>0){var i,a=Object(u.a)(Array.from(t[0].keys()).entries());try{for(a.s();!(i=a.n()).done;){var s=Object(O.a)(i.value,2),l=s[0],d=s[1];r.push(Object(D.jsx)(o.s.CellHeader,{children:d},l))}}catch(_){a.e(_)}finally{a.f()}var j,b=Object(u.a)(t.entries());try{for(b.s();!(j=b.n()).done;){var h,f=Object(O.a)(j.value,2),p=f[0],x=f[1],v=[],g=Object(u.a)(Array.from(x.entries()).entries());try{for(g.s();!(h=g.n()).done;){var y=Object(O.a)(h.value,2),m=y[0],E=Object(O.a)(y[1],2),C=E[0],S=E[1],w=n&&n.has(JSON.stringify([x.get("Index"),C]));v.push(Object(D.jsx)(o.s.Cell,{className:w?"error":null,children:Number.isNaN(S)||void 0===S?"[null]":S.toString()},m))}}catch(_){g.e(_)}finally{g.f()}c.push(Object(D.jsx)(o.s.Row,{children:v},p))}}catch(_){b.e(_)}finally{b.f()}return Object(D.jsx)(L,{children:Object(D.jsxs)(o.s,{children:[Object(D.jsx)(o.s.Row,{children:r}),c]})})}return Object(D.jsx)(o.o,{children:"No data found for table."})}function N(e){var t=e.tableData,n=e.errorLocations,c=e.excludedTable,i=Object(r.useState)(0),a=Object(O.a)(i,2),s=a[0],l=a[1],d=Array.from(t.keys()).filter((function(e){return e!==c}));d.sort();var u=Array.from(d.entries()).map((function(e){var t=Object(O.a)(e,2),n=t[0],r=t[1];return Object(D.jsx)(o.t.Tab,{onClick:function(){return l(n)},selected:s===n,children:r},n)})),j=Array.from(d.entries()).map((function(e){var r=Object(O.a)(e,2),c=r[0],i=r[1];return Object(D.jsx)(o.t.Panel,{selected:s===c,style:{overflowX:"auto"},children:Object(D.jsx)(F,{rowData:t.get(i),highlight:n.get(i)})},c)}));return Object(D.jsxs)(o.t,{children:[Object(D.jsx)(o.t.Title,{children:"Upload"}),Object(D.jsx)(o.t.List,{children:u}),j]})}var M,H=n(90),V=P.b.div(M||(M=Object(I.a)(["\n.floatingContainer {\n  display: block;\n  position: relative;\n  padding: 10px 10px;\n  top: 0;\n  left: 100px;\n  width: 300px;\n  height: 300px;\n  margin-top: 5px;\n  margin-bottom: -327px;\n  border: 1px solid black;\n  background-color: #fff;\n  font-size: 10px;\n}  \n\n.floatingClose {\n  cursor: pointer;\n  float: right;\n  position: relative;\n  top: -23px;\n  left: 10px;\n}\n\ninput {\n  height: 13px;\n  width: 180px;\n}\n\n.errorFilter {\n  height: 250px;\n  overflow-y: scroll;\n  padding-right: 10px;\n}\n\ntable {\n  font-size: 10px;\n}\n\n.selectedError {\n  background-color: #ccc;\n}\n"])));function U(e){var t=e.validatedData,n=e.setChildFilter,c=e.setErrorFilter,i=e.setShown,a=e.innerRef,s=Object(r.useState)(""),l=Object(O.a)(s,2),d=l[0],u=l[1],j=Object(r.useState)(null),b=Object(O.a)(j,2),h=b[0],f=b[1],p=Object(r.useMemo)((function(){var e=new Map;t.errors.forEach((function(t){t.forEach((function(t){t.forEach((function(t){e.set(t,e.get(t)?e.get(t)+1:1)}))}))}));var n=Array.from(e.entries());return n.sort((function(e,t){var n=Object(O.a)(e,2)[1];return Object(O.a)(t,2)[1]-n})),n.map((function(e){var n=Object(O.a)(e,2),r=n[0],c=n[1],i=t.errorDefinitions.get(r),a=r===h;return Object(D.jsxs)(o.s.Row,{className:a?"selectedError":null,onClick:function(){return f(a?null:r)},children:[Object(D.jsx)(o.s.Cell,{children:r}),Object(D.jsx)(o.s.Cell,{children:null===i||void 0===i?void 0:i.get("description")}),Object(D.jsx)(o.s.Cell,{children:c})]},r)}))}),[t,h]);Object(r.useEffect)((function(){n(d)}),[d,n]),Object(r.useEffect)((function(){c(h)}),[h,c]);var x=Object(r.useCallback)((function(){u(""),f(null)}),[u]);return Object(D.jsx)(V,{children:Object(D.jsxs)("div",{ref:a,className:"floatingContainer",children:[Object(D.jsx)(H.DebounceInput,{minLength:2,debounceTimeout:150,onChange:function(e){return u(e.target.value)},value:d,placeholder:"Enter a child ID to filter..."}),Object(D.jsx)("span",{onClick:function(){return i(!1)},className:"floatingClose",children:"[x]"}),Object(D.jsx)("button",{style:{float:"right"},onClick:x,children:"Clear filters"}),Object(D.jsx)("p",{children:"Click each row to filter for only that error type."}),Object(D.jsx)("div",{className:"errorFilter",children:Object(D.jsxs)(o.s,{children:[Object(D.jsxs)(o.s.Row,{children:[Object(D.jsx)(o.s.CellHeader,{children:"Code"}),Object(D.jsx)(o.s.CellHeader,{children:"Message"}),Object(D.jsx)(o.s.CellHeader,{children:"Count"})]}),p]})})]})})}function B(e){var t=e.validatedData,n=Object(r.useState)(null),c=Object(O.a)(n,2),i=c[0],a=c[1],s=Object(r.useState)(null),l=Object(O.a)(s,2),d=l[0],j=l[1],b=Object(r.useState)(null),p=Object(O.a)(b,2),x=p[0],v=p[1],g=Object(r.useState)(!1),y=Object(O.a)(g,2),m=y[0],E=y[1],C=Object(r.useRef)(null);Object(r.useEffect)((function(){return window.scrollTo(0,0)}),[]),Object(r.useEffect)((function(){var e=function(){var e=Object(f.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.current&&!C.current.contains(t.target)&&E(!1);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}),[C]);var S=Object(r.useMemo)((function(){var e=new Map;return t.data.forEach((function(n,r){e.set(r,function(e,t,n){var r,c=[];return null===(r=e.get(n))||void 0===r||r.forEach((function(e){e.get(k)===t&&c.push(e)})),c}(t.data,x,r))})),e}),[t,x]),w=Object(r.useMemo)((function(){var e=new Map;return t.errors.forEach((function(n,r){var c=new Set;n.forEach((function(e,n){e.forEach((function(e){var r;(null===(r=t.errorDefinitions.get(e))||void 0===r?void 0:r.get("affected_fields")).forEach((function(e){c.add(JSON.stringify([n,e]))}))}))})),e.set(r,c)})),e}),[t]),_=Object(r.useMemo)((function(){var e=function(e){var t=e.data,n=e.errors,r=new Map;return t.forEach((function(e,t){e.forEach((function(e){var c,i=e.get(k);r.has(i)||r.set(i,[]);var a=e.get("Index"),o=null===(c=n.get(t))||void 0===c?void 0:c.get(a);o&&o.forEach((function(e){var t;return null===(t=r.get(i))||void 0===t?void 0:t.push(e)}))}))})),r}(t);return Array.from(e.entries())}),[t]),T=Object(r.useMemo)((function(){var e,t=[],n=Object(u.a)(_);try{for(n.s();!(e=n.n()).done;){var r=Object(O.a)(e.value,2),c=r[0],a=r[1].filter((function(e){return!d||e===d})).length;(!i||c.toString().includes(i))&&(!d||a>0)&&t.push([c,a])}}catch(o){n.e(o)}finally{n.f()}return t}),[_,i,d]),I=Object(r.useMemo)((function(){var e=function(e,t){var n=e.data,r=e.errors;if(!t)return[];var c=[];return n.forEach((function(e,n){e.forEach((function(e){if(e.get(k)===t){var i,a=e.get("Index"),o=null===(i=r.get(n))||void 0===i?void 0:i.get(a);o&&o.forEach((function(e){return c.push(e)}))}}))})),c}(t,x),n=function(e){var n=t.errorDefinitions.get(e);return"Error ".concat(null===n||void 0===n?void 0:n.get("code")," - ").concat(null===n||void 0===n?void 0:n.get("description"))};return Array.from(e.entries()).map((function(e){var t=Object(O.a)(e,2),r=t[0],c=t[1];return Object(D.jsx)(o.m,{style:{fontSize:"1em"},children:n(c)},r)}))}),[t,x]);return Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)(o.h,{mb:5,children:[Object(D.jsxs)(o.g,{setWidth:"200px",children:[Object(D.jsxs)("div",{children:[Object(D.jsx)(o.j,{mb:8,style:{display:"inline",marginRight:"10px"},children:"Child ID"}),Object(D.jsx)("button",{onClick:function(e){e.stopPropagation(),E(!m)},style:{display:"inline",backgroundColor:i||d?"#a7c2d1":void 0},children:"Filter"})]}),m&&Object(D.jsx)(U,{innerRef:C,validatedData:t,setChildFilter:a,setErrorFilter:j,setShown:E}),Object(D.jsx)(A,{childIds:T,selected:x,setSelected:v})]}),Object(D.jsx)(o.g,{children:x?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsxs)("div",{style:{width:"50%"},children:[Object(D.jsx)(o.j,{children:"Header"}),Object(D.jsx)(F,{rowData:S.get(R),highlight:w.get(R)})]}),Object(D.jsx)(o.q,{mb:9}),Object(D.jsx)(N,{tableData:S,errorLocations:w,excludedTable:R}),I.length>0?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(o.j,{children:"Errors"}),Object(D.jsx)(o.u,{style:{fontSize:"1em"},children:I})]}):Object(D.jsx)(D.Fragment,{})]}):Object(D.jsx)(o.b,{children:"Select a child..."})})]})})}var K,W,Y=n(94),G=P.b.div(K||(K=Object(I.a)(["\n  border: 2px dashed #999999;\n  padding: 5px;\n  color: #666666;\n\n  ul, li {\n    color: #666666;\n  }\n"])));function X(e){var t=e.onFiles,n=e.description,c=e.accept,i=e.displayedFiles,a=Object(r.useState)(),s=Object(O.a)(a,2),l=s[0],u=s[1],j=Object(r.useCallback)((function(e,r){t({description:n,acceptedFiles:e}),r.forEach((function(e){u(e.errors[0].message)}))}),[u,n,t]),b=Object(Y.a)({onDrop:j,accept:c}),h=b.getRootProps,f=b.getInputProps,p=b.isDragActive;return Object(D.jsxs)(G,Object(d.a)(Object(d.a)({},h()),{},{children:[Object(D.jsx)("input",Object(d.a)({},f())),i.length>0&&Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(o.o,{mb:1,children:"Located files (click to add more):"}),Object(D.jsx)(o.u,{mb:1,children:i.map((function(e){return Object(D.jsx)(o.m,{children:e.name},e.name)}))})]}),l?Object(D.jsx)("p",{style:{color:"red"},children:l}):p?Object(D.jsx)("p",{children:"Drop the files here ..."}):0===i.length?Object(D.jsx)("p",{children:"Drag and drop some files here, or click to select files"}):null]}))}var Q=P.b.div(W||(W=Object(I.a)(["\n.disabled {\n  opacity: 50%;\n  pointer-events: none;\n}\n\n.disabledMode {\n  opacity: 50%;\n  pointer-events: none;\n  text-decoration: line-through;\n}\n"])));function q(e){var t=e.currentFiles,n=e.addFileContent,c=e.uploadErrors,i=(e.selectedErrors,e.setSelectedErrors,Object(r.useState)("csv")),a=Object(O.a)(i,2),s=a[0],l=a[1],d=Object(r.useCallback)((function(e){var t=e.description;e.acceptedFiles.forEach((function(e){var r=new FileReader;r.onabort=function(){return console.log("File reading failed.")},r.onerror=function(){return console.log("File reading error.")},r.onload=function(){var c=r.result;console.log("Finished reading (".concat(t,") file ").concat(e.name,".")),n({name:e.name,description:t,fileText:c})},r.readAsArrayBuffer(e)}))}),[n]);return Object(D.jsxs)(Q,{children:[Object(D.jsx)(o.o,{children:"This tool will not send loaded data to any third party. It uses the browser as an application to locate files in your computer and run scripts on them to identify errors, as defined in the 2021 to 2022 SSDA903 Validation Checks specification. Once the browser is loaded, you can locate the files and run the validation offline."}),Object(D.jsxs)(o.d,{summary:"Instructions",children:[Object(D.jsx)("b",{children:"1."})," Add your files to the loading boxes below. If using CSV's, you can validate with any or all of the tables, but validation checks which are missing the necessary data will not run.",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"2."})," Select your Local Authority and the relevant Collection Year.",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"3."})," If you only want to only run the validation for certain rules, use the Validation Rules dropdown to select the ones you want.",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"4."})," Click ",Object(D.jsx)("b",{children:"'Validate'"})," to run the selected checks. When complete, the Error Display screen will appear.",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"5."})," On the Error Display screen:",Object(D.jsxs)("ul",{children:[Object(D.jsxs)("li",{children:[" Use the ",Object(D.jsx)("b",{children:"'Child ID'"})," sidebar to select individual children. "]}),Object(D.jsx)("li",{children:" Use the tabs to see the selected Child ID's data in a particular module. Cells with errors are highlighted in red. "}),Object(D.jsxs)("li",{children:[" If you click the ",Object(D.jsx)("b",{children:"'Filter'"})," button, you can type to search for a Child ID, or scroll down and click to display only children with a particular error. "]}),Object(D.jsxs)("li",{children:[" To download the Error Report spreadsheet, scroll to the bottom of the page and click the ",Object(D.jsx)("b",{children:"'Download Error Reports'"})," button"]})]})]}),Object(D.jsxs)(o.t,{children:[Object(D.jsx)(o.t.Title,{children:"Locate"}),Object(D.jsxs)(o.t.List,{children:[Object(D.jsx)(o.t.Tab,{onClick:function(){return l("csv")},selected:"csv"===s,className:"csv"!==s&&t.length>0?"disabledMode":null,children:"CSV Files"}),Object(D.jsx)(o.t.Tab,{onClick:function(){return l("xml")},selected:"xml"===s,className:"xml"!==s&&t.length>0?"disabledMode":null,children:"XML Files (Experimental)"})]}),Object(D.jsxs)(o.t.Panel,{selected:"csv"===s,children:[Object(D.jsxs)(o.d,{summary:"Show required CSV headers",children:[Object(D.jsx)("b",{children:"Header:"})," ",Object(D.jsx)("br",{}),"CHILD,SEX,DOB,ETHNIC,UPN,MOTHER,MC_DOB",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Episodes:"})," ",Object(D.jsx)("br",{})," CHILD,DECOM,RNE,LS,CIN,PLACE,PLACE_PROVIDER,DEC,REC,REASON_PLACE_CHANGE,HOME_POST,PL_POST,URN",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"UASC:"}),Object(D.jsx)("br",{}),"  CHILD,SEX,DOB,DUC",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Outcomes (OC2):"}),Object(D.jsx)("br",{})," CHILD,DOB,SDQ_SCORE,SDQ_REASON,CONVICTED,HEALTH_CHECK,IMMUNISATIONS,TEETH_CHECK,HEALTH_ASSESSMENT,SUBSTANCE_MISUSE,INTERVENTION_RECEIVED,INTERVENTION_OFFERED",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Adoption (AD1):"}),Object(D.jsx)("br",{}),"  CHILD,DOB,DATE_INT,DATE_MATCH,FOSTER_CARE,NB_ADOPTR,SEX_ADOPTR,LS_ADOPTR",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Should be Placed for Adoption:"}),Object(D.jsx)("br",{}),"  CHILD,DOB,DATE_PLACED,DATE_PLACED_CEASED,REASON_PLACED_CEASED",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Care Leavers (OC3): "}),Object(D.jsx)("br",{})," CHILD,DOB,IN_TOUCH,ACTIV,ACCOM",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Reviews:"}),Object(D.jsx)("br",{}),"  CHILD,DOB,REVIEW,REVIEW_CODE",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Previous Permanence:"})," ",Object(D.jsx)("br",{})," CHILD,DOB,PREV_PERM,LA_PERM,DATE_PERM",Object(D.jsx)("br",{}),Object(D.jsx)("br",{}),Object(D.jsx)("b",{children:"Missing:"}),Object(D.jsx)("br",{}),"  CHILD,DOB,MISSING,MIS_START,MIS_END"]}),Object(D.jsxs)(o.h,{children:[Object(D.jsxs)(o.g,{children:[Object(D.jsx)(o.k,{children:"This year"}),Object(D.jsx)(X,{description:"This year (CSV)",onFiles:d,accept:".csv",displayedFiles:t.filter((function(e){return"This year (CSV)"===e.description}))})]}),Object(D.jsxs)(o.g,{setWidth:"one-half",className:t.length>0?null:"disabled",children:[Object(D.jsx)(o.k,{children:"Previous year"}),Object(D.jsx)(X,{description:"Prev year (CSV)",onFiles:d,accept:".csv",displayedFiles:t.filter((function(e){return"Prev year (CSV)"===e.description}))})]})]})]}),Object(D.jsx)(o.t.Panel,{selected:"xml"===s,children:Object(D.jsxs)(o.h,{children:[Object(D.jsxs)(o.g,{children:[Object(D.jsx)(o.k,{children:"This year"}),Object(D.jsx)(X,{description:"This year (XML)",onFiles:d,accept:".xml",displayedFiles:t.filter((function(e){return"This year (XML)"===e.description}))})]}),Object(D.jsxs)(o.g,{setWidth:"one-half",className:t.length>0?null:"disabled",children:[Object(D.jsx)(o.k,{children:"Previous year"}),Object(D.jsx)(X,{description:"Prev year (XML)",onFiles:d,accept:".xml",displayedFiles:t.filter((function(e){return"Prev year (XML)"===e.description}))})]})]})})]}),c.length>0?Object(D.jsx)(o.d,{summary:"Errors",open:!0,children:Array.from(c.entries(),(function(e){var t=Object(O.a)(e,2),n=t[0],r=t[1];return Object(D.jsx)(o.e,{children:r.toString()},n)}))}):null]})}var z=n(65),J=n(66),Z=n.n(J),$=function(){var e=Object(f.a)(h.a.mark((function e(t){var n,r,c,i,a,o,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=Z()().format("YYYYMMDD-HHmmss"),r="ChildErrorSummary"===t?"children":"errors",c=window.pyodide;try{i=c.globals.get("report"),a=i.csv_report(r),o=new Blob([a],{type:"text/csv"}),i.destroy(),Object(z.saveAs)(o,"".concat(t,"-").concat(n,".csv"))}catch(l){console.error("Caught Error!",l),s=l.toString(),y(l,{pythonError:s})}case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee=n(92).map((function(e){return{la_id:e.UTLA21CD,la_name:e.UTLA21NM}})).reduce((function(e,t){return e[t.la_id]=t,e}),{}),te=Object.values(ee).sort((function(e,t){return e.la_name>t.la_name?1:-1})),ne=function(){var e;window.gtag&&(e=window).gtag.apply(e,arguments)},re=function(e,t,n,r){ne("event",e,{event_category:t,event_label:n,value:r})};function ce(){var e=Object(r.useState)("Loading Python initially (takes around 30 seconds)..."),t=Object(O.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)([]),a=Object(O.a)(i,2),s=a[0],l=a[1],b=Object(r.useState)([]),p=Object(O.a)(b,2),x=p[0],v=p[1],g=Object(r.useState)(),y=Object(O.a)(g,2),E=y[0],S=y[1],_=Object(r.useState)([]),A=Object(O.a)(_,2),T=A[0],R=A[1],k=Object(r.useState)(te[0].la_id),I=Object(O.a)(k,2),P=I[0],L=I[1],F=Object(r.useMemo)((function(){return function(e){var t=new Date,n=t.getFullYear();t.getMonth()<4&&(n-=1);for(var r=[n],c=1;c<e;c++)r.push(n-c);return r.map((function(e){return"".concat(e,"/").concat((e+1)%100)}))}(5)}),[]),N=Object(r.useState)(F[0]),M=Object(O.a)(N,2),H=M[0],V=M[1];Object(r.useEffect)((function(){Object(f.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:return re("pyodide","loaded"),e.next=5,w();case 5:t=e.sent,R(t),c("");case 8:case"end":return e.stop()}}),e)})))()}),[]);var U=Object(r.useCallback)((function(e){re("click","addFile"),s.push(e),l(Object(j.a)(s))}),[s]),K=Object(r.useCallback)((function(){re("click","clear"),v([]),S(null),l([])}),[]),W=Object(r.useCallback)(Object(f.a)(h.a.mark((function e(){var t,n,r,i,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return re("click","validate"),v([]),c("Loading postcode file (initial load takes 60 seconds)..."),t={localAuthority:P,collectionYear:H},c("Running validation..."),e.next=7,m(s,T,t);case 7:n=e.sent,r=Object(O.a)(n,2),i=r[0],0===(a=r[1]).length?S(i):(K(),v(a)),c("");case 13:case"end":return e.stop()}}),e)}))),[s,T,K,P,H]),Y=Object(r.useCallback)(Object(f.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(re("click","download"),!E){e.next=6;break}return e.next=4,$("ErrorCounts");case 4:return e.next=6,$("ChildErrorSummary");case 6:case"end":return e.stop()}}),e)}))),[E]),G=Object(r.useCallback)((function(e){var t,n=[],r=Object(u.a)(T);try{for(r.s();!(t=r.n()).done;){var c=t.value,i=Object(d.a)({},c);i.code===e.code&&(i.selected=!i.selected),n.push(i)}}catch(a){r.e(a)}finally{r.f()}R(n)}),[T,R]),X=Object(r.useCallback)((function(e){var t,n=[],r=Object(u.a)(T);try{for(r.s();!(t=r.n()).done;){var c=t.value,i=Object(d.a)({},c);i.selected=e,n.push(i)}}catch(a){r.e(a)}finally{r.f()}R(n)}),[T,R]);Object(r.useEffect)((function(){var e=window.localStorage.getItem("localAuthority");if(e&&te.some((function(t){return t.la_id===e}))){var t=te.find((function(t){return t.la_id===e}));re("la_select","localStore",(null===t||void 0===t?void 0:t.la_name)||e),L(e)}}),[L]);var Q=Object(r.useCallback)((function(e){var t=te.find((function(t){return t.la_id===e.target.value}));re("la_select","user",(null===t||void 0===t?void 0:t.la_name)||e.target.value),L(e.target.value),window.localStorage.setItem("localAuthority",e.target.value)}),[L]);return Object(D.jsxs)(D.Fragment,{children:[E?Object(D.jsx)(B,{validatedData:E}):Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(q,{currentFiles:s,addFileContent:U,uploadErrors:x,selectedErrors:T,setSelectedErrors:R}),Object(D.jsx)(o.r,{input:{value:H,onChange:function(e){return V(e.target.value)}},label:"Collection Year",mb:4,children:F.map((function(e){return Object(D.jsx)("option",{value:e,children:e},e)}))}),Object(D.jsx)(o.r,{input:{value:P||void 0,onChange:Q},label:"Local Authority",mb:4,children:te.map((function(e){var t=e.la_id,n=e.la_name;return Object(D.jsx)("option",{value:t,children:n},t)}))}),Object(D.jsx)(o.o,{children:"We ask you to select your Local Authority to enable proper postcode validation within the tool, and to allow us to count how many distinct LAs have used the tool. We never name LAs in this aggregate reporting."})]}),Object(D.jsxs)(ie,{loading:n,children:[Object(D.jsxs)(o.d,{summary:"Validation Rules (".concat(T.filter((function(e){return e.selected})).length," selected, ").concat(T.filter((function(e){return!e.selected})).length," unselected)"),children:[Object(D.jsx)(o.a,{onClick:function(){return X(!0)},children:"Select All "})," ",Object(D.jsx)(o.a,{onClick:function(){return X(!1)},children:"Deselect All "}),T.map((function(e){return Object(D.jsxs)(o.c,{checked:e.selected,onChange:function(){return G(e)},children:[e.code," - ",e.description]},e.code)}))]}),Object(D.jsx)("div",{style:{marginRight:"10%",display:"inline"},children:Object(D.jsx)(o.a,{onClick:W,children:"Validate"})}),Object(D.jsx)("div",{style:{marginRight:"10%",display:"inline"},children:Object(D.jsx)(o.a,{onClick:K,children:"Clear Data and Start Again"})}),Object(D.jsx)("div",{style:{marginRight:"10%",display:"inline"},children:E?Object(D.jsx)(o.a,{onClick:Y,children:"Download Error Reports"}):Object(D.jsx)(o.a,{buttonColour:"gray",disabled:!0,children:"Download Error Reports"})})]})]})}function ie(e){var t=e.children,n=e.loading;return n?Object(D.jsxs)("div",{style:{position:"relative",pointerEvents:"none"},children:[Object(D.jsxs)("div",{style:{width:"100%",position:"absolute",display:"flex",justifyContent:"center",flexWrap:"wrap"},children:[Object(D.jsx)("div",{style:{width:"100%",textAlign:"center",height:"25px",fontSize:"24px"},children:n}),Object(D.jsx)(p.e,{style:{width:"50px",height:"50px",display:"block"}})]}),Object(D.jsx)("div",{style:{opacity:"30%"},children:t})]}):t}function ae(){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(o.o,{children:"Data to Insight is a national project led by local authorities with support from the ADCS, DLUHC, DfE and Ofsted to help local authorities make better use of data. "}),Object(D.jsx)(o.o,{children:"This tool was developed by local authority data analysts, supported by technical expertise from our friends at Social Finance. It will let you perform the same kinds of data validation as the DfE\u2019s SSDA903 statutory data submission tool. You can run this tool at any time, using your year-to-date extract of SSDA903 data. We recommend a monthly data checking cycle."}),Object(D.jsx)(o.o,{children:"Click Start to begin."}),Object(D.jsx)(o.a,{start:!0,as:l.a,to:"/application",children:"Start"})]})}var oe=function(){return Object(D.jsxs)(s.a,{children:[Object(D.jsx)(o.f,{}),Object(D.jsxs)(o.n.WidthContainer,{style:{height:"100vh",width:"75%",maxWidth:"none"},children:[Object(D.jsxs)(o.p,{level:"beta",children:["This is a new service - ",Object(D.jsx)(o.l,{href:"mailto:datatoinsight.enquiries@gmail.com",children:"your feedback can help us improve it."})]}),Object(D.jsxs)(o.n.Main,{children:[Object(D.jsx)(o.i,{children:"SSDA903 Data Validation Service"}),Object(D.jsxs)(s.d,{children:[Object(D.jsx)(s.b,{path:"/application",component:ce}),Object(D.jsx)(s.b,{exact:!0,path:"/",component:ae})]})]})]})]})};n(184);!function(){try{!function(){var e="https://befe29a929f64c6a96b3f7e8e0bb82ab@o108858.ingest.sentry.io/6075367";v.a({dsn:e})}()}catch(e){console.error("Failed to initialise Sentry")}}(),function(){var e="G-S8FK1TK7L9";var t="ga-script-include";if(!document.getElementById(t)){var n=document.createElement("script");n.id=t,n.async=!0,n.src="https://www.googletagmanager.com/gtag/js?id=".concat(e),document.head.append(n);var r=document.createElement("script");r.innerHTML="\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '".concat(e,"')"),document.head.append(r)}}(),ne("pageview"),a.a.render(Object(D.jsx)(c.a.StrictMode,{children:Object(D.jsx)(oe,{})}),document.getElementById("root"))}},[[185,1,2]]]);
//# sourceMappingURL=main.9aaded3b.chunk.js.map