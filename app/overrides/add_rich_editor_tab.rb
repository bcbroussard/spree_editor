Deface::Override.new(:virtual_path => "spree/admin/shared/_configuration_menu",
                     :name => "add_rich_editor_tab",
                     :insert_bottom => "[data-hook='admin_configurations_sidebar_menu'], #admin_configurations_sidebar_menu[data-hook]",
                     :text => "<li<%== ' class=\"active\"' if controller.controller_name == 'editor_settings' %>><%= link_to t(\"rich_editor\"), edit_admin_editor_settings_path %></li>")

Deface::Override.new(:virtual_path => "spree/admin/shared/_configuration_menu",
                     :name => "add_upload_tab",
                     :insert_bottom => "[data-hook='admin_configurations_sidebar_menu'], #admin_configurations_sidebar_menu[data-hook]",
                     :text => "<li<%== ' class=\"active\"' if controller.controller_name == 'uploads' %>><%= link_to t(\"uploads\"), admin_uploads_path %></li>")
