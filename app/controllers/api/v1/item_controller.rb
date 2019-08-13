class Api::V1::ItemController < Api::V1::BaseController
  def index
    item = Item.find(params["id"])
    respond_with item
  end
end
