export function getImageUrl(id){
  var img;
  if(id<17){
    img = 'https://starwars-visualguide.com/assets/img/characters/' + id + '.jpg'
  }
  else if (id<34) {
    var num = id+1
    img = 'https://starwars-visualguide.com/assets/img/characters/' + num + '.jpg'
  }
  else if (id<45) {
    var num = id+2
    img = 'https://starwars-visualguide.com/assets/img/characters/' + num + '.jpg'
  }
  else if (id<72) {
    var num = id+3
    img = 'https://starwars-visualguide.com/assets/img/characters/' + num + '.jpg'
  }
  else if (id===72) {
    img = 'https://starwars-visualguide.com/assets/img/characters/47.jpg'
  }
  else if (id<87) {
    var num = id+2
    img = 'https://starwars-visualguide.com/assets/img/characters/' + num + '.jpg'
  }
  else {
    img = 'https://starwars-visualguide.com/assets/img/characters/35.jpg'
  }
  return img
};


export function allSpecies() {
  var species = [
    "Hutt",
    "Yoda's species",
    "Trandoshan",
    "Mon Calamari",
    "Ewok",
    "Sullustan",
    "Neimodian",
    "Gungan",
    "Toydarian",
    "Dug",
    "Twi'lek",
    "Aleena",
    "Vulptereen",
    "Xexto",
    "Toong",
    "Cerean",
    "Nautolan",
    "Zabrak",
    "Tholothian",
    "Iktotchi",
    "Quermian",
    "Kel Dor",
    "Chagrian",
    "Geonosian",
    "Mirialan",
    "Clawdite",
    "Besalisk",
    "Kaminoan",
    "Skakoan",
    "Muun",
    "Togruta",
    "Kaleesh",
    "Pau'an",
    "Wookiee",
    "Droid",
    "Human",
    "Rodian"
  ];
  return species
}
