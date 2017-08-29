// Generated by CoffeeScript 1.6.3
var MockPlugin,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

MockPlugin = (function() {
  function MockPlugin() {}

  MockPlugin.prototype.pluginInit = function() {};

  return MockPlugin;

})();

describe('Annotator::setupPlugins', function() {
  var $fix, annotator;
  annotator = null;
  $fix = null;
  beforeEach(function() {
    var p, _i, _len, _ref;
    _ref = ['AnnotateItPermissions', 'Auth', 'Markdown', 'Store', 'Tags', 'Unsupported'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      Annotator.Plugin[p] = MockPlugin;
    }
    addFixture('kitchensink');
    return $fix = $(fix());
  });
  afterEach(function() {
    return clearFixtures();
  });
  it('should added to the Annotator prototype', function() {
    return assert.equal(typeof Annotator.prototype.setupPlugins, 'function');
  });
  it('should be callable via jQuery.fn.Annotator', function() {
    sinon.spy(Annotator.prototype, 'setupPlugins');
    $fix.annotator().annotator('setupPlugins', {}, {
      Filter: {
        appendTo: fix()
      }
    });
    return assert(Annotator.prototype.setupPlugins.calledOnce);
  });
  describe('called with no parameters', function() {
    var _Showdown;
    _Showdown = null;
    beforeEach(function() {
      _Showdown = window.Showdown;
      annotator = new Annotator(fix());
      return annotator.setupPlugins({}, {
        Filter: {
          appendTo: fix()
        }
      });
    });
    afterEach(function() {
      return window.Showdown = _Showdown;
    });
    describe('it includes the Unsupported plugin', function() {
      return it('should add the Unsupported plugin by default', function() {
        return assert.isDefined(annotator.plugins.Unsupported);
      });
    });
    describe('it includes the Tags plugin', function() {
      return it('should add the Tags plugin by default', function() {
        return assert.isDefined(annotator.plugins.Tags);
      });
    });
    describe('it includes the Filter plugin', function() {
      var filterPlugin;
      filterPlugin = null;
      beforeEach(function() {
        return filterPlugin = annotator.plugins.Filter;
      });
      it('should add the Filter plugin by default', function() {
        return assert.isDefined(filterPlugin);
      });
      return it('should have filters for annotations, tags and users', function() {
        var expectedFilters, f, filter, _i, _len, _results;
        expectedFilters = ['text', 'user', 'tags'];
        _results = [];
        for (_i = 0, _len = expectedFilters.length; _i < _len; _i++) {
          filter = expectedFilters[_i];
          _results.push(assert.isTrue(__indexOf.call((function() {
            var _j, _len1, _ref, _results1;
            _ref = filterPlugin.filters;
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              f = _ref[_j];
              _results1.push(f.property);
            }
            return _results1;
          })(), filter) >= 0));
        }
        return _results;
      });
    });
    return describe('and with Showdown loaded in the page', function() {
      return it('should add the Markdown plugin', function() {
        return assert.isDefined(annotator.plugins.Markdown);
      });
    });
  });
  describe('called with AnnotateIt config', function() {
    beforeEach(function() {
      sinon.stub(Annotator.Plugin.Store.prototype, 'pluginInit');
      annotator = new Annotator(fix());
      return annotator.setupPlugins();
    });
    afterEach(function() {
      return Annotator.Plugin.Store.prototype.pluginInit.restore();
    });
    it('should add the Store plugin', function() {
      return assert.isDefined(annotator.plugins.Store);
    });
    it('should add the AnnotateItPermissions plugin', function() {
      return assert.isDefined(annotator.plugins.AnnotateItPermissions);
    });
    return it('should add the Auth plugin', function() {
      return assert.isDefined(annotator.plugins.Auth);
    });
  });
  return describe('called with plugin options', function() {
    beforeEach(function() {
      return annotator = new Annotator(fix());
    });
    it('should override default plugin options', function() {
      annotator.setupPlugins(null, {
        AnnotateItPermissions: false,
        Filter: {
          filters: null,
          addAnnotationFilter: false,
          appendTo: fix()
        }
      });
      return assert.lengthOf(annotator.plugins.Filter.filters, 0);
    });
    return it('should NOT load a plugin if its key is set to null OR false', function() {
      annotator.setupPlugins(null, {
        Filter: false,
        Tags: null
      });
      assert.isUndefined(annotator.plugins.Tags);
      return assert.isUndefined(annotator.plugins.Filter);
    });
  });
});

/*
//@ sourceMappingURL=kitchensink_spec.map
*/
