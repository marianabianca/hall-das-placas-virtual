// Code from http://techslides.com/convert-csv-to-json-in-javascript
export const csvJSON = (csv) => {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    if (currentline.length !== headers.length) {
      throw new Error("Header and object don't have the same lenght");
    }

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] ?? "";
    }

    result.push(obj);
  }

  return result;
};
