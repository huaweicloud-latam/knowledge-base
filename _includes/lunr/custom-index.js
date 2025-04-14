{%- capture newline %}
{% endcapture -%}
"lang": {{ include.page.lang | markdownify | replace:newline,' ' | strip_html | normalize_whitespace | strip | jsonify }},

var currentLang = '{{ site.lang }}';
if (docs[i].lang != currentLang) {continue;}
