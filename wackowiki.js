load("ometa-rhino.js");

ometa('ometa W <: Parser {' +
    'escaped = "~" :c -> [`escaped, c],' +
    'b = "**",' +
    'i = "//",' +
    's = "--",' +
    'special = (b | i | s):c -> [`special, c],' +
    'bold = b (~b allInline)+:c b -> [`bold, c],' +
    'bold_ = b (~special text)*:c (~~special | end) -> [`bold_, c],' +
    'italic = i (~i allInline)+:c i -> [`italic, c],' +
    'italic_ = i (~special text)*:c (~~special | end) -> [`italic_, c],' +
    'strike = s (~s allInline)+:c s -> [`strike, c],' +
    'strike_ = s (~special text)*:c (~~special | end) -> [`strike_, c],' +
    'text = (~special ~escaped char)+:c -> c.join("")' +
    '       | escaped:c -> c | (escaped escaped+):c -> c,' +
    'inline = bold | italic | strike | text,' +
    'inline_ = bold_ | italic_ | strike_,' +
    'allInline = inline | (~inline inline_),' +
    'topLevel = (allInline)*' +
'}');

print(W.matchAll('~///ddsd~sdsd', 'topLevel'));
