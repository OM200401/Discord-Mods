(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{660:function(e,s,a){Promise.resolve().then(a.bind(a,7156))},685:function(e,s,a){"use strict";var l=a(7437),r=a(8792);s.Z=()=>(0,l.jsxs)("nav",{className:"flex items-center justify-between flex-wrap bg-blue-500 p-6","data-testid":"navbar",children:[(0,l.jsx)("div",{className:"flex items-center flex-shrink-0 text-white mr-6",children:(0,l.jsx)("a",{href:"./",className:"font-semibold text-xl tracking-tight",children:"E-Learning Platform"})}),(0,l.jsx)("div",{className:"w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:justify-end",children:(0,l.jsxs)("div",{className:"text-sm",children:[(0,l.jsx)("a",{className:"block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4",children:(0,l.jsx)(r.default,{href:"/test",children:"Settings"})}),(0,l.jsx)("a",{className:"block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4",children:(0,l.jsx)(r.default,{href:"/login",children:"Login"})}),(0,l.jsx)("a",{className:"block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4",children:(0,l.jsx)(r.default,{href:"/profile",children:"Profile"})})]})})]})},3534:function(e,s,a){"use strict";a.d(s,{I:function(){return o}});var l=a(6142),r=a(8121),t=a(2730);let i=(0,l.ZF)({apiKey:"AIzaSyBoo9Uw3WfBge7ShHB6u2tnFBasnWZA9io",authDomain:"elearningdatabase-53938.firebaseapp.com",projectId:"elearningdatabase-53938",storageBucket:"elearningdatabase-53938.appspot.com",messagingSenderId:"712504744238",appId:"1:712504744238:web:cee3359a38f6a1f99582bf",measurementId:"G-LQL0C5BKZP"}),n=(0,r.ad)(i),o=(0,t.v0)(i);s.Z=n},7156:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return c}});var l=a(7437),r=a(2265),t=a(685),i=a(8121),n=a(2730),o=a(3534),d=a(7907);function c(){let[e,s]=(0,r.useState)(""),[a,c]=(0,r.useState)(""),[u,m]=(0,r.useState)(""),[x,f]=(0,r.useState)(""),[g,h]=(0,r.useState)(""),[p,b]=(0,r.useState)("Student"),[y,N]=(0,r.useState)(""),[j,v]=(0,r.useState)(null);(0,r.useEffect)(()=>{j&&(console.log("Redirect"),(0,d.redirect)("/home"))},[j]);let w=async s=>{if(s.preventDefault(),!e||!a||!u||!x||!g||!p){N("All fields are required");return}try{let s=(await (0,n.Xb)(o.I,u,x)).user;v(s);let l=(0,i.hJ)(o.Z,"Userinfo");await (0,i.ET)(l,{firstName:e,lastName:a,email:u,userType:p,uid:s.uid})}catch(e){N(e.message)}};return(0,l.jsxs)("div",{className:"min-h-screen flex flex-col justify-start",children:[(0,l.jsx)(t.Z,{}),(0,l.jsx)("div",{className:"relative py-3 sm:max-w-xl sm:mx-auto mt-10",children:(0,l.jsx)("div",{className:"relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10",children:(0,l.jsxs)("div",{className:"max-w-md mx-auto",children:[(0,l.jsx)("div",{className:"flex items-center space-x-5",children:(0,l.jsxs)("div",{className:"block pl-2 font-semibold text-xl self-start text-gray-700",children:[(0,l.jsx)("h2",{className:"leading-relaxed",children:"Sign Up"}),(0,l.jsx)("p",{className:"text-sm text-gray-500 font-normal leading-relaxed",children:"Enter your information to create your account."})]})}),(0,l.jsx)("form",{onSubmit:w,className:"divide-y divide-gray-200","data-testid":"signup-form",children:(0,l.jsxs)("div",{className:"py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7",children:[(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"firstName",className:"leading-loose",children:"First Name"}),(0,l.jsx)("input",{id:"firstName",type:"input",onChange:e=>s(e.target.value),className:"px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600",placeholder:"Name",value:e,required:!0})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"lastName",className:"leading-loose",children:"Last Name"}),(0,l.jsx)("input",{id:"lastName",type:"input",onChange:e=>c(e.target.value),className:"px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600",placeholder:"Name",value:a,required:!0})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"email",className:"leading-loose",children:"Email"}),(0,l.jsx)("input",{id:"email",type:"email",onChange:e=>m(e.target.value),className:"px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600",placeholder:"Email",value:u,required:!0})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"password",className:"leading-loose",children:"Password"}),(0,l.jsx)("input",{id:"password",type:"password",onChange:e=>f(e.target.value),className:"px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600",placeholder:"Password",value:x,required:!0})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"confirmPassword",className:"leading-loose",children:"Confirm Password"}),(0,l.jsx)("input",{id:"confirmPassword",type:"password",onChange:e=>h(e.target.value),className:"px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600",placeholder:"Confirm Password",value:g,required:!0})]}),(0,l.jsxs)("div",{className:"flex flex-col",children:[(0,l.jsx)("label",{htmlFor:"userType",className:"leading-loose",children:"User Type"}),(0,l.jsxs)("select",{id:"userType",value:p,onChange:e=>b(e.target.value),className:"px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600",children:[(0,l.jsx)("option",{value:"student",children:"Student"}),(0,l.jsx)("option",{value:"teacher",children:"Teacher"})]})]}),(0,l.jsx)("button",{type:"submit",onClick:w,className:"mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",children:"Sign Up"})]})}),y&&(0,l.jsx)("p",{className:"text-red-500",children:y})]})})})]})}},7907:function(e,s,a){"use strict";var l=a(5313);a.o(l,"redirect")&&a.d(s,{redirect:function(){return l.redirect}})}},function(e){e.O(0,[807,358,503,456,971,69,744],function(){return e(e.s=660)}),_N_E=e.O()}]);