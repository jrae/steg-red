// let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;
/**
 * Story namespace.
 */
if ("undefined" == typeof(Story)) {
  var Story = {};
};

Story.theItem = null;

Story.js  = {
  init : function () {
      console.log("init");
      Story.js.changeEditingItem("thebox");
    },

  changeEditingItem : function(elemid)
  {
    Story.theItem=document.getElementById(elemid);
    document.getElementById("flexval").value=Story.theItem.getAttribute("flex");
    document.getElementById("flexgroupval").value=Story.theItem.getAttribute("flexgroup");
    document.getElementById("ordinalval").value=Story.theItem.getAttribute("ordinal");

    Story.js.setMenuItemSelection("alignval",Story.theItem.getAttribute("align"));
    Story.js.setMenuItemSelection("packval",Story.theItem.getAttribute("pack"));
    Story.js.setMenuItemSelection("orientval",Story.theItem.getAttribute("orient"));
    Story.js.setMenuItemSelection("dirval",Story.theItem.getAttribute("dir"));

    var styl=Story.theItem.getAttribute("style");

    Story.js.setStyleValue(styl,"width","widthval");
    Story.js.setStyleValue(styl,"min-width","minwidthval");
    Story.js.setStyleValue(styl,"max-width","maxwidthval");
    Story.js.setStyleValue(styl,"height","heightval");
    Story.js.setStyleValue(styl,"min-height","minheightval");
    Story.js.setStyleValue(styl,"max-height","maxheightval");
  },
  setMenuItemSelection : function(menuid,val)
  {
    var menu=document.getElementById(menuid);
    var items=menu.firstChild.childNodes;
    for (var t=0;t<items.length;t++){
      if (items[t].value==val){
        menu.selectedItem=items[t];
        return;
      }
    }
    menu.selectedItem=items[0];
  },
  setStyleValue : function(styl,prop,elemid)
  {
    var val;
    var len=prop.length+2;
    var idx=styl.indexOf(" "+prop+":");
    if (idx==-1) val="";
    else val=styl.substring(idx+len,styl.indexOf("px",idx+len));
    document.getElementById(elemid).value=val;
  },
  changeItem : function(event,attr)
  {
    if (event.target.value=="---" || event.target.value==""){
      Story.theItem.removeAttribute(attr);
    }
    else {
      Story.theItem.setAttribute(attr,event.target.value);
    }
  },
  changeStyle : function(event,attr)
  {
    var styl=Story.theItem.getAttribute("style");
    if (styl.indexOf(" "+attr)>=0){
      var stylexp=new RegExp(" "+attr+":\s*[0-9]*px;");
      if (event.target.value=="") styl=styl.replace(stylexp,"");
      else styl=styl.replace(stylexp," "+attr+":"+event.target.value+"px;");
      Story.theItem.setAttribute("style", styl);
    }
    else {
      Story.theItem.setAttribute("style", " "+styl+" "+attr+":"+event.target.value+"px;");
    }
  }
};