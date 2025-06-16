class Notification < ApplicationRecord
  include Noticed::Model

  belongs_to :recipient, polymorphic: true
  belongs_to :record, polymorphic: true, optional: true

  before_save :assign_record_reference
  before_create :assign_user_id

  private

  def assign_user_id
    self.user_id ||= params[:like]&.voter_id
  end

  def assign_record_reference
    return if record_type.present? && record_id.present?

    record_param = params[:record] || params[:reading_list] || params[:comment] 
    #record = GlobalID::Locator.locate(record_param) if record_param.is_a?(String) || record_param.is_a?(GlobalID)

    if record_param.is_a?(Hash) && record_param['_aj_globalid']
      record = GlobalID::Locator.locate(record_param['_aj_globalid'])
    end

    if record.present? && record.respond_to?(:id)
      self.record_type = record.class.name
      self.record_id = record.id
    elsif params[:record_type] && params[:record_id]
      self.record_type ||= params[:record_type]
      self.record_id ||= params[:record_id]
    end
  end
end
