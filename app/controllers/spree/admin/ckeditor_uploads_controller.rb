class Spree::Admin::CkeditorUploadsController < Spree::Admin::BaseController
  respond_to :html, :js, :json
  layout false
  
  def index
    @uploads = Spree::Upload.all_by_type params['type']
  end
  
  def create
    @upload = Spree::Upload.new
    @upload.attachment = params[:upload] unless params[:CKEditor].blank?
    @upload.save
  end
  
  def destroy
    @upload = Spree::Upload.get!(params[:id])
    @upload.destroy
  end

end