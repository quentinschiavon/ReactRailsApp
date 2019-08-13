class Api::V1::SortController < Api::V1::BaseController
  def index
    sort = params["sortedBy"] #api/v1/sort/g=male:s=wookie&o=name:ASC
    args = sort.split('&')
    #respond_with args

    case args.length
    when 1
      arg = args[0].split('=')

      case arg[0]
      when  'o'
        respond_with Item.order(arg[1])
      else
        item = args[0].split(':')
        items = Item.all
        #respond_with item
        item.each do |value|
          v = value.split('=')
          #respond_with v
          case v[0]
          when 'g'
            items = items.where(gender: v[1])
          when 's'
            items = items.where(species: v[1])
          end
        end
        respond_with items.order('id')

      end
    when 2
      item = args[0].split(':')
      items = Item.all
      #respond_with item
      item.each do |value|
        v = value.split('=')
        #respond_with v
        case v[0]
        when 'g'
          items = items.where(gender: v[1])
        when 's'
          items = items.where(species: v[1])
        end
      end
      order = args[1].split('=')
      respond_with items.order(order[1]) # +' DESC')
    else
      respond_with Item.all
    end
    #case name
    #when "gender=male"
    #  respond_with Item.where(gender: "male").order('id')
    #when "gender=female"
    #  respond_with Item.where(gender: "female").order('id')
    #else
    #  ord = params["sortedBy"] + " ASC"
    #  respond_with Item.order(ord)
    #end
  end

end
