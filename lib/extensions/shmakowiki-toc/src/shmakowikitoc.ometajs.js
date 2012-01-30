var ometajs_ = require('ometajs').globals || global;var StringBuffer = ometajs_.StringBuffer;
var objectThatDelegatesTo = ometajs_.objectThatDelegatesTo;
var isImmutable = ometajs_.isImmutable;
var digitValue = ometajs_.digitValue;
var isSequenceable = ometajs_.isSequenceable;
var escapeChar = ometajs_.escapeChar;
var unescape = ometajs_.unescape;
var getTag = ometajs_.getTag;
var inspect = ometajs_.inspect;
var lift = ometajs_.lift;
var clone = ometajs_.clone;
var Parser = ometajs_.Parser;
var fail = ometajs_.fail;
var OMeta = ometajs_.OMeta;
var BSNullOptimization = ometajs_.BSNullOptimization;
var BSAssociativeOptimization = ometajs_.BSAssociativeOptimization;
var BSSeqInliner = ometajs_.BSSeqInliner;
var BSJumpTableOptimization = ometajs_.BSJumpTableOptimization;
var BSOMetaOptimizer = ometajs_.BSOMetaOptimizer;
var BSOMetaParser = ometajs_.BSOMetaParser;
var BSOMetaTranslator = ometajs_.BSOMetaTranslator;
var BSJSParser = ometajs_.BSJSParser;
var BSSemActionParser = ometajs_.BSSemActionParser;
var BSJSIdentity = ometajs_.BSJSIdentity;
var BSJSTranslator = ometajs_.BSJSTranslator;
var BSOMetaJSParser = ometajs_.BSOMetaJSParser;
var BSOMetaJSTranslator = ometajs_.BSOMetaJSTranslator;
if (global === ometajs_) {
  fail = (function(fail) {
    return function() { return fail };
  })(fail);
  OMeta = require('ometajs').OMeta;
}{
    var ShmakoWikiToc = exports.ShmakoWikiToc = objectThatDelegatesTo(OMeta, {
        keyword: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this._apply("anything")) {
                  case "monospace":
                    return "monospace";
                  case "strike":
                    return "strike";
                  case "underline":
                    return "underline";
                  case "para":
                    return "para";
                  case "italic":
                    return "italic";
                  case "underline_":
                    return "underline_";
                  case "italic_":
                    return "italic_";
                  case "strike_":
                    return "strike_";
                  case "subscript":
                    return "subscript";
                  case "superscript":
                    return "superscript";
                  case "ulistItem":
                    return "ulistItem";
                  case "olistItem":
                    return "olistItem";
                  case "subscript_":
                    return "subscript_";
                  case "bold_":
                    return "bold_";
                  case "monospace_":
                    return "monospace_";
                  case "olist":
                    return "olist";
                  case "ulist":
                    return "ulist";
                  case "lineBreak":
                    return "lineBreak";
                  case "superscript_":
                    return "superscript_";
                  case "bold":
                    return "bold";
                  default:
                    throw fail();
                }
            }.call(this);
        },
        headertag: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this._apply("anything")) {
                  case "header4":
                    return "header4";
                  case "header1":
                    return "header1";
                  case "header3":
                    return "header3";
                  case "header6":
                    return "header6";
                  case "header2":
                    return "header2";
                  case "header5":
                    return "header5";
                  default:
                    throw fail();
                }
            }.call(this);
        },
        header: function() {
            var $elf = this, _fromIdx = this.input.idx, t, c, a;
            return function() {
                this._form(function() {
                    return function() {
                        t = this._apply("headertag");
                        c = this._apply("tokens");
                        return a = this._apply("anything");
                    }.call(this);
                });
                return function() {
                    var h = [ t, c, a ];
                    ShmakoWikiToc.addTocHeader(h);
                    return h;
                }.call(this);
            }.call(this);
        },
        token: function() {
            var $elf = this, _fromIdx = this.input.idx, t, ans, c;
            return this._or(function() {
                return this._apply("header");
            }, function() {
                return this._apply("extension");
            }, function() {
                return function() {
                    this._form(function() {
                        return function() {
                            t = this._apply("keyword");
                            return ans = this._apply("tokens");
                        }.call(this);
                    });
                    return [ t, ans ];
                }.call(this);
            }, function() {
                return this._apply("link");
            }, function() {
                return this._apply("escaped");
            }, function() {
                return c = this._apply("anything");
            });
        },
        tokens: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._form(function() {
                    return c = this._many(function() {
                        return this._apply("token");
                    });
                });
                return c;
            }.call(this);
        },
        link: function() {
            var $elf = this, _fromIdx = this.input.idx, c, c, cc;
            return this._or(function() {
                return function() {
                    c = this._apply("token");
                    this._form(function() {
                        return undefined;
                    });
                    return [ "link", c, [] ];
                }.call(this);
            }, function() {
                return function() {
                    c = this._apply("token");
                    cc = this._apply("tokens");
                    return [ "link", c, cc ];
                }.call(this);
            });
        },
        link_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._apply("token");
                return c;
            }.call(this);
        },
        escaped: function() {
            var $elf = this, _fromIdx = this.input.idx, t, c;
            return function() {
                this._form(function() {
                    return function() {
                        t = this._applyWithArgs("exactly", "escaped");
                        return c = this._apply("anything");
                    }.call(this);
                });
                return [ t, c ];
            }.call(this);
        },
        extension: function() {
            var $elf = this, _fromIdx = this.input.idx, t, tt, c, p, t, tt, c, p;
            return this._or(function() {
                return function() {
                    this._form(function() {
                        return function() {
                            t = this._applyWithArgs("exactly", "extension");
                            tt = this._applyWithArgs("exactly", "toc");
                            c = this._apply("anything");
                            return p = this._apply("anything");
                        }.call(this);
                    });
                    return function() {
                        var x = this.transform(c, p);
                        return [ t, tt, [ x["toc"], x["ast"] ], p ];
                    }.call(this);
                }.call(this);
            }, function() {
                return function() {
                    this._form(function() {
                        return function() {
                            t = this._applyWithArgs("exactly", "extension");
                            tt = this._apply("anything");
                            c = this._apply("anything");
                            return p = this._apply("anything");
                        }.call(this);
                    });
                    return [ t, tt, c, p ];
                }.call(this);
            });
        },
        topLevel: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._apply("tokens");
                return c;
            }.call(this);
        }
    });
    ShmakoWikiToc["tocs"] = [];
    ShmakoWikiToc["transform"] = function(ast, p) {
        this.startToc();
        var _ast = this.match(ast, "topLevel");
        if (p === "nested") {
            this.addNestedToc();
        } else {
            undefined;
        }
        return {
            ast: _ast,
            toc: this.finishToc()
        };
    };
    ShmakoWikiToc["startToc"] = function() {
        this["tocs"].push({
            toc: []
        });
    };
    ShmakoWikiToc["finishToc"] = function() {
        var x = TocToList.convert(this["tocs"].pop()["toc"]);
        return x;
    };
    ShmakoWikiToc["addTocHeader"] = function(header) {
        if (this["tocs"] && this["tocs"]["length"]) {
            this["tocs"][this["tocs"]["length"] - 1]["toc"].push([ header[0], api.astToPlain(header[1]), header[2] ]);
        } else {
            undefined;
        }
    };
    ShmakoWikiToc["addNestedToc"] = function() {
        var headers = this["tocs"][this["tocs"]["length"] - 1]["toc"], parent = this["tocs"][this["tocs"]["length"] - 2];
        if (parent) {
            parent["toc"] = parent["toc"].concat(headers);
        } else {
            undefined;
        }
    };
}