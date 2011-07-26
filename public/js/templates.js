var nacl = nacl || {};
nacl.templates = nacl.templates || {};
function attrs(obj){
  var buf = []
    , terse = obj.terse;
  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;
  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];
      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + escape(val.join(' ')) + '"');
      } else {
        buf.push(key + '="' + escape(val) + '"');
      }
    }
  }
  return buf.join(' ');
}
function escape(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
var jade = {
  attrs: attrs,
  escape: escape
};
nacl.templates.manage = function anonymous(locals) {
var attrs = jade.attrs, escape = jade.escape;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('manage') }));
buf.push('>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-request') }));
buf.push('>');
buf.push('<div');
buf.push(attrs({ "class": ('col-inner') }));
buf.push('>');
buf.push('<header>');
buf.push('<h1>');
buf.push('Requests');
buf.push('</h1>');
buf.push('<div');
buf.push(attrs({ "class": ('filters') }));
buf.push('>');
buf.push('<h2>');
buf.push('Filters');
buf.push('</h2>');
buf.push('<a');
buf.push(attrs({ 'id':('manage-add-request-filter'), 'href':("#"), 'title':("Add Request Filter"), "class": ('add-filter') }));
buf.push('>');
buf.push('Add Filter');
buf.push('</a>');
buf.push('<ul');
buf.push(attrs({ 'id':('manage-request-filters') }));
buf.push('>');
buf.push('</ul>');
buf.push('</div>');
buf.push('<form');
buf.push(attrs({ 'id':('search-request'), "class": ('search') }));
buf.push('>');
buf.push('<input');
buf.push(attrs({ 'type':("text"), 'name':("search-request") }));
buf.push('/>');
buf.push('<input');
buf.push(attrs({ 'type':("submit"), 'value':("Search") }));
buf.push('/>');
buf.push('</form>');
buf.push('</header>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-items-request'), "class": ('items') }));
buf.push('>');
buf.push('<h1>');
buf.push('Results');
buf.push('</h1>');
buf.push('</section>');
buf.push('</div>');
buf.push('</section>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-shortlist') }));
buf.push('>');
buf.push('<div');
buf.push(attrs({ "class": ('col-inner') }));
buf.push('>');
buf.push('<header>');
buf.push('<h1>');
buf.push('Shortlist');
buf.push('</h1>');
buf.push('<form');
buf.push(attrs({ 'id':('search-access'), "class": ('search') }));
buf.push('>');
buf.push('<input');
buf.push(attrs({ 'type':("text"), 'name':("search-access") }));
buf.push('/>');
buf.push('<input');
buf.push(attrs({ 'type':("submit"), 'value':("Search") }));
buf.push('/>');
buf.push('</form>');
buf.push('</header>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-selected-request'), "class": ('items') }));
buf.push('>');
buf.push('<h1>');
buf.push('Shortlisted Requests');
buf.push('</h1>');
buf.push('<div');
buf.push(attrs({ "class": ('items') }));
buf.push('>');
buf.push('</div>');
buf.push('</section>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-selected-access'), "class": ('items') }));
buf.push('>');
buf.push('<h1>');
buf.push('Selected Access');
buf.push('</h1>');
buf.push('<div');
buf.push(attrs({ "class": ('items') }));
buf.push('>');
buf.push('</div>');
buf.push('</section>');
buf.push('<span');
buf.push(attrs({ "class": ('shadow') + ' ' + ('shadow-left') }));
buf.push('>');
buf.push('</span>');
buf.push('<span');
buf.push(attrs({ "class": ('shadow') + ' ' + ('shadow-right') }));
buf.push('>');
buf.push('</span>');
buf.push('</div>');
buf.push('</section>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-access') }));
buf.push('>');
buf.push('<div');
buf.push(attrs({ "class": ('col-inner') }));
buf.push('>');
buf.push('<header>');
buf.push('<h1>');
buf.push('Access');
buf.push('</h1>');
buf.push('<div');
buf.push(attrs({ "class": ('filters') }));
buf.push('>');
buf.push('<h2>');
buf.push('Filters');
buf.push('</h2>');
buf.push('<a');
buf.push(attrs({ 'id':('manage-add-access-filter'), 'href':("#"), 'title':("Add Access Filter"), "class": ('add-filter') }));
buf.push('>');
buf.push('Add Filter');
buf.push('</a>');
buf.push('<ul');
buf.push(attrs({ 'id':('manage-access-filters') }));
buf.push('>');
buf.push('</ul>');
buf.push('</div>');
buf.push('<form');
buf.push(attrs({ 'id':('search-access'), "class": ('search') }));
buf.push('>');
buf.push('<input');
buf.push(attrs({ 'type':("text"), 'name':("search-access") }));
buf.push('/>');
buf.push('<input');
buf.push(attrs({ 'type':("submit"), 'value':("Search") }));
buf.push('/>');
buf.push('</form>');
buf.push('</header>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-items-access-group'), "class": ('items') }));
buf.push('>');
buf.push('<h1>');
buf.push('Access Groups');
buf.push('</h1>');
buf.push('</section>');
buf.push('<section');
buf.push(attrs({ 'id':('manage-items-access'), "class": ('items') }));
buf.push('>');
buf.push('<h1>');
buf.push('Accesses');
buf.push('</h1>');
buf.push('</section>');
buf.push('</div>');
buf.push('</section>');
buf.push('</div>');
}
return buf.join("");
};
nacl.templates.define = function anonymous(locals) {
var attrs = jade.attrs, escape = jade.escape;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('define') }));
buf.push('>');
buf.push('<section');
buf.push(attrs({ 'id':('define-main') }));
buf.push('>');
buf.push('<div');
buf.push(attrs({ "class": ('col-inner') }));
buf.push('>');
buf.push('<header>');
buf.push('<h1>');
buf.push('Access Definitions ');
buf.push('</h1>');
buf.push('<a');
buf.push(attrs({ 'id':('define-delete'), 'href':("#") }));
buf.push('>');
buf.push('Delete');
buf.push('</a>');
buf.push('</header>');
buf.push('<section');
buf.push(attrs({ 'id':('define-access') }));
buf.push('>');
buf.push('<header>');
buf.push('<h1>');
buf.push('Accesses');
buf.push('</h1>');
buf.push('<a');
buf.push(attrs({ 'id':('add-new-access'), 'href':("/define/access/create"), 'title':("Create New Access"), "class": ('access-add') }));
buf.push('>');
buf.push('Create New');
buf.push('</a>');
buf.push('</header>');
buf.push('<div');
buf.push(attrs({ 'id':('define-items-access'), "class": ('items') }));
buf.push('>');
buf.push('</div>');
buf.push('</section>');
buf.push('<section');
buf.push(attrs({ 'id':('define-access-group') }));
buf.push('>');
buf.push('<header>');
buf.push('<h1>');
buf.push('Access Groups');
buf.push('</h1>');
buf.push('<a');
buf.push(attrs({ 'id':('add-new-access-group'), 'href':("/define/access-group/create"), 'title':("Create New Access Group"), "class": ('access-add') }));
buf.push('>');
buf.push('Create New');
buf.push('</a>');
buf.push('</header>');
buf.push('<div');
buf.push(attrs({ 'id':('define-items-access-group'), "class": ('items') }));
buf.push('>');
buf.push('</div>');
buf.push('</section>');
buf.push('</div>');
buf.push('</section>');
buf.push('<aside');
buf.push(attrs({ 'id':('define-info-pane') }));
buf.push('>');
buf.push('<div');
buf.push(attrs({ "class": ('col-inner') }));
buf.push('>');
buf.push('<div');
buf.push(attrs({ "class": ('access-info') }));
buf.push('>');
buf.push('<hgroup>');
buf.push('<h2>');
buf.push('Access group details:');
buf.push('</h2>');
buf.push('<h1>');
buf.push('Player');
buf.push('</h1>');
buf.push('</hgroup>');
buf.push('<h3>');
buf.push('Description');
buf.push('</h3>');
buf.push('<p>');
buf.push('Lorem ipsum dolor sit amet consectetur adipiscing elit.');
buf.push('</p>');
buf.push('<h3>');
buf.push('Access permissions');
buf.push('</h3>');
buf.push('<dl>');
buf.push('<dt>');
buf.push('Login');
buf.push('</dt>');
buf.push('<dd');
buf.push(attrs({ "class": ('allow') }));
buf.push('>');
buf.push('Allow');
buf.push('</dd>');
buf.push('<dt>');
buf.push('View Profile');
buf.push('</dt>');
buf.push('<dd');
buf.push(attrs({ "class": ('allow') }));
buf.push('>');
buf.push('Allow');
buf.push('</dd>');
buf.push('<dt>');
buf.push('Check credits');
buf.push('</dt>');
buf.push('<dd');
buf.push(attrs({ "class": ('allow') }));
buf.push('>');
buf.push('Allow');
buf.push('</dd>');
buf.push('<dt>');
buf.push('Access admin area');
buf.push('</dt>');
buf.push('<dd');
buf.push(attrs({ "class": ('deny') }));
buf.push('>');
buf.push('Deny');
buf.push('</dd>');
buf.push('</dl>');
buf.push('</div>');
buf.push('</div>');
buf.push('</aside>');
buf.push('</div>');
}
return buf.join("");
};
nacl.templates.form = function anonymous(locals) {
var attrs = jade.attrs, escape = jade.escape;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h1>');
buf.push('<p>');
buf.push('');
buf.push('<label');
buf.push(attrs({ 'for':("form-name") }));
buf.push('>');
buf.push('');
buf.push('Name ');
buf.push('\n');
buf.push('<small>');
buf.push('(Human readable name)');
buf.push('</small>');
buf.push('</label>');
buf.push('<input');
buf.push(attrs({ 'id':('form-name'), 'type':("text"), 'name':("name"), 'value':(name) }));
buf.push('/>');
buf.push('</p>');
buf.push('<p>');
buf.push('');
buf.push('<label');
buf.push(attrs({ 'for':("form-slug") }));
buf.push('>');
buf.push('');
buf.push('Slug');
buf.push('\n');
buf.push('<small>');
buf.push('(Machine readable name)');
buf.push('</small>');
buf.push('</label>');
buf.push('<input');
buf.push(attrs({ 'id':('form-slug'), 'type':("text"), 'name':("slug"), 'value':(slug) }));
buf.push('/>');
buf.push('</p>');
buf.push('<p>');
buf.push('<label');
buf.push(attrs({ 'for':("form-desc") }));
buf.push('>');
buf.push('');
buf.push('Description');
buf.push('\n');
buf.push('</label>');
buf.push('<textarea');
buf.push(attrs({ 'id':('form-desc'), 'name':("desc"), 'value':(desc) }));
buf.push('>');
buf.push('</textarea>');
buf.push('</p>');
 if (item == 'access')
{
buf.push('<p>');
buf.push('<label');
buf.push(attrs({ 'for':("form-enable") }));
buf.push('>');
buf.push('Enable access?');
buf.push('\n');
buf.push('</label>');
buf.push('<input');
buf.push(attrs({ 'id':('form-enable'), 'type':("checkbox"), 'name':("enable"), 'checked':(enable) }));
buf.push('/>');
buf.push('</p>');
}
buf.push('<p>');
buf.push('<input');
buf.push(attrs({ 'id':('form-submit'), 'type':("submit"), 'value':("Submit") }));
buf.push('/>');
buf.push('</p>');
 if (typeof id != 'undefined')
{
buf.push('<input');
buf.push(attrs({ 'type':("hidden"), 'value':(id) }));
buf.push('/>');
}
}
return buf.join("");
};
