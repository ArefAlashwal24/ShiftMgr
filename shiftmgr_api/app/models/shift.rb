class Shift < ApplicationRecord
  belongs_to :user
  belongs_to :location
  validates :starts_at, :ends_at, presence: true
  validate :ends_after_start
  def ends_after_start
    errors.add(:ends_at, 'must be after start') if starts_at && ends_at && ends_at <= starts_at
  end
end
