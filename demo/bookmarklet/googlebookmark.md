## bookmarklet for google bookmarks

This is a slightly modified version of the original. 

It has a larger window height and width to accomodate for the annoyance of a missing keyboard shortcut for the "save" button.

The original height and width obscures the "save" button on smaller screens.

```
javascript:(function()%7Bvar a%3Dwindow,b%3Ddocument,c%3DencodeURIComponent,d%3Da.open("http://www.google.com/bookmarks/mark%3Fop%3Dedit%26output%3Dpopup%26bkmk%3D"%2Bc(b.location)%2B"%26title%3D"%2Bc(b.title),"bkmk_popup","left%3D"%2B((a.screenX%7C%7Ca.screenLeft)%2B10)%2B",top%3D"%2B((a.screenY%7C%7Ca.screenTop)%2B10)%2B",height%3D800px,width%3D800px,resizable%3D1,alwaysRaised%3D1")%3Ba.setTimeout(function()%7Bd.focus()%7D,300)%7D)()%3
```
