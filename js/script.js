$(function(){
  var skk = data;

  var hiraMap = {
    'a': 'あ',
    'i': 'い',
    'u': 'う',
    'e': 'え',
    'o': 'お',
    'k': 'かきくけこ',
    's': 'さしすせそ',
    't': 'たちつてと',
    'n': 'なにぬねの',
    'h': 'はひふへほ',
    'm': 'まみむめも',
    'y': 'よ', // やゆ
    'r': 'らりるれろ',
    'w': 'わう',

    'g': 'がぎぐげご',
    'z': 'ざじずぜぞ',
    'd': 'だぢづでど',
    'b': 'ばびぶべぼ',
    'p': 'ぱぴぷぺぽ',

    'j': 'じ',

    'c': 'つっ', // ケアが必要
  }
  var hiraMapList = [];
  var hiraMapListNext = [];
  function mkHiraMap(){
    for(var x in hiraMap){
      hiraMapList[x] = [];
      for(var i = 0; i < data.data.length; i ++){
        if(hiraMap[x].indexOf(data.data[i][0][0][0]) != -1){
          hiraMapList[x].push(data.data[i]);
        }
      }
    }
    for(var x in hiraMap){
      hiraMapListNext[x] = [];
      for(var i = 0; i < data.next.length; i ++){
        if(hiraMap[x].indexOf(data.next[i][0][0][0]) != -1){
          hiraMapListNext[x].push(data.next[i]);
        }
      }
    }
 
  }
  mkHiraMap();

  function choice(arr){
    var l = arr.length;
    var r = Math.floor(l * Math.random());
    return arr[r];
  }

  function checkFullHira(s){
    return s.match(/^[ぁ-ん]*$/);
  }

  function isHead(target, h){
    var head = target[0];
    var avail = hiraMap[h];
    if(avail == undefined){
      console.log("unknown head " + h);
      return false;
    }
    if(avail.indexOf(head) != -1){
      return true;
    }
    return false;
  }

  // 続く系の文字を取得
  function getNext(){
    return choice(data.next);
  }
  function getByHead(h){
    // 続き文字でもらう
    var target;
    var count = 0;
    while(true){
      target = choice(hiraMapList[h]);
      if(isHead(target[0][0], h)){
        break;
      }
      count ++;
      if(count > 10000){
        console.log("OUT");
        break;
      }
    }
    return target;
  }
 
  function getNextByHead(h){
    // 続き文字でもらう
    var target;
    var count = 0;
    while(true){
      target = choice(hiraMapListNext[h]);
      if(isHead(target[0][0], h)){
        break;
      }
      count ++;
      if(count > 10000){
        console.log("OUT");
        break;
      }
    }
    return target;
  }
 
  function last(w){
    return w[w.length - 1];
  }

  function mkSentence(len){
    var out = [];
    var target = getNext();
    out.push(target);

    for(var i = 0; i < len; i ++){
      var l = last(target[0][0]); // 続き文字
      target = getNextByHead(l);
      out.push(target);
    }

    var target = getByHead(last(target[0][0]));
    out.push(target);
    return out;
  }

  function pp(l){
    var out = "";
    for(var i = 0; i < l.length; i ++){
      out += l[i][1];
    }
    return out;
  }
  function pp2(l){
    var out = "";
    for(var i = 0; i < l.length; i ++){
      if(i != l.length - 1){
        out += l[i][0][0].substring(0, l[i][0][0].length - 1) + " ";
      }else{
        out += l[i][0][0];
      }
    }
    return out;
  }

  function ppr(l){
    var out = "";
    for(var i = 0; i < l.length; i ++){
      out += '<ruby>' + l[i][1][0]
      if(i != l.length - 1){
        out += '<rt>' + l[i][0][0].substring(0, l[i][0][0].length - 1) + "</rt>";
      }else{
        out += '<rt>'+l[i][0][0] + '</rt>';
      }
      out += '</ruby>'
    }
    return out;
  }



  function init(){
    $('.contents').empty();
    $('.contents').append($('<h2>').text("2連"));
    for(var i =0; i <12; i ++){
      var sen = mkSentence(0)
      $('.contents').append(
        $('<div>')
          .append($('<span>').html(ppr(sen)))
          //.append($('<span>').text(pp(sen)  + '('+ pp2(sen) + ')'))
          .append($('<a>').attr('href','https://twitter.com/intent/tweet?text=' + encodeURIComponent("「" + pp(sen) + " (" + pp2(sen) + ")」 #zougo " + document.location.href)).attr('target','_blank').addClass('tw').text("[つぶやく]"))
      )
    }
    $('.contents').append($('<hr>'));
    $('.contents').append($('<h2>').text("3連"));
    for(var i =0; i <12; i ++){
      var sen = mkSentence(1)
      $('.contents').append(
        $('<div>')
          .append($('<span>').html(ppr(sen)))
          //.append($('<span>').text(pp(sen)  + '('+ pp2(sen) + ')'))
          .append($('<a>').attr('href','https://twitter.com/intent/tweet?text=' + encodeURIComponent("「" + pp(sen) + " (" + pp2(sen) + ")」 #zougo " + document.location.href)).attr('target','_blank').addClass('tw').text("[つぶやく]"))
      )
    }
 
    $('.contents').append($('<hr>'));
    $('.contents').append($('<h2>').text("4連以上"));
    for(var i =0; i <12; i ++){
      var sen = mkSentence(Math.floor(Math.random()*5 + 2))
      $('.contents').append(
        $('<div>')
          .append($('<span>').html(ppr(sen)))
          //.append($('<span>').text(pp(sen)  + '('+ pp2(sen) + ')'))
          .append($('<a>').attr('href','https://twitter.com/intent/tweet?text=' + encodeURIComponent("「" + pp(sen) + " (" + pp2(sen) + ")」 #zougo " + document.location.href)).attr('target','_blank').addClass('tw').text("[つぶやく]"))
      )
    }
 
  }
  init();

});
