class User < ApplicationRecord
  has_secure_password
  has_many :shifts, dependent: :nullify
  enum :role, { staff: 'staff', manager: 'manager', admin: 'admin' }, default: 'staff'
  validates :email, presence: true, uniqueness: true
end
