class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :height
      t.string :mass
      t.string :eye_color
      t.string :gender
      t.string :planet
      t.string :species

      t.timestamps
    end
  end
end
