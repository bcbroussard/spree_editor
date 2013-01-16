require 'spree_core'

module SpreeEditor
  class Engine < Rails::Engine
    config.autoload_paths += %W(#{config.root}/lib)

    initializer :assets do |config|
      Rails.application.config.assets.precompile += %w(admin/ckeditor/* admin/tiny_mce/* editors/config.js)
    end

    def self.activate
      Dir.glob(File.join(File.dirname(__FILE__), "../app/**/*_decorator*.rb")) do |c|
        Rails.application.config.cache_classes ? require(c) : load(c)
      end

      Dir.glob(File.join(File.dirname(__FILE__), "../app/overrides/**/*.rb")) do |c|
        Rails.application.config.cache_classes ? require(c) : load(c)
      end
    end

    config.to_prepare &method(:activate).to_proc
  end

  EditorEngines = %w(TinyMCE CKEditor)
end
