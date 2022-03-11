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

import br.com.zup.beagle.ext.setFlex
import br.com.zup.beagle.widget.action.Alert
import br.com.zup.beagle.widget.action.SetContext
import br.com.zup.beagle.widget.context.ContextData
import br.com.zup.beagle.widget.context.expressionOf
import br.com.zup.beagle.widget.core.AlignSelf
import br.com.zup.beagle.widget.core.TextAlignment
import br.com.zup.beagle.widget.layout.*
import br.com.zup.beagle.widget.pager.PageIndicator
import br.com.zup.beagle.widget.ui.Button
import br.com.zup.beagle.widget.ui.Text
import br.com.zup.bff.constant.BLACK
import br.com.zup.bff.constant.LIGHT_GREY

object PageViewScreenBuilder : ScreenBuilder {
    override fun build() = Screen(
        navigationBar = NavigationBar(
            "Beagle PageView",
            showBackButton = true,
            navigationBarItems = listOf(
                NavigationBarItem(
                    text = "",
                    image = "informationImage",
                    onPress = listOf(Alert(
                        title = "PageView",
                        message = "This component is a specialized container " +
                            "to hold pages (views) that may be swiped.",
                        labelOk = "OK"
                    ))
                )
            )
        ),
        child = Container(
            children = listOf(
                Button(
                    "ir página 3",
                    onPress = listOf(SetContext("context", 2))
                ),
                PageView(
                    children = (1..3).map {
                        Text("Page $it", alignment = TextAlignment.CENTER).setFlex {
                                    alignSelf = AlignSelf.CENTER
                                    grow = 1.0
                        }
                    },
                    onPageChange = listOf(SetContext("context", "@{onPageChange}")),
                    currentPage = expressionOf("@{context}")
                ),
                PageIndicator(
                    numberOfPages = 3,
                    selectedColor = BLACK,
                    unselectedColor = LIGHT_GREY,
                    currentPage = expressionOf("@{context}")
                )
            ),
            context = ContextData("context", 0)
        ).setFlex { grow = 1.0 }
    )
}
