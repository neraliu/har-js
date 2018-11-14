# har-js
A javascript utilities for reading har file for analysis

## Quick Start
```
$ git clone https://github.com/neraliu/har-js.git
$ cd har-js
$ ./bin/harjs
Usage: harjs --file <har-filename>
		--list_urls		List the URL in the har file.
		--dedup_urls		Deduplicate the URL for display. (Only the first url will be displayed)
		--regex_urls <regex pattern>		Filter the URL based on regular expression.
		--print_req		Print the HTTP request header.
		--print_resp		Print the HTTP response header.
		--print_resp_code		Print the HTTP response code.
		--print_curl		Print the URL in the CURL format for replay.
```

Copy and save the HAR from the Chrome, Firefox etc browsers.

List all the URLs of the pages
```
$ ./bin/harjs --file <full_path_of_har_file> --list_urls
[harjs] reading <full_path_of_har_file>
[harjs] url: https://www.google.com/complete/search
[harjs] url: https://lh3.googleusercontent.com/-wSvNn4fiV3k/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-jFesluZWJBbsvWN_UFM972ogY7KA/s64-c-mo/photo.jpg
[harjs] url: https://ssl.gstatic.com/gb/images/i2_2ec824b0.png
[harjs] url: https://www.google.com/complete/search
```

Deduplicate the URLs of the pages
```
$ ./bin/harjs --file <full_path_of_har_file> --list_urls --dedup_urls
[harjs] reading <full_path_of_har_file>
[harjs] url: https://www.google.com/complete/search
[harjs] url: https://lh3.googleusercontent.com/-wSvNn4fiV3k/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-jFesluZWJBbsvWN_UFM972ogY7KA/s64-c-mo/photo.jpg
[harjs] url: https://ssl.gstatic.com/gb/images/i2_2ec824b0.png
```

Print the target URL with request header for inspection.
```
$ ./bin/harjs --file <full_path_of_har_file> --list_urls --dedup_urls --regex_urls 'https://ssl.gstatic.com/gb/images/i2_2ec824b0.png' --print_req
[harjs] reading <full_path_of_har_file>
[harjs] url: https://ssl.gstatic.com/gb/images/i2_2ec824b0.png
{ method: 'GET',
  url: 'https://ssl.gstatic.com/gb/images/i2_2ec824b0.png',
  httpVersion: 'spdy',
  headers:
   [ { name: 'Referer', value: 'https://www.google.com/' },
     { name: 'User-Agent',
       value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36' } ],
  queryString: [],
  cookies: [],
  headersSize: -1,
  bodySize: 0 }
```

Print the target URL with response header for inspection.
```
$ ./bin/harjs --file <full_path_of_har_file> --list_urls --dedup_urls --regex_urls 'https://ssl.gstatic.com/gb/images/i2_2ec824b0.png' --print_resp
[harjs] reading <full_path_of_har_file>
[harjs] url: https://ssl.gstatic.com/gb/images/i2_2ec824b0.png
{ status: 200,
  statusText: '',
  httpVersion: 'spdy',
  headers:
   [ { name: 'date', value: 'Thu, 08 Nov 2018 14:57:27 GMT' },
     { name: 'x-content-type-options', value: 'nosniff' },
     { name: 'last-modified',
       value: 'Mon, 12 Dec 2016 14:45:00 GMT' },
     { name: 'server', value: 'sffe' },
     { name: 'age', value: '487268' },
     { name: 'vary', value: 'Origin' },
     { name: 'content-type', value: 'image/png' },
     { name: 'status', value: '200' },
     { name: 'cache-control', value: 'public, max-age=31536000' },
     { name: 'accept-ranges', value: 'bytes' },
     { name: 'alt-svc',
       value: 'quic=":443"; ma=2592000; v="44,43,39,35"' },
     { name: 'content-length', value: '24211' },
     { name: 'x-xss-protection', value: '1; mode=block' },
     { name: 'expires', value: 'Fri, 08 Nov 2019 14:57:27 GMT' } ],
  cookies: [],
  content: { size: 24211, mimeType: 'image/png' },
  redirectURL: '',
  headersSize: -1,
  bodySize: -1,
  _transferSize: 24370 }
```

Print the CURL cmd for replaying the HTTP request.
```
$ ./bin/harjs --file <full_path_of_har_file> --list_urls --dedup_urls --regex_urls 'https://ssl.gstatic.com/gb/images/i2_2ec824b0.png' --print_curl
[harjs] reading <full_path_of_har_file>
[harjs] url: https://ssl.gstatic.com/gb/images/i2_2ec824b0.png
[harjs] CURL CMD
curl -v 'https://ssl.gstatic.com/gb/images/i2_2ec824b0.png' -H 'Referer: https://www.google.com/' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36' --compressed
```
