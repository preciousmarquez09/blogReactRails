class CreateFollowabilityRelationships < ActiveRecord::Migration[6.0]
  def change
    create_table :followability_relationships do |t|
      t.references :followerable, polymorphic: true, null: false, index: false
      t.references :followable, polymorphic: true, null: false, index: false
      t.integer :status, default: 0

      t.timestamps 
    end

    # Custom shortened indexes
    add_index :followability_relationships, [:followerable_type, :followerable_id], name: 'index_frel_on_fble_type_id'
    add_index :followability_relationships, [:followable_type, :followable_id], name: 'index_frel_on_fwed_type_id'
  end
end
