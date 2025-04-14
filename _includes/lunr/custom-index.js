const content_to_merge = [docs[i].content, docs[i].lang];
docs[i].content = content_to_merge.join(' ');

var currentLang = '{{ site.lang }}';
if (docs[i].lang != currentLang) {continue;}
