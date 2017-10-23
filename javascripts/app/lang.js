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
!function(t){"use strict";function o(o){if(o&&""!==o){$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-name='"+o+"']").addClass("active");for(var e=0;e<n.length;e++)$(".highlight."+n[e]).hide();$(".highlight."+o).show(),t.toc.calculateHeights(),$(window.location.hash).get(0)&&$(window.location.hash).get(0).scrollIntoView(!0)}}function e(t){if(history){var o=window.location.hash;o&&(o=o.replace(/^#+/,"")),history.pushState({},"","?"+t+"#"+o),localStorage.setItem("language",t)}}function a(t){var e=(t[0],localStorage.getItem("language"));n=t,""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),n)?(o(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):o(null!==e&&-1!=jQuery.inArray(e,n)?e:n[0])}var n=[];t.setupLanguages=a,t.activateLanguage=o,$(function(){$(".lang-selector a").on("click",function(){var t=$(this).data("language-name");return e(t),o(t),!1}),window.onpopstate=function(t){o(window.location.search.substr(1))}})}(window);