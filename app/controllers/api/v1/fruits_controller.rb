class Api::V1::FruitsController < ApplicationController
  def index
    @fruits = Fruit.all
    render json: @fruits
  end

  def create
    fruit = Fruit.create(fruit_params)
    render json: fruit
  end

  def destroy
    fruit = Fruit.find(params[:id])
    fruit.destroy
  end

  def update
    # fruit = Fruit.find(params[:id])
    # fruit.update(fruit_params)
    # render json: fruit
    @fruit = Fruit.find_by(id: params[:id])
    if @fruit.update(fruit_params)
      render json: {massage: "fruit update successfully", fruit: @fruit}
    else
      render json: @fruit.errors, status: 422
    end
  end

  private

  def fruit_params
    params.require(:fruit).permit(:name, :description)
  end
end