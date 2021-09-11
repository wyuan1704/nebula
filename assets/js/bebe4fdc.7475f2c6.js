"use strict";(self.webpackChunknebula=self.webpackChunknebula||[]).push([[620],{7689:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return r},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var s=n(7462),a=n(3366),l=(n(7294),n(3905)),o=["components"],r={layout:"default"},i="Security - Access Control",u={unversionedId:"basics/access_control",id:"basics/access_control",isDocsHomePage:!1,title:"Security - Access Control",description:"Table Level & Column Level Access Control",source:"@site/docs/basics/2-access_control.md",sourceDirName:"basics",slug:"/basics/access_control",permalink:"/docs/basics/access_control",tags:[],version:"current",sidebarPosition:2,frontMatter:{layout:"default"},sidebar:"defaultSidebar",previous:{title:"Overview",permalink:"/docs/basics/overview"},next:{title:"Time",permalink:"/docs/basics/time"}},c=[{value:"Authentication, Identity, Token &amp; Access Check",id:"authentication-identity-token--access-check",children:[]},{value:"Workflow",id:"workflow",children:[]},{value:"Nebula Config Based Rules Engine",id:"nebula-config-based-rules-engine",children:[]},{value:"Non-Secure Deployment",id:"non-secure-deployment",children:[]}],p={toc:c};function d(e){var t=e.components,r=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,s.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"security---access-control"},"Security - Access Control"),(0,l.kt)("p",null,"Table Level & Column Level Access Control"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Nebula")," is born for serving critical data tranfer between ",(0,l.kt)("em",{parentName:"p"},"Compute")," and ",(0,l.kt)("em",{parentName:"p"},"Storage"),", working as generic data gateway in normal data warehouse setup."),(0,l.kt)("p",null,'Even though it is one shiny data analytics platform, it never forgets its first mission as of "securing data access". So let\'s talk about how access control works in Nebula and what is already working today. '),(0,l.kt)("h2",{id:"authentication-identity-token--access-check"},"Authentication, Identity, Token & Access Check"),(0,l.kt)("p",null,"To get access control in effect, Nebula expects user idenity and security settings provided through its access point, such as Nebula Web/Api layer. In the test deployment, I use envoy + oAuth authentication server to get current user's ID and its security groups managed by LDAP. In different setup, you may use security token instead to represent the security passport sent to Nebula, which is out of the scope of Nebula."),(0,l.kt)("p",null,"Nebula maintains framework to plugin in access check providers so that it make service call to decide action upon any object access at table level as well as column level. "),(0,l.kt)("p",null,"Nebula itself also implements a default rule engine provider to provide config based access check. An example will be shown later on."),(0,l.kt)("h2",{id:"workflow"},"Workflow"),(0,l.kt)("p",null,"Again, I use my rough hand drawing to show the workflow of one example setup.\n",(0,l.kt)("img",{alt:"Access Control Flow",src:n(2379).Z})),(0,l.kt)("p",null,"In the illustration, Nebula Web/Api gains user ID and LDAP groups and they are passed through Nebula Server through service call (gRpc)."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"User Name (text)"),(0,l.kt)("li",{parentName:"ul"},"User Security Groups (a hash set)")),(0,l.kt)("p",null,"Nebula Server analyze current query, it does 3 passes of check from bird eyes' view"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Auth is required or not: this is cluster level setting, which indicates if current deployment requires authentication or not. If yes, every single query to Nebula will require user security identity to be present, otherwise it will fail every single request."),(0,l.kt)("li",{parentName:"ol"},"Table level access control: you can define as many as access rules for each table, Nebula will go through these rules and ensure every rule is satisfied, if not, it will end up on the action to take. "),(0,l.kt)("li",{parentName:"ol"},"Similar like table level, you can define as many as access rules for each column. Any rule violation will end up with its desired action, if multiple violation happens, the strongest action will take a lead.")),(0,l.kt)("p",null,'Unless everything gives a "green" pass from above check, the query will not be executed, and an error message will be returned to client. '),(0,l.kt)("h2",{id:"nebula-config-based-rules-engine"},"Nebula Config Based Rules Engine"),(0,l.kt)("p",null,"While ",(0,l.kt)("strong",{parentName:"p"},"Nebula")," supports any external rules engine to provide access check service, its own config based rules engine may be suitable for most of use cases, as it is safe, native and co-deployed inside Nebula service."),(0,l.kt)("p",null,"Here is one example: "),(0,l.kt)("p",null,"This config snippet is found in one table definition in cluster.yaml"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'    columns:\n      id:\n        bloom_filter: true\n      event:\n        access:\n          read:\n            groups: ["nebula-users"]\n            action: mask\n')),(0,l.kt)("p",null,'It places one access rule on column "event", what it says is: to read column "event", the user needs to be in group "nebula-users", if violates, the query can continue, but all event column value will be masked ("***" for string type column and "0" for numeric typed column).'),(0,l.kt)("p",null,"For instance, this \"unauth\" user doesn't satisfy the rule setting, it's query result looks like this\n",(0,l.kt)("img",{alt:"Masked Result",src:n(499).Z})),(0,l.kt)("p",null,"When I switch to an user (shawncao) who has the correct security group membership, and I can see the values now:\n",(0,l.kt)("img",{alt:"Pass Result",src:n(8189).Z})),(0,l.kt)("p",null,'Another exmaple showing you can place the same "access" config under table rather than column to provide table level access control:'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'    nebula-test:\n      retention:\n        max-mb: 10000\n        max-hr: 240\n      access:\n        read:\n          groups: ["nebula-super"]\n          action: deny\n')),(0,l.kt)("p",null,'This rule tells Nebula to deny any user queries if it is not in security group "nebula-super".'),(0,l.kt)("p",null,"Nebula not only support access control on READ, it also supports access control on Aggregation. For example:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'    columns:\n      revenue:\n        access:\n          read:\n            groups: ["nebula-super"]\n            action: mask\n          aggregate:\n            groups: ["nebula-users"]\n            action: deny\n')),(0,l.kt)("p",null,'This rule tells, the user has to be in security group "nebula-super" to be able to query column "revenue", otherwise, it will be masked means user will not able to read its value. It also requires user to be in group "nebula-users" to be able to run aggregation on this column, if not, any query tries to aggregate (count, sum, avg, ...) this colummn will fail, no execution allowed.'),(0,l.kt)("h2",{id:"non-secure-deployment"},"Non-Secure Deployment"),(0,l.kt)("p",null,'If security / access control, or even authentication is not something interest you, just turn off completely by set "auth" to false in your cluster config file (eg. cluster.yaml).'),(0,l.kt)("p",null,"A sample view: "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"version: 1.0\n\n# server configs\nserver:\n  # as node will treat server to run as a node\n  # if false, server will not load any data in itself.\n  # NOTE that, there are maybe missing functions to fully compatible for server as node.\n  # such as task execution may not be implemented.\n  anode: false\n\n  # this field indicates if current deployment requires auth or not\n  # if set as true, auth (such as oAuth) is required to set up to make query executable\n  auth: false\n")),(0,l.kt)("p",null,"Hope this post helps you understand what access control looks in Nebula. "),(0,l.kt)("p",null,"Cheers!"))}d.isMDXComponent=!0},2379:function(e,t,n){t.Z=n.p+"assets/images/access.control-2d383280e7410dec09975bd00bcbd15d.png"},8189:function(e,t,n){t.Z=n.p+"assets/images/auth.pass-dd9323389b474c3c6ff7ac3b29ee1d1d.png"},499:function(e,t,n){t.Z=n.p+"assets/images/unauth.mask-24cd270ab2e2de6cb0c07d0e2dfa1aa2.png"}}]);