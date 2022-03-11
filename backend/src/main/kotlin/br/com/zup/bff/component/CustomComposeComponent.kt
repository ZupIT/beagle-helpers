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

package br.com.zup.bff.component

import br.com.zup.beagle.core.ServerDrivenComponent
import br.com.zup.beagle.ext.setFlex
import br.com.zup.beagle.ext.setStyle
import br.com.zup.beagle.widget.Widget
import br.com.zup.beagle.widget.core.AlignItems
import br.com.zup.beagle.widget.core.EdgeValue
import br.com.zup.beagle.widget.core.Flex
import br.com.zup.beagle.widget.core.UnitValue
import br.com.zup.beagle.widget.layout.ComposeComponent
import br.com.zup.beagle.widget.layout.Container
import br.com.zup.beagle.widget.ui.Image
import br.com.zup.beagle.widget.ui.ImagePath.Local
import br.com.zup.beagle.widget.ui.Text
import br.com.zup.bff.constant.LOGO_BEAGLE

class CustomComposeComponent : ComposeComponent {
    override fun build(): ServerDrivenComponent {
        return Container(
                children = listOf(
                        buildTextBeagle(),
                        buildImageBeagle()
                )
        ).setFlex {
            alignItems = AlignItems.CENTER
        }

    }

    private fun buildTextBeagle(): Widget {
        return Text("Beagle framework")
                .setStyle {
                    flex = Flex(
                            alignItems = AlignItems.CENTER
                    )
                    margin = EdgeValue(
                            top = UnitValue.real(16),
                            bottom = UnitValue.real(16)
                    )
                }
    }

    private fun buildImageBeagle() = Image(Local.justMobile(LOGO_BEAGLE))
}