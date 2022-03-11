/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package br.com.zup.bff.builder

import br.com.zup.beagle.core.CornerRadius
import br.com.zup.beagle.core.Style
import br.com.zup.beagle.widget.Widget
import br.com.zup.beagle.widget.action.Alert
import br.com.zup.beagle.widget.action.Navigate
import br.com.zup.beagle.widget.action.Route
import br.com.zup.beagle.widget.context.Bind
import br.com.zup.beagle.widget.core.EdgeValue
import br.com.zup.beagle.widget.core.UnitValue
import br.com.zup.beagle.widget.layout.*
import br.com.zup.beagle.widget.ui.Button
import br.com.zup.bff.constant.BUTTON_STYLE
import br.com.zup.bff.constant.BUTTON_STYLE_APPEARANCE
import br.com.zup.bff.constant.CYAN_BLUE
import br.com.zup.bff.constant.SCREEN_ACTION_CLICK_ENDPOINT

object ButtonScreenBuilder : ScreenBuilder {
    override fun build() = Screen(
        navigationBar = NavigationBar(
            title = "Beagle Button",
            showBackButton = true,
            navigationBarItems = listOf(
                NavigationBarItem(
                    text = "",
                    image = "informationImage",
                    onPress = listOf(Alert(
                            title = "Button",
                            message = "This is a widget that will define a button natively using the server " +
                                    "driven information received through Beagle.",
                            labelOk = "OK"
                    ))
                )
            )
        ),
        child = Container(
            children = listOf(
                createButton(
                    text = "Button",
                    style = Style(
                        margin = EdgeValue(
                            top = UnitValue.real(15)
                        )
                    )
                ),

                createButton(
                    text = "Button with style",
                    styleId = BUTTON_STYLE,
                    style = Style(
                        margin = EdgeValue(
                            top = UnitValue.real(15)
                        )
                    )
                ),

                buttonWithAppearanceAndStyle(text = "Button with Appearance"),
                buttonWithAppearanceAndStyle(
                    text = "Button with Appearance and style",
                    styleId = BUTTON_STYLE_APPEARANCE
                )
            )
        )
    )

    private fun buttonWithAppearanceAndStyle(text: String, styleId: String? = null) = createButton(
        text = text,
        styleId = styleId,
        style = Style(
            backgroundColor = Bind.constant(CYAN_BLUE),
            cornerRadius = CornerRadius(radius = Bind.constant(16.0)),
            margin = EdgeValue(
                left = UnitValue.real(25),
                right = UnitValue.real(25),
                top = UnitValue.real(25)
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
            onPress = listOf(Navigate.PushView(Route.Remote(SCREEN_ACTION_CLICK_ENDPOINT, true)))
        )

        if (style != null) {
            button.style = style
        }

        return button
    }
}
