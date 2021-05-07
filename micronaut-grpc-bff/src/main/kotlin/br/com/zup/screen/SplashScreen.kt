package br.com.zup.screen

import br.com.zup.beagle.core.CornerRadius
import br.com.zup.beagle.core.Style
import br.com.zup.beagle.ext.applyStyle
import br.com.zup.beagle.ext.unitReal
import br.com.zup.beagle.widget.Widget
import br.com.zup.beagle.widget.action.Navigate
import br.com.zup.beagle.widget.action.Route
import br.com.zup.beagle.widget.core.EdgeValue
import br.com.zup.beagle.widget.layout.Container
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.beagle.widget.ui.Button

object SplashScreen : ScreenBuilder {
    override fun build() = Screen(
        child = Container(
            children = listOf(
                createButton(
                    text = "Button",
                    style = Style(
                        margin = EdgeValue(
                            top = 15.unitReal()
                        )
                    )
                ),

                createButton(
                    text = "Button with style",
                    style = Style(
                        margin = EdgeValue(
                            top = 15.unitReal()
                        )
                    )
                ),

                buttonWithAppearanceAndStyle(text = "Button with Appearance"),
                buttonWithAppearanceAndStyle(
                    text = "Button with Appearance and style",
                )
            )
        )
    )

    private fun buttonWithAppearanceAndStyle(text: String, styleId: String? = null) = createButton(
        text = text,
        styleId = styleId,
        style = Style(
            backgroundColor = "#0000FF",
            cornerRadius = CornerRadius(radius = 16.0),
            margin = EdgeValue(
                left = 25.unitReal(),
                right = 25.unitReal(),
                top = 15.unitReal()
            )
        )
    )

    private fun createButton(
        text: String,
        styleId: String? = null,
        style: Style? = null
    ): Widget {
        val button = Button(
            text = text,
            styleId = styleId,
            onPress = listOf(Navigate.PushView(Route.Remote("text", true)))
        )

        if (style != null) {
            button.applyStyle(style)
        }

        return button
    }
}
