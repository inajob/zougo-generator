# -*- coding: utf-8 -*-

import json

f = open('skk-jisyo.ml_w');
obj = [];
objNext = [];
for line in f:
  line = line.strip().decode('utf8');
  ls = line.split('/');
  tmp = [];
  for item in ls:
    item = item.strip();
    if len(item) != 0:
      tmp.append(item.split(';'));
  # hira + tail Alpha
  isNext = False;
  if(len(tmp[0][0]) > 0):
    if(tmp[0][0][0] == '>'):
      tmp[0][0] = tmp[0][0][1:]
      if(len(tmp[0][0]) == 0):
        continue;
    target = tmp[0][0][0];
    if(u"あ" <= target and target <= u"ん"):
        target = tmp[0][0][-1];
        if('a' <= target and target <= 'z'):
          isNext = True;
    if isNext:
      objNext.append(tmp);
    else:
      obj.append(tmp);
print json.dumps({'data':obj, 'next':objNext});
