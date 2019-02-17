!function(e,n){for(var i in n)e[i]=n[i]}(exports,function(e){var n={};function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=n,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i(i.s=0)}([function(e,n,i){"use strict";var t=i(1),a=r(i(2)),d=r(i(5));function r(e){return e&&e.__esModule?e:{default:e}}const o=new t.ApolloServer({resolvers:a.default,typeDefs:d.default});n.apolloServer=o.createHandler({cors:{origin:"*"}})},function(e,n){e.exports=require("apollo-server-lambda")},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t,a=i(3),d=(t=a)&&t.__esModule?t:{default:t};n.default={Query:d.default}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t,a=i(4),d=(t=a)&&t.__esModule?t:{default:t};n.default={movies:d.default}},function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default=(async(e,n)=>{const{after:i,first:t}=n;return{edges:[],pageInfo:{endCursor:null,hasNextPage:null,hasPreviousPage:null,startCursor:null}}})},function(e,n){var i={kind:"Document",definitions:[{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"PageInfo"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"endCursor"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"hasNextPage"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"hasPreviousPage"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"startCursor"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Connection"},directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"pageInfo"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"PageInfo"}}},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Edge"},directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"cursor"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Node"},directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Movie"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Node"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"createdAt"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"title"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"MoviesEdge"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Edge"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"node"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Movie"}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"MoviesConnection"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Connection"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"edges"},arguments:[],type:{kind:"NonNullType",type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"MoviesEdge"}}}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Query"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"movies"},arguments:[{kind:"InputValueDefinition",name:{kind:"Name",value:"after"},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"InputValueDefinition",name:{kind:"Name",value:"first"},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},defaultValue:{kind:"IntValue",value:"20"},directives:[]}],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"MoviesConnection"}}},directives:[]}]},{kind:"SchemaDefinition",directives:[],operationTypes:[{kind:"OperationTypeDefinition",operation:"query",type:{kind:"NamedType",name:{kind:"Name",value:"Query"}}}]}],loc:{start:0,end:523}};i.loc.source={body:"type PageInfo {\n  endCursor: String\n  hasNextPage: Boolean!\n  hasPreviousPage: Boolean!\n  startCursor: String\n}\n\ninterface Connection {\n  pageInfo: PageInfo!\n}\n\ninterface Edge {\n  cursor: String!\n}\n\ninterface Node {\n  id: ID!\n}\n\ntype Movie implements Node {\n  createdAt: Int!\n  title: String!\n}\n\ntype MoviesEdge implements Edge {\n  node: Movie!\n}\n\ntype MoviesConnection implements Connection {\n  edges: [MoviesEdge!]!\n}\n\ntype Query {\n  movies(after: String, first: Int = 20): MoviesConnection!\n}\n\nschema {\n  query: Query\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};e.exports=i}]));