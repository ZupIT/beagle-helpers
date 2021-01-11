/*
 *  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

package br.com.zup.beagle.scaffold

import br.com.zup.beagle.android.action.Alert
import br.com.zup.beagle.android.components.Button
import br.com.zup.beagle.android.components.Text
import br.com.zup.beagle.android.components.layout.Container
import br.com.zup.beagle.android.components.layout.Screen
import br.com.zup.beagle.core.Style
import br.com.zup.beagle.ext.applyStyle
import br.com.zup.beagle.ext.unitReal
import br.com.zup.beagle.widget.core.AlignSelf
import br.com.zup.beagle.widget.core.EdgeValue
import br.com.zup.beagle.widget.core.Flex

object BeagleDeclarativeSample {

    val screen = Screen(
        child = Container(
            children = listOf(
                Text(
                    textColor = "#000000",
                    text = "Hello Beagle!"
                ).applyStyle(
                    Style(
                        margin = EdgeValue(top = 16.unitReal()),
                        flex = Flex(alignSelf = AlignSelf.CENTER)
                    )
                ),
                Button(text = "Click me", onPress = listOf(Alert("", "Beagle is working"))),
                Text(
                    textColor = "#000000",
                    text = "Beagle is a cross-platform framework which provides usage of the " +
                            "Server-Driven UI concept, natively in iOS, Android and Web applications. " +
                            "By using Beagle, your team could easily change application's layout and" +
                            " data by just changing backend code."
                ).applyStyle(
                    Style(
                        margin = EdgeValue(
                            left = 16.unitReal(),
                            right = 16.unitReal(),
                            top = 20.unitReal()
                        )
                    )
                )
            )
        )
    )
}