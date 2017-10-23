/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
!function(a){"use strict";function t(t){if(t&&""!==t){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+t+"']").addClass("active");for(var e=0;e<n.length;e++)$(".highlight."+n[e]).hide();$(".highlight."+t).show(),a.toc.calculateHeights(),$(window.location.hash).get(0)&&$(window.location.hash).get(0).scrollIntoView(!0)}}function e(a){if(history){var t=window.location.hash;t&&(t=t.replace(/^#+/,"")),history.pushState({},"","?"+a+"#"+t),localStorage.setItem("language",a)}}function o(a){var e=(a[0],localStorage.getItem("language"));n=a,""!==location.search.substr(1)&&jQuery.inArray(location.search.substr(1),n)!=-1?(t(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):t(null!==e&&jQuery.inArray(e,n)!=-1?e:n[0])}var n=[];a.setupLanguages=o,a.activateLanguage=t,$(function(){$(".lang-selector a").on("click",function(){var a=$(this).data("language-name");return e(a),t(a),!1}),window.onpopstate=function(){t(window.location.search.substr(1))}})}(window);