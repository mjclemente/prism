Prism.languages.cfscript = Prism.languages.extend('clike', {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			inside: {
				'annotation': {
					alias: 'punctuation',
					pattern: /(^|[^.])@[\w\.]+/,
					greedy: true
				}
			}
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	// the coffeescript approach to strings, which can be multiline, also appeared to work here
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\])*\1/,
		greedy: true
	},
	'keyword': [
		{
			pattern: /\b(break|catch|component|continue|default|do|else|finally|for|function|if|in|include|package|private|property|public|remote|required|rethrow|return|switch|throw|try|var|while|xml)\b(?!\s*\=)/
		}
	],
	'operator': [
		{
			pattern: /\+\+|--|&&|\|\||=>|[!=]==|<=?|>=?|[-+*/%&|^!=<>]=?|\?(\.|:)?|[?:]/
		},
		{
			pattern: /\b(and|contains|eq|equal|eqv|gt|gte|imp|is|lt|lte|mod|not|or|xor)\b/
		}
	],
	'type': [
		{
			pattern: /\b(any|array|binary|boolean|date|guid|numeric|query|string|struct|uuid|void|xml)\b/,
			alias: 'builtin'
		}
	]
});

Prism.languages.insertBefore('cfscript', 'comment', {
	'scope': [
		{
			pattern: /\b(application|arguments|cgi|client|cookie|local|session|super|this|variables)\b/,
			alias: ['global']
		}
	],
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
		alias: 'function'
	}
});

delete Prism.languages.cfscript['class-name'];
