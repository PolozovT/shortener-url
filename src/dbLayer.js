let Datastore = require("nedb");
let db = new Datastore({ filename: "urls" });

db.loadDatabase();
const LOCAL_URL = "http://localhost:3000/";
export let returnedShortUrl;
export let redirectingUrl;

function createUniqUrl() {
  let random_string =
    Math.random()
      .toString(32)
      .substring(2, 5) +
    Math.random()
      .toString(32)
      .substring(2, 5);
  return LOCAL_URL + random_string;
}

export function InputUrl(fullUrl) {
  db.find(
    {
      fullUrl: fullUrl
    },
    function(err, docs) {
      if (docs.length > 0) {
        returnedShortUrl = docs[0].shortUrl;
      } else {
        const shortUrl = createUniqUrl();
        db.insert({ fullUrl: fullUrl, shortUrl: shortUrl });
        returnedShortUrl = shortUrl;
      }
    }
  );
}

export function RedirectingUrl(shortUrl) {
  db.find({ shortUrl: shortUrl }, function(err, docs) {
    console.warn(docs);
    if (docs.length > 0) {
      redirectingUrl = docs[0].fullUrl;
      alert("> 0 " + redirectingUrl);
      window.location.assign(redirectingUrl);
      return;
    } else {
      redirectingUrl = LOCAL_URL;
      alert("== 0" + redirectingUrl + " - " + shortUrl);
      window.location.assign(redirectingUrl);
      return;
    }
  });
}
