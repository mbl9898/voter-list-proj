(this["webpackJsonpji-voters-list-ts-v2.3"]=this["webpackJsonpji-voters-list-ts-v2.3"]||[]).push([[0],{118:function(e,t,n){},119:function(e,t,n){"use strict";n.r(t);var a,r=n(5),c=n(24),s=n.n(c),i=(n(93),n(40)),o=(n(94),n(19)),l=n.n(o),d=n(35),u=n(125),j=n(136),b=n(131),p=n(133),f=n(126),h=n(33),x=n(8),m=n(59),O=n.n(m),g=n(64),v=Object(g.b)({name:"app",initialState:{data:[],headings:[],currentUser:null,loading:!0,isListDisplay:!1,isDataLoading:!1,isSignUpFormDisplay:!1,isLogInFormDisplay:!0,isAccessDeniedDisplay:!1,error:"",alert:""},reducers:{setData:function(e,t){e.data=t.payload},setHeadings:function(e,t){e.headings=t.payload},setCurrentUser:function(e,t){e.currentUser=t.payload},setLoading:function(e,t){e.loading=t.payload},setIsListDisplay:function(e,t){e.isListDisplay=t.payload},setIsDataLoading:function(e,t){e.isDataLoading=t.payload},setIsSignUpFormDisplay:function(e,t){e.isSignUpFormDisplay=t.payload},setIsLogInFormDisplay:function(e,t){e.isLogInFormDisplay=t.payload},setIsAccessDeniedDisplay:function(e,t){e.isAccessDeniedDisplay=t.payload},setError:function(e,t){e.error=t.payload},setAlert:function(e,t){e.alert=t.payload}}}),y=Object(g.a)({reducer:{app:v.reducer}}),N=v.actions,w=N.setData,k=N.setHeadings,D=N.setCurrentUser,S=N.setError,C=N.setAlert,L=N.setIsAccessDeniedDisplay,A=N.setIsListDisplay,F=N.setIsDataLoading,I=N.setIsLogInFormDisplay,U=N.setIsSignUpFormDisplay,B=(N.setLoading,Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API_BASE_URL),P=["S No","Block Code","Constituency Name","Moza","Dehya","City","Patwar Halka","Tapaydar","Tehseel","Talka","District","Union Council","Book No","Constituency","Gender","Vote S No","Family No","Name","Marital Status","Father|Husband Name","NIC","Age","House No","Street","Phase","Sector","Lane","Boulevard|Avenue","Other Area","Count","Address"],H=function(e){if(e){var t=e;return t.forEach((function(e,n){t[n].Address="\n        ".concat("-"===e["House No"]?"":"House:"," \n        ").concat("-"===e["House No"]?"":e["House No"]," \n        ").concat("-"===e.Street?"":"Street:"," \n        ").concat("-"===e.Street?"":e.Street," \n        ").concat("-"===e.Phase?"":e.Phase," \n        ").concat("-"===e.Sector?"":"Sector:"," \n        ").concat("-"===e.Sector?"":e.Sector," \n        ").concat("-"===e.Lane?"":"Lane:"," \n        ").concat("-"===e.Lane?"":e.Lane,"\n        ").concat("-"===e["Boulevard|Avenue"]?"":e["Boulevard|Avenue"],"\n        ").concat("-"===e["Other Area"]?"":e["Other Area"],"\n        ").concat("-"===e.City?"":e.City)})),t}},R=function(){var e=Object(d.a)(l.a.mark((function e(t,n){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=localStorage.getItem("token"),r=O.a.create({baseURL:B+"votesData",timeout:5e5,headers:{"x-api-key":"SG.cpdcjwepcjio",authorization:"bearer ".concat(a)}}),"dataViewer"!==n.role){e.next=7;break}return e.next=5,r.get("/").then(function(){var e=Object(d.a)(l.a.mark((function e(n){var a,r,c,s,i,o,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(n,"voteRes"),!n.data.success){e.next=16;break}if(a=n.data.votesData,!(r=H(a))){e.next=16;break}return(c=r.filter((function(e){return"-"!==e.Name}))).splice(1237,75),e.next=9,t(w(c));case 9:(s=Object.keys(r[0])).sort((function(e,t){return P.indexOf(e)-P.indexOf(t)})),i=s.filter((function(e){return"S No"!==e})),o=i.filter((function(e){return"Count"!==e})),d=o.filter((function(e){return"_id"!==e})),t(k(d)),t(F(!1));case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:e.next=11;break;case 7:t(I(!1)),t(L(!0)),console.log("You Are Not Allowed To Access Data"),t(F(!1));case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),T=function(){var e=Object(d.a)(l.a.mark((function e(t,n,a,r,c,s){var i,o,d,u,j;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s(""),console.log(B),i=O.a.create({baseURL:B+"auth",timeout:5e3,headers:{"x-api-key":"SG.cpdcjwepcjio"}}),!a.current){e.next=7;break}if(!r.current){e.next=7;break}if(a.current.value===r.current.value){e.next=7;break}return e.abrupt("return",s("Passwords do not match"));case 7:return e.next=9,i.post("register",{username:t.current.value,email:n.current.value,password:a.current.value,confirmPassword:r.current.value}).catch((function(e){return console.log(e)}));case 9:if(o=e.sent){console.log("SignUp Res",o);try{o.data.success&&(c(D(Object(x.a)({email:n.current.value,uid:o.data.data._id},o.data.data))),localStorage.setItem("token",o.data.data.access_token),c(U(!1))),o.data.success||o.data.error&&(o.data.error.message&&(d=o.data.error.message),o.data.error.details&&(o.data.error.details.email&&(u=o.data.error.details.email[0]),o.data.error.details.password&&(j=o.data.error.details.password[0])),s("".concat(void 0!==d?d:""," \n            ").concat(void 0!==u?u:""," \n \n            ").concat(void 0!==j?j:"")))}catch(l){console.log(l)}}else console.log(o,"SignUp Res Error");case 11:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,s){return e.apply(this,arguments)}}(),E=function(){var e=Object(d.a)(l.a.mark((function e(t,n,a,r,c,s){var i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=O.a.create({baseURL:B+"auth/",timeout:5e3,headers:{"x-api-key":"SG.cpdcjwepcjio"}}),e.next=3,i.post("login",{email:t,password:n,remember_me:!1}).catch((function(e){return console.log(e)}));case 3:if(o=e.sent,r(!1),!o){e.next=24;break}if(console.log(o,"LoginRes"),e.prev=7,!o.data.success){e.next=16;break}return e.next=11,localStorage.setItem("token",o.data.data.access_token);case 11:return e.next=13,a(D(Object(x.a)({},o.data.data.userData)));case 13:a(I(!1)),e.next=17;break;case 16:throw c;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(7),o.data.error&&s(o.data.error.message);case 22:e.next=25;break;case 24:console.log(o,"Login Res Error");case 25:case"end":return e.stop()}}),e,null,[[7,19]])})));return function(t,n,a,r,c,s){return e.apply(this,arguments)}}(),_=function(){var e=Object(d.a)(l.a.mark((function e(t,n){var a,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=localStorage.getItem("token"),S(""),r=O.a.create({baseURL:B+"logout",timeout:5e3,headers:{"x-api-key":"SG.cpdcjwepcjio",authorization:"bearer ".concat(a)}}),e.prev=3,e.next=6,r.post("/",{userId:t,accessToken:"bearer ".concat(a)});case 6:c=e.sent,console.log(c),c.data.success?(n(D(null)),n(L(!1)),n(I(!0))):(n(C("Failed to log out")),setTimeout((function(){n(C(""))}),5e3)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),S("Failed to log out");case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t,n){return e.apply(this,arguments)}}(),q=n(4),z=function(e){var t=e.variant,n=void 0===t?"primary":t;return Object(q.jsx)(q.Fragment,{children:Object(q.jsxs)("div",{className:"text-center",style:{display:"flex",height:"warning"!==n?"100vh":"",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[Object(q.jsx)("div",{className:"spinner-border text-".concat(n),role:"status",children:Object(q.jsx)("span",{className:"visually-hidden",children:"Loading..."})}),"warning"!==n&&Object(q.jsx)("h5",{className:"mt-4 ms-2 text-primary",children:"Loading..."})]})})},G=function(){var e=Object(r.useRef)(),t=Object(r.useRef)(),n=Object(r.useRef)(),a=Object(r.useRef)(),c=Object(r.useState)(""),s=Object(i.a)(c,2),o=s[0],x=s[1],m=Object(r.useState)(!1),O=Object(i.a)(m,2),g=O[0],v=O[1],y=Object(h.b)(),N=function(){var r=Object(d.a)(l.a.mark((function r(c){return l.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c.preventDefault(),v(!0),r.next=4,T(e,t,n,a,y,x);case 4:v(!1);case 5:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return Object(q.jsx)(q.Fragment,{children:Object(q.jsx)(u.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:Object(q.jsxs)("div",{className:"",style:{maxWidth:"400px"},children:[Object(q.jsx)(j.a,{children:Object(q.jsxs)(j.a.Body,{children:[Object(q.jsx)("h2",{className:"text-center mb-4",children:"Sign Up"}),o&&Object(q.jsx)(b.a,{variant:"danger",children:o}),Object(q.jsxs)(p.a,{onSubmit:N,children:[Object(q.jsxs)(p.a.Group,{id:"userName",children:[Object(q.jsx)(p.a.Label,{children:"User Name"}),Object(q.jsx)(p.a.Control,{type:"text",ref:e,required:!0})]}),Object(q.jsxs)(p.a.Group,{id:"email",children:[Object(q.jsx)(p.a.Label,{children:"Email"}),Object(q.jsx)(p.a.Control,{type:"email",ref:t,required:!0})]}),Object(q.jsxs)(p.a.Group,{id:"password",children:[Object(q.jsx)(p.a.Label,{children:"Password"}),Object(q.jsx)(p.a.Control,{type:"password",ref:n,required:!0})]}),Object(q.jsxs)(p.a.Group,{id:"password-confirm",children:[Object(q.jsx)(p.a.Label,{children:"Password Confirmation"}),Object(q.jsx)(p.a.Control,{className:"mb-2",type:"password",ref:a,required:!0})]}),Object(q.jsxs)(f.a,{disabled:g,className:"w-100",type:"submit",children:["Sign Up",g&&Object(q.jsx)(z,{variant:"warning"})]})]})]})}),Object(q.jsxs)("div",{className:"w-100 text-center mt-2",children:["Already have an account?"," ",Object(q.jsx)("button",{className:"btn btn-primary",onClick:function(){y(U(!1)),y(I(!0))},children:"Login"})]})]})})})},V=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(),n=Object(r.useState)(""),a=Object(i.a)(n,2),c=a[0],s=a[1],o=Object(r.useState)(!1),x=Object(i.a)(o,2),m=x[0],O=x[1],g=Object(h.b)(),v=function(){var n=Object(d.a)(l.a.mark((function n(a){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.preventDefault(),O(!0),n.next=4,E(e.current.value,t.current.value,g,O,c,s);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(q.jsx)(q.Fragment,{children:Object(q.jsx)(u.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"100vh"},children:Object(q.jsxs)("div",{className:"",style:{maxWidth:"400px"},children:[Object(q.jsx)(j.a,{children:Object(q.jsxs)(j.a.Body,{children:[Object(q.jsx)("h2",{className:"text-center mb-4",children:"Log In"}),c&&Object(q.jsx)(b.a,{variant:"danger",children:c}),Object(q.jsxs)(p.a,{onSubmit:v,children:[Object(q.jsxs)(p.a.Group,{id:"email",children:[Object(q.jsx)(p.a.Label,{children:"Email"}),Object(q.jsx)(p.a.Control,{type:"email",ref:e,required:!0})]}),Object(q.jsxs)(p.a.Group,{id:"password",children:[Object(q.jsx)(p.a.Label,{children:"Password"}),Object(q.jsx)(p.a.Control,{type:"password",ref:t,required:!0})]}),Object(q.jsxs)(f.a,{disabled:m,className:"w-100 mt-3",type:"submit",children:["Log In",m&&Object(q.jsx)(z,{variant:"warning"})]})]}),Object(q.jsx)("div",{className:"w-100 text-center mt-3",children:Object(q.jsx)("a",{href:"/forgot-password",children:"Forgot Password?"})})]})}),Object(q.jsxs)("div",{className:"w-100 text-center mt-2",children:["Need an account?"," ",Object(q.jsx)("button",{className:"btn btn-primary",onClick:function(){g(I(!1)),g(U(!0))},children:"Sign Up"})]})]})})})},M=h.c,W=function(){var e=Object(h.b)(),t=M((function(e){return e.app.currentUser}));return Object(q.jsx)(q.Fragment,{children:null!==t&&Object(q.jsxs)("div",{className:"btn-group",children:[Object(q.jsx)("button",{type:"button",className:"btn btn-warning dropdown-toggle","data-bs-toggle":"dropdown","aria-expanded":"false",children:t.username}),Object(q.jsx)("div",{className:"dropdown-menu",style:{width:"325px",left:"-184px"},children:Object(q.jsxs)("div",{className:"d-flex justify-content-between px-3",children:[Object(q.jsxs)("div",{className:"d-flex flex-column",children:[Object(q.jsx)("button",{className:"btn btn-primary my-3",children:"Change Password"}),Object(q.jsx)("button",{className:"btn btn-primary my-3",children:"Contact Us"})]}),Object(q.jsxs)("div",{className:"d-flex flex-column",children:[Object(q.jsx)("img",{className:"rounded-circle my-2",src:"https://cdn.quasar.dev/img/boy-avatar.png",alt:"profile",width:"72",height:"72"}),Object(q.jsx)("button",{className:"btn btn-danger",onClick:function(){null!==t&&_(t.uid,e)},children:"Logout"})]})]})})]})})},K=function(){var e=Object(h.b)(),t=M((function(e){return e.app.currentUser})),n=M((function(e){return e.app.isLogInFormDisplay}));return Object(q.jsx)(q.Fragment,{children:Object(q.jsx)("nav",{className:"navbar navbar-dark bg-dark",children:Object(q.jsxs)("div",{className:"container-fluid",children:[Object(q.jsx)("img",{src:"/logo192.jpeg",alt:"Bait Ul Ilm Logo",width:"80",height:"80",style:{borderRadius:"3px"}}),Object(q.jsx)("a",{className:"navbar-brand fs-2 fw-bold",href:"/",children:"Voter List App"}),Object(q.jsx)(W,{}),null===t&&Object(q.jsx)("button",{className:"btn btn-outline-primary",onClick:function(){n?(e(I(!1)),e(U(!0))):(e(U(!1)),e(I(!0)))},children:n?"Sign Up":"Login"})]})})})},J=function(){return Object(q.jsx)(q.Fragment,{children:Object(q.jsx)("footer",{className:"footer mt-auto py-3 bg-dark",children:Object(q.jsxs)("div",{className:"d-flex mx-5 justify-content-between",children:[Object(q.jsx)("span",{className:"text-muted",children:"\xa9 All Rights Reserved By alabrar.pk"}),Object(q.jsx)("a",{style:{textDecoration:"none"},href:"/dataEntry",children:"Data Entry"})]})})})},Y=n(86),Q=n(71),X=["Constituency Name","Moza","Dehya","City","Patwar Halka","Tapaydar","Tehseel","Talka","District","Union Council","Book No","Constituency","Gender","Marital Status","House No","Street","Phase","Sector","Lane","Boulevard|Avenue","Other Area","Count"],Z=function(e){"filterchoicerequest"===e.requestType&&(e.filterChoiceCount=me.length)},$={ignoreAccent:!0,type:"Excel"},ee=function(){if(fe){var e,t=fe.getColumns(),n=Object(Q.a)(t);try{var a=function(){var t=e.value;X.forEach((function(e){t.field===e&&(t.visible=!1)}))};for(n.s();!(e=n.n()).done;)a()}catch(r){n.e(r)}finally{n.f()}}},te=function(){if(fe){var e,t=fe.getColumns(),n=Object(Q.a)(t);try{var a=function(){var t=e.value;X.forEach((function(e){t.field===e&&(t.visible=!0)})),"Count"===t.field&&(t.visible=!1)};for(n.s();!(e=n.n()).done;)a()}catch(r){n.e(r)}finally{n.f()}}},ne=function(){fe&&fe.autoFitColumns(Object(Y.a)(a))},ae=function(e,t){var n=null===fe||void 0===fe?void 0:fe.getFilteredRecords(),a=[];if(console.log(void 0!==n?n:"filtered is undefined"),console.log(n,"FilteredData"),void 0!==n&&n!==[]){if(console.log("infiltered data"),a=n.map((function(e){return e["Block Code"]})).filter((function(e,t,n){return n.indexOf(e)===t})).sort((function(e,t){return e-t})),!0===e.uniqueBlockcodes)return a}else if("undefined"!==typeof t&&(console.log("inUnfilteredData"),a=t.map((function(e){return e["Block Code"]})).filter((function(e,t,n){return n.indexOf(e)===t})).sort((function(e,t){return e-t})),!0===e.uniqueBlockcodes))return a},re=n(127),ce=n(128),se=n(55),ie=n(134),oe=n(132),le=n(129),de=n(135),ue=n(137),je=n(130),be=function(e){var t=e.uniqueBlockcodes;return Object(q.jsxs)("div",{className:"m-3",style:{boxShadow:"0 1px 6px rgba(0,0,0,0.3)",borderRadius:"0.25rem",padding:"1rem"},children:[Object(q.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[Object(q.jsx)("img",{src:"/logo192.jpeg",alt:"Bait Ul Ilm Logo",width:"50",height:"50"}),Object(q.jsx)("h2",{className:"text-center text-primary mt-4",children:"Final Voter List"})]}),Object(q.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(q.jsxs)("h5",{children:["Constituency Name:",Object(q.jsxs)("span",{style:{textDecoration:"underline"},children:[" ","(DHA-PH-2)17-Humak"]})]}),Object(q.jsxs)("h5",{children:["Moza/Dehya/City:",Object(q.jsx)("span",{style:{textDecoration:"underline"},children:" Humak"})]})]}),Object(q.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(q.jsxs)("h5",{children:["Union Council:",Object(q.jsx)("span",{style:{textDecoration:"underline"},children:"\xa0 N/A \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0"})]}),Object(q.jsxs)("h5",{children:["Patwar Halka/Tapaydar:",Object(q.jsx)("span",{style:{textDecoration:"underline"},children:" Humak"})]})]}),Object(q.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(q.jsxs)("h5",{children:["Tehseel/Talka:",Object(q.jsx)("span",{style:{textDecoration:"underline"},children:" Islamabad"})]}),Object(q.jsxs)("h5",{children:["District:",Object(q.jsx)("span",{style:{textDecoration:"underline"},children:" Islamabad"})]})]}),Object(q.jsx)("div",{className:"d-flex justify-content-between",children:Object(q.jsxs)("h5",{children:["Block Code:",Object(q.jsx)("span",{style:{textDecoration:"underline"},children:t.map((function(e,n){return Object(q.jsxs)("span",{children:[e,t.length>1&&t.length!==n+1?", ":""]},n)}))})]})})]})},pe=function(){return Object(q.jsxs)("div",{className:"d-flex justify-content-end align-items-center",children:[Object(q.jsx)("img",{src:"/logo192.jpeg",alt:"Bait Ul Ilm Logo",width:"50",height:"50"}),Object(q.jsx)("h5",{className:"m-3",style:{textDecoration:"underline"},children:"Project of: alabrar.pk"})]})},fe=(n(118),null),he=function(){var e=M((function(e){return e.app.data})),t=Object(r.useState)([]),n=Object(i.a)(t,2),c=n[0],o=n[1],u=M((function(e){return e.app.headings})),j=M((function(e){return e.app.isListDisplay})),b=M((function(e){return e.app.isDataLoading}));a=u;return Object(r.useEffect)((function(){}),[e,j]),Object(q.jsxs)(q.Fragment,{children:[b&&Object(q.jsx)(z,{}),!b&&Object(q.jsxs)("div",{style:{margin:"3%",marginTop:"2%"},children:[Object(q.jsx)("div",{className:"d-flex ",children:Object(q.jsxs)("button",{className:"btn btn-primary m-2",onClick:Object(d.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!fe){t.next=7;break}return t.next=3,ae({uniqueBlockcodes:!0},e);case 3:n=t.sent,o(n),ee(),fe.print();case 7:case"end":return t.stop()}}),t)}))),children:[Object(q.jsx)("svg",{width:"20px",height:"20px",viewBox:"0 0 512 512",className:"svg-inline--fa fa-print fa-w-16 fa-7x me-2",children:Object(q.jsx)("path",{fill:"currentColor",d:"M400 264c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm32-88V99.88c0-12.73-5.06-24.94-14.06-33.94l-51.88-51.88c-9-9-21.21-14.06-33.94-14.06H110.48C93.64 0 80 14.33 80 32v144c-44.18 0-80 35.82-80 80v128c0 8.84 7.16 16 16 16h64v96c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-96h64c8.84 0 16-7.16 16-16V256c0-44.18-35.82-80-80-80zM128 48h192v48c0 8.84 7.16 16 16 16h48v64H128V48zm256 416H128v-64h256v64zm80-112H48v-96c0-17.64 14.36-32 32-32h352c17.64 0 32 14.36 32 32v96z",className:""})}),"Print"]})}),Object(q.jsxs)(re.a,{ref:function(e){return fe=e},actionBegin:Z,beforePrint:function(e){var t=document.createElement("div");t.id="header",e.element.insertBefore(t,e.element.childNodes[0]),s.a.render(Object(q.jsx)(be,{uniqueBlockcodes:c}),t);var n=document.createElement("div");n.id="footer",e.element.appendChild(n),s.a.render(Object(q.jsx)(pe,{}),n)},dataSource:e,printMode:"CurrentPage",allowResizing:!0,allowPaging:!0,allowFiltering:!0,filterSettings:$,dataBound:ne,pageSettings:{pageSize:180},toolbarClick:ee,printComplete:te,children:[Object(q.jsxs)(ce.b,{children:[e[0]?e[0]["S No"]&&Object(q.jsx)(ce.a,{field:"S No",headerText:"S No",textAlign:"Left",width:"45",isPrimaryKey:!0}):"",u.map((function(e,t){return Object(q.jsx)(ce.a,{field:e,headerText:e,textAlign:"Left",width:"25"},t)}))]}),Object(q.jsx)(se.c,{services:[ie.a,oe.a,le.a,de.a,ue.a,je.a,le.a]})]})]})]})},xe=function(){return Object(q.jsx)(q.Fragment,{children:Object(q.jsxs)("div",{className:"text-center",style:{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[Object(q.jsx)("h2",{className:"mb-4 ms-2 text-primary",children:"\u200eVoter List App"}),Object(q.jsx)("div",{className:"spinner-border text-primary",role:"status",children:Object(q.jsx)("span",{className:"visually-hidden",children:"Loading..."})}),Object(q.jsx)("h5",{className:"mt-4 ms-2 text-primary",children:"Loading..."})]})})},me=[],Oe=function(){var e=Object(r.useState)(!0),t=Object(i.a)(e,2),n=t[0],a=t[1],c=M((function(e){return e.app.data})),s=M((function(e){return e.app.currentUser})),o=M((function(e){return e.app.isListDisplay})),l=M((function(e){return e.app.alert})),d=M((function(e){return e.app.isSignUpFormDisplay})),u=M((function(e){return e.app.isLogInFormDisplay})),j=M((function(e){return e.app.isAccessDeniedDisplay})),p=Object(h.b)();return me=c,S,Object(r.useEffect)((function(){console.log(s,"currentUser"),null!==s&&(p(A(!0)),p(F(!0)),R(p,s),p(I(!1))),a(!1)}),[p,s]),Object(q.jsxs)(q.Fragment,{children:[l&&Object(q.jsx)(b.a,{variant:"danger",children:l}),n&&Object(q.jsx)(xe,{}),!n&&Object(q.jsxs)(q.Fragment,{children:[Object(q.jsx)(K,{}),Object(q.jsxs)("div",{style:{minHeight:"72vh"},children:[d&&Object(q.jsx)(G,{}),u&&Object(q.jsx)(V,{}),s&&(j?Object(q.jsx)("h2",{className:"d-flex justify-content-center align-item-center",style:{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"},children:"You Are Not Allowed To Access Data"}):Object(q.jsx)(q.Fragment,{children:o&&Object(q.jsx)(q.Fragment,{children:Object(q.jsx)(he,{})})}))]}),Object(q.jsx)(J,{})]})]})},ge=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(q.jsx)(h.a,{store:y,children:Object(q.jsx)(Oe,{})}),document.getElementById("root")),ge()},93:function(e,t,n){},94:function(e,t,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.ec5e95ea.chunk.js.map