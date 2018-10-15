# Highlighter

### What it does ?
1. Type in / Paste in formatted text
2. Allow users to make multiple, overlapping selections
3. Show all selections separately on the page

### How it works?
- we have 3 elements in state - html itself, text of clear html and selections.
- selections presented as start and end point of text with some given color.
- on highlight we getting clear text from editable div, finding selection in it and calculate offset. After that html and selections objects are updated.
- on highlight we updating html to present selections as spans with given backgroundColor.

### Edge cases not covered:
- after highlight copy paste inside of selection may break highlighting
- after highlight rich formatting breaks :(

### Poor implementation details
- specs not added
- structure could be better
