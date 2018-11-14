/*
Copyright (c) 2018, All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.

Authors: Nera Liu <neraliu@gmail.com>
*/
(function () {
"use strict";

/////////////////////////////////////////////////////
//
// @class harAnalyzer
//
/////////////////////////////////////////////////////
class harAnalyzer {
	constructor() {
	}

	/**
	* @function harAnalyzer.process
	*
	* @description
	* Process all the har objects.
	*/
	static process(obj, argv) {
		let entries = obj['log']['entries'],
        urls = [];
    entries.forEach(function(entry) {
      let req = entry['request'],
          resp = entry['response'];

      if (argv.list_urls) {
        let url = req.url,
            urlObj = new URL(url),
            id = urlObj.protocol + "//" + urlObj.hostname + urlObj.pathname,
            pos = urls.indexOf(id);
        if (argv.dedup_urls) {
          if (pos === -1) {
            if (harAnalyzer.filter_url(id, argv.regex_urls)) {
              console.log("[harjs] url: " + id);
              harAnalyzer.print_url_info(req, resp, argv);
              if (argv.print_curl) {
                harAnalyzer.print_curl_cmd(entry);
              }
              urls.push(id);
            }
          }
        } else {
          if (harAnalyzer.filter_url(id, argv.regex_urls)) {
            console.log("[harjs] url: " + id);
            harAnalyzer.print_url_info(req, resp, argv);
            if (argv.print_curl) {
              harAnalyzer.print_curl_cmd(entry);
            }
          }
        }
      }

		});
	}

	/**
	* @function harAnalyzer.filter_url
	*
	* @description
	* Filter the URL based on the regular expression.
	*/
  static filter_url(url, pattern) {
    let re = new RegExp(pattern);
    if (url.match(re)) {
      return true;
    }
    return false;
  }

	/**
	* @function harAnalyzer.print_url_info
	*
	* @description
	* Print the URL information.
	*/
  static print_url_info(req, resp, argv) {
    if (argv.print_req) {
      console.log(req);
    }
    if (argv.print_resp) {
      console.log(resp);
    }
    if (argv.print_resp_code) {
      console.log("[harjs] resp.status: " + resp.status);
    }
  }

	/**
	* @function harAnalyzer.print_curl_cmd
	*
	* @description
	* Print the CURL command.
	*/
  static print_curl_cmd(obj) {
    let req = obj['request'],
        cmd = 'curl -v ';
    
    cmd += '\'' + req.url + '\' ';
    let headers = req.headers;
    headers.forEach(function(header) {
      if (!header.name.startsWith(':')) {
        cmd += '-H \'' + header.name + ': ' + header.value + '\' ';
      }
    });
    if (req.postData && req.postData.text) {
      cmd += '--data \'' + req.postData.text + '\' ';
    }
    cmd += '--compressed ';
    console.log("[harjs] CURL CMD");
    console.log(cmd);
  }

}

module.exports = harAnalyzer;

})();
