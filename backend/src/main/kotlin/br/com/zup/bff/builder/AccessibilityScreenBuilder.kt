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

import br.com.zup.beagle.ext.setAccessibility
import br.com.zup.beagle.ext.setStyle
import br.com.zup.beagle.widget.action.Alert
import br.com.zup.beagle.widget.core.*
import br.com.zup.beagle.widget.layout.*
import br.com.zup.beagle.widget.ui.Button
import br.com.zup.beagle.widget.ui.Text
import br.com.zup.bff.constant.BUTTON_STYLE_ACCESSIBILITY

object AccessibilityScreenBuilder : ScreenBuilder {
    override fun build() = Screen(
            navigationBar = NavigationBar(
                    title = "Beagle Accessibility Screen",
                    showBackButton = true,
                    navigationBarItems = listOf(
                            NavigationBarItem(
                                    text = "",
                                    image = "informationImage",
                                    onPress = listOf(Alert(
                                            title = "Accessibility Screen",
                                            message = "This method applies accessibility in a widget",
                                            labelOk = "OK"
                                    ))
                            )
                    )
            ),
            child = Container(
                    children = listOf(
                            textAccessibility(
                                    text = "Accessibility Testing",
                                    accessibilityLabel = "first text",
                                    accessible = true
                            ),
                            textAccessibility(
                                    text = "Accessibility disabled test",
                                    accessibilityLabel = "second text",
                                    accessible = false
                            ),
                            buttonAccessibility(
                                    textButton = "First Text button",
                                    accessibilityLabel = "This is a button as title",
                                    accessible = true
                            ),
                            buttonAccessibility(
                                    textButton = "Second Text button",
                                    accessible = true
                            )
                    )
            )
    )

    private fun textAccessibility(
            text: String,
            accessibilityLabel: String,
            accessible: Boolean
    ) =
            Text(
                    text = text
            ).setAccessibility {
                this.accessible = accessible
                this.accessibilityLabel = accessibilityLabel
            }.setStyle {
                margin = EdgeValue(
                        top = UnitValue.real(8),
                        bottom = UnitValue.real(8)
                )
                flex = Flex(alignItems = AlignItems.CENTER)
            }

    private fun buttonAccessibility(
            textButton: String,
            accessibilityLabel: String? = null,
            accessible: Boolean
    ) =
            Button(
                    text = textButton,
                    styleId = BUTTON_STYLE_ACCESSIBILITY
            ).setStyle {
                margin = EdgeValue(
                        top = UnitValue.real(8),
                        bottom = UnitValue.real(8)
                )
                size = Size(
                        height = UnitValue.real(40),
                )
                flex = Flex(
                        alignItems = AlignItems.CENTER)
            }.setAccessibility {
                this.accessible = accessible
                this.accessibilityLabel = accessibilityLabel
            }
}