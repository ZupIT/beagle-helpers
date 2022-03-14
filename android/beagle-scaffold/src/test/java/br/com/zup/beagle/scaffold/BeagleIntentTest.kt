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

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import br.com.zup.beagle.android.networking.RequestData
import br.com.zup.beagle.android.utils.newServerDrivenIntent
import br.com.zup.beagle.android.view.BeagleActivity
import br.com.zup.beagle.android.view.ServerDrivenActivity
import br.com.zup.beagle.test.rules.BeagleComponentsRule
import io.mockk.*
import org.junit.Rule
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Given a BeagleIntent")
internal class BeagleIntentTest {

    @get:Rule
    val begleComponentsRule = BeagleComponentsRule()
    @DisplayName("When toSample is called")
    @Nested
    inner class ToSample {

        @DisplayName("Then it should return an intent")
        @Test
        fun testToSampleReturnsAnIntent() {
            //Given
            val url = "http://10.0.2.2:8080/navigate-actions"
            val requestData = RequestData(url)
            mockkConstructor(Intent::class)
            mockkStatic("br.com.zup.beagle.android.utils.ServerDrivenFactoryKt")
            mockkObject(BeagleActivity)

            every { anyConstructed<Intent>().putExtras(any<Bundle>()) } returns mockk()
            every { BeagleActivity.bundleOf(requestData) } returns mockk()

            val activity = mockk<AppCompatActivity>(relaxUnitFun = true)
            val beagleIntent = BeagleIntent(activity, requestData)
            every {
                activity.newServerDrivenIntent<ServerDrivenActivity>(
                    requestData
                )
            } returns mockk()

            //When
            beagleIntent.toSample()

            //Then
            verify(exactly = 1) {
                activity.newServerDrivenIntent<ServerDrivenActivity>(
                    requestData
                )
            }
        }
    }
}