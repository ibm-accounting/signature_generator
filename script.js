window.box = new Vue({
			el: "#app",
			data() {
				return {
					name: "",
					title: "",
					email: "",
					mobile: "",
					office: "",
					address: ""
				};
			},
			mounted: function mounted() {
				var _this = this;
				var signatureClipboard = new Clipboard(".copy");

				var feedback = function feedback(ref) {
					_this.$refs[ref].classList.add("feedback");
					setTimeout(function () {
						_this.$refs[ref].classList.remove("feedback");
					}, 2000);
				};

				signatureClipboard.on("success", function (e) {
					feedback("copy");
				});
			},
			filters: {
				phone: function (phone) {
					return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3');
				}
			}
		});




(function (w) {
    var doc = w.document;
    var inputs = doc.querySelectorAll('form .input');
    var select = doc.querySelector('[data-select]');
    var download = doc.querySelector('[data-load]');
    var checkPhone = doc.querySelector('#checkPhone');
    var phoneInput = doc.querySelector('#phone');
    var phoneID = doc.querySelector('#phoneID');
    var checkFax = doc.querySelector('#checkFax');
    var faxInput = doc.querySelector('#fax');
    var faxID = doc.querySelector('#faxID');
    var checkMobile = doc.querySelector('#checkMobile');
    var mobileInput = doc.querySelector('#mobile');
    var mobileWrap = doc.querySelector('#mobileWrap');
    
  
  var checkhome = doc.querySelector('#checkhome');
    var homeInput = doc.querySelector('#home');
    var homeWrap = doc.querySelector('#homeWrap');
  
  
    var checkoffice = doc.querySelector('#checkoffice');
    var officeInput = doc.querySelector('#office');
    var officeWrap = doc.querySelector('#officeWrap');
  
  
    var checkEmail = doc.querySelector('#checkEmail');
    var emailInput = doc.querySelector('#email');
    var emailWrap = doc.querySelector('#emailWrap');
    var companyRadio = doc.querySelectorAll('#company input');
    var logo = doc.querySelector('.logo');
    var styleName = doc.querySelector('#preparedName');
    var selectedCompany = 'transit';
    var assetsByCompany = {
        'transit': {
            color: '#054ADA',
            logo:
         "http://imgfz.com/i/ImWYgpv.jpeg"
        },
        'swan': {
            color: '#054ADA',
            logo: "http://imgfz.com/i/T4lFS2E.jpeg "
        },
        'torrens': {
            color: '#054ADA',
            logo: "http://imgfz.com/i/m02Bauw.jpeg"
        },
        'territory': {
            color: '#054ADA',
            logo: "http://imgfz.com/i/m02Bauw.jpeg "
        }
    };

    logo.src = assetsByCompany[selectedCompany].logo;

    var generatePrefixSpan = function(company, type) {
        var color = assetsByCompany[company].color;
        return '<span class=\"prefix\" style=\"color: ' + color + '\">' + type + ': </span>';
    };

    var generatePlaceHolder = function(company, type) {
        return generatePrefixSpan(company, type) + ' ';
    };

    var recolorPrefixSpan = function(company) {
        var color = assetsByCompany[company].color;
        doc.querySelectorAll('.prefix').forEach(function(e) {
            e.style.color = color;
        });
    };

    for (var i = companyRadio.length - 1; i >= 0; i--) {
        companyRadio[i].addEventListener('click', changeCompany);
    }

    function changeCompany(e) {
        var assets = assetsByCompany[e.target.value];
        logo.src = assets.logo;
        styleName.style.color = assets.color;
        selectedCompany = e.target.value;
        recolorPrefixSpan(selectedCompany);
    }

    for (var i = inputs.length - 1; i >= 0; i--) {
        inputs[i].addEventListener('keyup', updateSignature);
    }

    checkPhone.addEventListener('click', function () {
        if (!this.checked) {
            phoneInput.disabled = true;
            phoneInput.value = '';
            removeHtmlNodes(phoneID);
        } else {
            phoneInput.disabled = false;
            var placeholder = generatePlaceHolder(selectedCompany, 'P');
            addHtmlNodes (phoneID, placeholder, 'phone');
        }
    });

    checkFax.addEventListener('click', function () {
        if (!this.checked) {
            faxInput.disabled = true;
            faxInput.value = '';
            removeHtmlNodes(faxID);
        } else {
            faxInput.disabled = false;
            var placeholder = generatePlaceHolder(selectedCompany, 'T');
            addHtmlNodes (faxID, placeholder, 'fax');
        }
    });

    checkMobile.addEventListener('click', function () {
        if (!this.checked) {
            mobileInput.disabled = true;
            mobileInput.value = '';
            removeHtmlNodes(mobileWrap);
        } else {
            mobileInput.disabled = false;
            var placeholder = generatePlaceHolder(selectedCompany, 'M');
            addHtmlNodes (mobileWrap, placeholder, 'mobile');
        }
    });

    
  checkoffice.addEventListener('click', function () {
        if (!this.checked) {
            officeInput.disabled = true;
            officeInput.value = '';
            removeHtmlNodes(officeWrap);
        } else {
            officeInput.disabled = false;
            var placeholder = generatePlaceHolder(selectedCompany, 'O');
            addHtmlNodes (officeWrap, placeholder, 'office');
        }
    
    });

    
  checkhome.addEventListener('click', function () {
        if (!this.checked) {
            homeInput.disabled = true;
            homeInput.value = '';
            removeHtmlNodes(homeWrap);
        } else {
            homeInput.disabled = false;
            var placeholder = generatePlaceHolder(selectedCompany, 'H');
            addHtmlNodes (homeWrap, placeholder, 'home');
        }
   
    });
  
  
    checkEmail.addEventListener('click', function () {
        if (!this.checked) {
            emailInput.disabled = true;
            emailInput.value = '';
            removeHtmlNodes(emailWrap);
        } else {
            emailInput.disabled = false;
            var placeholder = generatePlaceHolder(selectedCompany, 'E');
            addHtmlNodes(emailWrap, placeholder, 'email');
        }
    });

    function removeHtmlNodes(node) {
        node.innerHTML = '';
    }

    function addHtmlNodes(node, data, className) {
        var br = doc.createElement('br');
        var span = doc.createElement('span');
        span.classList.add(className);
        span.innerHTML = data;
        node.appendChild(span);
        node.appendChild(br);
    }

    function updateSignature(e) {
        var id = e.target.id;
        var value = e.target.value;
        var element = doc.querySelector('.' + id);

        if (id === 'email') {
            var prefixSpan = generatePrefixSpan(selectedCompany, '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;E');
            element.innerHTML = prefixSpan;

            var linkNode = document.createElement("a");
            linkNode.href = 'mailto:' + value;
            linkNode.classList.add('email');
            linkNode.innerHTML = value;
            element.appendChild(linkNode);
        } else if (id === 'phone') {
            var prefixSpan = generatePrefixSpan(selectedCompany, 'P');
            element.innerHTML = prefixSpan + ' ' + value;
        } else if (id === 'fax') {
            var prefixSpan = generatePrefixSpan(selectedCompany, '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;T');
            element.innerHTML = prefixSpan + ' ' + value;
        } else if (id === 'mobile') {
            var prefixSpan = generatePrefixSpan(selectedCompany, 'M');
            element.innerHTML = prefixSpan + ' ' + value;
        
        } else if (id === 'office') {
            var prefixSpan = generatePrefixSpan(selectedCompany, 'O');
            element.innerHTML = prefixSpan + ' ' + value;
          
          } else if (id === 'home') {
            var prefixSpan = generatePrefixSpan(selectedCompany, '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;H');
            element.innerHTML = prefixSpan + ' ' + value;
        } else {
            element.innerHTML = value;
        }
    }

    select.addEventListener('click', selectGmail);
    download.addEventListener('click', downloadHTML);

    function selectGmail(event) {
        var id = event.target.dataset.signature;
        var element = doc.querySelector('#' + id);
        selectText(element);
    }
    function downloadHTML() {
        var html = doc.querySelector('#signature_container').innerHTML;
        try {
            var file = new File([html], "signature.html", { type: 'text/html;charset=utf-8' });
            saveAs(file);
        } catch (err) {
            var textFileAsBlob = new Blob([html], { type: 'html' });
            window.navigator.msSaveBlob(textFileAsBlob, "signature.html");
        }
    }

    // from SO: http://stackoverflow.com/a/987376/1592915
    function selectText(element) {
        if (doc.body.createTextRange) {
            range = doc.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (w.getSelection) {
            selection = w.getSelection();
            range = doc.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

})(window);

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download.html" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
		// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
		// for the reasoning behind the timeout and revocation flow
		, arbitrary_revoke_timeout = 500 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			if (view.chrome) {
				revoker();
			} else {
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						var new_tab = view.open(object_url, "_blank");
						if (new_tab == undefined && typeof safari !== "undefined") {
							//Apple do not allow window.open, see http://bit.ly/1kZffRI
							view.location.href = object_url
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				revoke(object_url);
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			// Update: Google errantly closed 91158, I submitted it again:
			// https://code.google.com/p/chromium/issues/detail?id=389642
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
									revoke(file);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}
