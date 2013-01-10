class Spree::Admin::EditorSettingsController < Spree::Admin::BaseController

  def edit
    @config = Spree::EditorConfiguration.new
  end

  def update
    config = Spree::EditorConfiguration.new

    params.each do |name, value|
      next unless config.has_preference? name
      config[name] = value
    end

    redirect_to edit_admin_editor_settings_path
  end

end
