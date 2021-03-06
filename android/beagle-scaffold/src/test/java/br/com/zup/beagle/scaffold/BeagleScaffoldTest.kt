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

import android.app.Application
import androidx.test.core.app.ApplicationProvider
import androidx.test.runner.AndroidJUnit4
import br.com.zup.beagle.analytics.Analytics
import br.com.zup.beagle.android.action.Action
import br.com.zup.beagle.android.action.FormLocalActionHandler
import br.com.zup.beagle.android.components.form.core.ValidatorHandler
import br.com.zup.beagle.android.data.serializer.adapter.generic.TypeAdapterResolver
import br.com.zup.beagle.android.imagedownloader.BeagleImageDownloader
import br.com.zup.beagle.android.logger.BeagleLogger
import br.com.zup.beagle.android.navigation.BeagleControllerReference
import br.com.zup.beagle.android.navigation.DeepLinkHandler
import br.com.zup.beagle.android.networking.HttpClient
import br.com.zup.beagle.android.networking.HttpClientFactory
import br.com.zup.beagle.android.networking.urlbuilder.UrlBuilder
import br.com.zup.beagle.android.operation.Operation
import br.com.zup.beagle.android.setup.BeagleConfig
import br.com.zup.beagle.android.setup.BeagleSdk
import br.com.zup.beagle.android.setup.DesignSystem
import br.com.zup.beagle.android.store.StoreHandler
import br.com.zup.beagle.android.view.BeagleActivity
import br.com.zup.beagle.android.view.ServerDrivenActivity
import br.com.zup.beagle.android.widget.WidgetView
import br.com.zup.beagle.defaults.cache.StoreHandlerDefault
import br.com.zup.beagle.defaults.httpclient.HttpClientDefault
import br.com.zup.beagle.defaults.logger.BeagleLoggerDefault
import br.com.zup.beagle.newanalytics.AnalyticsProvider
import br.com.zup.beagle.test.rules.BeagleComponentsRule
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkObject
import io.mockk.verify
import org.junit.Rule
import org.junit.Test
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.DisplayName
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
internal class BeagleScaffoldTest {

    @get:Rule
    val begleComponentsRule = BeagleComponentsRule()
    val application = ApplicationProvider.getApplicationContext() as Application
    val analytics = mockk<Analytics>()
    val config = mockk<BeagleConfig>()
    val controllerReference = mockk<BeagleControllerReference>()
    val deepLinkHandler = mockk<DeepLinkHandler>()
    val designSystem = mockk<DesignSystem>()
    val formLocalActionHandler = mockk<FormLocalActionHandler>()
    val httpClient = mockk<HttpClient>()
    val imageDownloader = mockk<BeagleImageDownloader>()
    val logger = mockk<BeagleLogger>()
    val serverDrivenActivity: Class<BeagleActivity> =
        ServerDrivenActivity::class.java as Class<BeagleActivity>
    val storeHandler = mockk<StoreHandler>()
    val typeAdapterResolver = mockk<TypeAdapterResolver>(relaxed = true)
    val urlBuilder = mockk<UrlBuilder>()
    val validatorHandler = mockk<ValidatorHandler>()
    val analyticsProvider = mockk<AnalyticsProvider>()
    val httpClientFactory = mockk<HttpClientFactory>()

    @DisplayName("Then all its attributes are set equaling the FakeSdk ones")
    @Test
    fun beagleScaffoldSdkIsCreatedWithAllAttributesNotNull() {
        //Given

        val beagleSdkFake = BeagleSdkFake(
            analytics,
            config,
            controllerReference,
            deepLinkHandler,
            designSystem,
            formLocalActionHandler,
            httpClient,
            imageDownloader,
            logger,
            serverDrivenActivity,
            storeHandler,
            typeAdapterResolver,
            urlBuilder,
            validatorHandler,
            analyticsProvider,
            httpClientFactory
        )
        //When
        val beagleScaffold = BeagleScaffold(beagleSdkFake)

        //Then

        Assertions.assertEquals(beagleSdkFake.analytics, beagleScaffold.analytics)
        Assertions.assertEquals(beagleSdkFake.config, beagleScaffold.config)
        Assertions.assertEquals(
            beagleSdkFake.controllerReference,
            beagleScaffold.controllerReference
        )
        Assertions.assertEquals(beagleSdkFake.deepLinkHandler, beagleScaffold.deepLinkHandler)
        Assertions.assertEquals(beagleSdkFake.designSystem, beagleScaffold.designSystem)
        Assertions.assertEquals(
            beagleSdkFake.formLocalActionHandler,
            beagleScaffold.formLocalActionHandler
        )
        Assertions.assertEquals(beagleSdkFake.httpClient, beagleScaffold.httpClient)
        Assertions.assertEquals(beagleSdkFake.imageDownloader, beagleScaffold.imageDownloader)
        Assertions.assertEquals(beagleSdkFake.logger, beagleScaffold.logger)
        Assertions.assertEquals(
            beagleSdkFake.serverDrivenActivity,
            beagleScaffold.serverDrivenActivity
        )
        Assertions.assertEquals(beagleSdkFake.storeHandler, beagleScaffold.storeHandler)
        Assertions.assertEquals(
            beagleSdkFake.typeAdapterResolver,
            beagleScaffold.typeAdapterResolver
        )
        Assertions.assertEquals(beagleSdkFake.urlBuilder, beagleScaffold.urlBuilder)
        Assertions.assertEquals(beagleSdkFake.validatorHandler, beagleScaffold.validatorHandler)
        Assertions.assertEquals(beagleSdkFake.analyticsProvider, beagleScaffold.analyticsProvider)
        Assertions.assertEquals(beagleSdkFake.httpClientFactory, beagleScaffold.httpClientFactory)
    }

    @DisplayName("Then the null attributes on FakeSdk will be implemented from the default classes")
    @Test
    fun beagleScaffoldSdkIsCreatedWithAddingDefaultClasses() {
        //Given
        val beagleSdkFake = getSdkFake(null, null, null)
        //When
        val beagleScaffold = BeagleScaffold(beagleSdkFake)

        //Then

        Assertions.assertEquals(
            HttpClientDefault::class.java,
            beagleScaffold.httpClient?.javaClass
        )
        Assertions.assertEquals(
            BeagleLoggerDefault::class.java,
            beagleScaffold.logger?.javaClass
        )
        Assertions.assertEquals(null, beagleScaffold.storeHandler)
    }

    @DisplayName("Then the storeHandler should not be null")
    @Test
    fun beagleScaffoldCallsInitWithAnStoreHandlerNotNull() {
        //Given
        val beagleSdkFake = getSdkFake(httpClient, logger, null)
        val beagleScaffold = BeagleScaffold(beagleSdkFake)
        val storeHandlerDefault = mockk<StoreHandlerDefault>()
        mockkObject(StoreHandlerDefault)
        every { StoreHandlerDefault.newInstance(application) } returns storeHandlerDefault
        beagleScaffold.init(application)
        //Then
        verify(exactly = 1) { StoreHandlerDefault.newInstance(application) }
        Assertions.assertEquals(storeHandlerDefault, beagleScaffold.storeHandler)
    }

    private fun getSdkFake(
        httpClient: HttpClient?,
        logger: BeagleLogger?,
        storeHandler: StoreHandler?
    ): BeagleSdk = BeagleSdkFake(
        analytics,
        config,
        controllerReference,
        deepLinkHandler,
        designSystem,
        formLocalActionHandler,
        httpClient,
        imageDownloader,
        logger,
        serverDrivenActivity,
        storeHandler,
        typeAdapterResolver,
        urlBuilder,
        validatorHandler,
        analyticsProvider,
        httpClientFactory
    )
}

class BeagleSdkFake(
    override val analytics: Analytics?,
    override val config: BeagleConfig,
    override val controllerReference: BeagleControllerReference?,
    override val deepLinkHandler: DeepLinkHandler?,
    override val designSystem: DesignSystem?,
    override val formLocalActionHandler: FormLocalActionHandler?,
    override val httpClient: HttpClient?,
    override val imageDownloader: BeagleImageDownloader?,
    override val logger: BeagleLogger?,
    override val serverDrivenActivity: Class<BeagleActivity>,
    override val storeHandler: StoreHandler?,
    override val typeAdapterResolver: TypeAdapterResolver?,
    override val urlBuilder: UrlBuilder?,
    override val validatorHandler: ValidatorHandler?,
    override val analyticsProvider: AnalyticsProvider?,
    override val httpClientFactory: HttpClientFactory?
) : BeagleSdk {
    override fun registeredActions(): List<Class<Action>> = listOf()

    override fun registeredOperations(): Map<String, Operation> = hashMapOf()

    override fun registeredWidgets(): List<Class<WidgetView>> = listOf()
}
