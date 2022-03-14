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

import androidx.test.runner.AndroidJUnit4
import br.com.zup.beagle.android.action.Action
import br.com.zup.beagle.android.analytics.AnalyticsProvider
import br.com.zup.beagle.android.data.serializer.adapter.generic.TypeAdapterResolver
import br.com.zup.beagle.android.imagedownloader.BeagleImageDownloader
import br.com.zup.beagle.android.logger.BeagleLogger
import br.com.zup.beagle.android.navigation.BeagleControllerReference
import br.com.zup.beagle.android.navigation.DeepLinkHandler
import br.com.zup.beagle.android.networking.HttpClient
import br.com.zup.beagle.android.networking.HttpClientFactory
import br.com.zup.beagle.android.networking.ViewClient
import br.com.zup.beagle.android.networking.urlbuilder.UrlBuilder
import br.com.zup.beagle.android.operation.Operation
import br.com.zup.beagle.android.setup.BeagleConfig
import br.com.zup.beagle.android.setup.BeagleSdk
import br.com.zup.beagle.android.setup.DesignSystem
import br.com.zup.beagle.android.widget.WidgetView
import br.com.zup.beagle.defaults.httpclient.HttpClientDefault
import br.com.zup.beagle.defaults.logger.BeagleLoggerDefault
import br.com.zup.beagle.test.rules.BeagleComponentsRule
import io.mockk.every
import io.mockk.mockk
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.DisplayName
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
internal class BeagleScaffoldTest {

    @get:Rule
    val begleComponentsRule = BeagleComponentsRule()
    val config = mockk<BeagleConfig>()
    val controllerReference = mockk<BeagleControllerReference>()
    val deepLinkHandler = mockk<DeepLinkHandler>()
    val designSystem = mockk<DesignSystem>()
    val httpClient = mockk<HttpClient>()
    val viewClient = mockk<ViewClient>()
    val imageDownloader = mockk<BeagleImageDownloader>()
    val logger = mockk<BeagleLogger>()
    val typeAdapterResolver = mockk<TypeAdapterResolver>(relaxed = true)
    val urlBuilder = mockk<UrlBuilder>()
    val analyticsProvider = mockk<AnalyticsProvider>()
    val httpClientFactory = mockk<HttpClientFactory>()

    @Before
    fun setup() {
        every { httpClientFactory.create() } returns httpClient
    }

    @DisplayName("Then all its attributes are set equaling the FakeSdk ones")
    @Test
    fun beagleScaffoldSdkIsCreatedWithAllAttributesNotNull() {
        //Given

        val beagleSdkFake = getSdkFake(httpClientFactory = httpClientFactory, logger = logger)
        //When
        val beagleScaffold = BeagleScaffold(beagleSdkFake)

        //Then

        Assertions.assertEquals(beagleSdkFake.analyticsProvider, beagleScaffold.analyticsProvider)
        Assertions.assertEquals(beagleSdkFake.config, beagleScaffold.config)
        Assertions.assertEquals(
            beagleSdkFake.controllerReference,
            beagleScaffold.controllerReference
        )
        Assertions.assertEquals(beagleSdkFake.deepLinkHandler, beagleScaffold.deepLinkHandler)
        Assertions.assertEquals(beagleSdkFake.designSystem, beagleScaffold.designSystem)

        Assertions.assertEquals(beagleSdkFake.imageDownloader, beagleScaffold.imageDownloader)
        Assertions.assertEquals(beagleSdkFake.logger, beagleScaffold.logger)

        Assertions.assertEquals(
            beagleSdkFake.typeAdapterResolver,
            beagleScaffold.typeAdapterResolver
        )
        Assertions.assertEquals(beagleSdkFake.urlBuilder, beagleScaffold.urlBuilder)
        Assertions.assertEquals(beagleSdkFake.analyticsProvider, beagleScaffold.analyticsProvider)
        Assertions.assertEquals(beagleSdkFake.httpClientFactory, beagleScaffold.httpClientFactory)
    }

    @DisplayName("Then the null attributes on FakeSdk will be implemented from the default classes")
    @Test
    fun beagleScaffoldSdkIsCreatedWithAddingDefaultClasses() {
        //Given
        val beagleSdkFake = getSdkFake(null, null)
        //When
        val beagleScaffold = BeagleScaffold(beagleSdkFake)

        //Then

        Assertions.assertEquals(
            HttpClientDefault::class.java,
            beagleScaffold.httpClientFactory.create().javaClass
        )
        Assertions.assertEquals(
            BeagleLoggerDefault::class.java,
            beagleScaffold.logger.javaClass
        )
    }

    private fun getSdkFake(
        httpClientFactory: HttpClientFactory?,
        logger: BeagleLogger?,
    ): BeagleSdk = BeagleSdkFake(
        config = config,
        deepLinkHandler = deepLinkHandler,
        httpClientFactory = httpClientFactory,
        designSystem = designSystem,
        imageDownloader = imageDownloader,
        viewClient = viewClient,
        controllerReference = controllerReference,
        typeAdapterResolver = typeAdapterResolver,
        analyticsProvider = analyticsProvider,
        urlBuilder = urlBuilder,
        logger = logger
    )
}

class BeagleSdkFake(
    override val config: BeagleConfig,
    override val deepLinkHandler: DeepLinkHandler?,
    override val httpClientFactory: HttpClientFactory?,
    override val designSystem: DesignSystem?,
    override val imageDownloader: BeagleImageDownloader?,
    override val viewClient: ViewClient?,
    override val controllerReference: BeagleControllerReference?,
    override val typeAdapterResolver: TypeAdapterResolver?,
    override val analyticsProvider: AnalyticsProvider?,
    override val urlBuilder: UrlBuilder?,
    override val logger: BeagleLogger?
) : BeagleSdk {
    override fun registeredActions(): List<Class<Action>> = listOf()

    override fun registeredOperations(): Map<String, Operation> = hashMapOf()

    override fun registeredWidgets(): List<Class<WidgetView>> = listOf()
}
