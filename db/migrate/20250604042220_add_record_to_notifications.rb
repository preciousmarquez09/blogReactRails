class AddRecordToNotifications < ActiveRecord::Migration[6.0]
  def change
    add_reference :notifications, :record, polymorphic: true, index: true
  end
end
