/*
 * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

import br.com.zup.beagle.ext.setStyle
import br.com.zup.beagle.widget.action.Alert
import br.com.zup.beagle.widget.core.EdgeValue
import br.com.zup.beagle.widget.core.UnitValue
import br.com.zup.beagle.widget.layout.Container
import br.com.zup.beagle.widget.layout.NavigationBar
import br.com.zup.beagle.widget.layout.NavigationBarItem
import br.com.zup.beagle.widget.layout.Screen
import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.beagle.widget.ui.Text
import br.com.zup.beagle.widget.ui.TextInput

private val MARGIN = EdgeValue(
    top = UnitValue.real(10),
    left = UnitValue.real(25),
    right = UnitValue.real(25),
)

object TextInputBuilder : ScreenBuilder {

    override fun build() = Screen(
        navigationBar = NavigationBar(
            title = "Beagle Text Input",
            showBackButton = true,
            navigationBarItems = listOf(
                NavigationBarItem(
                    text = "",
                    image = "informationImage",
                    onPress = listOf(
                        Alert(
                            title = "Text Input",
                            message = "This widget will define a Text Input view natively using the server driven " +
                                "information received through Beagle.",
                            labelOk = "OK"
                        )
                    )
                )
            )
        ),
        child = Container(
            listOf(
                createTextInput("Text Input without style!"),
                createTextInput("Text Input with style!", "DesignSystem.TextInput.Style.Bff")
            )
        )
    )

    private fun createTextInput(text: String, styleId: String? = null) = Container(
        listOf(
            Text(text).setStyle {
                margin = MARGIN
            },
            TextInput(
                placeholder = "Your text",
                styleId = styleId
            ).setStyle {
                margin = MARGIN
            }
        )
    )
}