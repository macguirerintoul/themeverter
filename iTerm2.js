const convert = require("color-convert");

module.exports = {
	formatForiTerm2(scheme) {
		let formattedScheme = {
			name: scheme.name,
			colours: {}
		}

		const miscColours = {
			background: scheme.base.background,
			foreground: scheme.base.normal,
			cursor: scheme.base.cursor,
			cursorText: scheme.base.cursorText,
			selection: scheme.base.selectionBackground,
			selectionText: scheme.base.selectionForeground // Not always defined
		}

		// For every colour in miscColours...
		for (let [key, value] of Object.entries(miscColours)) {
			if (!value) continue; // Bail out if the value is undefined
			formattedScheme.colours[key] = {}; // Create the property so we can add sub-properties
			formattedScheme.colours[key].red = convert.hex.rgb(value)[0] / 255; // Divide by 255 because iTerm2 values are 0 - 1
			formattedScheme.colours[key].green = convert.hex.rgb(value)[1] / 255;
			formattedScheme.colours[key].blue = convert.hex.rgb(value)[2] / 255;
		}

		// For every color in scheme.ansi...
		for (let [key, value] of Object.entries(scheme.ansi)) {
			formattedScheme.colours[key] = {}; // Create the property so we can add sub-properties
			formattedScheme.colours[key].red = convert.hex.rgb(value)[0] / 255;
			formattedScheme.colours[key].green = convert.hex.rgb(value)[1] / 255;
			formattedScheme.colours[key].blue = convert.hex.rgb(value)[2] / 255;
		};

		// Define titles to be used in iTerm2 template
		formattedScheme.colours.background.title = "Background";
		formattedScheme.colours.foreground.title = "Foreground";
		formattedScheme.colours.cursor.title = "Cursor";
		formattedScheme.colours.cursorText.title = "Cursor Text";
		formattedScheme.colours.selection.title = "Selection";
		if (formattedScheme.colours.selectionText) formattedScheme.colours.selectionText.title = "Selected Text";
		
		// In theory, this could be done in the Object.entries loop above, however according to MDN, order is not guaranteed
		formattedScheme.colours.black.title = "Ansi 0";
		formattedScheme.colours.red.title = "Ansi 1";
		formattedScheme.colours.green.title = "Ansi 2";
		formattedScheme.colours.yellow.title = "Ansi 3";
		formattedScheme.colours.blue.title = "Ansi 4";
		formattedScheme.colours.magenta.title = "Ansi 5";
		formattedScheme.colours.cyan.title = "Ansi 6";
		formattedScheme.colours.white.title = "Ansi 7";
		formattedScheme.colours.brightBlack.title = "Ansi 8";
		formattedScheme.colours.brightRed.title = "Ansi 9";
		formattedScheme.colours.brightGreen.title = "Ansi 10";
		formattedScheme.colours.brightYellow.title = "Ansi 11";
		formattedScheme.colours.brightBlue.title = "Ansi 12";
		formattedScheme.colours.brightMagenta.title = "Ansi 13";
		formattedScheme.colours.brightCyan.title = "Ansi 14";
		formattedScheme.colours.brightWhite.title = "Ansi 15";

		return formattedScheme;
	}
}
