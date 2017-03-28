///usr/bin/env node
/* istanbul instrument in package uglifyjs */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.uglifyjs = local;
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_uglifyjs = local;
        } else {
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
    }());



    /* istanbul ignore next */
    // run shared js-env code - function
    (function () {
        var exports, require;
        // init exports
        exports = local;
        require = function () {
            return exports;
        };
        // jslint-hack
        require();



/* jslint-ignore-begin */
// init lib parse-js
// https://github.com/mishoo/UglifyJS/blob/v1.3.5/lib/parse-js.js
// utility2-uglifyjs https://raw.githubusercontent.com/mishoo/UglifyJS/v1.3.5/lib/parse-js.js
function is_letter(e){return UNICODE.letter.test(e)}function is_digit(e){return e=
e.charCodeAt(0),e>=48&&e<=57}function is_unicode_digit(e){return UNICODE.digit.test
(e)}function is_alphanumeric_char(e){return is_digit(e)||is_letter(e)}function is_unicode_combining_mark
(e){return UNICODE.combining_mark.test(e)}function is_unicode_connector_punctuation
(e){return UNICODE.connector_punctuation.test(e)}function is_identifier_start(e)
{return e=="$"||e=="_"||is_letter(e)}function is_identifier_char(e){return is_identifier_start
(e)||is_unicode_combining_mark(e)||is_unicode_digit(e)||is_unicode_connector_punctuation
(e)||e=="\u200c"||e=="\u200d"}function parse_js_number(e){if(RE_HEX_NUMBER.test(
e))return parseInt(e.substr(2),16);if(RE_OCT_NUMBER.test(e))return parseInt(e.substr
(1),8);if(RE_DEC_NUMBER.test(e))return parseFloat(e)}function JS_Parse_Error(e,t
,n,r){this.message=e,this.line=t+1,this.col=n+1,this.pos=r+1,this.stack=(new Error
).stack}function js_error(e,t,n,r){throw new JS_Parse_Error(e,t,n,r)}function is_token
(e,t,n){return e.type==t&&(n==null||e.value==n)}function tokenizer(e){function n
(){return t.text.charAt(t.pos)}function r(e,n){var r=t.text.charAt(t.pos++);if(e&&!
r)throw EX_EOF;return r=="\n"?(t.newline_before=t.newline_before||!n,++t.line,t.
col=0):++t.col,r}function i(){return!t.peek()}function s(e,n){var r=t.text.indexOf
(e,t.pos);if(n&&r==-1)throw EX_EOF;return r}function o(){t.tokline=t.line,t.tokcol=
t.col,t.tokpos=t.pos}function u(e,n,r){t.regex_allowed=e=="operator"&&!HOP(UNARY_POSTFIX
,n)||e=="keyword"&&HOP(KEYWORDS_BEFORE_EXPRESSION,n)||e=="punc"&&HOP(PUNC_BEFORE_EXPRESSION
,n);var i={type:e,value:n,line:t.tokline,col:t.tokcol,pos:t.tokpos,endpos:t.pos,
nlb:t.newline_before};if(!r){i.comments_before=t.comments_before,t.comments_before=
[];for(var s=0,o=i.comments_before.length;s<o;s++)i.nlb=i.nlb||i.comments_before
[s].nlb}return t.newline_before=!1,i}function a(){while(HOP(WHITESPACE_CHARS,n()
))r()}function f(e){var t="",i=n(),s=0;while(i&&e(i,s++))t+=r(),i=n();return t}function l
(e){js_error(e,t.tokline,t.tokcol,t.tokpos)}function c(e){var t=!1,n=!1,r=!1,i=e=="."
,s=f(function(s,o){return s=="x"||s=="X"?r?!1:r=!0:!!r||s!="E"&&s!="e"?s=="-"?n||
o==0&&!e?!0:!1:s=="+"?n:(n=!1,s=="."?!i&&!r&&!t?i=!0:!1:is_alphanumeric_char(s))
:t?!1:t=n=!0});e&&(s=e+s);var o=parse_js_number(s);if(!isNaN(o))return u("num",o
);l("Invalid syntax: "+s)}function h(e){var t=r(!0,e);switch(t){case"n":return"\n"
;case"r":return"\r";case"t":return"	";case"b":return"\b";case"v":return"";case"f"
:return"\f";case"0":return"\0";case"x":return String.fromCharCode(p(2));case"u":
return String.fromCharCode(p(4));case"\n":return"";default:return t}}function p(
e){var t=0;for(;e>0;--e){var n=parseInt(r(!0),16);isNaN(n)&&l("Invalid hex-character pattern in string"
),t=t<<4|n}return t}function d(){return x("Unterminated string constant",function(
){var e=r(),t="";for(;;){var n=r(!0);if(n=="\\"){var i=0,s=null;n=f(function(e){
if(e>="0"&&e<="7"){if(!s)return s=e,++i;if(s<="3"&&i<=2)return++i;if(s>="4"&&i<=1
)return++i}return!1}),i>0?n=String.fromCharCode(parseInt(n,8)):n=h(!0)}else{if(n==
e)break;if(n=="\n")throw EX_EOF}t+=n}return u("string",t)})}function v(){r();var e=
s("\n"),n;return e==-1?(n=t.text.substr(t.pos),t.pos=t.text.length):(n=t.text.substring
(t.pos,e),t.pos=e),u("comment1",n,!0)}function m(){return r(),x("Unterminated multiline comment"
,function(){var e=s("*/",!0),n=t.text.substring(t.pos,e);return t.pos=e+2,t.line+=
n.split("\n").length-1,t.newline_before=t.newline_before||n.indexOf("\n")>=0,/^@cc_on/i
.test(n)&&(warn("WARNING: at line "+t.line),warn('*** Found "conditional comment": '+
n),warn("*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer."
)),u("comment2",n,!0)})}function g(){var e=!1,t="",i,s=!1,o;while((i=n())!=null)
if(!e)if(i=="\\")s=e=!0,r();else{if(!is_identifier_char(i))break;t+=r()}else i!="u"&&
l("Expecting UnicodeEscapeSequence -- uXXXX"),i=h(),is_identifier_char(i)||l("Unicode char: "+
i.charCodeAt(0)+" is not valid in identifier"),t+=i,e=!1;return HOP(KEYWORDS,t)&&
s&&(o=t.charCodeAt(0).toString(16).toUpperCase(),t="\\u"+"0000".substr(o.length)+
o+t.slice(1)),t}function y(e){return x("Unterminated regular expression",function(
){var t=!1,n,i=!1;while(n=r(!0))if(t)e+="\\"+n,t=!1;else if(n=="[")i=!0,e+=n;else if(
n=="]"&&i)i=!1,e+=n;else{if(n=="/"&&!i)break;n=="\\"?t=!0:e+=n}var s=g();return u
("regexp",[e,s])})}function b(e){function t(e){if(!n())return e;var i=e+n();return HOP
(OPERATORS,i)?(r(),t(i)):e}return u("operator",t(e||r()))}function w(){r();var e=
t.regex_allowed;switch(n()){case"/":return t.comments_before.push(v()),t.regex_allowed=
e,T();case"*":return t.comments_before.push(m()),t.regex_allowed=e,T()}return t.
regex_allowed?y(""):b("/")}function E(){return r(),is_digit(n())?c("."):u("punc"
,".")}function S(){var e=g();return HOP(KEYWORDS,e)?HOP(OPERATORS,e)?u("operator"
,e):HOP(KEYWORDS_ATOM,e)?u("atom",e):u("keyword",e):u("name",e)}function x(e,t){
try{return t()}catch(n){if(n!==EX_EOF)throw n;l(e)}}function T(e){if(e!=null)return y
(e);a(),o();var t=n();if(!t)return u("eof");if(is_digit(t))return c();if(t=='"'||
t=="'")return d();if(HOP(PUNC_CHARS,t))return u("punc",r());if(t==".")return E()
;if(t=="/")return w();if(HOP(OPERATOR_CHARS,t))return b();if(t=="\\"||is_identifier_start
(t))return S();l("Unexpected character '"+t+"'")}var t={text:e.replace(/\r\n?|[\n\u2028\u2029]/g
,"\n").replace(/^\uFEFF/,""),pos:0,tokpos:0,line:0,tokline:0,col:0,tokcol:0,newline_before
:!1,regex_allowed:!1,comments_before:[]};return T.context=function(e){return e&&
(t=e),t},T}function NodeWithToken(e,t,n){this.name=e,this.start=t,this.end=n}function parse
(e,t,n){function i(e,t){return is_token(r.token,e,t)}function s(){return r.peeked||
(r.peeked=r.input())}function o(){return r.prev=r.token,r.peeked?(r.token=r.peeked
,r.peeked=null):r.token=r.input(),r.in_directives=r.in_directives&&(r.token.type=="string"||
i("punc",";")),r.token}function u(){return r.prev}function a(e,t,n,i){var s=r.input
.context();js_error(e,t!=null?t:s.tokline,n!=null?n:s.tokcol,i!=null?i:s.tokpos)
}function f(e,t){a(t,e.line,e.col)}function l(e){e==null&&(e=r.token),f(e,"Unexpected token: "+
e.type+" ("+e.value+")")}function c(e,t){if(i(e,t))return o();f(r.token,"Unexpected token "+
r.token.type+", expected "+e)}function h(e){return c("punc",e)}function p(){return!
t&&(r.token.nlb||i("eof")||i("punc","}"))}function d(){i("punc",";")?o():p()||l(
)}function v(){return slice(arguments)}function m(){h("(");var e=K();return h(")"
),e}function g(e,t,n){return e instanceof NodeWithToken?e:new NodeWithToken(e,t,
n)}function y(e){return n?function(){var t=r.token,n=e.apply(this,arguments);return n
[0]=g(n[0],t,u()),n}:e}function w(e){r.labels.push(e);var n=r.token,i=b();return t&&!
HOP(STATEMENTS_WITH_LABELS,i[0])&&l(n),r.labels.pop(),v("label",e,i)}function E(
){return v("stat",prog1(K,d))}function S(e){var t;return p()||(t=i("name")?r.token
.value:null),t!=null?(o(),member(t,r.labels)||a("Label "+t+" without matching loop or statement"
)):r.in_loop==0&&a(e+" not inside a loop or switch"),d(),v(e,t)}function x(){h("("
);var e=null;if(!i("punc",";")){e=i("keyword","var")?(o(),_(!0)):K(!0,!0);if(i("operator"
,"in"))return e[0]=="var"&&e[1].length>1&&a("Only one variable declaration allowed in for..in loop"
),N(e)}return T(e)}function T(e){h(";");var t=i("punc",";")?null:K();h(";");var n=
i("punc",")")?null:K();return h(")"),v("for",e,t,n,Q(b))}function N(e){var t=e[0
]=="var"?v("name",e[1][0]):e;o();var n=K();return h(")"),v("for-in",e,t,n,Q(b))}
function k(){var e=m(),t=b(),n;return i("keyword","else")&&(o(),n=b()),v("if",e,
t,n)}function L(){h("{");var e=[];while(!i("punc","}"))i("eof")&&l(),e.push(b())
;return o(),e}function O(){var e=L(),t,n;if(i("keyword","catch")){o(),h("("),i("name"
)||a("Name expected");var s=r.token.value;o(),h(")"),t=[s,L()]}return i("keyword"
,"finally")&&(o(),n=L()),!t&&!n&&a("Missing catch/finally blocks"),v("try",e,t,n
)}function M(e){var t=[];for(;;){i("name")||l();var n=r.token.value;o(),i("operator"
,"=")?(o(),t.push([n,K(!1,e)])):t.push([n]);if(!i("punc",","))break;o()}return t
}function _(e){return v("var",M(e))}function D(){return v("const",M())}function P
(){var e=H(!1),t;return i("punc","(")?(o(),t=B(")")):t=[],R(v("new",e,t),!0)}function B
(e,t,n){var r=!0,s=[];while(!i("punc",e)){r?r=!1:h(",");if(t&&i("punc",e))break;
i("punc",",")&&n?s.push(["atom","undefined"]):s.push(K(!1))}return o(),s}function j
(){return v("array",B("]",!t,!0))}function F(){var e=!0,n=[];while(!i("punc","}"
)){e?e=!1:h(",");if(!t&&i("punc","}"))break;var s=r.token.type,u=I();s!="name"||
u!="get"&&u!="set"||!!i("punc",":")?(h(":"),n.push([u,K(!1)])):n.push([q(),C(!1)
,u])}return o(),v("object",n)}function I(){switch(r.token.type){case"num":case"string"
:return prog1(r.token.value,o)}return q()}function q(){switch(r.token.type){case"name"
:case"operator":case"keyword":case"atom":return prog1(r.token.value,o);default:l
()}}function R(e,t){return i("punc",".")?(o(),R(v("dot",e,q()),t)):i("punc","[")?
(o(),R(v("sub",e,prog1(K,curry(h,"]"))),t)):t&&i("punc","(")?(o(),R(v("call",e,B
(")")),!0)):e}function U(e){if(i("operator")&&HOP(UNARY_PREFIX,r.token.value))return z
("unary-prefix",prog1(r.token.value,o),U(e));var t=H(e);while(i("operator")&&HOP
(UNARY_POSTFIX,r.token.value)&&!r.token.nlb)t=z("unary-postfix",r.token.value,t)
,o();return t}function z(e,t,n){return(t=="++"||t=="--")&&!$(n)&&a("Invalid use of "+
t+" operator"),v(e,t,n)}function W(e,t,n){var s=i("operator")?r.token.value:null
;s&&s=="in"&&n&&(s=null);var u=s!=null?PRECEDENCE[s]:null;if(u!=null&&u>t){o();var a=
W(U(!0),u,n);return W(v("binary",s,e,a),t,n)}return e}function X(e){return W(U(!0
),0,e)}function V(e){var t=X(e);if(i("operator","?")){o();var n=K(!1);return h(":"
),v("conditional",t,n,K(!1,e))}return t}function $(e){if(!t)return!0;switch(e[0]+""
){case"dot":case"sub":case"new":case"call":return!0;case"name":return e[1]!="this"
}}function J(e){var t=V(e),n=r.token.value;if(i("operator")&&HOP(ASSIGNMENT,n)){
if($(t))return o(),v("assign",ASSIGNMENT[n],t,J(e));a("Invalid assignment")}return t
}function Q(e){try{return++r.in_loop,e()}finally{--r.in_loop}}var r={input:typeof
e=="string"?tokenizer(e,!0):e,token:null,prev:null,peeked:null,in_function:0,in_directives
:!0,in_loop:0,labels:[]};r.token=o();var b=y(function(){if(i("operator","/")||i("operator"
,"/="))r.peeked=null,r.token=r.input(r.token.value.substr(1));switch(r.token.type
){case"string":var e=r.in_directives,t=E();if(e&&t[1][0]=="string"&&!i("punc",","
))return v("directive",t[1][1]);return t;case"num":case"regexp":case"operator":case"atom"
:return E();case"name":return is_token(s(),"punc",":")?w(prog1(r.token.value,o,o
)):E();case"punc":switch(r.token.value){case"{":return v("block",L());case"[":case"("
:return E();case";":return o(),v("block");default:l()};case"keyword":switch(prog1
(r.token.value,o)){case"break":return S("break");case"continue":return S("continue"
);case"debugger":return d(),v("debugger");case"do":return function(e){return c("keyword"
,"while"),v("do",prog1(m,d),e)}(Q(b));case"for":return x();case"function":return C
(!0);case"if":return k();case"return":return r.in_function==0&&a("'return' outside of function"
),v("return",i("punc",";")?(o(),null):p()?null:prog1(K,d));case"switch":return v
("switch",m(),A());case"throw":return r.token.nlb&&a("Illegal newline after 'throw'"
),v("throw",prog1(K,d));case"try":return O();case"var":return prog1(_,d);case"const"
:return prog1(D,d);case"while":return v("while",m(),Q(b));case"with":return v("with"
,m(),b());default:l()}}}),C=function(e){var t=i("name")?prog1(r.token.value,o):null
;return e&&!t&&l(),h("("),v(e?"defun":"function",t,function(e,t){while(!i("punc"
,")"))e?e=!1:h(","),i("name")||l(),t.push(r.token.value),o();return o(),t}(!0,[]
),function(){++r.in_function;var e=r.in_loop;r.in_directives=!0,r.in_loop=0;var t=
L();return--r.in_function,r.in_loop=e,t}())},A=curry(Q,function(){h("{");var e=[
],t=null;while(!i("punc","}"))i("eof")&&l(),i("keyword","case")?(o(),t=[],e.push
([K(),t]),h(":")):i("keyword","default")?(o(),h(":"),t=[],e.push([null,t])):(t||
l(),t.push(b()));return o(),e}),H=y(function(e){if(i("operator","new"))return o(
),P();if(i("punc")){switch(r.token.value){case"(":return o(),R(prog1(K,curry(h,")"
)),e);case"[":return o(),R(j(),e);case"{":return o(),R(F(),e)}l()}if(i("keyword"
,"function"))return o(),R(C(!1),e);if(HOP(ATOMIC_START_TOKEN,r.token.type)){var t=
r.token.type=="regexp"?v("regexp",r.token.value[0],r.token.value[1]):v(r.token.type
,r.token.value);return R(prog1(t,o),e)}l()}),K=y(function(e,t){arguments.length==0&&
(e=!0);var n=J(t);return e&&i("punc",",")?(o(),v("seq",n,K(!0,t))):n});return v("toplevel"
,function(e){while(!i("eof"))e.push(b());return e}([]))}function curry(e){var t=
slice(arguments,1);return function(){return e.apply(this,t.concat(slice(arguments
)))}}function prog1(e){e instanceof Function&&(e=e());for(var t=1,n=arguments.length
;--n>0;++t)arguments[t]();return e}function array_to_hash(e){var t={};for(var n=0
;n<e.length;++n)t[e[n]]=!0;return t}function slice(e,t){return Array.prototype.slice
.call(e,t||0)}function characters(e){return e.split("")}function member(e,t){for(
var n=t.length;--n>=0;)if(t[n]==e)return!0;return!1}function HOP(e,t){return Object
.prototype.hasOwnProperty.call(e,t)}var KEYWORDS=array_to_hash(["break","case","catch"
,"const","continue","debugger","default","delete","do","else","finally","for","function"
,"if","in","instanceof","new","return","switch","throw","try","typeof","var","void"
,"while","with"]),RESERVED_WORDS=array_to_hash(["abstract","boolean","byte","char"
,"class","double","enum","export","extends","final","float","goto","implements","import"
,"int","interface","long","native","package","private","protected","public","short"
,"static","super","synchronized","throws","transient","volatile"]),KEYWORDS_BEFORE_EXPRESSION=
array_to_hash(["return","new","delete","throw","else","case"]),KEYWORDS_ATOM=array_to_hash
(["false","null","true","undefined"]),OPERATOR_CHARS=array_to_hash(characters("+-*&%=<>!?|~^"
)),RE_HEX_NUMBER=/^0x[0-9a-f]+$/i,RE_OCT_NUMBER=/^0[0-7]+$/,RE_DEC_NUMBER=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i
,OPERATORS=array_to_hash(["in","instanceof","typeof","new","void","delete","++","--"
,"+","-","!","~","&","|","^","*","/","%",">>","<<",">>>","<",">","<=",">=","==","==="
,"!=","!==","?","=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&=","&&"
,"||"]),WHITESPACE_CHARS=array_to_hash(characters(" \u00a0\n\r	\f\u200b\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff"
)),PUNC_BEFORE_EXPRESSION=array_to_hash(characters("[{(,.;:")),PUNC_CHARS=array_to_hash
(characters("[]{}(),;:")),REGEXP_MODIFIERS=array_to_hash(characters("gmsiy")),UNICODE=
{letter:new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F0\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"
),combining_mark:new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08E4-\\u08FE\\u0900-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962\\u0963\\u0981-\\u0983\\u09BC\\u09BE-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CD\\u09D7\\u09E2\\u09E3\\u0A01-\\u0A03\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81-\\u0A83\\u0ABC\\u0ABE-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AE2\\u0AE3\\u0B01-\\u0B03\\u0B3C\\u0B3E-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B62\\u0B63\\u0B82\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD7\\u0C01-\\u0C03\\u0C3E-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0C82\\u0C83\\u0CBC\\u0CBE-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CE2\\u0CE3\\u0D02\\u0D03\\u0D3E-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4D\\u0D57\\u0D62\\u0D63\\u0D82\\u0D83\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F3E\\u0F3F\\u0F71-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102B-\\u103E\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F\\u109A-\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B4-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u192B\\u1930-\\u193B\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A17-\\u1A1B\\u1A55-\\u1A5E\\u1A60-\\u1A7C\\u1A7F\\u1B00-\\u1B04\\u1B34-\\u1B44\\u1B6B-\\u1B73\\u1B80-\\u1B82\\u1BA1-\\u1BAD\\u1BE6-\\u1BF3\\u1C24-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE8\\u1CED\\u1CF2-\\u1CF4\\u1DC0-\\u1DE6\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA674-\\uA67D\\uA69F\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA823-\\uA827\\uA880\\uA881\\uA8B4-\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA953\\uA980-\\uA983\\uA9B3-\\uA9C0\\uAA29-\\uAA36\\uAA43\\uAA4C\\uAA4D\\uAA7B\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAEB-\\uAAEF\\uAAF5\\uAAF6\\uABE3-\\uABEA\\uABEC\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"
),connector_punctuation:new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"
),digit:new RegExp("[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]"
)};JS_Parse_Error.prototype.toString=function(){return this.message+" (line: "+this
.line+", col: "+this.col+", pos: "+this.pos+")"+"\n\n"+this.stack};var EX_EOF={}
,UNARY_PREFIX=array_to_hash(["typeof","void","delete","--","++","!","~","-","+"]
),UNARY_POSTFIX=array_to_hash(["--","++"]),ASSIGNMENT=function(e,t,n){while(n<e.
length)t[e[n]]=e[n].substr(0,e[n].length-1),n++;return t}(["+=","-=","/=","*=","%="
,">>=","<<=",">>>=","|=","^=","&="],{"=":!0},0),PRECEDENCE=function(e,t){for(var n=0
,r=1;n<e.length;++n,++r){var i=e[n];for(var s=0;s<i.length;++s)t[i[s]]=r}return t
}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in"
,"instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"]],{}),STATEMENTS_WITH_LABELS=
array_to_hash(["for","do","while","switch"]),ATOMIC_START_TOKEN=array_to_hash(["atom"
,"num","string","regexp","name"]);NodeWithToken.prototype.toString=function(){return this
.name};var warn=function(){};exports.tokenizer=tokenizer,exports.parse=parse,exports
.slice=slice,exports.curry=curry,exports.member=member,exports.array_to_hash=array_to_hash
,exports.PRECEDENCE=PRECEDENCE,exports.KEYWORDS_ATOM=KEYWORDS_ATOM,exports.RESERVED_WORDS=
RESERVED_WORDS,exports.KEYWORDS=KEYWORDS,exports.ATOMIC_START_TOKEN=ATOMIC_START_TOKEN
,exports.OPERATORS=OPERATORS,exports.is_alphanumeric_char=is_alphanumeric_char,exports
.is_identifier_start=is_identifier_start,exports.is_identifier_char=is_identifier_char
,exports.set_logger=function(e){warn=e}



// init lib process
// https://github.com/mishoo/UglifyJS/blob/v1.3.5/lib/process.js
// utility2-uglifyjs https://raw.githubusercontent.com/mishoo/UglifyJS/v1.3.5/lib/process.js
function ast_walker(){function e(e){return[this[0],MAP(e,function(e){var t=[e[0]
];return e.length>1&&(t[1]=s(e[1])),t})]}function t(e){var t=[this[0]];return e!=
null&&t.push(MAP(e,s)),t}function s(e){if(e==null)return null;try{i.push(e);var t=
e[0],s=r[t];if(s){var o=s.apply(e,e.slice(1));if(o!=null)return o}return s=n[t],
s.apply(e,e.slice(1))}finally{i.pop()}}function o(e){if(e==null)return null;try{
return i.push(e),n[e[0]].apply(e,e.slice(1))}finally{i.pop()}}function u(e,t){var n=
{},i;for(i in e)HOP(e,i)&&(n[i]=r[i],r[i]=e[i]);var s=t();for(i in n)HOP(n,i)&&(
n[i]?r[i]=n[i]:delete r[i]);return s}var n={string:function(e){return[this[0],e]
},num:function(e){return[this[0],e]},name:function(e){return[this[0],e]},toplevel
:function(e){return[this[0],MAP(e,s)]},block:t,splice:t,"var":e,"const":e,"try":
function(e,t,n){return[this[0],MAP(e,s),t!=null?[t[0],MAP(t[1],s)]:null,n!=null?
MAP(n,s):null]},"throw":function(e){return[this[0],s(e)]},"new":function(e,t){return[
this[0],s(e),MAP(t,s)]},"switch":function(e,t){return[this[0],s(e),MAP(t,function(
e){return[e[0]?s(e[0]):null,MAP(e[1],s)]})]},"break":function(e){return[this[0],
e]},"continue":function(e){return[this[0],e]},conditional:function(e,t,n){return[
this[0],s(e),s(t),s(n)]},assign:function(e,t,n){return[this[0],e,s(t),s(n)]},dot
:function(e){return[this[0],s(e)].concat(slice(arguments,1))},call:function(e,t)
{return[this[0],s(e),MAP(t,s)]},"function":function(e,t,n){return[this[0],e,t.slice
(),MAP(n,s)]},"debugger":function(){return[this[0]]},defun:function(e,t,n){return[
this[0],e,t.slice(),MAP(n,s)]},"if":function(e,t,n){return[this[0],s(e),s(t),s(n
)]},"for":function(e,t,n,r){return[this[0],s(e),s(t),s(n),s(r)]},"for-in":function(
e,t,n,r){return[this[0],s(e),s(t),s(n),s(r)]},"while":function(e,t){return[this[0
],s(e),s(t)]},"do":function(e,t){return[this[0],s(e),s(t)]},"return":function(e)
{return[this[0],s(e)]},binary:function(e,t,n){return[this[0],e,s(t),s(n)]},"unary-prefix"
:function(e,t){return[this[0],e,s(t)]},"unary-postfix":function(e,t){return[this
[0],e,s(t)]},sub:function(e,t){return[this[0],s(e),s(t)]},object:function(e){return[
this[0],MAP(e,function(e){return e.length==2?[e[0],s(e[1])]:[e[0],s(e[1]),e[2]]}
)]},regexp:function(e,t){return[this[0],e,t]},array:function(e){return[this[0],MAP
(e,s)]},stat:function(e){return[this[0],s(e)]},seq:function(){return[this[0]].concat
(MAP(slice(arguments),s))},label:function(e,t){return[this[0],e,s(t)]},"with":function(
e,t){return[this[0],s(e),s(t)]},atom:function(e){return[this[0],e]},directive:function(
e){return[this[0],e]}},r={},i=[];return{walk:s,dive:o,with_walkers:u,parent:function(
){return i[i.length-2]},stack:function(){return i}}}function Scope(e){this.names=
{},this.mangled={},this.rev_mangled={},this.cname=-1,this.refs={},this.uses_with=!1
,this.uses_eval=!1,this.directives=[],this.parent=e,this.children=[],e?(this.level=
e.level+1,e.children.push(this)):this.level=0}function base54_digits(){return typeof
DIGITS_OVERRIDE_FOR_TESTING!="undefined"?DIGITS_OVERRIDE_FOR_TESTING:"etnrisouaflchpdvmgybwESxTNCkLAOM_DPHBjFIqRUzWXV$JKQGYZ0516372984"
}function ast_add_scope(e){function s(e){t=new Scope(t),t.labels=new Scope;var n=
t.body=e();return n.scope=t,t=t.parent,n}function o(e,n){return t.define(e,n)}function u
(e){t.refs[e]=!0}function a(e,t,n){var i=this[0]=="defun";return[this[0],i?o(e,"defun"
):e,t,s(function(){return i||o(e,"lambda"),MAP(t,function(e){o(e,"arg")}),MAP(n,
r)})]}function f(e){return function(t){MAP(t,function(t){o(t[0],e),t[1]&&u(t[0])
})}}function l(e){e&&(t.labels.refs[e]=!0)}var t=null,n=ast_walker(),r=n.walk,i=
[];return s(function(){function c(e,t){for(t=e.children.length;--t>=0;)c(e.children
[t]);for(t in e.refs)if(HOP(e.refs,t))for(var n=e.has(t),r=e;r;r=r.parent){r.refs
[t]=n;if(r===n)break}}var s=n.with_walkers({"function":a,defun:a,label:function(
e,n){t.labels.define(e)},"break":l,"continue":l,"with":function(e,n){for(var r=t
;r;r=r.parent)r.uses_with=!0},"var":f("var"),"const":f("const"),"try":function(e
,t,n){if(t!=null)return[this[0],MAP(e,r),[o(t[0],"catch"),MAP(t[1],r)],n!=null?MAP
(n,r):null]},name:function(e){e=="eval"&&i.push(t),u(e)}},function(){return r(e)
});return MAP(i,function(e){if(!e.has("eval"))while(e)e.uses_eval=!0,e=e.parent}
),c(t),s})}function ast_mangle(e,t){function s(e,n){return t.mangle?!t.toplevel&&!
i.parent?e:t.except&&member(e,t.except)?e:t.no_functions&&HOP(i.names,e)&&(i.names
[e]=="defun"||i.names[e]=="lambda")?e:i.get_mangled(e,n):e}function o(e){if(t.defines
)return!i.has(e)&&HOP(t.defines,e)?t.defines[e]:null}function u(e,n,o){if(!t.no_functions&&
t.mangle){var u=this[0]=="defun",f;e&&(u?e=s(e):o.scope.references(e)?(f={},!i.uses_eval&&!
i.uses_with?e=f[e]=i.next_mangled():f[e]=e):e=null)}return o=a(o.scope,function(
){return n=MAP(n,function(e){return s(e)}),MAP(o,r)},f),[this[0],e,n,o]}function a
(e,t,n){var r=i;i=e;if(n)for(var o in n)HOP(n,o)&&e.set_mangle(o,n[o]);for(var o in
e.names)HOP(e.names,o)&&s(o,!0);var u=t();return u.scope=e,i=r,u}function f(e){return[
this[0],MAP(e,function(e){return[s(e[0]),r(e[1])]})]}function l(e){if(e)return[this
[0],i.labels.get_mangled(e)]}var n=ast_walker(),r=n.walk,i;return t=defaults(t,{
mangle:!0,toplevel:!1,defines:null,except:null,no_functions:!1}),n.with_walkers(
{"function":u,defun:function(){var e=u.apply(this,arguments);switch(n.parent()[0
]){case"toplevel":case"function":case"defun":return MAP.at_top(e)}return e},label
:function(e,t){return i.labels.refs[e]?[this[0],i.labels.get_mangled(e,!0),r(t)]
:r(t)},"break":l,"continue":l,"var":f,"const":f,name:function(e){return o(e)||[this
[0],s(e)]},"try":function(e,t,n){return[this[0],MAP(e,r),t!=null?[s(t[0]),MAP(t[1
],r)]:null,n!=null?MAP(n,r):null]},toplevel:function(e){var t=this;return a(t.scope
,function(){return[t[0],MAP(e,r)]})},directive:function(){return MAP.at_top(this
)}},function(){return r(ast_add_scope(e))})}function best_of(e,t){return gen_code
(e).length>gen_code(t[0]=="stat"?t[1]:t).length?t:e}function last_stat(e){return e
[0]=="block"&&e[1]&&e[1].length>0?e[1][e[1].length-1]:e}function aborts(e){if(e)
switch(last_stat(e)[0]){case"return":case"break":case"continue":case"throw":return!0
}}function boolean_expr(e){return e[0]=="unary-prefix"&&member(e[1],["!","delete"
])||e[0]=="binary"&&member(e[1],["in","instanceof","==","!=","===","!==","<","<="
,">=",">"])||e[0]=="binary"&&member(e[1],["&&","||"])&&boolean_expr(e[2])&&boolean_expr
(e[3])||e[0]=="conditional"&&boolean_expr(e[2])&&boolean_expr(e[3])||e[0]=="assign"&&
e[1]===!0&&boolean_expr(e[3])||e[0]=="seq"&&boolean_expr(e[e.length-1])}function empty
(e){return!e||e[0]=="block"&&(!e[1]||e[1].length==0)}function is_string(e){return e
[0]=="string"||e[0]=="unary-prefix"&&e[1]=="typeof"||e[0]=="binary"&&e[1]=="+"&&
(is_string(e[2])||is_string(e[3]))}function warn_unreachable(e){empty(e)||warn("Dropping unreachable code: "+
gen_code(e,!0))}function prepare_ifs(e){function r(e){e=MAP(e,n);for(var t=0;t<e
.length;++t){var i=e[t];if(i[0]!="if")continue;if(i[3])continue;var s=i[2];if(!aborts
(s))continue;var o=n(i[1]),u=r(e.slice(t+1)),a=u.length==1?u[0]:["block",u];return e
.slice(0,t).concat([[i[0],o,s,a]])}return e}function i(e,t,n){return n=r(n),[this
[0],e,t,n]}function s(e){return[this[0],e!=null?r(e):null]}var t=ast_walker(),n=
t.walk;return t.with_walkers({defun:i,"function":i,block:s,splice:s,toplevel:function(
e){return[this[0],r(e)]},"try":function(e,t,n){return[this[0],r(e),t!=null?[t[0]
,r(t[1])]:null,n!=null?r(n):null]}},function(){return n(e)})}function for_side_effects
(e,t){function o(){throw i}function u(){throw s}function a(){return t.call(this,
this,n,o,u)}function f(e){if(e=="++"||e=="--")return a.apply(this,arguments)}function l
(e){if(e=="&&"||e=="||")return a.apply(this,arguments)}var n=ast_walker(),r=n.walk
,i={},s={};return n.with_walkers({"try":a,"throw":a,"return":a,"new":a,"switch":
a,"break":a,"continue":a,assign:a,call:a,"if":a,"for":a,"for-in":a,"while":a,"do"
:a,"return":a,"unary-prefix":f,"unary-postfix":f,conditional:a,binary:l,defun:a}
,function(){for(;;)try{r(e);break}catch(t){if(t===i)break;if(t===s)continue;throw t
}})}function ast_lift_variables(e){function i(e,t){var i=r;r=t,e=MAP(e,n);var s=
{},o=MAP(t.names,function(e,n){return e!="var"?MAP.skip:t.references(n)?(s[n]=!0
,[n]):MAP.skip});return o.length>0&&(for_side_effects(["block",e],function(e,t,n
,r){if(e[0]=="assign"&&e[1]===!0&&e[2][0]=="name"&&HOP(s,e[2][1])){for(var i=o.length
;--i>=0;)if(o[i][0]==e[2][1]){o[i][1]&&n(),o[i][1]=e[3],o.push(o.splice(i,1)[0])
;break}var u=t.parent();if(u[0]=="seq"){var a=u[2];a.unshift(0,u.length),u.splice
.apply(u,a)}else u[0]=="stat"?u.splice(0,u.length,"block"):n();r()}n()}),e.unshift
(["var",o])),r=i,e}function s(e){var n=null;for(var r=e.length;--r>=0;){var i=e[
r];if(!i[1])continue;i=["assign",!0,["name",i[0]],i[1]],n==null?n=i:n=["seq",i,n
]}return n==null&&t.parent()[0]!="for"?t.parent()[0]=="for-in"?["name",e[0][0]]:
MAP.skip:["stat",n]}function o(e){return[this[0],i(e,this.scope)]}var t=ast_walker
(),n=t.walk,r;return t.with_walkers({"function":function(e,t,n){for(var r=t.length
;--r>=0&&!n.scope.references(t[r]);)t.pop();return n.scope.references(e)||(e=null
),[this[0],e,t,i(n,n.scope)]},defun:function(e,t,n){if(!r.references(e))return MAP
.skip;for(var s=t.length;--s>=0&&!n.scope.references(t[s]);)t.pop();return[this[0
],e,t,i(n,n.scope)]},"var":s,toplevel:o},function(){return n(ast_add_scope(e))})
}function ast_squeeze(e,t){return e=squeeze_1(e,t),e=squeeze_2(e,t),e}function squeeze_1
(e,t){function s(e){var n=["unary-prefix","!",e];switch(e[0]){case"unary-prefix"
:return e[1]=="!"&&boolean_expr(e[2])?e[2]:n;case"seq":return e=slice(e),e[e.length-1
]=s(e[e.length-1]),e;case"conditional":return best_of(n,["conditional",e[1],s(e[2
]),s(e[3])]);case"binary":var r=e[1],i=e[2],o=e[3];if(!t.keep_comps)switch(r){case"<="
:return["binary",">",i,o];case"<":return["binary",">=",i,o];case">=":return["binary"
,"<",i,o];case">":return["binary","<=",i,o]}switch(r){case"==":return["binary","!="
,i,o];case"!=":return["binary","==",i,o];case"===":return["binary","!==",i,o];case"!=="
:return["binary","===",i,o];case"&&":return best_of(n,["binary","||",s(i),s(o)])
;case"||":return best_of(n,["binary","&&",s(i),s(o)])}}return n}function o(e,t,n
){var r=function(){return e[0]=="unary-prefix"&&e[1]=="!"?n?["conditional",e[2],
n,t]:["binary","||",e[2],t]:n?best_of(["conditional",e,t,n],["conditional",s(e),
n,t]):["binary","&&",e,t]};return when_constant(e,function(e,r){return warn_unreachable
(r?n:t),r?t:n},r)}function u(e){return e!=null&&e[0]=="block"&&e[1]&&(e[1].length==1?
e=e[1][0]:e[1].length==0&&(e=["block"])),e}function a(e,t,n){return[this[0],e,t,
f(n,"lambda")]}function f(e,n){return e=MAP(e,r),e=e.reduce(function(e,t){return t
[0]=="block"?t[1]&&e.push.apply(e,t[1]):e.push(t),e},[]),e=function(t,n){return e
.forEach(function(e){n&&(e[0]=="var"&&n[0]=="var"||e[0]=="const"&&n[0]=="const")?
n[1]=n[1].concat(e[1]):(t.push(e),n=e)}),t}([]),t.dead_code&&(e=function(n,r){return e
.forEach(function(e){r?e[0]=="function"||e[0]=="defun"?n.push(e):e[0]=="var"||e[0
]=="const"?(t.no_warnings||warn("Variables declared in unreachable code"),e[1]=MAP
(e[1],function(e){return e[1]&&!t.no_warnings&&warn_unreachable(["assign",!0,["name"
,e[0]],e[1]]),[e[0]]}),n.push(e)):t.no_warnings||warn_unreachable(e):(n.push(e),
member(e[0],["return","throw","break","continue"])&&(r=!0))}),n}([])),t.make_seqs&&
(e=function(t,n){return e.forEach(function(e){n&&n[0]=="stat"&&e[0]=="stat"?n[1]=
["seq",n[1],e[1]]:(t.push(e),n=e)}),t.length>=2&&t[t.length-2][0]=="stat"&&(t[t.
length-1][0]=="return"||t[t.length-1][0]=="throw")&&t[t.length-1][1]&&t.splice(t
.length-2,2,[t[t.length-1][0],["seq",t[t.length-2][1],t[t.length-1][1]]]),t}([])
),e}function l(e,t,n){return when_constant(e,function(e,i){return i?(t=r(t),warn_unreachable
(n),t||["block"]):(n=r(n),warn_unreachable(t),n||["block"])},function(){return h
(e,t,n)})}function c(e,t,n){var i=[["if",s(e),n]];return t[0]=="block"?t[1]&&(i=
i.concat(t[1])):i.push(t),r(["block",i])}function h(e,t,n){e=r(e),t=r(t),n=r(n);
if(empty(n)&&empty(t))return["stat",e];empty(t)?(e=s(e),t=n,n=null):empty(n)?n=null
:function(){var r=gen_code(e),i=s(e),o=gen_code(i);if(o.length<r.length){var u=t
;t=n,n=u,e=i}}();var i=["if",e,t,n];return t[0]=="if"&&empty(t[3])&&empty(n)?i=best_of
(i,r(["if",["binary","&&",e,t[1]],t[2]])):t[0]=="stat"?n?n[0]=="stat"?i=best_of(
i,["stat",o(e,t[1],n[1])]):aborts(n)&&(i=c(e,t,n)):i=best_of(i,["stat",o(e,t[1])
]):n&&t[0]==n[0]&&(t[0]=="return"||t[0]=="throw")&&t[1]&&n[1]?i=best_of(i,[t[0],
o(e,t[1],n[1])]):n&&aborts(t)?(i=[["if",e,t]],n[0]=="block"?n[1]&&(i=i.concat(n[1
])):i.push(n),i=r(["block",i])):t&&aborts(n)&&(i=c(e,t,n)),i}function p(e,t){return when_constant
(e,function(e,n){return n?["for",null,null,null,r(t)]:(warn_unreachable(t),["block"
])})}t=defaults(t,{make_seqs:!0,dead_code:!0,no_warnings:!1,keep_comps:!0,unsafe
:!1});var n=ast_walker(),r=n.walk,i;return n.with_walkers({sub:function(e,t){if(
t[0]=="string"){var n=t[1];if(is_identifier(n))return["dot",r(e),n];if(/^[1-9][0-9]*$/
.test(n)||n==="0")return["sub",r(e),["num",parseInt(n,10)]]}},"if":l,toplevel:function(
e){return["toplevel",f(e)]},"switch":function(e,t){var n=t.length-1;return["switch"
,r(e),MAP(t,function(e,t){var i=f(e[1]);if(t==n&&i.length>0){var s=i[i.length-1]
;s[0]=="break"&&!s[1]&&i.pop()}return[e[0]?r(e[0]):null,i]})]},"function":a,defun
:a,block:function(e){if(e)return u(["block",f(e)])},binary:function(e,t,n){return when_constant
(["binary",e,r(t),r(n)],function(t){return best_of(r(t),this)},function(){return function(
){if(e!="=="&&e!="!=")return;var i=r(t),s=r(n);return i&&i[0]=="unary-prefix"&&i
[1]=="!"&&i[2][0]=="num"?t=["num",+!i[2][1]]:s&&s[0]=="unary-prefix"&&s[1]=="!"&&
s[2][0]=="num"&&(n=["num",+!s[2][1]]),["binary",e,t,n]}()||this})},conditional:function(
e,t,n){return o(r(e),r(t),r(n))},"try":function(e,t,n){return["try",f(e),t!=null?
[t[0],f(t[1])]:null,n!=null?f(n):null]},"unary-prefix":function(e,t){t=r(t);var n=
["unary-prefix",e,t];return e=="!"&&(n=best_of(n,s(t))),when_constant(n,function(
e,t){return r(e)},function(){return n})},name:function(e){switch(e){case"true":return["unary-prefix"
,"!",["num",0]];case"false":return["unary-prefix","!",["num",1]]}},"while":p,assign
:function(e,t,n){t=r(t),n=r(n);var i=["+","-","/","*","%",">>","<<",">>>","|","^"
,"&"];return e===!0&&t[0]==="name"&&n[0]==="binary"&&~i.indexOf(n[1])&&n[2][0]==="name"&&
n[2][1]===t[1]?[this[0],n[1],t,n[3]]:[this[0],e,t,n]},call:function(e,n){return e=
r(e),t.unsafe&&e[0]=="dot"&&e[1][0]=="string"&&e[2]=="toString"?e[1]:[this[0],e,
MAP(n,r)]},num:function(e){return isFinite(e)?[this[0],e]:["binary","/",e===1/0?
["num",1]:e===-1/0?["unary-prefix","-",["num",1]]:["num",0],["num",0]]}},function(
){return r(prepare_ifs(r(prepare_ifs(e))))})}function squeeze_2(e,t){function s(
e,t){var n=i,r;return i=e,r=t(),i=n,r}function o(e,t,n){return[this[0],e,t,s(n.scope
,curry(MAP,n,r))]}var n=ast_walker(),r=n.walk,i;return n.with_walkers({directive
:function(e){if(i.active_directive(e))return["block"];i.directives.push(e)},toplevel
:function(e){return[this[0],s(this.scope,curry(MAP,e,r))]},"function":o,defun:o}
,function(){return r(ast_add_scope(e))})}function make_string(e,t){var n=0,r=0;return e=
e.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g,function(e){switch(e){case"\\"
:return"\\\\";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r"
:return"\\r";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";case'"':return++
n,'"';case"'":return++r,"'";case"\0":return"\\0"}return e}),t&&(e=to_ascii(e)),n>
r?"'"+e.replace(/\x27/g,"\\'")+"'":'"'+e.replace(/\x22/g,'\\"')+'"'}function to_ascii
(e){return e.replace(/[\u0080-\uffff]/g,function(e){var t=e.charCodeAt(0).toString
(16);while(t.length<4)t="0"+t;return"\\u"+t})}function gen_code(e,t){function o(
e){var n=make_string(e,t.ascii_only);return t.inline_script&&(n=n.replace(/<\x2fscript([>\/\t\n\f\r ])/gi
,"<\\/script$1")),n}function u(e){return e=e.toString(),t.ascii_only&&(e=to_ascii
(e)),e}function a(e){return e==null&&(e=""),n&&(e=repeat_string(" ",t.indent_start+
r*t.indent_level)+e),e}function f(e,t){t==null&&(t=1),r+=t;try{return e.apply(null
,slice(arguments,1))}finally{r-=t}}function l(e){return e=e.toString(),e.charAt(
e.length-1)}function c(e){return e.toString().charAt(0)}function h(e){if(n)return e
.join(" ");var t=[];for(var r=0;r<e.length;++r){var i=e[r+1];t.push(e[r]),i&&(is_identifier_char
(l(e[r]))&&(is_identifier_char(c(i))||c(i)=="\\")||/[\+\-]$/.test(e[r].toString(
))&&/^[\+\-]/.test(i.toString())||l(e[r])=="/"&&c(i)=="/")&&t.push(" ")}return t
.join("")}function p(e){return e.join(","+s)}function d(e){var t=b(e);for(var n=1
;n<arguments.length;++n){var r=arguments[n];if(r instanceof Function&&r(e)||e[0]==
r)return"("+t+")"}return t}function v(e){if(e.length==1)return e[0];if(e.length==2
){var t=e[1];return e=e[0],e.length<=t.length?e:t}return v([e[0],v(e.slice(1))])
}function m(e){if(e[0]=="function"||e[0]=="object"){var t=slice(y.stack()),n=t.pop
(),r=t.pop();while(r){if(r[0]=="stat")return!0;if((r[0]!="seq"&&r[0]!="call"&&r[0
]!="dot"&&r[0]!="sub"&&r[0]!="conditional"||r[1]!==n)&&(r[0]!="binary"&&r[0]!="assign"&&
r[0]!="unary-postfix"||r[2]!==n))return!1;n=r,r=t.pop()}}return!HOP(DOT_CALL_NO_PARENS
,e[0])}function g(e){var t=e.toString(10),n=[t.replace(/^0\./,".").replace("e+","e"
)],r;return Math.floor(e)===e?(e>=0?n.push("0x"+e.toString(16).toLowerCase(),"0"+
e.toString(8)):n.push("-0x"+(-e).toString(16).toLowerCase(),"-0"+(-e).toString(8
)),(r=/^(.*?)(0+)$/.exec(e))&&n.push(r[1]+"e"+r[2].length)):(r=/^0?\.(0+)(.*)$/.
exec(e))&&n.push(r[2]+"e-"+(r[1].length+r[2].length),t.substr(t.indexOf("."))),v
(n)}function w(e){if(e==null)return";";if(e[0]=="do")return N([e]);var t=e;for(;
;){var n=t[0];if(n=="if"){if(!t[3])return b(["block",[e]]);t=t[3]}else if(n=="while"||
n=="do")t=t[2];else{if(n!="for"&&n!="for-in")break;t=t[4]}}return b(e)}function E
(e,t,n,r,i){var s=r||"function";return e&&(s+=" "+u(e)),s+="("+p(MAP(t,u))+")",s=
h([s,N(n)]),!i&&m(this)?"("+s+")":s}function S(e){switch(e[0]){case"with":case"while"
:return empty(e[2])||S(e[2]);case"for":case"for-in":return empty(e[4])||S(e[4]);
case"if":if(empty(e[2])&&!e[3])return!0;if(e[3])return empty(e[3])?!0:S(e[3]);return S
(e[2]);case"directive":return!0}}function x(e,t){for(var r=[],i=e.length-1,s=0;s<=
i;++s){var o=e[s],u=b(o);u!=";"&&(!n&&s==i&&!S(o)&&(u=u.replace(/;+\s*$/,"")),r.
push(u))}return t?r:MAP(r,a)}function T(e){var t=e.length;return t==0?"{}":"{"+i+
MAP(e,function(e,r){var s=e[1].length>0,o=f(function(){return a(e[0]?h(["case",b
(e[0])+":"]):"default:")},.5)+(s?i+f(function(){return x(e[1]).join(i)}):"");return!
n&&s&&r<t-1&&(o+=";"),o}).join(i)+i+a("}")}function N(e){return e?e.length==0?"{}"
:"{"+i+f(function(){return x(e).join(i)})+i+a("}"):";"}function C(e){var t=e[0],
n=e[1];return n!=null&&(t=h([u(t),"=",d(n,"seq")])),t}t=defaults(t,{indent_start
:0,indent_level:4,quote_keys:!1,space_colon:!1,beautify:!1,ascii_only:!1,inline_script
:!1});var n=!!t.beautify,r=0,i=n?"\n":"",s=n?" ":"",y=ast_walker(),b=y.walk;return y
.with_walkers({string:o,num:g,name:u,"debugger":function(){return"debugger;"},toplevel
:function(e){return x(e).join(i+i)},splice:function(e){var t=y.parent();return HOP
(SPLICE_NEEDS_BRACKETS,t)?N.apply(this,arguments):MAP(x(e,!0),function(e,t){return t>0?
a(e):e}).join(i)},block:N,"var":function(e){return"var "+p(MAP(e,C))+";"},"const"
:function(e){return"const "+p(MAP(e,C))+";"},"try":function(e,t,n){var r=["try",
N(e)];return t&&r.push("catch","("+t[0]+")",N(t[1])),n&&r.push("finally",N(n)),h
(r)},"throw":function(e){return h(["throw",b(e)])+";"},"new":function(e,t){return t=
t.length>0?"("+p(MAP(t,function(e){return d(e,"seq")}))+")":"",h(["new",d(e,"seq"
,"binary","conditional","assign",function(e){var t=ast_walker(),n={};try{t.with_walkers
({call:function(){throw n},"function":function(){return this}},function(){t.walk
(e)})}catch(r){if(r===n)return!0;throw r}})+t])},"switch":function(e,t){return h
(["switch","("+b(e)+")",T(t)])},"break":function(e){var t="break";return e!=null&&
(t+=" "+u(e)),t+";"},"continue":function(e){var t="continue";return e!=null&&(t+=" "+
u(e)),t+";"},conditional:function(e,t,n){return h([d(e,"assign","seq","conditional"
),"?",d(t,"seq"),":",d(n,"seq")])},assign:function(e,t,n){return e&&e!==!0?e+="="
:e="=",h([b(t),e,d(n,"seq")])},dot:function(e){var t=b(e),n=1;e[0]=="num"?/[a-f.]/i
.test(t)||(t+="."):e[0]!="function"&&m(e)&&(t="("+t+")");while(n<arguments.length
)t+="."+u(arguments[n++]);return t},call:function(e,t){var n=b(e),r=e[0]=="function"&&
n.charAt(0)=="(";return!r&&m(e)&&(n="("+n+")"),n+"("+p(MAP(t,function(e){return d
(e,"seq")}))+")"},"function":E,defun:E,"if":function(e,t,n){var r=["if","("+b(e)+")"
,n?w(t):b(t)];return n&&r.push("else",b(n)),h(r)},"for":function(e,t,n,r){var i=
["for"];e=(e!=null?b(e):"").replace(/;*\s*$/,";"+s),t=(t!=null?b(t):"").replace(/;*\s*$/
,";"+s),n=(n!=null?b(n):"").replace(/;*\s*$/,"");var o=e+t+n;return o=="; ; "&&(
o=";;"),i.push("("+o+")",b(r)),h(i)},"for-in":function(e,t,n,r){return h(["for","("+
(e?b(e).replace(/;+$/,""):b(t)),"in",b(n)+")",b(r)])},"while":function(e,t){return h
(["while","("+b(e)+")",b(t)])},"do":function(e,t){return h(["do",b(t),"while","("+
b(e)+")"])+";"},"return":function(e){var t=["return"];return e!=null&&t.push(b(e
)),h(t)+";"},binary:function(e,r,i){var s=b(r),o=b(i);if(member(r[0],["assign","conditional"
,"seq"])||r[0]=="binary"&&PRECEDENCE[e]>PRECEDENCE[r[1]]||r[0]=="function"&&m(this
))s="("+s+")";return member(i[0],["assign","conditional","seq"])||i[0]=="binary"&&
PRECEDENCE[e]>=PRECEDENCE[i[1]]&&(i[1]!=e||!member(e,["&&","||","*"]))?o="("+o+")"
:!n&&t.inline_script&&(e=="<"||e=="<<")&&i[0]=="regexp"&&/^script/i.test(i[1])&&
(o=" "+o),h([s,e,o])},"unary-prefix":function(e,t){var n=b(t);return t[0]=="num"||
t[0]=="unary-prefix"&&!HOP(OPERATORS,e+t[1])||!m(t)||(n="("+n+")"),e+(jsp.is_alphanumeric_char
(e.charAt(0))?" ":"")+n},"unary-postfix":function(e,t){var n=b(t);return t[0]=="num"||
t[0]=="unary-postfix"&&!HOP(OPERATORS,e+t[1])||!m(t)||(n="("+n+")"),n+e},sub:function(
e,t){var n=b(e);return m(e)&&(n="("+n+")"),n+"["+b(t)+"]"},object:function(e){var r=
m(this);if(e.length==0)return r?"({})":"{}";var s="{"+i+f(function(){return MAP(
e,function(e){if(e.length==3)return a(E(e[0],e[1][2],e[1][3],e[2],!0));var r=e[0
],i=d(e[1],"seq");return t.quote_keys?r=o(r):(typeof r=="number"||!n&&+r+""==r)&&
parseFloat(r)>=0?r=g(+r):is_identifier(r)||(r=o(r)),a(h(n&&t.space_colon?[r,":",
i]:[r+":",i]))}).join(","+i)})+i+a("}");return r?"("+s+")":s},regexp:function(e,
n){return t.ascii_only&&(e=to_ascii(e)),"/"+e+"/"+n},array:function(e){return e.
length==0?"[]":h(["[",p(MAP(e,function(t,r){return!n&&t[0]=="atom"&&t[1]=="undefined"?
r===e.length-1?",":"":d(t,"seq")})),"]"])},stat:function(e){return e!=null?b(e).
replace(/;*\s*$/,";"):";"},seq:function(){return p(MAP(slice(arguments),b))},label
:function(e,t){return h([u(e),":",b(t)])},"with":function(e,t){return h(["with","("+
b(e)+")",b(t)])},atom:function(e){return u(e)},directive:function(e){return make_string
(e)+";"}},function(){return b(e)})}function split_lines(e,t){var n=[0];return jsp
.parse(function(){function o(e){return e.pos-i}function u(e){i=e.pos,n.push(i)}function a
(){var e=r.apply(this,arguments);e:{if(s&&s.type=="keyword")break e;if(o(e)>t)switch(
e.type){case"keyword":case"atom":case"name":case"punc":u(e);break e}}return s=e,
e}var r=jsp.tokenizer(e),i=0,s;return a.context=function(){return r.context.apply
(this,arguments)},a}()),n.map(function(t,r){return e.substring(t,n[r+1]||e.length
)}).join("\n")}function repeat_string(e,t){if(t<=0)return"";if(t==1)return e;var n=
repeat_string(e,t>>1);return n+=n,t&1&&(n+=e),n}function defaults(e,t){var n={};
e===!0&&(e={});for(var r in t)HOP(t,r)&&(n[r]=e&&HOP(e,r)?e[r]:t[r]);return n}function is_identifier
(e){return/^[a-z_$][a-z0-9_$]*$/i.test(e)&&e!="this"&&!HOP(jsp.KEYWORDS_ATOM,e)&&!
HOP(jsp.RESERVED_WORDS,e)&&!HOP(jsp.KEYWORDS,e)}function HOP(e,t){return Object.
prototype.hasOwnProperty.call(e,t)}var jsp=require("./parse-js"),curry=jsp.curry
,slice=jsp.slice,member=jsp.member,is_identifier_char=jsp.is_identifier_char,PRECEDENCE=
jsp.PRECEDENCE,OPERATORS=jsp.OPERATORS,base54=function(){var e=base54_digits();return function(
t){var n="",r=54;do n+=e.charAt(t%r),t=Math.floor(t/r),r=64;while(t>0);return n}
}();Scope.prototype={has:function(e){for(var t=this;t;t=t.parent)if(HOP(t.names,
e))return t},has_mangled:function(e){for(var t=this;t;t=t.parent)if(HOP(t.rev_mangled
,e))return t},toJSON:function(){return{names:this.names,uses_eval:this.uses_eval
,uses_with:this.uses_with}},next_mangled:function(){for(;;){var e=base54(++this.
cname),t;t=this.has_mangled(e);if(t&&this.refs[t.rev_mangled[e]]===t)continue;t=
this.has(e);if(t&&t!==this&&this.refs[e]===t&&!t.has_mangled(e))continue;if(HOP(
this.refs,e)&&this.refs[e]==null)continue;if(!is_identifier(e))continue;return e
}},set_mangle:function(e,t){return this.rev_mangled[t]=e,this.mangled[e]=t},get_mangled
:function(e,t){if(this.uses_eval||this.uses_with)return e;var n=this.has(e);return n?
HOP(n.mangled,e)?n.mangled[e]:t?n.set_mangle(e,n.next_mangled()):e:e},references
:function(e){return e&&!this.parent||this.uses_with||this.uses_eval||this.refs[e
]},define:function(e,t){if(e!=null){if(t=="var"||!HOP(this.names,e))this.names[e
]=t||"var";return e}},active_directive:function(e){return member(e,this.directives
)||this.parent&&this.parent.active_directive(e)}};var warn=function(){},when_constant=
function(){function t(n){switch(n[0]){case"string":case"num":return n[1];case"name"
:case"atom":switch(n[1]){case"true":return!0;case"false":return!1;case"null":return null
}break;case"unary-prefix":switch(n[1]){case"!":return!t(n[2]);case"typeof":return typeof
t(n[2]);case"~":return~t(n[2]);case"-":return-t(n[2]);case"+":return+t(n[2])}break;
case"binary":var r=n[2],i=n[3];switch(n[1]){case"&&":return t(r)&&t(i);case"||":
return t(r)||t(i);case"|":return t(r)|t(i);case"&":return t(r)&t(i);case"^":return t
(r)^t(i);case"+":return t(r)+t(i);case"*":return t(r)*t(i);case"/":return t(r)/t
(i);case"%":return t(r)%t(i);case"-":return t(r)-t(i);case"<<":return t(r)<<t(i)
;case">>":return t(r)>>t(i);case">>>":return t(r)>>>t(i);case"==":return t(r)==t
(i);case"===":return t(r)===t(i);case"!=":return t(r)!=t(i);case"!==":return t(r
)!==t(i);case"<":return t(r)<t(i);case"<=":return t(r)<=t(i);case">":return t(r)>
t(i);case">=":return t(r)>=t(i);case"in":return t(r)in t(i);case"instanceof":return t
(r)instanceof t(i)}}throw e}var e={};return function(n,r,i){try{var s=t(n),o;switch(typeof
s){case"string":o=["string",s];break;case"number":o=["num",s];break;case"boolean"
:o=["name",String(s)];break;default:if(s===null){o=["atom","null"];break}throw new
Error("Can't handle constant of type: "+typeof s)}return r.call(n,o,s)}catch(u){
if(u===e){if(n[0]!="binary"||n[1]!="==="&&n[1]!="!=="||!(is_string(n[2])&&is_string
(n[3])||boolean_expr(n[2])&&boolean_expr(n[3]))){if(i&&n[0]=="binary"&&(n[1]=="||"||
n[1]=="&&"))try{var a=t(n[2]);n=n[1]=="&&"&&(a?n[3]:a)||n[1]=="||"&&(a?a:n[3])||
n}catch(f){}}else n[1]=n[1].substr(0,2);return i?i.call(n,n):null}throw u}}}(),DOT_CALL_NO_PARENS=
jsp.array_to_hash(["name","array","object","string","dot","sub","call","regexp","defun"
]),SPLICE_NEEDS_BRACKETS=jsp.array_to_hash(["if","while","do","for","for-in","with"
]),MAP;(function(){function t(e){this.v=e}function n(e){this.v=e}MAP=function(r,
i,s){function f(){var f=i.call(s,r[a],a);f instanceof t?(f=f.v,f instanceof n?u.
push.apply(u,f.v):u.push(f)):f!=e&&(f instanceof n?o.push.apply(o,f.v):o.push(f)
)}var o=[],u=[],a;if(r instanceof Array)for(a=0;a<r.length;++a)f();else for(a in
r)HOP(r,a)&&f();return u.concat(o)},MAP.at_top=function(e){return new t(e)},MAP.
splice=function(e){return new n(e)};var e=MAP.skip={}})(),exports.ast_walker=ast_walker
,exports.ast_mangle=ast_mangle,exports.ast_squeeze=ast_squeeze,exports.ast_lift_variables=
ast_lift_variables,exports.gen_code=gen_code,exports.ast_add_scope=ast_add_scope
,exports.set_logger=function(e){warn=e},exports.make_string=make_string,exports.
split_lines=split_lines,exports.MAP=MAP,exports.ast_squeeze_more=require("./squeeze-more"
).ast_squeeze_more
/* jslint-ignore-end */



        local.uglify = function (code, file) {
        /*
         * this function will uglify the js-code
         */
            var ast;
            // uglify css
            if ((file || '').slice(-4) === '.css') {
                return code
                    // remove comment /**/
                    .replace((/\/\*[\S\s]*?\*\//g), '')
                    // remove comment //
                    .replace((/\/\/.*/g), '')
                    // remove whitespace
                    .replace((/\t/g), ' ')
                    .replace((/ {2,}/g), ' ')
                    .replace((/ *?([\n,:;{}]) */g), '$1')
                    .replace((/\n\n+/g), '\n')
                    .trim();
            }
            // parse code and get the initial AST
            ast = local.parse(code
                .trim()
                // comment shebang
                .replace((/^#!/), '//'));
            // get a new AST with mangled names
            ast = local.ast_mangle(ast);
            // get an AST with compression optimizations
            ast = local.ast_squeeze(ast);
            // compressed code here
            return local.split_lines(local.gen_code(ast, { ascii_only: true }), 79);
        };
    }());
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.path = require('path');
        local.url = require('url');
        // run the cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        if ((/^(?:http|https):\/\//).test(process.argv[2])) {
            // uglify url
            (process.argv[2].indexOf('https') === 0
                ? local.https
                : local.http).request(local.url.parse(
                process.argv[2]
            ), function (response) {
                local.chunkList = [];
                response
                    .on('data', function (chunk) {
                        local.chunkList.push(chunk);
                    })
                    .on('end', function () {
                        console.log(local.uglify(
                            Buffer.concat(local.chunkList).toString(),
                            local.url.parse(process.argv[2]).pathname
                        ));
                    });
            })
                .end();
            break;
        }
        // uglify file
        console.log(local.uglify(local.fs.readFileSync(
            local.path.resolve(process.cwd(), process.argv[2]),
            'utf8'
        ), process.argv[2]));
        break;
    }
}());
