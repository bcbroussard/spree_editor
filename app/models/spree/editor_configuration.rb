class Spree::EditorConfiguration < Spree::Preferences::Configuration

  preference :enabled, :boolean, :default => true
  preference :current_editor, :string, :default => 'CKEditor'
  preference :ids, :text, :default => 'product_description page_body'

end
