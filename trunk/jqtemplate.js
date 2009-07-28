/*
 * jQTemplate - fast and light template engine - jQuery plugin
 *  Version 0.1
 * Author: Jim Palmer
 * Released under MIT license.
 */
(function($) {
	$.fn.jQTemplate = function ( data, dir, template ) {
		// clone the template and clobber the target
		$(this).empty().append( $(template).clone() );
		// detect iterative or non-iterative root
		var tbody = $('tbody:first', this).length ? $('tbody:first', this) : this, tbodyTemplate = $(tbody).html(), repHtml = [];
		// build iterrated pre-dom-insertion
		if ( typeof data.length != 'undefined' ) {
			for ( var d=0, de = data.length; d < de; d++)
				repHtml.push(tbodyTemplate);
			// insert iterrative HTML to tbody target all at once
			$(tbody).html(repHtml.join(''));
		} else // otherwise we're not iterrating
			data = [data];
		// apply directives on data with prepend and append support
		for ( var col in $.extend( {}, data[0], dir) )
			$('.' + col, tbody).each(function (i) {
				var cellVal = typeof data == 'object' && i < data.length && typeof data[i][col] != 'undefined' ? data[i][col] : '';
				$(this).html(
					( typeof dir['+' + col] == 'function' ? dir['+' + col](i, cellVal) : '' ) +
					( typeof dir[col] == 'function' ? dir[col](i, cellVal) : cellVal ) +
					( typeof dir[col + '+'] == 'function' ? dir[col + '+'](i, cellVal) : '' )
				);
			});
		return this; // chainable
	}
})(jQuery);