# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#10.times { Item.create!(name: "Item", description: "I am a description.") }
require "open-uri"
require "json"
url = 'https://swapi.co/api/people'

#resp = URI.parse(url).read
#res = JSON.parse(resp)
#if res["next"] != nil

#res["results"].each do |results|
#  Item.create!(name: results["name"], description: results["gender"])
#end
#$compteur = 0
Item.destroy_all

def fullfillDatabase(url)
  resp = URI.parse(url).read
  res = JSON.parse(resp)
  if res["next"] == nil
    res["results"].each do |results|
      planet_resp = URI.parse(results["homeworld"]).read
      planet = JSON.parse(planet_resp)
      planet_str = planet["name"]
      species_url = results["species"][0]
      if species_url != nil
        species_resp = URI.parse(species_url).read
        species = JSON.parse(species_resp)
        species_str = species["name"]
      else
        species_str = "Unkown"
      end
      Item.create!(name: results["name"],height:results["height"] ,mass: results["mass"], eye_color: results["eye_color"], gender: results["gender"], planet: planet_str, species: species_str)
      #$compteur += 1
    end
    #puts $compteur
  else
    res["results"].each do |results|
      planet_resp = URI.parse(results["homeworld"]).read
      planet = JSON.parse(planet_resp)
      planet_str = planet["name"]
      species_url = results["species"][0]
      if species_url != nil
        species_resp = URI.parse(species_url).read
        species = JSON.parse(species_resp)
        species_str = species["name"]
      else
        species_str = "Unkown"
      end
      Item.create!(name: results["name"],height:results["height"] ,mass: results["mass"], eye_color: results["eye_color"], gender: results["gender"], planet: planet_str, species: species_str)
      #$compteur += 1
    end
    new_url = res["next"]
    #puts new_url
    fullfillDatabase(new_url)
  end
end

fullfillDatabase(url)
