import fs from "fs";

let metadatas = "./assets/NotRichYet/metadatas/";

const files = fs.readdirSync(metadatas)

for (const file of files) {
  console.log(file)
  fs.readFile(metadatas+"/"+file , function (err, data) {
    if (err) {
        return console.error(err);
    } else {
      metadatas = JSON.parse(data.toString());
      console.log(metadatas);
    }

});
}