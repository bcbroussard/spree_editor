/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';

  /* Filebrowser routes */
  config.fileinlinebrowserBrowseUrl = "/admin/ckeditor_uploads";
  // The location of an external file browser, that should be launched when "Browse Server" button is pressed.
  // config.filebrowserBrowseUrl = "/admin/ckeditor_uploads?type=file";
  
  // The location of a script that handles file uploads.
  config.filebrowserUploadUrl = "/admin/ckeditor_uploads";

  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Flash dialog.
  // config.filebrowserFlashBrowseUrl = "/admin/ckeditor_uploads?type=flash";

  // The location of a script that handles file uploads in the Flash dialog.
  config.filebrowserFlashUploadUrl = "/admin/ckeditor_uploads";
  
  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Link tab of Image dialog.
  // config.filebrowserImageBrowseLinkUrl = "/admin/ckeditor_uploads?type=imagelink";

  // The location of an external file browser, that should be launched when "Browse Server" button is pressed in the Image dialog.
  // config.filebrowserImageBrowseUrl = "/admin/ckeditor_uploads?type=image";

  // The location of a script that handles file uploads in the Image dialog.
  config.filebrowserImageUploadUrl = "/admin/ckeditor_uploads";
  
  // Rails CSRF token
  config.filebrowserParams = function(){
    var csrf_token, csrf_param, meta,
        metas = document.getElementsByTagName('meta'),
        params = new Object();
    
    for ( var i = 0 ; i < metas.length ; i++ ){
      meta = metas[i];

      switch(meta.name) {
        case "csrf-token":
          csrf_token = meta.content;
          break;
        case "csrf-param":
          csrf_param = meta.content;
          break;
        default:
          continue;
      }
    }

    if (csrf_param !== undefined && csrf_token !== undefined) {
      params[csrf_param] = csrf_token;
    }

    return params;
  };
  
  config.addQueryString = function( url, params ){
    var queryString = [];

    if ( !params ) {
      return url;
    } else {
      for ( var i in params )
        queryString.push( i + "=" + encodeURIComponent( params[ i ] ) );
    }

    return url + ( ( url.indexOf( "?" ) != -1 ) ? "&" : "?" ) + queryString.join( "&" );
  };

  config.updateTargetElement = function( url, sourceElement ) {
    var dialog = sourceElement.getDialog();
    var targetElement = sourceElement.filebrowser.target || null;

    // If there is a reference to targetElement, update it.
    if ( targetElement ) {
      var target = targetElement.split( ':' );
      var element = dialog.getContentElement( target[ 0 ], target[ 1 ] );
      if ( element ) {
        element.setValue( url );
        dialog.selectPage( target[ 0 ] );
      }
    }
  }


  // Integrate Rails CSRF token into file upload dialogs (link, image, attachment and flash)
  CKEDITOR.on( 'dialogDefinition', function( ev ){
    // Take the dialog name and its definition from the event data.
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;
    var content, upload, dialog;
    var lang = CKEDITOR.lang[CKEDITOR.lang.detect()];

    if (CKEDITOR.tools.indexOf(['link', 'image', 'attachment', 'flash'], dialogName) > -1) {
      content = (dialogDefinition.getContents('Upload') || dialogDefinition.getContents('upload'));
      upload = (content == null ? null : content.get('upload'));
      dialog = dialogDefinition.dialog;
      dialog.on('load', function( ev ){
        console.log('load '+dialogName+' uploads');
        dialog.hidePage( 'Link' ); //Hide Link tab.

        $("#display_"+dialogName+"_uploads")
        .load(config.addQueryString(config.fileinlinebrowserBrowseUrl, {type:dialogName}))
        .on('click', 'a.image', function(ev) {
          var upload = dialog.getContentElement('Upload', 'upload') || dialog.getContentElement('upload', 'upload');
          config.updateTargetElement(this.href, upload);
          return false;
        });
      });

      if (upload && upload.filebrowser['params'] == null) {
        content.elements.push({
          id: 'browse',
          label: lang.image.alt,
          type: 'html',
          html: "<label>or you can choose one on the server</label><div id=\"display_"+dialogName+"_uploads\">Loading...</div>",
        });
        upload.filebrowser['params'] = config.filebrowserParams();
        upload.action = config.addQueryString(upload.action, upload.filebrowser['params']);
      }
    }
  });
  /* Toolbars */
  config.toolbar = 'Easy';

  config.toolbar_Easy =
    [
        ['Source'],
        ['Cut','Copy','Paste','PasteText','PasteFromWord'],
        ['Undo','Redo'],
        ['Table','HorizontalRule','SpecialChar'],
        ['Link','Unlink','Image','Flash'],
        ['Maximize'], '/',
        ['Bold','Italic','Strike','-','TextColor','BGColor','-','RemoveFormat'], 
        ['Styles','Format'], 
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
    ];
};

